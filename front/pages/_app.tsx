import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { loginReducer } from "../Providers/reducer";
import React, { useState, useEffect, useReducer, createContext } from "react";
import { RecoilRoot } from "recoil";
import { get } from "../api";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    const [isFetchCompleted, setIsFetchCompleted] = useState(false);
    
    const fetchCurrentUser = async () => {
        try {
            const currentUser = sessionStorage.getItem("userToken");

            if (currentUser) {
                const res = await get("users/current");
                const user = res.data;

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: user,
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
