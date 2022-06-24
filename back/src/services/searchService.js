import RecycleInfo from "../models/funcs/RecycleInfo.js";

const searchService = {
  //GET /search
  getInfoByText: async ({ text }) => {
    //검색어에서 특수 문자 제거
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    if (regExp.test(text)) {
      text = text.replace(regExp, "");
    }
    //검색어에서 공백 제거
    text = text.replace(" ", "");

    //검색 결과
    const searchedInfo = await RecycleInfo.searchData({ text });

    //전달 데이터 형태 변경
    const searchedData = searchedInfo.map((info) => ({
      category: info.category,
      details: info.details,
      infoImg: info.info_img,
    }));

    return { message: "success", data: searchedData };
  },
};

export default searchService;
