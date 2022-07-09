import React, { useState } from "react";
import Image from "next/image";
import Gps from "../../public/images/gps.png";
import RightArrow from "../../public/images/right-arrow.png";
import styled from "styled-components";
import Search from "./Search";
import Map from "./Map";
import { useMediaQuery } from "react-responsive";

const ReportWaste = () => {
    const [mapData, setMapData] = useState<string[] | null>(null);
    const [clickData, setClickData] = useState<string[] | null>(null);
    const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

    return (
        <Wrapper>
            {!isMobile && (
                <div>
                    <h1>우리동네 대형폐기물 신고하기</h1>
                    <Contents>
                        {
                            "대형폐기물은 구청/주민센터에서 납부 필증을 구매 후 버려야합니다.\n우리동네 어디에서 신고할 수 있는지 알아볼까요?"
                        }
                    </Contents>
                </div>
            )}
            <Form>
                <Title>우리동네 사이트 찾기</Title>
                <SearchWrapper>
                    <ImageButton onClick={() => setMapData(null)}>
                        <Image src={Gps} alt="gps" width={40} height={40} />
                    </ImageButton>
                    <Search mapData={clickData} setMapData={setMapData} />
                </SearchWrapper>
                <MapContainer id="map">
                    <Map mapData={mapData} setClickData={setClickData} />
                </MapContainer>
                <MapInfo>
                    {clickData && (
                        <MapInfoData>
                            {!isMobile && (
                                <ImageWrapper>
                                    <Image
                                        src={clickData[0]["banner_image"]}
                                        alt="banner_image"
                                        width={100}
                                        height={40}
                                        unoptimized={true}
                                    />
                                </ImageWrapper>
                            )}
                            <div>
                                <div>주소 : {clickData[0]["address"]}</div>
                                <div>전화번호 : {clickData[0]["tel"]}</div>
                                <NavForm>
                                    <Image
                                        src={RightArrow}
                                        alt="right-arrow"
                                        width={20}
                                        height={20}
                                    />
                                    <NavText
                                        href={clickData[0]["url1"]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        우리동네 공식 홈페이지 바로가기
                                    </NavText>
                                </NavForm>
                                <NavForm>
                                    <Image
                                        src={RightArrow}
                                        alt="right-arrow"
                                        width={20}
                                        height={20}
                                    />
                                    <NavText
                                        href={clickData[0]["url2"]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        대형폐기물 배출신고 안내 바로가기
                                    </NavText>
                                </NavForm>
                            </div>
                        </MapInfoData>
                    )}
                </MapInfo>
            </Form>
            <Tip>Tip! 대형폐기물은 무료로 수거가 가능하기도 해요!</Tip>
        </Wrapper>
    );
};

export default ReportWaste;

const Wrapper = styled.div`
    width: 100%;
    height: 1200px;
    background-color: var(--gray);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 100px;
    @media screen and (max-width: 800px) {
        height: 960px;
    } ;
`;

const Contents = styled.p`
    white-space: pre-wrap;
    text-align: center;
`;

const Tip = styled.p`
    width: 100%;
    position: absolute;
    bottom: 50px;
    white-space: pre-wrap;
    text-align: center;
`;

const Form = styled.div`
    max-width: 800px;
    width: 100%;
    height: 750px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 60px;
    border-radius: 20px;
    position: absolute;
    top: 290px;
    @media screen and (max-width: 800px) {
        border-radius: 0px;
        top: 60px;
    } ;
`;

const Title = styled.h2`
    width: 100%;
    height: 70px;
    margin: 0;
    padding-top: 15px;
    background-color: var(--green);
    text-align: center;
    border-radius: 20px 20px 0 0;
    @media screen and (max-width: 800px) {
        border-radius: 0px;
    } ;
`;

const MapContainer = styled.div`
    width: 85%;
    height: 340px;
`;

const MapInfo = styled.div`
    width: 85%;
    height: 120px;
    border: 1px dashed #c4c4c4;
    padding: 20px;
    font-size: 0.8rem;
`;

const MapInfoData = styled.div`
    display: flex;
    align-items: center;
`;

const ImageWrapper = styled.div`
    width: 120px;
    height: 70px;
    margin-right: 30px;
`;

const SearchWrapper = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-evenly;
`;

const ImageButton = styled.div`
    width: 55px;
    height: 55px;
    border: 1px solid #c1c1c1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
        background-color: var(--gray);
        cursor: pointer;
    }
`;

const NavForm = styled.div`
    display: flex;
    align-items: start;
`;

const NavText = styled.a`
    background: linear-gradient(to bottom, white 50%, var(--green) 50%);
    margin-left: 3px;
`;
