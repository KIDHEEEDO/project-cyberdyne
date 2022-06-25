import React from "react";
import MainBoard from "../components/Market/MainBoard";
import { getPost } from "../api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const start = 1;
    const per = 10;
    const res = await getPost(`post/list?page=${start}&perPage=${per}`);
    const firstBoards = res.data.data.postList || null;

    return {
        props: { firstBoards },
    };
};

const market = ({
    firstBoards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <MainBoard firstBoards={firstBoards} />
        </div>
    );
};

export default market;
