import React, { useState } from "react";
import Image from "next/image";
import nextArrow from "../../public/images/next.arrow.png";
import styled from "styled-components";

const InfoCard = ({ cards, route }) => {
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = (idx) => {
        if (slideIndex === cards.length) {
            return;
        }
        setSlideIndex(slideIndex + 1);
    };

    const prevSlide = () => {
        if (slideIndex === 1) {
            return;
        }
        setSlideIndex(slideIndex - 1);
    };

    return (
        <CarouselWrapper>
            <ArrowButton type="button" onClick={prevSlide}>
                <PrevArrow
                    src={nextArrow}
                    alt="prev arrow"
                    width={35}
                    height={35}
                />
            </ArrowButton>
            <CarouselAll>
                {cards?.map((card, idx) => {
                    return (
                        <Slider
                            key={`page-${idx}`}
                            className={
                                slideIndex === idx + 1 ? "is_active" : "is_pass"
                            }
                        >
                            <InfoBox>
                                <Image
                                    src={
                                        route === "ImageSearch"
                                            ? card.imgInfo
                                            : card.infoImg
                                    }
                                    alt="recycle-information"
                                    width={400}
                                    height={500}
                                />
                            </InfoBox>
                            <div>
                                <span>
                                    {idx + 1} / {cards.length}
                                </span>
                            </div>
                        </Slider>
                    );
                })}
            </CarouselAll>
            <ArrowButton type="button" onClick={nextSlide}>
                <Image
                    src={nextArrow}
                    alt="next arrow"
                    width={35}
                    height={35}
                />
            </ArrowButton>
        </CarouselWrapper>
    );
};

export default InfoCard;

const CarouselWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 600px;
    overflow: auto;
    position: relative;
`;
const CarouselAll = styled.div`
    width: 500px;
    height: 600px;
    border-radius: 15px;
    margin: 0 8px;
    display: flex;
    justify-content: center;
    text-align: center;
    word-break: keep-all;
`;
const Slider = styled.div`
    width: 500px;
    height: 600px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    &.is_pass {
        opacity: 0;
        transition: opacity ease-in-out 0.01s;
    }
    &.is_active {
        opacity: 1;
    }
`;
const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90%;
`;
const ArrowButton = styled.button`
    border: none;
    height: 30px;
    cursor: pointer;
`;
const PrevArrow = styled(Image)`
    transform: scaleX(-1);
`;
