import React, { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";

const matchType = [
    "종이류",
    "플라스틱류",
    "유리병",
    "캔류",
    "고철류",
    "의류",
    "전자제품",
    "스티로폼",
    "도기류",
    "비닐류",
    "가구",
    "자전거",
    "형광등",
    "페트병류",
    "나무류",
];

// result - garbage category, percentage show
const Results = ({ content, index }) => {
    return (
        <Result key={`${index}`}>
            {index + 1}번은 <b>&apos;{matchType[content.code]}&apos;</b> (으)로
            분류되며, <b>{content.confidence}%</b> 확신합니다.{" "}
        </Result>
    );
};

// After preview image upload, object detection doing function run
const Detection = ({ detection, index }) => {
    const top = detection.xyxy[1] * 240;
    const left = detection.xyxy[0] * 400;
    const width = (detection.xyxy[2] - detection.xyxy[0]) * 400;
    const height = (detection.xyxy[3] - detection.xyxy[1]) * 240;

    return (
        <DetectionBox
            key={`image-${detection.code}`}
            top={top}
            left={left}
            height={height}
            width={width}
        >
            <p>{index + 1}번</p>
        </DetectionBox>
    );
};

const ImgDetection = ({ info, imgUrl }) => {
    const urlSrc = useRef();
    return (
        <Container>
            {info.length !== 0 ? (
                <h2>결과를 확인해주세요!</h2>
            ) : (
                <>
                    <h2>다시 해볼까요?</h2>
                    <h4>
                        사물이 많거나 배경과 구분이 어려운 경우,
                        <br /> 결과가 나오지 않을 수 있습니다.
                    </h4>
                </>
            )}
            {imgUrl && (
                <Wrapper ref={urlSrc}>
                    <Image
                        src={imgUrl}
                        alt="preview-image"
                        width={400}
                        height={240}
                        layout="fill"
                    />
                    {info?.map((detection, index) => {
                        return (
                            <Detection
                                key={`detectionImage${detection.code}`}
                                detection={detection}
                                index={index}
                            />
                        );
                    })}
                </Wrapper>
            )}
            <ResultWrapper>
                {info?.map((content, index) => {
                    return (
                        <Results
                            key={`result${index}`}
                            content={content}
                            index={index}
                        />
                    );
                })}
            </ResultWrapper>
        </Container>
    );
};

export default ImgDetection;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    position: relative;
    width: 400px;
    height: 240px;
    display: flex;
    margin-top: 30px;
`;

const DetectionBox = styled.div<{
    top: number;
    left: number;
    width: number;
    height: number;
}>`
    position: absolute;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 3px solid #00ff00;
    cursor: pointer;
    color: #00ff00;
    font-weight: bold;
    font-size: 17px;
    :hover {
        border: 3px solid red;
        color: red;
    }
`;
const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    word-break: keep-all;
    margin-top: 20px;
`;

const Result = styled.div`
    width: 100%;
    height: 30px;
    margin: 5px 0;
    display: flex;
    align-items: center;
`;
