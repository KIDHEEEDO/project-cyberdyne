import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import PointCoin from "../../public/images/point.coin.png";
import Image from "next/image";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import lottie from "lottie-web";
import animationData from "../../public/trueEffect.json";
import { post } from "../../api";
import { toast } from "react-toastify";

type QuizType = {
    question: string;
    multiples: [];
    answer: string;
    image: boolean;
};

type QuizResultProps = {
    result: boolean;
    quiz: QuizType;
    openClickHandler: MouseEventHandler;
};

const QuizResult = ({ result, quiz, openClickHandler }: QuizResultProps) => {
    const container = useRef();
    const [click, setClick] = useState<boolean>(false);
    const checkDisabled = result && !click ? false : true;

    const pointClickHandler = async () => {
        try {
            const data = await post("points", {
                route: "quiz",
                point: 100,
            });
            toast.success("100 포인트가 적립 되었습니다!");
            setClick(true);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: animationData,
        });
    }, []);

    return (
        <ResultWrapper>
            <ResultForm>
                {result && <ResultEffect ref={container} />}
                <AnswerCheck>
                    {result ? <div>정답입니다!</div> : <div>틀렸습니다!</div>}
                </AnswerCheck>
                <AnswerText>
                    정답은 &quot;
                    {quiz.image ? (
                        <AnswerImageButton src={quiz.answer} alt="image" />
                    ) : (
                        quiz.answer
                    )}
                    &quot; 입니다.
                </AnswerText>
            </ResultForm>
            <ButtonForm>
                <NavButton onClick={openClickHandler}>돌아가기</NavButton>
                <NavButton onClick={pointClickHandler} disabled={checkDisabled}>
                    <Image
                        src={PointCoin}
                        alt="point-coin"
                        width={35}
                        height={35}
                    />
                    {
                        click ? <p>적립 완료</p> : <p>포인트 적립</p>
                    }
                </NavButton>
            </ButtonForm>
        </ResultWrapper>
    );
};

export default QuizResult;

const ResultWrapper = styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const ResultForm = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    margin-bottom: 50px;
`;

const ResultEffect = styled.div`
    height: 500px;
    position: absolute;
    top: -200px;
    left: -200px;
`;

const AnswerCheck = styled.div`
    width: 100%;
    height: 70px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 40px;
`;

const AnswerText = styled.div`
    width: 100%;
    max-height: 100px;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.2rem;
    word-break: break-all;
`;

const AnswerImageButton = styled.img`
    width: 70px;
    height: 70px;
    margin: 6px;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--green);
`;

const ButtonForm = styled.div`
    max-width: 320px;
    width: 90%;
    display: flex;
    justify-content: space-between;
`;

const NavButton = materialStyled(Button)(() => ({
    width: "130px",
    height: "50px",
    borderRadius: "10px",
    backgroundColor: "var(--gray)",
    fontSize: "0.8rem",
    color: "black",
    "&:hover": {
        backgroundColor: "var(--deepgray)",
        color: "white",
    },
}));
