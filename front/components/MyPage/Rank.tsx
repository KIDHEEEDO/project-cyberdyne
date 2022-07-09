import React from "react";
import styled from "styled-components";

// 정보를 받아올 땐, map을 사용하여 1~3위를 불러올 예정 입니다
const rankMark = ["🥇", "🥈", "🥉"];
const Rank = ({ user }) => {
    return (
        <div>
            <h3>랭킹</h3>
            <p>
                현재 {user.nickname}님은{" "}
                {user?.rank ? `${user?.rank}위 입니다.` : `순위가 없습니다.`}
            </p>
            <div>
                {user?.rankers.map((ranker, index) => {
                    return (
                        <RankWrapper key={`ranker-${index}`}>
                            <div>
                                {rankMark[index]} {index + 1}위{" "}
                                <b>{ranker.nickname}</b>
                            </div>
                            <div>
                                <b>{ranker.total}</b> 포인트
                            </div>
                        </RankWrapper>
                    );
                })}
            </div>
        </div>
    );
};

export default Rank;

const RankWrapper = styled.div`
    display: flex;
    max-width: 380px;
    width: 100%;
    justify-content: space-between;
    font-size: 0.8rem;
`;
