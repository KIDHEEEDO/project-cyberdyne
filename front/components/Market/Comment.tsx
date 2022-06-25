import React, { useContext } from "react";
import { UserStateContext } from "../../pages/_app";
import { get } from "../../api";

import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import { Box, TextField, Typography } from "@mui/material";

// postId 도 받아 와야함
const Comment = ({ expand }) => {
    const userInfo = useContext(UserStateContext);
    const profileImg = userInfo?.user?.picture ?? "";
    const nickname = userInfo?.user?.nickname ?? "로그인이 필요해요.";

    const getCommentList = async () => {
        const id = "58"; // 원래 postId 가 필요하다
        const res = await get(`comment/${id}`);
    };

    if (expanded) {
        getCommentList();
    } // expanded가 true 일 경우에만 불러오고 싶다! (댓글을 펼쳤을 때)

    return (
        <div>
            {/* 댓글 작성  */}
            <Box
                sx={{
                    width: 500,
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                }}
            >
                <Typography paragraph>👤 {nickname} :</Typography>
                <TextField
                    style={{ width: "100%" }}
                    multiline
                    rows={3}
                    placeholder="내용을 입력해주세요."
                    defaultValue="내용을 입력해주세요."
                />
                <ButtonWrapper>
                    <Button name="cancle">취소</Button>
                    <Button name="upload">완료</Button>
                </ButtonWrapper>
            </Box>
            {/* 댓글 목록 */}
            <Box>
                <Typography paragraph>🌳:</Typography>
                <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                </Typography>
            </Box>
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
}));
