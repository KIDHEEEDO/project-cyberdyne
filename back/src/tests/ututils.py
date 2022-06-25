#! /usr/bin/env python3

import json
import random
import secrets
import string
# import unittest

from __future__ import annotations
from http.client import HTTPConnection
from http import HTTPStatus
from pathlib import Path
from uuid import uuid4
from typing import Tuple


random.seed()


class Identity(object):
    """웹사이트에 로그인하거나 또는 하지 않은 사용자입니다."""
    nickname: str
    email: str
    password: str
    userId: str
    token: str
    headers: dict
    registered: bool = False
    loggedin: bool = False
    connection: HTTPConnection

    id_chars: str = (
        string.ascii_letters + string.digits + "!#$%&'*+-/=?^_`{|}~"
    )
    pw_chars: str = (
        string.ascii_letters + string.digits + "!#$%&'*+-/=?^_`{|}~"
    )
    domain_chars: str = string.ascii_lowercase + string.digits
    token_chars: str = string.ascii_letters + string.digits
    nickname_len: Tuple[int, int] = (4, 12)
    email_id_len: Tuple[int, int] = (4, 12)
    domain_len: Tuple[int, int] = (4, 12)
    domain_ext_len: Tuple[int, int] = (2, 4)
    pw_len: Tuple[int, int] = (8, 16)

    with (Path(__file__).parent / 'domain.json').open() as json_in:
        config: dict = json.load(json_in)
        host: str = config['host']
        port: int = config['port']
        root: str = f'http://{host}:{port}/users'

    def __init__(self, nickname=None, email=None, password=None) -> None:
        """회원 정보는 제공하지 않으면 자동으로 생성합니다."""
        if nickname is None:
            self.nickname = ''.join(
                secrets.choice(self.id_chars)
                for _ in range(random.randint(self.nickname_len))
            )
        else:
            self.nickname = nickname

        if email is None:
            email_id = ''.join(
                secrets.choice(self.id_chars)
                for _ in range(random.randing(self.email_id_len))
            )
            domain = ''.join(
                secrets.choice(self.domain_chars)
                for _ in range(random.randint(self.domain_len))
            )
            domain_ext = ''.join(
                secrets.choice(string.ascii_lowercase)
                for _ in range(random.randint(self.domain_ext_len))
            )
            self.email = f'{email_id}@{domain}.{domain_ext}'
        else:
            self.email = email

        if password is None:
            self.password = self.generate_password()
        else:
            self.nickname = nickname

        self.userId = uuid4()
        self.token = '.'.join(
            [
                secrets.token_urlsafe(36),
                secrets.token_urlsafe(66),
                secrets.token_urlsafe(43),
            ]
        )
        self.headers = {'Content-Type': 'application/json'}
        self.connection = HTTPConnection(self.host, self.port)

    def __repr__(self) -> str:
        return f'Identity({self.nickname}, {self.email}, {self.password})'

    def __str__(self) -> str:
        return f'Identity({self.nickname})'

    def register(self) -> Identity:
        self.connection.request(
            'POST',
            f'{self.root}/register',
            body=json.dumps(
                {
                    'nickname': self.nickname,
                    'email': self.email,
                    'password': self.password
                }
            ),
            headers=self.headers,
        )
        res = self.connection.getresponse()
        if res.status != HTTPStatus.CREATED:
            raise AssertionError(f'Registration fail, got {res.status}')
        self.registered = True
        self.userId = json.loads(res.read())['data']['userId']
        return self

    def unregister(self) -> Identity:
        self.connection.request(
            'DELETE',
            f'{self.root}/{self.userId}',
            headers=self.headers,
        )
        res = self.connection.getresponse()
        if res.status != HTTPStatus.NO_CONTENT:
            raise AssertionError(f'Unregistration fail, got {res.status}')
        self.registered = self.loggedin = False
        return self

    def login(self) -> Identity:
        self.connection.request(
            'POST',
            f'{self.root}/login',
            body=json.dumps({'email': self.email, 'password': self.password}),
            headers=self.headers,
        )
        res = self.connection.getresponse()
        if res.status != HTTPStatus.OK:
            raise AssertionError(f'Logging in fail, got {res.status}')
        self.loggedin = True
        self.token = json.loads(res.read())['data']['token']
        self.headers['Authorization'] = f'Bearer {self.token}'
        return self

    def close(self) -> None:
        self.connection.close()

    @staticmethod
    def generate_password():
        return ''.join(
            secrets.choice(__class__.pw_chars)
            for _ in range(random.randint(__class__.pw_len))
        )


class ConfigMixin(object):
    name: str
    jsonpath: str
    config: dict
    root: str
    myself: Identity
    somebody: Identity
    nobody: Identity

    def setUp(self):
        with (Path(__file__).parent / 'domain.json').open() as json_in:
            config: dict = json.load(json_in)
            host = config['host']
            port = config['port']
            self.root = f'http://{host}:{port}/{self.name}'

        with (Path(__file__).parent / self.jsonpath) as json_in:
            self.config = json.load(json_in)

        # Identity 세 가지를 만듭니다. (자기 자신, 다른 사용자, 로그인하지 않은 사용자)
        self.myself = Identity().register().login()
        self.somebody = Identity().register().login()
        self.nobody = Identity()

    def tearDown(self):
        if self.myself.registered:
            self.myself.unregister().close()
        if self.somebody.registered:
            self.somebody.unregister().close()
        if self.nobody.registered:
            self.nobody.unregister().close()
