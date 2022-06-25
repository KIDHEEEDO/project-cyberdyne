import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/logo.png";
import navStyles from "../styles/Nav.module.css";
import LoginOrRegisterModal from "./modal/LoginOrRegisterModal";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { LoginState } from "../states/atoms";
import styled from "styled-components";
import { UserStateContext } from "../pages/_app";

const Nav = () => {
    const userInfo = useContext(UserStateContext);
    const [login, setLogin] = useRecoilState(LoginState);
    const [open, setOpen] = useState<Boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();

    useEffect(() => {
        if (userInfo.user === null) {
            setLogin(false);
        } else {
            setLogin(true);
        }
    }, [userInfo.user]);

    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href="/" passHref>
                        <a className={navStyles.titleWrapper}>
                            <Image
                                src={Logo}
                                alt="logo"
                                width={30}
                                height={30}
                            />
                        </a>
                    </Link>
                </li>
            </ul>
            <ul className={navStyles.navList}>
                <li>
                    <Link href="/recycling/aiSearcher" passHref>
                        <a>분리배출 하러가기</a>
                    </Link>
                </li>
                <li>
                    <Link href="/waste" passHref>
                        <a>우리동네 대형폐기물 신고하기</a>
                    </Link>
                </li>
                <li>
                    <Link href="/market" passHref>
                        <a>중고마켓</a>
                    </Link>
                </li>
                <li>
                    <Link href="/quiz" passHref>
                        <a>퀴즈 풀러가기</a>
                    </Link>
                </li>
                {login && (
                    <li>
                        <Link href="/myPage" passHref>
                            <a>마이페이지</a>
                        </Link>
                    </li>
                )}
                <li>
                    {login ? (
                        <LoginButton
                            onClick={() => {
                                setLogin(false);
                                sessionStorage.removeItem("userToken");
                                router.push("/");
                            }}
                        >
                            Sign out
                        </LoginButton>
                    ) : (
                        <LoginButton onClick={handleOpen}>Sign in</LoginButton>
                    )}
                    <LoginOrRegisterModal
                        open={open}
                        handleClose={handleClose}
                    />
                </li>
            </ul>
        </nav>
    );
};

export default Nav;

const LoginButton = styled.div`
    cursor: pointer;
`;
