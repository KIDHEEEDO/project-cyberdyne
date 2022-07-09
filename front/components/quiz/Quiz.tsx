import React, { useState, useEffect } from "react";
import QuizResult from "./QuizResult";
import Image, { StaticImageData } from "next/image";
import QuestionMark from "../../public/images/question_mark.png";
import CheckMark from "../../public/images/check.png";
import CheckColorMark from "../../public/images/check2.png";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { get, getQuary } from "../../api";
import { useMediaQuery } from "react-responsive";

type QuizType = {
    question: string;
    multiples: [];
    answer: string;
    image: boolean;
};

type ChallengeType = {
    src: StaticImageData;
    alt: string;
    onClick: any;
    text: string;
};

const CHALLENGENUM: number = 3;

const Quiz = () => {
    const [quiz, setQuiz] = useState<QuizType>({
        question: "",
        multiples: [],
        answer: "",
        image: false,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [answer, setAnswer] = useState<boolean>(false);
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [challenge, setChallenge] = useState<ChallengeType[]>();
    const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

    const openClickHandler = (): void => {
        setAnswer(false);
        setOpen(!open);
    };

    const answerClickHandler = (userAnswer: string): void => {
        setAnswer(true);
        setUserAnswer(userAnswer);
    };

    // 포인트 변수 빼서, 포인트가 바뀌면 퀴즈 데이터 받아오는걸로 수정하기
    const getQuizData = async () => {
        try {
            const res = await get("quizs");
            setQuiz(res.data.data);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    const setChallengeResult = async () => {
        try {
            const res = await getQuary("points", {
                params: {
                    route: "quiz",
                },
            });

            const result = [];
            let userPoint = res.data.data;

            if (userPoint >= CHALLENGENUM) {
                userPoint = CHALLENGENUM;
            }

            for (var i = 0; i < userPoint; i++) {
                result.push({
                    src: CheckMark,
                    alt: "check-mark",
                    onClick: null,
                    text: "완료!",
                });
            }
            for (var i = 0; i < CHALLENGENUM - userPoint; i++) {
                result.push({
                    src: CheckColorMark,
                    alt: "check-color-mark",
                    onClick: openClickHandler,
                    text: "도전하기!",
                });
            }

            setChallenge(result);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    useEffect(() => {
        getQuizData();
        setChallengeResult();
    }, [open]);

    return (
        <Wrapper>
            {!isMobile && (
                <div>
                    <h1>퀴즈 풀고 포인트 받자!</h1>
                    <Contents>
                        {"매일 매일 색다른 오늘의 퀴즈에 도전하세요."}
                    </Contents>
                </div>
            )}
            <Form>
                <Title>오늘의 퀴즈</Title>
                <Container>
                    {open ? (
                        answer ? (
                            <QuizResult
                                result={quiz.answer === userAnswer}
                                quiz={quiz}
                                openClickHandler={openClickHandler}
                            />
                        ) : (
                            <InnerForm>
                                <ImageWrapper>
                                    <Image
                                        src={QuestionMark}
                                        alt="question-mark"
                                        width={40}
                                        height={40}
                                    />
                                </ImageWrapper>
                                <Question>{quiz.question}</Question>
                                <AnswerWrapper>
                                    <Answer>
                                        {quiz.image ? (
                                            <AnswerImageWrapper>
                                                {quiz.multiples.map(
                                                    (value, index) => (
                                                        <AnswerImageButton
                                                            key={`notImg-${index}`}
                                                            src={value}
                                                            alt="image"
                                                            onClick={() =>
                                                                answerClickHandler(
                                                                    value
                                                                )
                                                            }
                                                        />
                                                    )
                                                )}
                                            </AnswerImageWrapper>
                                        ) : (
                                            quiz.multiples.map(
                                                (value, index) => (
                                                    <AnswerButton
                                                        key={`Img-${index}`}
                                                        onClick={() =>
                                                            answerClickHandler(
                                                                value
                                                            )
                                                        }
                                                    >
                                                        {value}
                                                    </AnswerButton>
                                                )
                                            )
                                        )}
                                    </Answer>
                                </AnswerWrapper>
                            </InnerForm>
                        )
                    ) : (
                        <ChallengeButtonWrapper>
                            {challenge?.map((data, index) => (
                                <div key={`challenge-${index}`}>
                                    <Image
                                        key={index}
                                        src={data.src}
                                        alt={data.alt}
                                        width={80}
                                        height={80}
                                        onClick={data.onClick}
                                    />
                                    <ChallengeText>{data.text}</ChallengeText>
                                </div>
                            ))}
                        </ChallengeButtonWrapper>
                    )}
                </Container>
            </Form>
            <Tip>마이페이지에서 포인트를 확인해보세요!</Tip>
        </Wrapper>
    );
};

export default Quiz;

const Wrapper = styled.div`
    width: 100%;
    height: 940px;
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 100px;
    @media screen and (max-width: 600px) {
        height: 700px;
    } ;
`;

const Contents = styled.p`
    white-space: pre-wrap;
    text-align: center;
`;

const Form = styled.div`
    max-width: 600px;
    width: 100%;
    height: 485px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    position: absolute;
    top: 290px;
    @media screen and (max-width: 600px) {
        border-radius: 0px;
        top: 60px;
    } ;
`;

const Tip = styled.p`
    width: 100%;
    position: absolute;
    bottom: 50px;
    white-space: pre-wrap;
    text-align: center;
`;

const Title = styled.h2`
    width: 100%;
    height: 70px;
    margin: 0;
    padding-top: 15px;
    background-color: var(--green);
    text-align: center;
    border-radius: 20px 20px 0 0;
    @media screen and (max-width: 600px) {
        border-radius: 0px;
    } ;
`;

const Container = styled.div`
    width: 100%;
    height: 330px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InnerForm = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const Question = styled.div`
    width: 100%;
    text-align: center;
    margin: 20px 0;
`;

const AnswerWrapper = styled.div`
    width: 100%;
    height: 240px;
`;

const Answer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AnswerImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const AnswerImageButton = styled.img`
    width: 70px;
    height: 70px;
    margin: 6px;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--green);
    cursor: pointer;
`;

const ChallengeButtonWrapper = styled.div`
    width: 80%;
    height: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 60px;
    cursor: pointer;
`;

const ChallengeText = styled.p`
    width: 80px;
    text-align: center;
`;

const AnswerButton = materialStyled(Button)(() => ({
    maxWidth: "500px",
    width: "95%",
    height: "45px",
    backgroundColor: "var(--green)",
    margin: "6px 0",
    padding: "14px",
    borderRadius: "10px",
    color: "black",
    "&:hover": {
        backgroundColor: "var(--deepgreen)",
        color: "white",
    },
}));
