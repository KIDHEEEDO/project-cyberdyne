import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { loginReducer } from "./reducer";
import React, { useState, useEffect, useReducer, createContext } from "react";
import { RecoilRoot } from "recoil";
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
            // const res = await Api.get("users/current");
            // const currentUser = res.data;

            const currentUser = sessionStorage.getItem("userToken");

            if (currentUser) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: currentUser,
                });
                console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
            } else {
                console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
            }
        } catch (err) {
            console.log("error message: ", err);
        }

        setIsFetchCompleted(true);
    };

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
                    <RecoilRoot>
                        <GlobalStyle />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </RecoilRoot>
                </UserStateContext.Provider>
            </DispatchContext.Provider>
        </>
    );
}

export default MyApp;
