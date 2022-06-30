import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import pointCoin from "../../public/images/point.coin.png";
import Loading from "../shared/Loading";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import Pagination from "./Pagination";
import { getRecycleInfo } from "../../api";

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

    const getPoint = () => {
        // get 기존 포인트 -> put 추가한 포인트
    };
    useEffect(() => {
        if (route === "ImageSearch") {
            const codeList = new Set(info.map((code) => code.code));
            const uniqueCodeArr = Array.from(codeList);
            getInfo(uniqueCodeArr);
        }
    }, []);

    return route === "ImageSearch" ? (
        showList.length !== 0 ? (
            <>
                <Wrapper>
                    <Pagination
                        totalPages={showList?.length}
                        setTargetPage={setTargetPage}
                    />
                    {showList.map((content, index) => (
                        <div key={`info-${index}`}>
                            {index === targetPage && (
                                <>
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
                                </>
                            )}
                        </div>
                    ))}
                    <ButtonWrapper>
                        <Button type="button" name="waste" onClick={rendPage}>
                            대형폐기물 신고하기
                        </Button>
                        <Button type="button" name="market" onClick={rendPage}>
                            중고마켓으로 가기
                        </Button>
                        <PointButton type="button" onClick={getPoint}>
                            <Image
                                src={pointCoin}
                                alt="point coin"
                                width={35}
                                height={35}
                            />
                            <p>포인트 적립하기</p>
                        </PointButton>
                    </ButtonWrapper>
                </Wrapper>
            </>
        ) : (
            <NoResult>
                아쉽습니다! <br />
                결과가 나오지 않았습니다.
                <br />
                다시 한번 도전 해보시겠어요 ?
            </NoResult>
        )
    ) : (
        <>
            <Wrapper>
                <>
                    <InfoCard cards={info.recycleInfo} route={route} />
                </>

                <ButtonWrapper>
                    <Button type="button" name="waste" onClick={rendPage}>
                        대형폐기물 신고하기
                    </Button>
                    <Button type="button" name="market" onClick={rendPage}>
                        중고마켓으로 가기
                    </Button>
                    <PointButton type="button" onClick={getPoint}>
                        <Image
                            src={pointCoin}
                            alt="point coin"
                            width={35}
                            height={35}
                        />
                        <p>포인트 적립하기</p>
                    </PointButton>
                </ButtonWrapper>
            </Wrapper>
        </>
    );
};

export default InfoCarousel;

const Wrapper = styled.div`
    background: #f2f2f2;
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-left: 2px dashed #a7c4bc;
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
const Button = styled.button`
    border: none;
    cursor: pointer;
    width: 150px;
    height: 50px;
    margin: 10px 6px;
    background-color: #dedede;
    border-radius: 15px;
    word-break: keep-all;
    font-family: Elice Digital Baeum;
    font-weight: bold;
`;
const PointButton = styled.button`
    display: flex;
    border: none;
    cursor: pointer;
    width: 150px;
    height: 50px;
    margin: 18px 6px;
    background-color: #dedede;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
    font-family: Elice Digital Baeum;
    font-weight: bold;
`;

const NoResult = styled.div`
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #a7c4bc;
    font-size: 25px;
    font-weight: bold;
    color: red;
`;
