import React, { useState } from "react";
import searchStyles from "../../styles/Search.module.css";

const Search = () => {
    const [inputValue, setInputValue] = useState<String>("");
    const findValue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(inputValue); // input 창 value 확인
        (document.getElementById("searchInput") as HTMLInputElement).value = ""; // input 창 초기화
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
