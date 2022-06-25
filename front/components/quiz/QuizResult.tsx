import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PointCoin from "../../public/images/point.coin.png";
import Image from "next/image";
import styled from "styled-components";
import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import lottie from "lottie-web";
import animationData from "../../public/trueEffect.json";
import { post } from "../../api";

type QuizType = {
    question: string;
    multiples : [];
    answer: string;
    image: boolean;
}

type QuizResultProps = {
    result: boolean;
    quiz: QuizType;
}

const QuizResult = ({ result, quiz } : QuizResultProps) => {
    const container = useRef();
    const router = useRouter();

    const pointClickHandler = async () => {
        try {
            await post("points", {
                route: "quiz",
                point: 100
            }).then(() => {
                console.log("포인트 적립")
            })
        } catch (err) {
            console.log("errer message: ", err);
        }
    }

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current, 
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: animationData
        });
    }, [])

    return (
        <ResultWrapper>
            <ResultForm>
                { result && <ResultEffect ref={container} /> }
                <AnswerCheck>
                    {
                        result ? "정답입니다!" : "틀렸습니다!"
                    }
                </AnswerCheck>
                <AnswerText>정답은 "{
                    quiz.image ? (
                        <AnswerImageButton 
                            src={quiz.answer}
                            alt="image"/>
                    ) : (
                        quiz.answer
                    )
                }" 입니다.
                </AnswerText>
            </ResultForm>   
            <div>
                <NavButton onClick={() => router.push('/')}>홈으로</NavButton>
                <NavButton onClick={pointClickHandler} disabled={!result}>
                    <Image
                        src={PointCoin}
                        alt="point-coin"
                        width={35}
                        height={35}
                    />
                    <p>포인트 적립</p>
                </NavButton>
            </div>
        </ResultWrapper>
    )
}

export default QuizResult;


const ResultWrapper = styled.div`
    width: 80%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const ResultForm = styled.div`
    width: 100%;
    height: 100%;
`;

const ResultEffect = styled.div`
    position: absolute;
    top: -10px;
    left: -5px;
`;

const AnswerCheck = styled.div`
    width: 100%;
    height: 70px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
`;

const AnswerText = styled.div`
    width: 100%;
    height: 100px;
    text-align: center;
    font-size: 1.2rem;
    word-break: break-all;
`;

const AnswerImageButton = styled.img`
    width: 100px;
    height: 100px;
    margin: 6px;
    padding: 14px;
    border-radius: 10px;
    background-color: var(--green);
`;

const NavButton = materialStyled(Button)(
    () => (
        {
            width: '150px',
            height: '50px',
            borderRadius: '10px',
            margin: '0 20px',
            backgroundColor: 'var(--gray)',
            color: 'black',
            '&:hover': {
                backgroundColor: 'var(--deepgray)',
                color: 'white',
            }
        }
    ));