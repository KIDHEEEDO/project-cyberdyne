import React, { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../pages/_app";
import styled from "styled-components";
import SingleBoard from "./SingleBoard";
import Write from "./Write";
import { getPost } from "../../api";
import InfiniteScroll from "react-infinite-scroll-component";

const ListComponent = ({ loadMore, board }) => {
    return (
        <InfiniteScroll
            dataLength={board.length} // 반복되는 컴포넌트 갯수
            next={loadMore}
            height={600}
            hasMore={true}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>Nothing more to show</h4>}
        >
            {board.map((i, index) => (
                <div
                    style={{ overflow: "auto", position: "relative" }}
                    key={index}
                >
                    <SingleBoard item={i} />
                </div>
            ))}
        </InfiniteScroll>
    );
};

const MainBoard = ({ firstBoards }) => {
    const [isWrite, setIsWrite] = useState(false); // [Write] 사용 유무
    const [htmlStr, setHtmlStr] = useState(""); // [Write] 내 입력 태크와 내용
    const [title, setTitle] = useState(""); // [Write] 제목
    const [page, setPage] = useState(1); // [infinite] 페이지
    const [board, setBoard] = useState(firstBoards); // [Infinite] 게시글 리스트
    const [isSearch, setIsSearch] = useState(false); // [Search] 특정 검색으로 게시글 필터 유무
    const [inputValue, setInputValue] = useState(""); // [Search] 검색어
    const [show, setShow] = useState([]);
    const userInfo = useContext(UserStateContext); // 전역 user 정보

    const loadMore = async () => {
        const per = 10;
        const res = await getPost(`post/list?page=${page + 1}&perPage=${per}`);

        const newLists = res.data.data.postList;

        if (newLists.length === 0) {
            alert("contents is end");
        } else {
            setPage((cur) => cur + 1);
            const newBoard = [...board, ...newLists];
            setBoard(newBoard);
        }
    };

    useEffect(() => {
        setPage(1);
    }, []);

    return (
        <Wrapper>
            <h1>ECO 마켓 🌍</h1>
            <Contents>
                &quot;멀쩡한데... 중고로 팔아볼까..?&quot;
                <br /> 누군가에겐 정말 필요한 물건이 될 수 있어요! <br />
                다시쓰고 나눠쓰며 지구를 아껴보아요
            </Contents>
            <Container>
                <Menu>
                    {userInfo?.user && (
                        <Button onClick={() => setIsWrite((cur) => !cur)}>
                            {isWrite ? "🏠 메인으로" : "+ 글쓰러 가기 ✏️"}
                        </Button>
                    )}
                </Menu>
                <BoardWrapper id={"hello"}>
                    {isWrite ? (
                        <Write
                            title={title}
                            setTitle={setTitle}
                            htmlStr={htmlStr}
                            setHtmlStr={setHtmlStr}
                            setIsWrite={setIsWrite}
                        />
                    ) : show ? (
                        <ListComponent loadMore={loadMore} board={board} />
                    ) : (
                        <></>
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
    max-width: 400px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    margin: 30px 0;
    background-color: var(--deepgreen);
`;

const BoardWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
