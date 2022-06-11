const pointRouter = require("express").Router();
const pointService = require("../services/pointService");
const loginRequired = require("../middlewares/loginRequired");

pointRouter.post("/", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { route, point } = req.body;

        const newPoint = await pointService.addPoint({ userId, route, point });

        res.status(201).json(newPoint);
    } catch (error) {
        next(error);
    }
});

pointRouter.get("/", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const route = req.query.route;
        console.log(route);

        const point = await pointService.checkPoint({ userId, route });

        res.status(200).json(point);
    } catch (error) {
        next(error);
    }
});

pointRouter.get("/list", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;

        const points = await pointService.getPoints({ userId });

        res.status(200).json(points);
    } catch (error) {
        next(error);
    }
});

module.exports = pointRouter;
