import React, { useState } from "react";
import Image from "next/image";
import Background from "../../public/images/background.jpg";
import styled from "styled-components";
import { styled as materialStyled } from '@mui/material/styles';
import { Button, TextField } from "@mui/material";
import * as Api from "../../api";

const Register = ({ open, handleClose, setRegister }) => {
    const [nickname, setNickname] = useState<String>("");
    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    const validateEmail = (email: String) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const isNicknameValid = nickname.length >= 2
    const isEmailValid = validateEmail(email)
    const isPasswordValid = password.length >= 8
    const isFormValid = isNicknameValid && isEmailValid && isPasswordValid

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Api.post("users/register", {
                nickname,
                email,
                password,
            });

            // 회원가입 마침
            setRegister(false)
        } catch (err) {
            console.error("회원가입에 실패하였습니다.", err);
        }
    };

    return (
        <Wrapper>
            <SideImage>
                <Image
                    src={Background}
                    alt="background"
                    width={430}
                    height={600}
                    objectFit="cover"
                />
            </SideImage>
            <SideWrapper>
                <div style={{ textAlign: "right" }}>
                    <CloseButton
                        variant="text"
                        onClick={() => {
                            setRegister(false)
                            handleClose
                        }}
                    >
                        x
                    </CloseButton>
                </div>
                <Title>Create Account</Title>
                <SignUpForm>
                    <TextField
                        type="nickname"
                        style={{
                            width: "380px",
                            height: "40px",
                        }}
                        label="NICKNAME"
                        size="small"
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <TextField
                        type="email"
                        style={{
                            width: "380px",
                            height: "40px",
                        }}
                        label="E-MAIL"
                        size="small"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        style={{
                            width: "380px",
                            height: "40px",
                        }}
                        label="PASSWORD"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={!isPasswordValid && "비밀번호는 8글자 이상입니다."}
                    />
                    <SignUpButton
                        variant="text"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Sign up
                    </SignUpButton>
                </SignUpForm>
                <Or>or</Or>
            </SideWrapper>
        </Wrapper>
    )
} 

export default Register;


const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 950px;
    height: 600px;
    background-color: white;
    border-radius: 20px;
    display: flex;
`;

const SideImage = styled.div`
    border-radius: 20px 0 0 20px;
    overflow: hidden;
`;

const SideWrapper = styled.div`
    width: 520px;
    background-color: white;
    border-radius: 20px;
    padding: 40px;
`;

const Title = styled.div`
    font-size: 1.7rem;
    font-weight: bold;
    width: 100%;
    height: 100px;
    text-align: center;
`;

const SignUpForm = styled.div`
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Or = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 20px auto;
    color: var(--green);
    ::before,
    ::after {
        content: "";
        width: 40%;
        background-color: var(--green);
        height: 0.5px;
        font-size: 0px;
        line-height: 0px;
        margin: auto;
    }
`;

const CloseButton = materialStyled(Button)(
    () => (
        {
            color: 'black',
            '&:hover': {
                backgroundColor: 'white',
            }
        }
        
    ));

const SignUpButton = materialStyled(Button)(
    () => (
        {
            width: '380px',
            height: '40px',
            backgroundColor: 'var(--green)',
            marginTop: '20px',
            borderRadius: '50px',
            color: 'var(--deepgreen)',
            '&:hover': {
                backgroundColor: 'var(--deepgreen)',
                color: 'white',
            }
        }
    ));