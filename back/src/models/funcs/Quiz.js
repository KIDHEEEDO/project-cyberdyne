import db from "../index.js";
const quizModel = db.quiz;

const Quiz = {
  getCount: async () => {
    const count = await quizModel.count();
    return count;
  },

  findById: async (number) => {
    const quiz = await quizModel.findOne({
      attributes: { exclude: ["quiz_id"] },
      where: { quiz_id: number },
    });
    return quiz;
  },
};

export default Quiz;
