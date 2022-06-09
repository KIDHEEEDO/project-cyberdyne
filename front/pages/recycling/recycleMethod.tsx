import React from "react";

const recycleMethod = () => {
    return (
        <div
            style={{
                backgroundColor: "#F2F2F2",
                width: "100%",
                height: "700px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>'플라스틱'으로 분리수거 해주세요!</h1>
            <p>'플라스틱'종류는 00,00,00,00가 포함됩니다.</p>
            <div>
                <span>◀</span>
                슬라이딩
                <span>▶</span>
            </div>
            <div>
                <button type="button">대형폐기물 신고하기</button>
                <button type="button">중고마켓으로 가기</button>
                <button type="button">💰point</button>
            </div>
        </div>
    );
};

export default recycleMethod;
