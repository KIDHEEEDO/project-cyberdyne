import React, { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../pages/_app";
import styled from "styled-components";
import SingleBoard from "./SingleBoard";
import Write from "./Write";
import { getPost } from "../../api";
import InfiniteScroll from "react-infinite-scroll-component";

const ListComponent = ({ loadMore, board, hasMore }) => {
    return (
        <InfiniteScroll
            dataLength={board.length} // 반복되는 컴포넌트 갯수
            next={loadMore}
            height="65vh"
            hasMore={hasMore}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>콘텐츠가 더 이상 없습니다.</h4>}
            scrollableTarget="scrollableDiv"
        >
            {board.map((i, index) => (
                <div
                    style={{
                        overflow: "inherit",
                        position: "relative",
                    }}
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
    const [show, setShow] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const userInfo = useContext(UserStateContext); // 전역 user 정보

    const loadMore = async () => {
        const per = 10;
        const res = await getPost(`post/list?page=${page + 1}&perPage=${per}`);

        const newLists = res.data.data.postList;

        if (newLists.length === 0) {
            setHasMore((cur) => !cur);
            return;
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
            <h1 style={{ height: "3vh" }}>ECO 마켓 🌍</h1>
            <Container>
                <Menu>
                    {userInfo?.user ? (
                        <Button onClick={() => setIsWrite((cur) => !cur)}>
                            {isWrite ? "🏠 메인으로" : "+ 글쓰러 가기 ✏️"}
                        </Button>
                    ) : (
                        <p>⚠️글 작성은 로그인 후 이용가능합니다</p>
                    )}
                </Menu>
                <BoardWrapper id="scrollableDiv">
                    {isWrite ? (
                        <Write
                            title={title}
                            setTitle={setTitle}
                            htmlStr={htmlStr}
                            setHtmlStr={setHtmlStr}
                            setIsWrite={setIsWrite}
                        />
                    ) : show ? (
                        <ListComponent
                            loadMore={loadMore}
                            board={board}
                            hasMore={hasMore}
                        />
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
    height: 100vh;
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 120px;
`;

const Contents = styled.p`
    white-space: pre-wrap;
    text-align: center;
    margin: 16px 0;
`;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 30px 0 10px 0;
    height: 3vh;
`;

const Button = styled.button`
    font-family: Elice Digital Baeum;
    font-weight: bold;
    font-size: 16px;
    color: white;
    width: 80vw;
    height: 5vh;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    margin: 20px 0;
    padding: 5px 0;
    background-color: var(--deepgreen);
`;

const BoardWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
