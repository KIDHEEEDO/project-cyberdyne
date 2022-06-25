import React, { useState, useEffect } from "react";
import QuizResult from "./QuizResult";
import Image from "next/image";
import QuestionMark from "../../public/images/question_mark.png";
import CheckMark from "../../public/images/check.png";
import CheckColorMark from "../../public/images/check2.png";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { get, getQuary } from "../../api";

type QuizType = {
    question: string;
    multiples: [];
    answer: string;
    image: boolean;
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
    const [userPoint, setUserPoint] = useState<number>(0);
    const openClickHandler = (): void => setOpen(!open);

    const answerClickHandler = (userAnswer: string): void => {
        setAnswer(!answer);
        setUserAnswer(userAnswer);
    };

    const setChallengeButton = (): any => {
        const result = [];
        if (userPoint >= CHALLENGENUM) {
            setUserPoint(CHALLENGENUM);
        }
        for (var i = 0; i < userPoint; i++) {
            result.push(
                <div>
                    <Image
                        src={CheckMark}
                        alt="check-mark"
                        width={100}
                        height={100}
                    />
                    <ChallengeText>완료</ChallengeText>
                </div>
            );
        }
        for (var i = 0; i < CHALLENGENUM - userPoint; i++) {
            result.push(
                <div>
                    <ChallengeImage
                        src={CheckColorMark}
                        alt="check-color-mark"
                        width={100}
                        height={100}
                        onClick={openClickHandler}
                    />
                    <ChallengeText>도전하기!</ChallengeText>
                </div>
            );
        }
        return result;
    };

    const getQuizData = async () => {
        try {
            await get("quizs").then((res) => {
                setQuiz(res.data.data);
            });
        } catch (err) {
            console.log("error message: ", err);
        }
    };

    const checkPoint = async () => {
        try {
            await getQuary("points", {
                params: {
                    route: "quiz",
                },
            }).then((res: any) => {
                setUserPoint(res.data.data);
            });
        } catch (err) {
            console.log("error message: ", err);
        }

        // 포인트 리스트 조회
        // try {
        //     await get("points/list").then((res : any) => {
        //         console.log("points/list: ", res.data)
        //     })
        // } catch (err) {
        //     console.log("errer message: ", err);
        // }
    };

    useEffect(() => {
        getQuizData();
        checkPoint();
    }, []);

    return (
        <Wrapper>
            <h1>퀴즈 풀고 포인트 받자!</h1>
            <Contents>{"매일 매일 색다른 오늘의 퀴즈에 도전하세요."}</Contents>
            <Form>
                <Title>오늘의 퀴즈</Title>
                <Container>
                    {open ? (
                        answer ? (
                            <QuizResult
                                result={quiz.answer === userAnswer}
                                quiz={quiz}
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
                            {setChallengeButton()}
                        </ChallengeButtonWrapper>
                    )}
                </Container>
            </Form>
        </Wrapper>
    );
};

export default Quiz;

const Wrapper = styled.div`
    width: 100%;
    height: 790px;
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 40px;
`;

const Contents = styled.p`
    white-space: pre-wrap;
    text-align: center;
`;

const Form = styled.div`
    width: 600px;
    height: 470px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
`;

const Title = styled.h2`
    width: 100%;
    height: 70px;
    margin: 0;
    padding-top: 15px;
    background-color: var(--green);
    text-align: center;
    border-radius: 20px 20px 0 0;
`;

const Container = styled.div`
    width: 100%;
    height: 450px;
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
    width: 100px;
    height: 100px;
    margin: 6px;
    padding: 14px;
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
`;

const ChallengeImage = styled(Image)`
    cursor: pointer;
`;

const ChallengeText = styled.p`
    width: 100px;
    text-align: center;
`;

const AnswerButton = materialStyled(Button)(() => ({
    width: "500px",
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
