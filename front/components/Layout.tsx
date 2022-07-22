import React from "react";
import Nav from "./Nav";
import { useRouter } from "next/router";
import Footer from "./Footer";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import { ToastContainer } from "react-toastify";
import { styled as materialStyled } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

type AppLayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
    const router = useRouter();
    const path = router.pathname.slice(1);

    return (
        <div>
            <title>구해줘!, 지구</title>
            <Nav />
            <BodyWrapper id="scrollableDiv">
                <ToastContainer autoClose={3000} />
                {children}
                <FaButton
                    variant="extended"
                    size="large"
                    onClick={() => window.scrollTo(0, 0)}
                >
                    👆
                </FaButton>
            </BodyWrapper>
            {path !== "market" ? <Footer /> : ""}
        </div>
    );
};

export default Layout;

const BodyWrapper = styled.div`
    min-height: 100vh;
`;

const FaButton = materialStyled(Fab)(() => ({
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed",
    backgroundColor: "#E2D784",
    fontFamily: "Elice Digital Baeum",
    "&:hover": {
        backgroundColor: "#fff",
        color: "#305e63",
    },
}));
