import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../../public/images/logo.png";
import kakao from "../../public/images/kakao.login.png";
import naver from "../../public/images/naver.login.png";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import { DispatchContext } from "../../pages/_app";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/atoms";
import { post } from "../../api";
import { kakaoUrl, naverUrl } from "./socialLogin/SocialLoginUrl";
import Background from "../../public/images/background.jpg";
import { useMediaQuery } from "react-responsive";

function Login({ handleClose }) {
    const dispatch = useContext(DispatchContext);
    const [login, setLogin] = useRecoilState(LoginState);
    const router = useRouter();
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const [register, setRegister] = useState<boolean>(false);

    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const validateEmail = (email: string) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const isNicknameValid = nickname.length >= 2;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 8;
    const isLoginFormValid = isEmailValid && isPasswordValid;
    const isRegisterFormValid =
        isNicknameValid && isEmailValid && isPasswordValid;

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await post("users/login", {
                email,
                password,
            });

            const user = res.data.data;
            const jwtToken = user.token;
            sessionStorage.setItem("userToken", jwtToken);

            setLogin(true);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });

            handleClose();
        } catch (err) {
            console.error("이메일 또는 비밀번호가 유효하지 않습니다.");
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        try {
            await post("users/register", {
                nickname,
                email,
                password,
            });

            // 회원가입 마침
            setRegister(false);
        } catch (err) {
            console.error("회원가입에 실패하였습니다.", err);
        }
    };

    return !register ? (
        <LoginWrapper>
            <div style={{ textAlign: "right" }}>
                <CloseButton variant="text" onClick={handleClose}>
                    x
                </CloseButton>
            </div>
            <LogoImage>
                <Image src={Logo} alt="logo" width={40} height={40} />
            </LogoImage>
            <SignInForm>
                <TextForm
                    type="email"
                    label="E-MAIL"
                    size="small"
                    onChange={(e) => setEmail(e.target.value)}
                    helperText={
                        !isEmailValid && "이메일 형식이 올바르지 않습니다."
                    }
                />
                <TextForm
                    type="password"
                    label="PASSWORD"
                    size="small"
                    onChange={(e) => setPassword(e.target.value)}
                    helperText={
                        !isPasswordValid && "비밀번호는 8글자 이상입니다."
                    }
                />
                <SignButton
                    type="submit"
                    onClick={handleLoginSubmit}
                    disabled={!isLoginFormValid}
                >
                    Sign in
                </SignButton>
            </SignInForm>
            <Or>or</Or>
            <FindWrapper>
                <LoginSubWrapper>
                    <Button
                        variant="text"
                        onClick={() => {
                            setRegister(true);
                        }}
                    >
                        회원가입
                    </Button>
                </LoginSubWrapper>
                <SocialLoginWrapper>
                    <Button
                        variant="text"
                        className=""
                        onClick={() => {
                            router.push(kakaoUrl());
                        }}
                        style={{ borderRadius: "12px" }}
                    >
                        <Image
                            alt="kakao_Login"
                            src={kakao}
                            width={145}
                            height={40}
                        />
                    </Button>
                    <Button
                        variant="text"
                        className=""
                        onClick={() => {
                            router.push(naverUrl());
                        }}
                        style={{ borderRadius: "12px", width: "200px" }}
                    >
                        <Image
                            alt="naver_Login"
                            src={naver}
                            width={145}
                            height={40}
                        />
                    </Button>
                </SocialLoginWrapper>
            </FindWrapper>
        </LoginWrapper>
    ) : (
        <RegisterWrapper>
            {!isMobile && (
                <SideImage>
                    <Image
                        src={Background}
                        alt="background"
                        width={430}
                        height={600}
                        objectFit="cover"
                    />
                </SideImage>
            )}
            <SideWrapper>
                <div style={{ textAlign: "right" }}>
                    <CloseButton
                        variant="text"
                        onClick={() => {
                            setRegister(false);
                            handleClose();
                        }}
                    >
                        x
                    </CloseButton>
                </div>
                <Title>Create Account</Title>
                <SignUpForm>
                    <TextForm
                        type="nickname"
                        label="NICKNAME"
                        size="small"
                        onChange={(e) => setNickname(e.target.value)}
                        helperText={
                            !isNicknameValid && "닉네임은 두 글자 이상입니다."
                        }
                    />
                    <TextForm
                        type="email"
                        label="E-MAIL"
                        size="small"
                        onChange={(e) => setEmail(e.target.value)}
                        helperText={
                            !isEmailValid && "이메일 형식이 올바르지 않습니다."
                        }
                    />
                    <TextForm
                        type="password"
                        label="PASSWORD"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={
                            !isPasswordValid && "비밀번호는 8글자 이상입니다."
                        }
                    />
                    <SignButton
                        variant="text"
                        type="submit"
                        onClick={handleRegisterSubmit}
                        disabled={!isRegisterFormValid}
                    >
                        Sign up
                    </SignButton>
                </SignUpForm>
            </SideWrapper>
        </RegisterWrapper>
    );
}

export default Login;

const LoginWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 520px;
    width: 90%;
    height: 600px;
    background-color: white;
    border-radius: 20px;
    padding: 40px;
`;

const SignInForm = styled.div`
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const LogoImage = styled.div`
    width: 100%;
    height: 80px;
    text-align: center;
`;

const FindWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin: 10px auto;
    color: var(--green);
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

const LoginSubWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SocialLoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const KakaoButton = styled.button`
    border-radius: 12px;
`;

const RegisterWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 950px;
    height: 600px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    @media screen and (max-width: 1224px) {
        max-width: 520px;
        width: 90%;
    } ;
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
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const TextForm = materialStyled(TextField)(() => ({
    width: "90%",
    height: "40px",
}));

const CloseButton = materialStyled(Button)(() => ({
    color: "black",
    "&:hover": {
        backgroundColor: "white",
    },
}));

const SignButton = materialStyled(Button)(() => ({
    width: "90%",
    height: "40px",
    backgroundColor: "var(--green)",
    marginTop: "20px",
    borderRadius: "50px",
    color: "var(--deepgreen)",
    "&:hover": {
        backgroundColor: "var(--deepgreen)",
        color: "white",
    },
}));
