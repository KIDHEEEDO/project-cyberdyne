import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";

type loadProps = {
    width?: number;
    height?: number;
};

const Loading = ({ width, height }: loadProps) => {
    const loadContent = useRef();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require("./loading.json"),
        rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
        },
    };

    return (
        <Wrapper width={width} height={height}>
            <Lottie options={defaultOptions} height={150} width={150} />
            <Text>
                Loading...
                <br /> 잠시만 기다려주세요
            </Text>
        </Wrapper>
    );
};

export default Loading;

const Wrapper = styled.div<{ width: number; height: number }>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #a7c4bc;
    margin-bottom: 16px;
`;

const Text = styled.h4`
    margin: 0;
`;
