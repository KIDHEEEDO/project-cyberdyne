import React, { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../pages/_app";
import { get, post, deleteComment } from "../../api";
import { DispatchContext } from "../../pages/_app";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import { Box, TextField, Typography } from "@mui/material";

const DeleteButton = ({ commentId }) => {
    const deleteCmt = async () => {
        const res = await deleteComment(`comment/${commentId}`);
    };
    return (
        <Button name="delete" onClick={deleteCmt}>
            삭제
        </Button>
    );
};
// postId 도 받아 와야함
const Comment = ({ expand, postId, setExpanded }) => {
    const dispatch = useContext(DispatchContext);
    const userInfo = useContext(UserStateContext);
    const nickname = userInfo?.user?.nickname ?? "로그인이 필요해요.";
    const [comment, setComment] = useState("");
    const [current, setCurrent] = useState(true); // has token ?
    const [commentList, setCommentList] = useState([]);

    const getCommentList = async () => {
        const res = await get(`comment/${postId}`);
        const newList = res.data.data;
        setCommentList(newList);
    };

    const sendComment = async () => {
        if (comment === "") {
            // 입력한 내용이 없을 경우, 넘어가지 못함
            return;
        } else {
            // 서버로 검색어 넘긴다
            const res = await post("comment", {
                postId: postId,
                content: comment,
            });
            setComment("");
        }
    };
    useEffect(() => {
        getCommentList();
    }, [sendComment]);

    useEffect(() => {
        if (expand && userInfo?.user) {
            getCommentList();
        }
    }, [expand]);

    return (
        <div style={{ borderRadius: "15px" }}>
            {/* 댓글 작성  */}
            {userInfo?.user ? (
                <>
                    <Box
                        sx={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "15px",
                        }}
                    >
                        <Typography paragraph>👤 {nickname} :</Typography>
                        <TextField
                            style={{ width: "100%" }}
                            multiline
                            rows={3}
                            placeholder="내용을 입력해주세요."
                            value={comment}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setComment(e.target.value)}
                        />
                        <ButtonWrapper>
                            <Button
                                name="cancle"
                                onClick={() => setExpanded(false)}
                            >
                                취소
                            </Button>
                            <Button name="upload" onClick={sendComment}>
                                완료
                            </Button>
                        </ButtonWrapper>
                    </Box>
                    <CommentWrapper>
                        {commentList?.map((item, index) => (
                            <div key={`comment-${index}`}>
                                <CommentWriter paragraph>
                                    🌳 : {item.nickname}
                                </CommentWriter>
                                <CommentBody>{item.content}</CommentBody>
                                {item.userId === userInfo.user.userId && (
                                    <DeleteWrapper>
                                        <DeleteButton
                                            commentId={item.commentId}
                                        />
                                    </DeleteWrapper>
                                )}
                            </div>
                        ))}
                    </CommentWrapper>
                </>
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
        </div>
    );
};

export default Comment;

const Button = styled.button<{ name: string }>`
    font-family: Elice Digital Baeum;
    border: none;
    cursor: pointer;
    background-color: ${(props) =>
        props.name === "upload" ? "#f2f2f2" : "red"};
    color: ${(props) => (props.name === "upload" ? "black" : "white")};
    width: 100px;
    height: 25px;
    border-radius: 15px;
    margin: 0 5px;
`;

const ButtonWrapper = materialStyled(Box)(() => ({
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
    overflow: "auto",
}));

const CommentWriter = materialStyled(Typography)(() => ({
    marginBottom: "8px",
    fontFamily: "Elice Digital Baeum",
    fontSize: "14px",
}));

const CommentBody = materialStyled(Typography)(() => ({
    fontFamily: "Elice Digital Baeum",
    fontSize: "14px",
    padding: "5px 5px",
    border: "1px solid rgba(0, 0, 0, 0.6)",
    overflow: "auto",
}));

const CommentWrapper = materialStyled(Box)(() => ({
    margin: "5px 5px",
}));

const DeleteWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5px;
`;
