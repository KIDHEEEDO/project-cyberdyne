import React, { useState, useEffect } from "react";
import Image from "next/image";
import setting from "../../public/images/setting.png";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import ImageUpload from "../shared/ImageUpload";
import { patch, get } from "../../api";

const UserProfile = ({ user, setUser, userId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const editProfile = async () => {
        if (inputValue === "") {
            // 입력한 내용이 없을 경우, 넘어가지 못함
            return;
        } else {
            // 닉네임 수정
            await patch(`users/${userId}/profile`, {
                nickname: inputValue,
                picture: user?.picture,
            });
            // 업데이트 된 정보를 다시 받아온다
            const res = await get(`users/${userId}/myPage`);
            const userAll = await res.data.data;
            setUser({
                ...user,
                nickname: userAll.nickname,
                email: userAll.email,
                picture: userAll.picture,
            });
            setInputValue("");
            setIsEditing((cur) => !cur);
        }
    };
    return (
        <div>
            {" "}
            <ProfileImg alt="user profile" src={user?.picture} />
            <div>
                <h3>{user?.nickname}</h3>
            </div>
            <div>
                <h5>{user?.email}</h5>
            </div>
            <div>
                <EditButton
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <Image src={setting} alt="setting button" />
                </EditButton>
            </div>
            {isEditing && (
                <Dialog open={isEditing}>
                    <EditTitle>프로필 편집</EditTitle>
                    <ProfileEdit>
                        <ProfileImg alt="user profile" src={user?.picture} />
                        <UploadWrapper>
                            <ImageUpload width={450} height={200} />
                        </UploadWrapper>
                        <InputWrapper>
                            <p>변경 닉네임 : </p>
                            <Nickname
                                id="nickNameInput"
                                type="text"
                                autoComplete="off"
                                placeholder={user?.nickname}
                                value={inputValue}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setInputValue(e.target.value)}
                            />
                        </InputWrapper>
                    </ProfileEdit>
                    <DialogActions>
                        <Button onClick={editProfile}>변경하기</Button>
                        <Button onClick={() => setIsEditing((cur) => !cur)}>
                            취소하기
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default UserProfile;

const ProfileImg = materialStyled(Avatar)(() => ({
    border: "2px dashed #a7c4bc",
    width: "200px",
    height: "200px",
}));

const EditButton = styled.button`
    border: none;
    cursor: pointer;
`;

const ProfileEdit = materialStyled(DialogContent)(() => ({
    width: "auto",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 10px",
}));

const EditTitle = materialStyled(DialogTitle)`
    font-family: Elice Digital Baeum;
`;
const UploadWrapper = styled.div`
    padding: 15px 10px 15px 10px;
`;
const Button = styled.button`
    font-family: Elice Digital Baeum;
    border: none;
    cursor: pointer;
    background-color: #f2f2f2;
    color: black;
    width: 100px;
    height: 25px;
    border-radius: 15px;
`;
const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const Nickname = styled.input`
    width: 70%;
    height: 25px;
    border: 2px dashed #a7c4bc;
    outline: none;
    border-radius: 15px;
    text-align: center;
`;
