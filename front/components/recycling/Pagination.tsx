import React from "react";
import styled from "styled-components";

const Pagination = ({ totalPages, setTargetPage }) => {
    // Actually already load all data, but needed for UI
    const pageList = [];

    for (let i = 1; i < totalPages + 1; i++) {
        pageList.push(i);
    }

    return (
        <>
            <Comment>📍 페이지를 넘기며 결과를 확인해보세요!</Comment>
            <NavWrapper>
                {pageList.map((number) => (
                    <LiTag key={`pageKey-${number}`}>
                        <a href="#" onClick={() => setTargetPage(number - 1)}>
                            {number}
                        </a>
                    </LiTag>
                ))}
            </NavWrapper>
        </>
    );
};

export default Pagination;

const NavWrapper = styled.ul`
    width: 400px;
    height: 20px;
    display: flex;
    padding-left: 0;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin-top: 12px;
`;

const LiTag = styled.nav`
    width: 30px;
    height: 30px;
    margin: 3px 5px;
    border: 1px solid #c4c4c4;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #305e63;
    color: #fff;
    border-radius: 15px;
    .on {
        background-color: #fff;
    }
`;

const Comment = styled.p`
    font-size: 12px;
    font-weight: bold;
`;
