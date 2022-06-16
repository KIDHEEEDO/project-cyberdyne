import React, { useState } from "react";
import { useRouter } from "next/router";
import searchStyles from "../../styles/Search.module.css";

const Search = () => {
    const [inputValue, setInputValue] = useState<String>("");
    const router = useRouter(); // 페이지 이동을 위해 useRouter 적용

    const findValue = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const value = (
            document.getElementById("searchInput") as HTMLInputElement
        ).value;
        console.log(inputValue); // input 창 value 확인
        if (value === "") {
            // 입력한 내용이 없을 경우, 넘어가지 못함
            return;
        } else {
            // 서버로 검색어 넘긴다
            await router.push("/recycling/recycleInfo");
        }
    };

    return (
        <div className={searchStyles.form}>
            <input
                id="searchInput"
                className={searchStyles.input}
                type="text"
                autoComplete="off"
                placeholder="사물을 검색해보세요"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                }
            />
            <button
                className={searchStyles.button}
                type="button"
                onClick={findValue}
            >
                🔍
            </button>
        </div>
    );
};

export default Search;
