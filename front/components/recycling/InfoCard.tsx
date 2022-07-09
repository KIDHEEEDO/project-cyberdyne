import React, { useState } from "react";
import Image from "next/image";
import nextArrow from "../../public/images/next.arrow.png";
import styled from "styled-components";
import earth from "../../public/images/earth.png";
import footerLogo from "../../public/images/footer.logo.png";

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
                {route === "ImageSearch" ? (
                    cards?.map((card, idx) => {
                        return (
                            <Slider
                                key={`page-${idx}`}
                                className={
                                    slideIndex === idx + 1
                                        ? "is_active"
                                        : "is_pass"
                                }
                            >
                                <InfoBox>
                                    <Image
                                        src={card.imgInfo}
                                        alt="recycle-information"
                                        width={290}
                                        height={400}
                                    />
                                </InfoBox>
                                <span>
                                    {idx + 1} / {cards.length}
                                </span>
                            </Slider>
                        );
                    })
                ) : cards ? (
                    cards?.map((card, idx) => {
                        return (
                            <Slider
                                key={`page-${idx}`}
                                className={
                                    slideIndex === idx + 1
                                        ? "is_active"
                                        : "is_pass"
                                }
                            >
                                <InfoBox>
                                    <Image
                                        src={card.infoImg}
                                        alt="recycle-information"
                                        width={290}
                                        height={400}
                                    />
                                </InfoBox>
                                <span>
                                    {idx + 1} / {cards.length}
                                </span>
                            </Slider>
                        );
                    })
                ) : (
                    <NoImageBox>
                        <Image
                            src={earth}
                            alt="recycle-information"
                            width={100}
                            height={100}
                        />
                        <Image
                            src={footerLogo}
                            alt="recycle-information"
                            width={50}
                            height={50}
                        />
                        <p>
                            📍 분류 선택 시, <br />
                            배출방법 카드가 나옵니다.
                        </p>
                    </NoImageBox>
                )}
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
    max-width: 420px;
    width: 95%;
    height: 470px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    position: relative;
`;

const CarouselAll = styled.div`
    max-width: 400px;
    width: 95%;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    word-break: keep-all;
`;

const Slider = styled.div`
    max-width: 500px;
    width: 90%;
    height: 95%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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
    height: 95%;
`;
const NoImageBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 450px;
    border: 2px solid #dedede;
`;

const ArrowButton = styled.button`
    border: none;
    height: 30px;
    cursor: pointer;
`;
const PrevArrow = styled(Image)`
    transform: scaleX(-1);
`;
