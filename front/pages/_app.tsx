import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import * as Api from "../api";
import { loginReducer } from "./reducer";
import React, { useState, useEffect, useReducer, createContext } from "react";
import wrapper from "../Providers/createCtx";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
            const res = await Api.get("users/current");
            const currentUser = res.data;

            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: currentUser,
            });

            console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
        } catch {
            console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
        }
        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    };

    // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    if (!isFetchCompleted) {
        return "loading...";
    }

    return (
        <>
            <DispatchContext.Provider value={dispatch}>
                <UserStateContext.Provider value={userState}>
                    <GlobalStyle />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </UserStateContext.Provider>
            </DispatchContext.Provider>
        </>
    );
}

export default MyApp;
