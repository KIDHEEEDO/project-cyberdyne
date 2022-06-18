import React, { useState, useEffect } from "react";
import Image from "next/image";
import treeOne from "../../public/images/tree/tree.one.png";
import treeTwo from "../../public/images/tree/tree.two.png";
import treeThree from "../../public/images/tree/tree.three.png";
import treeFour from "../../public/images/tree/tree.four.png";
import treeFive from "../../public/images/tree/tree.five.png";

import styled, { keyframes } from "styled-components";

const GrowingTree = ({ point }) => {
    const [pagePointer, setPagePointer] = useState("1"); // point 구간에 따라 보여줘야하는 이미지 태그를 선택한다

    const searchPointer = (point: number) => {
        if (point <= 300) {
            return;
        } // 초기값은 "1" 이며, 포인트가 깎이는 일이 없으므로, 1구간에 속하면 바로 return 해서 나온다.

        if (300 < point && point <= 1000) {
            setPagePointer("2");
        } else if (1000 < point && point <= 2500) {
            setPagePointer("3");
        } else if (2500 < point && point <= 5000) {
            setPagePointer("4");
        } else {
            setPagePointer("5");
        }
    };


    useEffect(() => {
        // user의 point를 받아 온다
        searchPointer(point);
    }, [point]);

    return (
        <TreeWrapper>
            <Tree
                id="1"
                className={
                    pagePointer === "1"
                        ? "is_stay"
                        : pagePointer > "1"
                        ? "is_fade_out"
                        : "is_declare"
                }
            >
                <Image src={treeOne} alt="tree one" height={480} />
            </Tree>
            <Tree
                id="2"
                className={
                    pagePointer === "2"
                        ? "is_stay"
                        : pagePointer > "2"
                        ? "is_fade_out"
                        : "is_declare"
                }
            >
                <Image src={treeTwo} alt="tree two" height={480} />
            </Tree>

            <Tree
                id="3"
                className={
                    pagePointer === "3"
                        ? "is_stay"
                        : pagePointer > "3"
                        ? "is_fade_out"
                        : "is_declare"
                }
            >
                <Image src={treeThree} alt="tree three" height={480} />
            </Tree>
            <Tree
                id="4"
                className={
                    pagePointer === "4"
                        ? "is_stay"
                        : pagePointer > "4"
                        ? "is_fade_out"
                        : "is_declare"
                }
            >
                <Image src={treeFour} alt="tree four" height={480} />
            </Tree>
            <Tree
                id="5"
                key="10"
                className={
                    pagePointer === "5"
                        ? "is_stay"
                        : pagePointer > "5"
                        ? "is_fade_out"
                        : "is_declare"
                }
            >
                <Image src={treeFive} alt="tree five" height={480} />
            </Tree>
        </TreeWrapper>
    );
};

export default GrowingTree;

/* GrowingTree */
const TreeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
    position: relative;
`;
const treeFadeOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const treeFadeIn = keyframes`
0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }

`;

const Tree = styled.div`
    &.is_fade_out {
        position: absolute;
        animation: ${treeFadeOut} 2s ${(props) => Number(props.id) + 0.3}s
            ease-in normal;
        opacity: 0;
    }
    &.is_stay {
        position: absolute;
        animation: ${treeFadeIn} ${(props) => Number(props.id) * 2}s ease-in
            normal;
    }
    &.is_declare {
        position: absolute;
        opacity: 0;
    }
`;
