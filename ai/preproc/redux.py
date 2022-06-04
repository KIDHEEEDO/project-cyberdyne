#! /usr/bin/env python3

import argparse
from concurrent.futures import ThreadPoolExecutor
from os import path
import os
# import threading
from typing import Any, Callable, List, Iterable, Mapping


def _getargs() -> dict:
    '''커맨드라인용 인자를 분석합니다.'''
    parser = argparse.ArgumentParser(
        description=(
            '저장 공간 절약을 위해 생활쓰레기 이미지 데이터 사이즈를 줄입니다.'
        ),
    )
    parser.add_argument(
        'image_top',
        required=True,
        help=(
            '이미지 파일이 있는 최상위 경로입니다.'
            ' 이 경로로부터 상대 경로를 산출합니다.'
        ),
    )
    parser.add_argument(
        'json_top',
        required=True,
        help=(
            '애노테이션 json 파일들이 있는 최상위 경로입니다.'
            ' json 포맷만 알아서 골라냅니다.'
            ' 디렉터리 구조가 이미지와 같아야 합니다.'
        ),
    )
    parser.add_argument(
        'dest',
        required=True,
        help=(
            '출력 내용을 저장할 경로입니다.'
            ' 애노테이션 파일은 append 모드로 적습니다.'
            ' 이미지 파일 상대 경로 등 디렉터리 구조는 보존합니다.'
        ),
    )

    parser.add_argument(
        '--format',
        '-f',
        help=(
            '애노테이션 포맷입니다.'
            ' 기본값은 "{image_path}, {xmin}, {ymin}, {xmax}, {ymax}, {classid}"'
            '입니다.'
        ),
        default='{image_path},{xmin},{ymin},{xmax},{ymax},{classid}',
    )
    parser.add_argument(
        '--minimum-dimension',
        '--min-dim',
        '-md',
        help=(
            '이미지의 가로, 세로 중 작은 쪽이 이 값이 되도록 리사이즈합니다.'
            '기본값은 512입니다.'
        ),
        type=int,
        default=512,
    )
    parser.add_argument(
        '--threads',
        '-nt',
        help=(
            '작업 스레드의 수입니다.'
            ' 0(기본값)이면 자동으로 맞춥니다.'
            ' 1이면 스레드를 열지 않습니다.'
        ),
        type=int,
        default=0,
    )

    args = parser.parse_args()
    return args.__dict__.copy()


def cli():
    args = _getargs()


if __name__ == '__main__':
    cli()
