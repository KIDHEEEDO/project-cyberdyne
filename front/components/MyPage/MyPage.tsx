import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import GrowingTree from "./GrowingTree";
import Rank from "./Rank";
import { UserStateContext } from "../../pages/_app";
import { get } from "../../api";
import { useMediaQuery } from "react-responsive";

const getUserInfo = async (setUser, id) => {
    const res = await get(`users/${id}/myPage`);
    const userAll = res.data.data;

    setUser({
        email: userAll.email,
        nickname: userAll.nickname,
        picture: userAll.picture,
        point: userAll.rank?.total ?? 0,
        rank: userAll.rank?.rank ?? "",
        rankers: userAll.rankers ?? "",
    });
};
// mypage main component 에서 point를 조회하고 멘트 적용 및 props로 하위 컴포넌트에 전달
const searchPointer = (point: number) => {
    if (point <= 300) {
        return (
            <p>
                환경에 대한 작은 생각의 시작으로 인해 <br />새 생명을
                만나게되었습니다!
            </p>
        );
    } // 초기값은 "1" 이며, 포인트가 깎이는 일이 없으므로, 1구간에 속하면 바로 return 해서 나온다.

    if (300 < point && point <= 1000) {
        return (
            <p>
                조금씩... 조금씩... 작지만
                <br />그 마음들이 모여 생명이 살아갈 지구를 지켰습니다.
            </p>
        );
    } else if (1000 < point && point <= 2500) {
        return (
            <p>
                무럭무럭 자라나는 나무를 보며,
                <br />
                그동안 당신의 노력이 느껴져요. 조금 더 힘을 내봐요!
            </p>
        );
    } else if (2500 < point && point <= 5000) {
        return (
            <p>
                나무가 되었네요!
                <br />
                아직 앙상한 어린 나무지만 제법 어른이 된 것 같아요!
            </p>
        );
    } else {
        return (
            <p>
                와!
                <br />
                드디어 나무 하나를 키워냈어요!
                <br />
                그늘이 되고, 비를 막아주고 좋은 공기를 주고, <br />
                크나큰 보답이 되어 지구와 우리 모두 행복해요!
            </p>
        );
    }
};

const MyPage = () => {
    const [user, setUser] = useState({
        email: "",
        nickname: "",
        picture: "",
        point: "",
        rank: "",
        rankers: [],
    });
    const userInfo = useContext(UserStateContext);
    const id = userInfo.user?.userId;
    const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

    useEffect(() => {
        getUserInfo(setUser, id);
    }, []);

    return (
        <Wrapper>
            {!isMobile && (
                <ProfileWrapper>
                    <UserProfile user={user} setUser={setUser} userId={id} />
                </ProfileWrapper>
            )}
            <InnerWrapper>
                <TitleWrapper>
                    <Title>마이 페이지</Title>
                </TitleWrapper>
                <ItemWrapper>
                    <GrowingTree point={user?.point} />
                    <InfoWrapper>
                        <PointInfo>
                            <h2>{user?.nickname} 님의 나무</h2>
                            {searchPointer(Number(user?.point))}
                            <p>보유한 포인트 : {user?.point}</p>
                        </PointInfo>
                        <RankInfo>
                            <Rank user={user} />
                        </RankInfo>
                    </InfoWrapper>
                </ItemWrapper>
            </InnerWrapper>
        </Wrapper>
    );
};

export default MyPage;

const Wrapper = styled.div`
    display: grid;
    width: 100%;
    height: 800px;
    grid-template-columns: 1.3fr 4fr;
    background-color: var(--gray);
    padding-top: 60px;
    @media screen and (max-width: 800px) {
        display: flex;
    } ;
`;

const InnerWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 60px;
    border-right: 2px solid #a7c4bc;
    text-align: center;
`;

const TitleWrapper = styled.div`
    text-align: center;
    background-color: var(--green);
    height: 70px;
`;

const Title = styled.h2`
    margin: 0;
    padding-top: 15px;
`;

const ItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.4fr 0.6fr;
    height: 85%;
`;

const InfoWrapper = styled.div`
    border-left: 1px solid #a7c4bc;
    height: 100%;
`;

const PointInfo = styled.div`
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 25px;
    border-bottom: 1px solid #a7c4bc;
`;

const RankInfo = styled.div`
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 25px;
`;
