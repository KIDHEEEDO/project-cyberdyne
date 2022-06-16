import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Head from "next/Head";

type AppLayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
    return (
        <div>
            <Head>
                <title>구해줘!, 지구</title>
                <meta name="Safe the Earth"></meta>
                <meta content="Safe the Earth"></meta>
            </Head>
            <Nav />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
