import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { get } from "../../../api";
import { DispatchContext } from "../../../pages/_app";
import Loading from "../../shared/Loading";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";

const NaverLogin = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const dispatch = useContext(DispatchContext);
    const code = router.query?.code;

    const naverLogin = async (code) => {
        try {
            const res = await get(`auth/naver?code=${code}`);
            const user = res.data.data;
            const jwtToken = user.token;
            sessionStorage.setItem("userToken", jwtToken);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });
            setOpen((cur) => !cur);
            await router.push("/");
        } catch (error) {
            toast.error("다시 시도해주세요!");
        }
    };

    useEffect(() => {
        code !== undefined ? naverLogin(code) : "";
    }, [code]);

    return (
        <Wrapper>
            <Loading width={500} height={500} />
            {open && (
                <Alert
                    onClose={() => {
                        setOpen(false);
                    }}
                >
                    Login 성공!
                </Alert>
            )}
        </Wrapper>
    );
};

export default NaverLogin;

const Wrapper = styled.div`
    height: 100%;
    min-height: 800px;
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
