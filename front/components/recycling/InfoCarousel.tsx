import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import pointCoin from "../../public/images/point.coin.png";
import Loading from "../shared/Loading";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import Pagination from "./Pagination";
import { getRecycleInfo, post } from "../../api";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/atoms";
import { toast } from "react-toastify";
import { styled as materialStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";

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

const InfoCarousel = ({ info, route }) => {
    const [showList, setShowList] = useState([]);
    const router = useRouter(); // 페이지 이동을 위해 useRouter 적용
    const [targetPage, setTargetPage] = useState(0);
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [login, setLogin] = useRecoilState(LoginState);

    // route === "ImageSearch", findInfo function
    const getInfo = async (uniqueCodeArr) => {
        const res = await getRecycleInfo(`recycle-info/search`, {
            code: uniqueCodeArr,
        });
        const searchList = res.data.data;
        setShowList(searchList);
    };

    // Row buttons go ahead deferent page
    const rendPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        router.push(`/${(e.target as HTMLButtonElement).name}`);
    };

    const getPoint = async (e) => {
        if (e.type === "click") {
            if (!login) {
                return toast.info("로그인이 필요한 서비스입니다.");
            }

            const res = await post("points", { route: "recycle", point: 100 });
            toast.success("100 포인트가 적립 되었습니다!");

            setDisabledBtn(true);
        }
    };
    useEffect(() => {
        if (route === "ImageSearch") {
            const codeList = new Set(info.map((code) => code.code));
            const uniqueCodeArr = Array.from(codeList);
            if (uniqueCodeArr.length === 0) {
                setShowList([]);
                return;
            } else {
                getInfo(uniqueCodeArr);
            }
        }
        setDisabledBtn(false);
    }, []);

    return route === "ImageSearch" ? (
        showList.length !== 0 ? (
            <Wrapper>
                <Pagination
                    totalPages={showList?.length}
                    setTargetPage={setTargetPage}
                />
                {showList.map((content, index) => (
                    <ResultForm key={`info-${index}`}>
                        {index === targetPage && (
                            <ResultContents>
                                <MainTitle>
                                    <h2>
                                        &apos;{matchType[content.code]}
                                        &apos;
                                    </h2>
                                    <h3> (으)로 분리수거 해주세요!</h3>
                                </MainTitle>

                                <InfoCard
                                    key={`card-${index}`}
                                    cards={content.recycleInfo}
                                    route={route}
                                />
                            </ResultContents>
                        )}
                    </ResultForm>
                ))}
                <ButtonWrapper>
                    <NavButton name="waste" onClick={rendPage}>
                        대형폐기물 신고하기
                    </NavButton>
                    <NavButton name="market" onClick={rendPage}>
                        중고마켓으로 가기
                    </NavButton>
                    <NavButton onClick={getPoint} disabled={disabledBtn}>
                        <Image
                            src={pointCoin}
                            alt="point coin"
                            width={35}
                            height={35}
                        />
                        {disabledBtn ? <p>적립 완료</p> : <p>포인트 적립</p>}
                    </NavButton>
                </ButtonWrapper>
            </Wrapper>
        ) : (
            <NoResult>
                <NoResultForm>
                    아쉽습니다! <br />
                    적절한 결과를 찾지 못했습니다.
                    <br />
                    다시 한번 도전 해보시겠어요?
                </NoResultForm>
            </NoResult>
        )
    ) : (
        <>
            <Wrapper>
                <InfoCard cards={info.recycleInfo} route={route} />
                <ButtonWrapper>
                    <NavButton type="button" name="waste" onClick={rendPage}>
                        대형폐기물 신고하기
                    </NavButton>
                    <NavButton type="button" name="market" onClick={rendPage}>
                        중고마켓으로 가기
                    </NavButton>
                </ButtonWrapper>
            </Wrapper>
        </>
    );
};

export default InfoCarousel;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    border-left: 2px dashed #a7c4bc;
    @media screen and (max-width: 1224px) {
        border-left: none;
    } ;
`;

const ResultForm = styled.div`
    width: 100%;
`;

const ResultContents = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

// const Button = styled.button`
//     border: none;
//     cursor: pointer;
//     width: 130px;
//     height: 50px;
//     margin: 10px 6px;
//     background-color: var(--deepgray);
//     border-radius: 10px;
//     word-break: keep-all;
//     font-family: Elice Digital Baeum;
//     font-size: 0.8rem;
//     color: gray;
//     :hover {
//         background-color: white;
//         color: black;
//     }
//     @media screen and (max-width: 600px) {
//         width: 110px;
//     } ;
// `;

const NavButton = materialStyled(Button)(() => ({
    width: "130px",
    height: "50px",
    borderRadius: "10px",
    margin: "10px 6px",
    backgroundColor: "var(--deepgray)",
    fontSize: "0.73rem",
    color: "gray",
    "&:hover": {
        backgroundColor: "white",
        color: "black",
    },
}));

// const PointButton = styled.button`
//     display: flex;
//     border: none;
//     cursor: pointer;
//     width: 130px;
//     height: 50px;
//     margin: 18px 6px;
//     background-color: #dedede;
//     border-radius: 10px;
//     justify-content: center;
//     align-items: center;
//     word-break: keep-all;
//     font-family: Elice Digital Baeum;
//     font-size: 0.8rem;
//     color: gray;
//     :hover {
//         background-color: white;
//         color: black;
//     }
//     @media screen and (max-width: 600px) {
//         width: 110px;
//     };
// `;

const NoResult = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 2px dashed #a7c4bc;
`;

const NoResultForm = styled.div`
    width: 300px;
    height: 300px;
    border: 2px dashed #a7c4bc;
    font-size: var(--font-text);
    font-weight: bold;
    color: var(--deepgreen);
    display: flex;
    align-items: center;
    justify-content: center;
`;
