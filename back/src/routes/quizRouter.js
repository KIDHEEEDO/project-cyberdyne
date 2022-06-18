const quizRouter = require("express").Router();
const quizService = require("../services/quizService.js");

quizRouter.get("/", async (req, res, next) => {
    try {
        const quiz = await quizService.getQuiz();

        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
});

module.exports = quizRouter;
