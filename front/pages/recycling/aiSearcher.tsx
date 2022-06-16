import React from "react";
import ImageUpload from "../../components/recycling/ImageUpload";
import Search from "../../components/recycling/Search";

const aiSearcher = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "#F2F2F2",
                    width: "100%",
                    height: "700px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <h1>사물을 찍어주세요!</h1>
                <p>
                    캔, 병, 과자봉지 등 사물 다 상관없어요. <br />
                    무엇이든 분리배출 방법을 알려드려요.
                </p>
                <ImageUpload />
            </div>

            <div
                style={{
                    height: "500px",
                    width: "100%",
                    backgroundColor: "#DEDEDE",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <h1>검색 해보세요!</h1>
                <p>
                    사진이 없다면 검색으로도 알 수 있어요! <br />
                    '우유갑' 이렇게 갖고 있는 물건을 검색해보세요!
                </p>
                <Search />
            </div>
        </div>
    );
};

export default aiSearcher;
