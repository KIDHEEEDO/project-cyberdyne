#! /usr/bin/env python3

# from collections import UserList
from pathlib import Path
from typing import (
    Iterable,
    NamedTuple,
    NewType,
    Optional,
    Sequence,
    Tuple,
    Union,
)


# Number = NewType('Number', [int | float])


class Coord(NamedTuple):
    x: float
    y: float


class Rect(NamedTuple):
    min: Coord
    max: Coord

    def tuple(self, resolution: Optional[Tuple[int, int]] = None):
        '''``pillow`` 형식 박스 튜플로 변환합니다.'''
        if resolution is None:
            return (*self.min, *self.max)
        else:
            res = ImageSize(*resolution)
            return (
                round(res.width * self.min.x),
                round(res.height * self.min.y),
                round(res.width * self.max.x),
                round(res.height * self.max.y),
            )


class ImageSize(NamedTuple):
    width: float
    height: float

    @property
    def w(self):
        return self.width

    @property
    def h(self):
        return self.height


class Box(object):
    '''객체 탐지 시 바운딩 박스 한개입니다. 좌표는 모두 분율입니다.'''
    classid: int
    center: Coord
    size: ImageSize
    rect: Rect

    def __init__(
        self, classid: int, center: Coord, size: ImageSize, rect: Rect
    ) -> None:
        self.classid = classid
        self.center = center
        self.size = size
        self.rect = rect

    def __repr__(self):
        return f'Box({self.classid}, {self.center}, {self.size}, {self.rect})'

    @classmethod
    def from_centerbox(
        cls,
        classid: int,
        centerx: float,
        centery: float,
        width: float,
        height: float,
    ):
        center = Coord(centerx, centery)
        size = ImageSize(width, height)

        halfw = width / 2.0
        halfh = height / 2.0
        xmin = centerx - halfw
        xmax = centerx + halfw
        ymin = centery - halfh
        ymax = centery + halfh
        rect = Rect(Coord(xmin, ymin), Coord(xmax, ymax))

        box = cls(classid, center, size, rect)
        return box

    @classmethod
    def from_rect(cls, rect: Tuple[float, float, float, float]):
        raise NotImplementedError('Not needed yet, so not implemented yet')


class Label(object):
    '''``Box``의 컨테이너입니다. 상대 경로 정보를 추가로 저장합니다.'''
    path: Path

    def __init__(
        self, path: Union[Path, str], boxes: Iterable[Box] = []
    ) -> None:
        self.path = Path(path)
        self.boxes = []
        self.boxes.extend(boxes)

    def __repr__(self):
        return f'Label({self.path})'
