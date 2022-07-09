#! /usr/bin/env python3

import json
import unittest

from http import HTTPStatus
from ututils import ConfigMixin, Identity


class TestUsers(unittest.TestCase, ConfigMixin):
    """``users`` api를 검사합니다."""
    name = 'users'
    jsonpath = 'test-users.json'

    def _update_profile(self, imposter: Identity):
        conn = imposter.connection
        cfg = self.config['update_profile']

        conn.request(
            'PATCH',
            f'{self.root}/{cfg["path"]}'.format(**vars(self.myself)),
            body=json.dumps(cfg['body']),
            headers=imposter.headers,
        )
        res = conn.getresponse()
        self.assertEqual(res.status, HTTPStatus.OK)

    def _update_password(self, imposter: Identity):
        conn = imposter.connection
        cfg = self.config['update_password']

        password = cfg['body']['password']
        conn.request(
            'PATCH',
            f'{self.root}/{cfg["path"]}'.format(**vars(self.myself)),
            body=json.dumps(cfg['body']),
            headers=imposter.headers,
        )
        res = conn.getresponse()
        self.assertEqual(res.status, HTTPStatus.OK)

        # 비밀번호 변경에 성공하면 로그인을 해봅니다.
        # 로그인에 실패하면 AssertionError가 전파됩니다.
        self.myself.password = password
        self.myself.login()

    def _get_mypage(self, imposter: Identity):
        conn = imposter.connection
        cfg = self.config['get_mypage']

        conn.request(
            'GET',
            f'{self.root}/{cfg["path"]}'.format(**vars(self.myself)),
            headers=imposter.headers,
        )
        res = conn.getresponse()
        self.assertEqual(res.status, HTTPStatus.OK)

        data = json.loads(res.read())['data']
        self.assertTrue(
            self.myself.email == data['email']
            and self.myself.nickname == data['nickname']
        )

    def test_1_update_password(self):
        """자기 자신만 비밀번호를 바꿀 수 있어야 합니다."""
        with self.subTest('자기 자신의 비밀번호 변경'):
            self._update_password(self.myself)
        with self.subTest('로그인하지 않은 사용자가 비밀번호 변경 실패'):
            unittest.expectedFailure(self._update_password(self.nobody))
        with self.subTest('로그인한 다른 사용자가 비밀번호 변경 실패'):
            unittest.expectedFailure(self._update_password(self.somebody))

    def test_2_update_profile(self):
        """자기 자신만 프로파일을 수정할 수 있어야 합니다."""
        with self.subTest('자기 자신의 프로파일 수정'):
            self._update_profile(self.myself)
        with self.subTest('로그인하지 않은 사용자가 프로파일 수정 실패'):
            unittest.expectedFailure(self._update_profile(self.nobody))
        with self.subTest('로그인한 다른 사용자가 프로파일 수정 실패'):
            unittest.expectedFailure(self._update_profile(self.somebody))

    def test_3_get_mypage(self):
        """로그인한 사용자만 마이 페이지를 볼 수 있어야 합니다."""
        with self.subTest('자기 자신의 마이 페이지 조회'):
            self._update_profile(self.myself)
        with self.subTest('로그인한 다른 사용자가 마이 페이지 조회 실패'):
            unittest.expectedFailure(self._update_profile(self.somebody))
        with self.subTest('로그인하지 않은 사용자가 마이 페이지 조회 실패'):
            unittest.expectedFailure(self._update_profile(self.nobody))

    def test_4_illegal_modification(self):
        """자기 자신의 정보라도 어떤 정보는 수정할 수 없어야 합니다."""
        conn = self.myself.connection
        cfg = self.config['illegal_modification']

        conn.request(
            'PATCH',
            f'{self.root}/{cfg["path"]}'.format(**vars(self.myself)),
            body=json.dumps(cfg['body']),
            headers=self.myself.headers,
        )
        res = conn.getresponse()
        data = json.loads(res.read())['data']

        # 수정한 필드 수가 0이어야 합니다.
        self.assertEqual(data[0], 0)
        # userId가 변하지 않았는지 확인합니다.
        conn.request(
            'GET',
            f'{self.root}/{cfg["path_val"]}'.format(**cfg['body']),
            headers=self.myself.headers,
        )
        res = conn.getresponse()
        self.assertEqual(res.status, HTTPStatus.NOT_FOUND)
        # 수정되면 안되는 필드가 변하지 않았는지 확인합니다.
        conn.request(
            'GET',
            f'{self.root}/{cfg["path_val"]}'.format(**vars(self.myself)),
            headers=self.myself.headers,
        )
        res = conn.getresponse()
        data = json.loads(res.read())['data']
        self.assertEqual(data['nickname'], self.myself.nickname)
        self.assertNotEqual(data['email'], cfg['val']['email'])


if __name__ == '__main__':
    unittest.main()
