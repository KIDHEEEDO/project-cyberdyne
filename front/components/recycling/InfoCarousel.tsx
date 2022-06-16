import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import nextArrow from "../../public/next.arrow.png";
import pointCoin from "../../public/point.coin.png";
import infoData from "./infoData.json";
import carouselStyles from "../../styles/Carousel.module.css";

const subjects = infoData.map((info) => info.subject);

const InfoCarousel = () => {
    const [slideIndex, setSlideIndex] = useState<number>(1);
    const router = useRouter(); // 페이지 이동을 위해 useRouter 적용

    const nextSlide = () => {
        if (slideIndex !== infoData.length) {
            setSlideIndex(slideIndex + 1);
        } else if (slideIndex === infoData.length) {
            return;
        }
    };

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1);
        } else if (slideIndex === 1) {
            return;
        }
    };

    const rendPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        router.push(`/${(e.target as HTMLButtonElement).name}`);
    };

    const getPoint = () => {
        // get 기존 포인트 -> put 추가한 포인트
    };

    return (
        <div className={carouselStyles.wrapper}>
            <div className={carouselStyles.mainTitle}>
                <h1>&apos;{infoData[0].type}&apos;</h1>
                <h2> (으)로 분리수거 해주세요!</h2>
            </div>
            <p>
                &apos;{infoData[0].type}&apos;는{" "}
                {subjects.map((sub) => sub + " / ")}가 포함됩니다.
            </p>
            <div className={carouselStyles.carouselWrapper}>
                <button
                    className={carouselStyles.arrowButton}
                    type="button"
                    onClick={prevSlide}
                >
                    <Image
                        className={carouselStyles.prevArrow}
                        src={nextArrow}
                        alt="prev arrow"
                        width={35}
                        height={35}
                    />
                </button>
                <div className={carouselStyles.carouselAll}>
                    {infoData.map((info, idx) => {
                        return (
                            <div
                                key={`page-${idx}`}
                                className={
                                    slideIndex === idx + 1
                                        ? carouselStyles.activeAnim
                                        : carouselStyles.slide
                                }
                            >
                                <div className={carouselStyles.infoBox}>
                                    <h3>{info.subject}</h3>
                                    <div>{info.img}</div>
                                    <div>{info.method}</div>
                                    <div>{info.kind}</div>
                                    <div>{info.notKind}</div>
                                    <div>{info.tip}</div>
                                </div>
                                <div>
                                    <span>
                                        {idx + 1} / {infoData.length}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    className={carouselStyles.arrowButton}
                    type="button"
                    onClick={nextSlide}
                >
                    <Image
                        src={nextArrow}
                        alt="next arrow"
                        width={35}
                        height={35}
                    />
                </button>
            </div>
            <div className={carouselStyles.buttonWrapper}>
                <button
                    className={carouselStyles.button}
                    type="button"
                    name="waste"
                    onClick={rendPage}
                >
                    대형폐기물 신고하기
                </button>
                <button
                    className={carouselStyles.button}
                    type="button"
                    name="market"
                    onClick={rendPage}
                >
                    중고마켓으로 가기
                </button>
                <button
                    className={carouselStyles.pointButton}
                    type="button"
                    onClick={getPoint}
                >
                    <Image
                        src={pointCoin}
                        alt="point coin"
                        width={35}
                        height={35}
                    />
                    <p>포인트 적립하기</p>
                </button>
            </div>
        </div>
    );
};

export default InfoCarousel;
