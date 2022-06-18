import React from "react";
import styled from "styled-components";
import Search from "./Search"
import Map from "./Map"

const ReportWaste = () => {
    return (
        <Wrapper>
            <h1>우리동네 대형폐기물 신고하기</h1>
            <Contents>
                {"대형폐기물은 구청/주민센터에서 납부 필증을 구매 후 버려야합니다.\n우리동네 어디에서 신고할 수 있는지 알아볼까요?"}
            </Contents>
            <Form>
                <Title>우리동네 사이트 찾기</Title>
                <div>
                    <Search />
                </div>
                <MapContainer id="map">
                    <Map latitude={33.450701} longitude={126.570667} />
                </MapContainer>
            </Form>
            <p>Tip! 대형폐기물은 무료로  수거가 가능하기도 해요!</p>
        </Wrapper>
    );
};

export default ReportWaste;


const Wrapper = styled.div`
    width: 100%;
    height: 1100px;
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 40px;
`;

const Contents = styled.p`
    white-space: pre-wrap;
    text-align: center;
`;

const Form = styled.div`
    width: 800px;
    height: 650px;
    background-color: var(--deepgray);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 40px;
`;

const Title = styled.h2`
    width: 100%;
    height: 70px;
    margin: 0;
    padding-top: 15px;
    background-color: var(--green);
    text-align: center;
`;

const MapContainer = styled.div`
    width: 720px;
    height: 420px;
`;