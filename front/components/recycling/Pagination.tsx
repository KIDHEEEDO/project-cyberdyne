import React from "react";
import styled from "styled-components";

const Pagination = ({ totalPages, setTargetPage }) => {
    // Actually already load all data, but needed for UI
    const pageList = [];

    for (let i = 1; i < totalPages + 1; i++) {
        pageList.push(i);
    }

    return (
        <Wrapper>
            <Comment>📍 페이지를 넘기며 결과를 확인해보세요.</Comment>
            <NavWrapper>
                {pageList.map((number) => (
                    <LiTag key={`pageKey-${number}`}>
                        <a href="#" onClick={() => setTargetPage(number - 1)}>
                            {number}
                        </a>
                    </LiTag>
                ))}
            </NavWrapper>
        </Wrapper>
    );
};

export default Pagination;

const Wrapper = styled.div`
    width: 90%;
`;

const Comment = styled.p`
    font-size: var(--font-text);
    font-weight: bold;
    padding-top: 20px;
    @media screen and (max-width: 1224px) {
        border-top: 2px dashed #a7c4bc;
    };
`;

const NavWrapper = styled.ul`
    width: 100%;
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


