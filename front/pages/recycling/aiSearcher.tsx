import React from "react";
import ImageUpload from "../../components/shared/ImageUpload";
import Search from "../../components/shared/Search";
import styled from "styled-components";

const aiSearcher = () => {
    return (
        <Container>
            <ImageWrapper>
                <h1>사물을 찍어주세요!</h1>
                <p>
                    캔, 병, 과자봉지 등 사물 다 상관없어요. <br />
                    무엇이든 분리배출 방법을 알려드려요.
                </p>
                <ImageUpload width={600} height={350} route="recycleInfo" />
            </ImageWrapper>

            <SearchWrapper>
                <h1>검색 해보세요!</h1>
                <p>
                    사진이 없다면 검색으로도 알 수 있어요! <br />
                    &lsquo;우유갑&lsquo; 이렇게 갖고 있는 물건을 검색해보세요!
                </p>
                <Search />
            </SearchWrapper>
        </Container>
    );
};

export default aiSearcher;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const ImageWrapper = styled.div`
    background-color: #f2f2f2;
    width: 100%;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SearchWrapper = styled.div`
    height: 500px;
    width: 100%;
    background-color: #dedede;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
