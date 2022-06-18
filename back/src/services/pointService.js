const Point = require("../models/funcs/Point");

const pointService = {
    addPoint: async ({ userId, route, point }) => {
        const today = new Date();
        const newPoint = { user_id: userId, route, point, raised_at: today };
        const createdNewPoint = await Point.create({ newPoint });
        const data = { route, point, raisedAt: createdNewPoint.raised_at };
        return { message: "success", data };
    },

    checkPoint: async ({ userId, route }) => {
        const today = new Date();
        // 오늘 자정을 기준으로 필터링을 해주기 위함
        today.setHours(0, 0, 0, 0);
        let point = await Point.findByFilter({
            user_id: userId,
            route,
            today,
        });

        if (!point) {
            point = { point: false };
        } else {
            point = { point: point.point };
        }
        return { message: "success", data: point };
    },

    getPoints: async ({ userId }) => {
        const points = await Point.findAllById({ user_id: userId });

        return { message: "success", data: points };
    },
};

module.exports = pointService;
