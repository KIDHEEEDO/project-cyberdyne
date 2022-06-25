import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "../shared/Search";
import SingleBoard from "./SingleBoard";
import Write from "./Write";
import { get } from "../../api";

const MainBoard = ({ firstBoards }) => {
    const [isWrite, setIsWrite] = useState(false);
    const [htmlStr, setHtmlStr] = useState("");
    const [title, setTitle] = useState("");
    const [board, setBoard] = useState(firstBoards);
    console.log(board);

    // const getBoardsList = async () => {
    //     const page = 1;
    //     const zz = 10;
    //     const res = await get(`post/list?page=${page}&perPage=${zz}`);
    //     const boardsList = [...res.data.data.postLists];
    //     setBoard(boardsList);
    // };
    // useEffect(() => {
    //     getBoardsList();
    // }, []);

    return (
        <Wrapper>
            <h1>중고마켓 🥕</h1>
            <Contents>
                &quot;멀쩡한데... 중고로 팔아볼까&quot;
                <br /> 누군가에겐 정말 필요한 물건이 될 수 있어요! <br />
                다시쓰고 나눠쓰며 지구를 아껴보아요
            </Contents>
            <Container>
                <Menu>
                    <Search />
                    <Button onClick={() => setIsWrite((cur) => !cur)}>
                        {isWrite ? "🏠 메인으로" : "+ 글쓰러 가기 ✏️"}
                    </Button>
                </Menu>
                <BoardWrapper>
                    {isWrite ? (
                        <Write
                            title={title}
                            setTitle={setTitle}
                            htmlStr={htmlStr}
                            setHtmlStr={setHtmlStr}
                            setIsWrite={setIsWrite}
                        />
                    ) : (
                        board?.map((item, index) => (
                            <SingleBoard key={index} item={item} />
                        ))
                    )}
                </BoardWrapper>
            </Container>
        </Wrapper>
    );
};

export default MainBoard;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 60px;
`;
// width: 100%;
// height: 790px;
// background-color: var(--gray);
// display: flex;
// flex-direction: column;
// justify-content: space-evenly;
// align-items: center;
// padding-top: 40px;
const Contents = styled.p`
    white-space: pre-wrap;
    text-align: center;
    margin: 16px 0;
`;

const Container = styled.div`
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    width: 100%;
    text-align: center;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 30px 0 10px 0;
`;

const Button = styled.button`
    font-family: Elice Digital Baeum;
    font-weight: bold;
    font-size: 16px;
    color: white;
    width: 600px;
    height: 40px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    margin: 30px 0;
    background-color: var(--deepgreen);
`;

const BoardWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
