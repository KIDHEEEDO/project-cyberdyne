const db = require("../index.js");
const quizModel = db.quiz;

const Quiz = {
    getCount: async () => {
        const count = await quizModel.count();
        return count;
    },

    findById: async (number) => {
        const quiz = await quizModel.findOne({ where: { quiz_id: number } });
        return quiz;
    },
};

module.exports = Quiz;
