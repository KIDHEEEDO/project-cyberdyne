const Quiz = require("../models/funcs/Quiz");
const setUtil = require("../utils/setUtil.js");

const quizService = {
    getQuiz: async () => {
        // 퀴즈의 총 개수
        // const count = await Quiz.getCount();
        // // 퀴즈를 랜덤하게 가져오기 위함
        // const number = Math.ceil(Math.random() * count);
        // // 랜덤으로 정해진 아이디에 해당하는 퀴즈를 가져옴
        // const quiz = await Quiz.findById(number);
        // // ^으로 연결해준 문자열을 분할해서 리스트로 만들어줌
        // const newMultiples = quiz.multiples.split("^");
        // // 선택지를 섞어줌
        // quiz.multiples = setUtil.shuffle(newMultiples);
        const quiz = {
            question: "폐건전지 배출방법이 다른것은?",
            multiples: ["AA", "AAA", "휴대폰배터리", "9V 배터리"],
            answer: "휴대폰배터리",
            image: false,
        };

        return { message: "success", data: quiz };
    },
};

module.exports = quizService;
