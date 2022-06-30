import React, { useState, useEffect } from "react";
import ImageUpload from "../../components/shared/ImageUpload";
import ImgDetection from "./ImgDetection";
import InfoCarousel from "./InfoCarousel";
import styled from "styled-components";
import { Fab, Autocomplete, TextField } from "@mui/material";
import { styled as materialStyled } from "@mui/material/styles";
import RecycleInfo from "../../public/recycleInfo.json";
import { getPost } from "../../api";

const categoryData = Array.from(
    new Set(RecycleInfo.map((data) => data.category))
);
const matchType = [
    "종이류",
    "플라스틱류",
    "유리병",
    "캔류",
    "고철류",
    "의류",
    "전자제품",
    "스티로폼",
    "도기류",
    "비닐류",
    "가구",
    "자전거",
    "형광등",
    "페트병류",
    "나무류",
];

const AiSearcher = () => {
    const [info, setInfo] = useState([]);
    const [openInfo, setOpenInfo] = useState(false); // After image uploads, change result page to grid
    const [isAllInfo, setIsAllInfo] = useState(true); // when click fab button, return false
    const [imgUrl, setImgUrl] = useState<string | null>(null); // preview image url
    const [name, setName] = useState<string | null>(null); // search keyword

    // route === "AllSearch" 일때, 정보 불러오는 함수
    const findInfo = async (newValue: string) => {
        setName(newValue);
        const code = matchType.indexOf(newValue);

        const res = await getPost(`recycle-info/?code=${code}`);
        const oneInfoList = res.data.data;
        setInfo(oneInfoList);
    };

    useEffect(() => {
        setName(null);
    }, [isAllInfo]);

    return (
        <>
            <Container>
                {isAllInfo && !openInfo && (
                    <>
                        <h1>사물을 찍어주세요!</h1>
                        <p>
                            캔, 병, 과자봉지 등 사물 다 상관없어요. <br />
                            무엇이든 분리배출 방법을 알려드려요.
                        </p>
                    </>
                )}
                <FaButton
                    variant="extended"
                    size="large"
                    onClick={() => {
                        setIsAllInfo((cur) => !cur);
                        setOpenInfo((cur) => !cur);
                    }}
                >
                    분리배출 정보 다 보기
                </FaButton>
                <Wrapper
                    className={
                        openInfo
                            ? isAllInfo
                                ? "success"
                                : "uploading"
                            : "uploading"
                    }
                >
                    {isAllInfo && (
                        <ImageWrapper>
                            <ImageForm>
                                {!openInfo ? (
                                    <ImageUpload
                                        width={600}
                                        height={350}
                                        route="recycleInfo"
                                        setInfo={setInfo}
                                        setOpenInfo={setOpenInfo}
                                        setImgUrl={setImgUrl}
                                    />
                                ) : (
                                    <DetectionWrapper>
                                        <Button
                                            onClick={() => {
                                                setOpenInfo((cur) => !cur);
                                            }}
                                        >
                                            다시 하기
                                        </Button>
                                        <ImgDetection
                                            info={info}
                                            imgUrl={imgUrl}
                                        />
                                    </DetectionWrapper>
                                )}
                            </ImageForm>
                        </ImageWrapper>
                    )}
                    {(!isAllInfo || openInfo) &&
                        (!isAllInfo ? (
                            <InfoWrapper>
                                <h1>카테고리를 선택해보세요.</h1>
                                <Autocomplete
                                    value={name}
                                    onChange={(
                                        event,
                                        newValue: string | null
                                    ) => {
                                        findInfo(newValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={categoryData}
                                    sx={{ width: 280 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="카테고리"
                                        />
                                    )}
                                />
                                <InfoCarousel info={info} route="AllSearch" />
                            </InfoWrapper>
                        ) : (
                            <InfoCarousel info={info} route="ImageSearch" />
                        ))}
                </Wrapper>
            </Container>
        </>
    );
};

export default AiSearcher;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--gray);
    width: 100%;
    height: 1100px;
    align-items: center;
    text-align: center;
    padding-top: 100px;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    &.success {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 700px;
    }
`;

const ImageWrapper = styled.div`
    background-color: var(--gray);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImageForm = styled.div``;
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
`;

const FaButton = materialStyled(Fab)(() => ({
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed",
    backgroundColor: "#305e63",
    color: "#fff",
    fontFamily: "Elice Digital Baeum",
    "&:hover": {
        backgroundColor: "#fff",
        color: "#305e63",
    },
}));

const Button = styled.button`
    border: none;
    cursor: pointer;
    width: 150px;
    height: 40px;
    margin: 19.92px 0 19.92px 0;
    border-radius: 15px;
    word-break: keep-all;
    font-size: 15px;
    text-align: center;
    background-color: #a7c4bc;
    color: #fff;
    font-family: Elice Digital Baeum;
`;

const DetectionWrapper = styled.div`
    height: 800px;
`;
