#! /usr/bin/env sh
TEST=0
# python3=../../.venv/Scripts/python

DATA_IN='/d/movomo/Downloads/생활 폐기물 이미지'
# DATA_IN='/s/public.downloads/image-src'
# DATA_OUT='/d/OneDrive/.attach/cyberdyne/dataset'
DATA_OUT='/d/movomo/Downloads/dataset'

# 이미지 저장을 위해 라벨은 그대로 두고 이미지만 640x640 크기로 조정합니다.
python ./redux.py \
    --image-src="$DATA_IN/Training" \
    --image-dst="$DATA_OUT/training" \
    --image-output-dimension=640x640 \
    --parallelize=mp


if [ $TEST -eq 0 ]; then
    exit 0
fi


# =====
# TESTS
# =====

TESTDIR=/d/movomo/Downloads/test

# Test process labels to pickle
# python ./redux.py \
#     --label-src=$TESTDIR/labels \
#     --label-dst=$TESTDIR/pickle/test.pickle \
#     --label-output-type=pickle

# Test process labels to yolov3
# python ./redux.py \
#     --image-output-dimension=640x640 \
#     --label-src=$TESTDIR/labels \
#     --label-dst=$TESTDIR/yolov3/test.text \
#     --label-output-type=yolov3

# Test process labels to yolov5
# python ./redux.py \
#     --image-output-dimension=640x640 \
#     --label-src=$TESTDIR/labels \
#     --label-dst=$TESTDIR/yolov5 \
#     --label-output-type=yolov5

# Test resize image serial -> 35.85
# python ./redux.py \
#     --image-src=$TESTDIR/images \
#     --image-dst=$TESTDIR/image-out \
#     --image-output-dimension=640x640

# Test resize image mt -> 10.12
# python ./redux.py \
#     --image-src=$TESTDIR/images \
#     --image-dst=$TESTDIR/image-out \
#     --image-output-dimension=640x640 \
#     --parallelize=mt

# Test resize image mp -> 11.39
# python ./redux.py \
#     --image-src=$TESTDIR/images \
#     --image-dst=$TESTDIR/image-out \
#     --image-output-dimension=640x640 \
#     --parallelize=mp
