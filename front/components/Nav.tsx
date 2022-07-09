import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/logo.png";
import LoginOrRegisterModal from "./modal/LoginOrRegisterModal";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { LoginState } from "../states/atoms";
import styled from "styled-components";
import { UserStateContext } from "../pages/_app";
import MenuIcon from "../public/images/menu.png";
import { useMediaQuery } from "react-responsive";
import { DispatchContext } from "../pages/_app";

const Nav = () => {
    const dispatch = useContext(DispatchContext);
    const router = useRouter();
    const userInfo = useContext(UserStateContext);
    const [login, setLogin] = useRecoilState(LoginState);
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    const clickHandler = (value: boolean) => {
        setToggle(value);
    };

    useEffect(() => {
        if (userInfo.user === null) {
            setLogin(false);
        } else {
            setLogin(true);
        }
    }, [userInfo.user]);

    return (
        <Wrapper>
            <NavIcon>
                <Link href="/">
                    <TitleWrapper>
                        <Image src={Logo} alt="logo" width={30} height={30} />
                    </TitleWrapper>
                </Link>
            </NavIcon>
            <NavList isMobile={isMobile} toggle={toggle}>
                <NavListItem>
                    <Link href="/recycling">
                        <a onClick={() => clickHandler(false)}>
                            분리배출 하러가기
                        </a>
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link href="/waste">
                        <a onClick={() => clickHandler(false)}>
                            우리동네 대형폐기물 신고하기
                        </a>
                    </Link>
                </NavListItem>
                <NavListItem>
                    <Link href="/market">
                        <a onClick={() => clickHandler(false)}>중고마켓</a>
                    </Link>
                </NavListItem>
                {login && (
                    <NavListItem>
                        <Link href="/quiz">
                            <a onClick={() => clickHandler(false)}>
                                퀴즈 풀러가기
                            </a>
                        </Link>
                    </NavListItem>
                )}
                {login && (
                    <NavListItem>
                        <Link href="/myPage">
                            <a onClick={() => clickHandler(false)}>
                                마이페이지
                            </a>
                        </Link>
                    </NavListItem>
                )}
                <NavListItem>
                    {login ? (
                        <LoginButton
                            onClick={() => {
                                setLogin(false);
                                sessionStorage.removeItem("userToken");
                                dispatch({
                                    type: "LOGOUT",
                                });
                                router.push("/");
                            }}
                        >
                            Sign out
                        </LoginButton>
                    ) : (
                        <LoginButton
                            onClick={() => {
                                handleOpen();
                                clickHandler(false);
                            }}
                        >
                            Sign in
                        </LoginButton>
                    )}
                    <LoginOrRegisterModal
                        open={open}
                        handleClose={handleClose}
                    />
                </NavListItem>
            </NavList>

            <Menu onClick={() => clickHandler(!toggle)}>
                <Image src={MenuIcon} alt="menu" width={20} height={20} />
            </Menu>
        </Wrapper>
    );
};

export default Nav;

const Wrapper = styled.div`
    width: 100%;
    padding: 0 3rem;
    height: var(--nav-height);
    position: absolute;
    z-index: 5;
    display: grid;
    grid-template-columns: 1fr 3fr;
    background-color: rgba(255, 255, 255, 0.83);
    @media screen and (max-width: 1224px) {
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.93);
    } ;
`;

const NavIcon = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    @media screen and (max-width: 1224px) {
        width: 100%;
        height: 60px;
        justify-content: center;
    } ;
`;

const NavList = styled.div<any>`
    display: flex;
    font-size: 14px !important;
    justify-content: flex-end;
    align-items: center;
    ${(props) =>
        props.isMobile &&
        (props.toggle
            ? `
            width: 100%;
            flex-direction: column;
        `
            : `
            display: none;
        `)}
`;

const NavListItem = styled.li`
    margin: 0 1rem;
    display: flex;
    @media screen and (max-width: 1224px) {
        display: flex;
        height: 60px;
        width: 100%;
        justify-content: center;
        align-items: center;
    } ;
`;

const TitleWrapper = styled.a`
    display: flex;
    align-items: center;
`;

const LoginButton = styled.div`
    cursor: pointer;
`;

const Menu = styled.div`
    display: none;
    @media screen and (max-width: 1224px) {
        display: block;
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    } ;
`;
