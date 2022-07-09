#! /usr/bin/env python3

import argparse
from collections import deque
# from operator import itemgetter
from os import path
import os
import time

import json
import pickle

import asyncio
from concurrent import futures
import multiprocessing
import threading

from typing import (
    Any, Dict, Tuple,
    Callable, Iterable, Mapping,
    NewType, Optional, Union
)

from PIL import Image
from tqdm import tqdm


# typedef
# Rect = NewType('Rect', Mapping[str, int])


CLASS_NAME2ID_0 = {
    '종이류': 0,
    '플라스틱류': 1,
    '유리병류': 2,
    '캔류': 3,
    '고철류': 4,
    '의류': 5,
    '전자제품': 6,
    '스티로폼류': 7,
    '도기류': 8,
    '비닐류': 9,
    '가구류': 10,
    '자전거': 11,
    '형광등': 12,
    '페트병류': 13,
    '나무류': 14,
}


class Present(object):
    '''Future 타입을 흉내내는 더미입니다.'''

    def __init__(self, data) -> None:
        self._data = data

    def result(self) -> Any:
        return self._data


class SerialExecutor(object):
    '''Executor 타입을 흉내내는 직렬 코드용 더미입니다.'''

    def __init__(self, max_workers: Optional[int] = None) -> None:
        self._max_workers = 1
        self._pending = deque()

    def submit(self, fn: Callable, /, *args, **kwargs) -> Present:
        return Present(fn(*args, **kwargs))

    def map(
        self, func: Callable, *iterables: Iterable, chunksize: int = 1
    ) -> list:
        '''작업 완료된 결과물의 제너레이터를 반환합니다.'''
        # return list(map(func, *iterables))
        self._pending.extend([(func, args) for args in zip(*iterables)])
        # return (func(*args) for args in self._pending)
        while len(self._pending):
            func, args = self._pending.popleft()
            yield func(*args)

    def shutdown(self, wait=True):
        if wait:
            for func, args in self._pending:
                func(*args)


def whpair(whstr: str) -> Tuple[int, int]:
    '''``WxH`` 형식 문자열을 튜플로 변환해 반환합니다.'''
    return tuple(map(int, whstr.split('x')))


def polygon_to_box(verts: Iterable[Mapping[str, str]]) -> Mapping[str, int]:
    '''``POLYGON`` 타입 드로잉을 ``BOX`` 형식으로 변환해 반환합니다.'''
    as_nums = [
        tuple(map(int, list(vert.values())[0].split(','))) for vert in verts
    ]
    box = {
        'x1': min(x for x, y in as_nums),
        'y1': min(y for x, y in as_nums),
        'x2': max(x for x, y in as_nums),
        'y2': max(y for x, y in as_nums),
    }
    return box


async def parse_json(
    top: str, pathname: str, dim: Tuple[int, int], label_output_type: str
) -> Dict[str, Union[int, str]]:
    '''json annotation 파일을 읽어 태스크를 생성합니다.'''
    with open(pathname, 'r', encoding='utf-8') as json_in:
        label = json.load(json_in)
        # 정말 웃기는 일이지만 숫자여야 하는 값도 문자열로 되어 있습니다.
        # json 디코더를 조작하는 것보다는 몇 개 안되니까 그냥 수동으로 바꿉니다.
        # 라벨 쓴놈 3대가 대머리
        label['BoundingCount'] = int(label['BoundingCount'])

    rel = path.relpath(pathname, top)
    prefix = path.dirname(rel)
    res_old = tuple(map(int, label['RESOLUTION'].split('*')))
    task = {
        'image': path.join(prefix, label['FILE NAME']),
        'label': rel,
        'dim': dim if dim is not None else res_old,
        'boxes': []
    }

    for box_n in range(label['BoundingCount']):
        box_old = label['Bounding'][box_n]
        if box_old['Drawing'] == 'POLYGON':
            box_old.update(polygon_to_box(box_old['PolygonPoint']))
        else:
            box_old['x1'] = int(box_old['x1'])
            box_old['y1'] = int(box_old['y1'])
            box_old['x2'] = int(box_old['x2'])
            box_old['y2'] = int(box_old['y2'])

        # .. todo:: 분류 방식을 바꿀 경우 여기를 고칩니다.
        # class_id = box_old['CLASS']
        class_id = CLASS_NAME2ID_0[box_old['CLASS']]

        if label_output_type == 'yolov5':
            task['boxes'].append(
                {
                    'class': class_id,
                    'xmid': (box_old['x1'] + box_old['x2']) / 2.0 / res_old[0],
                    'ymid': (box_old['y1'] + box_old['y2']) / 2.0 / res_old[1],
                    'width': (box_old['x2'] - box_old['x1']) / res_old[0],
                    'height': (box_old['y2'] - box_old['y1']) / res_old[1],
                }
            )
        elif label_output_type == 'yolov3':
            task['boxes'].append(
                {
                    'class': class_id,
                    'xmin': round(dim[0] * box_old['x1'] / res_old[0]),
                    'ymin': round(dim[1] * box_old['y1'] / res_old[1]),
                    'xmax': round(dim[0] * box_old['x2'] / res_old[0]),
                    'ymax': round(dim[1] * box_old['y2'] / res_old[1]),
                }
            )
        elif label_output_type == 'pickle':
            task['boxes'].append(
                {
                    'class': class_id,
                    'class_name': box_old['CLASS'],
                    'class_detail': box_old['DETAILS'],
                    'resolution': res_old,
                    'xmin': box_old['x1'],
                    'ymin': box_old['y1'],
                    'xmax': box_old['x2'],
                    'ymax': box_old['y2'],
                }
            )

    return task


async def write_yolov5(dst: str, boxes: Iterable[Mapping]) -> None:
    '''YOLOv5 /ultralytics 포맷 라벨 하나를 작성합니다.'''
    try:
        os.makedirs(path.dirname(dst), exist_ok=True)
        with open(dst, 'w', encoding='utf-8') as label_out:
            for box in boxes:
                label_out.write(
                    '{class} {xmid} {ymid} {width} {height}\n'.format(**box)
                )
    except OSError as why:
        print(f'MAIN: ERROR: "{dst}" 쓰기 실패 ({why})')


def write_yolov3(dst: str, data: Iterable[Mapping]) -> None:
    '''YOLOv3 /david8862 포맷으로 라벨 데이터를 저장합니다.'''
    try:
        os.makedirs(path.dirname(dst), exist_ok=True)
        with open(dst, 'a', encoding='utf-8') as label_out:
            for task in data:
                msgs = [task['image']]
                for box in task['boxes']:
                    msgs.append(
                        '{xmin},{ymin},{xmax},{ymax},{class}'.format(**box)
                    )
                label_out.write(' '.join(msgs))
                label_out.write('\n')
    except OSError as why:
        print(f'MAIN: ERROR: "{dst}" 쓰기 실패 ({why})')


def write_pickle(dst: str, data: Iterable[Mapping]) -> None:
    '''파이썬 피클 포맷으로 수정되지 않은 라벨 데이터를 저장합니다.'''
    try:
        os.makedirs(path.dirname(dst), exist_ok=True)
        with open(dst, 'wb') as pickle_out:
            pickle.dump(data, pickle_out)
    except OSError as why:
        print(f'MAIN: ERROR: "{dst}" 쓰기 실패 ({why})')


def resize_image(src: str, dst: str, dim: Tuple[int, int]) -> None:
    try:
        if dim is None:
            return
        if path.exists(dst):
            print(f'{_identstr()}: FAIL: "{dst}" 이미 존재하는 파일입니다')
            return
        os.makedirs(path.dirname(dst), exist_ok=True)
        image_in = Image.open(src)
        image_out = image_in.resize(dim)
        image_in.close()
        image_out.save(dst)
    except OSError as why:
        print(f'{_identstr()}: ERROR: "{dst}" 쓰기 실패 ({why})')
    except Exception as why:
        print(f'{_identstr()}: ERROR: "{dst}" 처리 불가 ({why})')


def _getident() -> Tuple[int, int]:
    '''``(process id, thread id)``를 구합니다.'''
    return (
        multiprocessing.current_process().ident,
        threading.current_thread().ident
    )


def _identstr() -> str:
    return '.'.join(map(str, _getident()))


def _getargs() -> argparse.Namespace:
    '''커맨드라인용 인자를 분석합니다.'''
    parser = argparse.ArgumentParser(
        description=(
            '저장 공간 절약을 위해 생활쓰레기 이미지 데이터 사이즈를 줄입니다.'
        ),
    )
    parser.add_argument(
        '--image-src',
        '-ims',
        help=(
            '이미지 파일이 있는 최상위 경로입니다.'
            ' 이 경로로부터 상대 경로를 산출합니다.'
        ),
    )
    parser.add_argument(
        '--image-dst',
        '-imd',
        help='출력 이미지를 저장할 경로입니다. 디렉터리 구조를 보존합니다.',
    )
    parser.add_argument(
        '--image-output-dimension',
        '-dim',
        help='이미지 크기를 조정할 목표 값을 WxH 형식으로 지정합니다.',
        type=whpair,
    )

    parser.add_argument(
        '--label-src',
        '-lbs',
        help=(
            'aihub 애노테이션 json 파일들이 있는 최상위 경로입니다.'
            ' json 포맷만 알아서 골라냅니다.'
            ' 이미지를 처리할 때는 디렉터리 구조가 이미지와 같아야 합니다.'
        ),
    )
    parser.add_argument(
        '--label-dst',
        '-lbd',
        help=(
            '출력 내용을 저장할 경로입니다.'
            ' 애노테이션 파일은 append 모드로 적습니다.'
            ' 디렉터리 구조는 보존합니다.'
        ),
    )
    parser.add_argument(
        '--label-output-type',
        '-lbf',
        help='애노테이션 출력 포맷입니다. pickle, yolov3, yolov5 중 하나입니다.',
        choices=['pickle', 'yolov3', 'yolov5'],
    )

    parser.add_argument(
        '--parallelize',
        '-p',
        help=(
            '병렬화 방식입니다.'
            " 'mt', 'mp' 중의 하나입니다."
            ' 스레드/프로세스의 수는 자동으로 결정합니다.'
            ' 지정하지 않으면 병렬화를 시도하지 않습니다.'
        ),
        choices=['mt', 'mp'],
        default=None,
    )

    args = parser.parse_args()
    # return args, args.__dict__.copy()
    for arg in ['image_src', 'image_dst', 'label_src', 'label_dst']:
        pathname = args.__dict__[arg]
        if pathname is not None:
            args.__dict__[arg] = path.abspath(
                path.normpath(pathname)
            )
    if args.parallelize in ('mt', 'multithreading'):
        args.Executor = futures.ThreadPoolExecutor
    elif args.parallelize in ('mp', 'multiprocessing'):
        args.Executor = futures.ProcessPoolExecutor
    else:
        args.Executor = SerialExecutor

    return args


async def cli():
    start_time = time.perf_counter()
    done_labels = 0
    done_images = 0
    args = _getargs()
    # debug
    # print(args)
    executor = args.Executor()
    if not isinstance(executor, SerialExecutor):
        print(f'MAIN: 작업자 수는 최대 {executor._max_workers}개입니다.')

    do_label = args.label_src is not None and args.label_dst is not None
    do_image = (
        args.image_src is not None
        and args.image_dst is not None
        and args.image_output_dimension is not None
    )

    tasks = []
    if do_label:
        print(f'MAIN: 애노테이션을 처리합니다.')

        for stem, branches, leaves in os.walk(args.label_src):
            for leaf in leaves:
                if path.splitext(leaf)[1].lower() == '.json':
                    tasks.append(
                        parse_json(
                            args.label_src,
                            path.join(stem, leaf),
                            args.image_output_dimension,
                            args.label_output_type
                        )
                    )
        tasks_ = tasks
        tasks = []
        with tqdm(total=len(tasks_), desc='Read json labels') as pbar:
            for coro in asyncio.as_completed(tasks_):
                tasks.append(await coro)
                pbar.update(1)

        # tasks = await asyncio.gather(*tasks)
        done_labels += len(tasks)

        if args.label_output_type == 'yolov5':
            write_tasks = []
            for task in tasks:
                dst = path.join(
                    args.label_dst,
                    path.splitext(task['label'])[0] + '.txt',
                )
                write_tasks.append(write_yolov5(dst, task['boxes']))
            # await asyncio.gather(*write_tasks)
            with tqdm(
                total=len(write_tasks), desc='Write yolov5 labels'
            ) as pbar:
                for coro in write_tasks:
                    await coro
                    pbar.update(1)
        elif args.label_output_type == 'yolov3':
            write_yolov3(args.label_dst, tasks)
        elif args.label_output_type == 'pickle':
            write_pickle(args.label_dst, tasks)

    if do_image:
        print(f'MAIN: 이미지를 처리합니다.')
        if not do_label:
            for stem, branches, leaves in os.walk(args.image_src):
                for leaf in leaves:
                    tasks.append(
                        {
                            'image': path.relpath(
                                path.join(stem, leaf), args.image_src
                            ),
                            'dim': args.image_output_dimension
                        }
                    )

        done_images += len(tasks)
        pending = executor.map(
            resize_image,
            [path.join(args.image_src, task['image']) for task in tasks],
            [path.join(args.image_dst, task['image']) for task in tasks],
            [task['dim'] for task in tasks],
            chunksize=max(1, round(len(tasks) / executor._max_workers / 128)),
        )
        # resize_tasks = []
        # for task in tasks:
        #     resize_tasks.append(
        #         executor.submit(
        #             resize_image,
        #             path.join(args.image_src, task['image']),
        #             path.join(args.image_dst, task['image']),
        #             task['dim'],
        #         )
        #     )
        # executor.shutdown()
        with tqdm(total=len(tasks), desc='Resize images') as pbar:
            for done in pending:
                pbar.update(1)

        executor.shutdown()

        end_time = time.perf_counter()
        print(f'MAIN: stats')
        print(f'    labels processed: {done_labels}')
        print(f'    images resized: {done_images}')
        print(
            f'    parallelization: {args.parallelize if do_image else "async"}'
        )
        print(f'    time taken: {end_time - start_time:0.2f} seconds')


if __name__ == '__main__':
    asyncio.run(cli())
