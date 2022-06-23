import React from "react";
import styled from "styled-components";
import Search from "../shared/Search";
import SingleBoard from "./SingleBoard";
import Write from "./Write";

const MainBoard = () => {
    const isWrite = true;
    return (
        <Wrapper>
            <Container>
                <Title>중고마켓🥕</Title>
                <Menu>
                    <Search />
                    <Button>글쓰러 가기 ✏️</Button>
                </Menu>
                <BoardWrapper>
                    {isWrite ? <Write /> : <SingleBoard />}
                </BoardWrapper>
            </Container>
        </Wrapper>
    );
};

export default MainBoard;

const Wrapper = styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Container = styled.div`
    width: 80%;
    background-color: var(--deepgray);
    height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
`;

const Title = styled.h1`
    margin: 0 0 30px 0;
    padding: 11px 0;
    width: 100%;
    text-align: center;
    background-color: var(--green);
`;

const Menu = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 0 0 30px 0;
`;

const Button = styled.button`
    font-family: Elice Digital Baeum;
    width: 100px;
    margin-left: 5px;
    height: 40px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
`;

const BoardWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
