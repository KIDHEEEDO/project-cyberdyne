import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { get } from "../../api";

const Search = () => {
    const [inputValue, setInputValue] = useState("");
    const router = useRouter(); // 페이지 이동을 위해 useRouter 적용

    const findValue = async () => {
        console.log(inputValue); // input 창 value 확인
        if (inputValue === "") {
            // 입력한 내용이 없을 경우, 넘어가지 못함
            return;
        } else {
            // 서버로 검색어 넘긴다
            const res = await get(`search?text=${inputValue}`);
            const info = await res?.data?.data;
            console.log(info);
            if (info.length === 0) {
                alert("검색 결과가 없습니다!");
            } else {
                localStorage.setItem("searchInfo", JSON.stringify(info));
                // image 검색과 받은 데이터 형식이 다름에 따라 추가 분기 처리를 위한 쿼리를 추가하여 전달
                await router.push(
                    `/recycling/recycleInfo?route=${info[0]?.category}`,
                    "/recycling/recycleInfo"
                );
            }
        }
    };

    return (
        <Wrapper>
            <Input
                id="searchInput"
                type="text"
                autoComplete="off"
                placeholder="사물을 검색해보세요"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                }
            />
            <Button type="button" onClick={findValue}>
                🔍
            </Button>
        </Wrapper>
    );
};

export default Search;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const Input = styled.input`
    font-family: Elice Digital Baeum;
    width: 530px;
    height: 40px;
    border: none;
    padding: 0;
    outline: none;
    border-radius: 15px;
    text-align: center;
`;

const Button = styled.button`
    width: 65px;
    margin-left: 5px;
    height: 40px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
`;
