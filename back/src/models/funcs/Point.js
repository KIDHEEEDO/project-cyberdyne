const db = require("../index.js");
const pointModel = db.point;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

const Point = {
    create: async ({ newPoint }) => {
        const createdNewPoint = await pointModel.create(newPoint, {
            field: ["user_id", "route", "point", "raised_at"],
        });

        return createdNewPoint;
    },

    findByFilter: async ({ user_id, route, today }) => {
        const point = await pointModel.findOne({
            where: { user_id, route, raised_at: { [Op.gt]: today } },
        });
        return point;
    },

    findAllById: async ({ user_id }) => {
        const points = await pointModel.findAll({ where: { user_id } });
        return points;
    },

    getRankers: async () => {
        const rankerPoints = await sequelize.query(
            `SELECT points.user_id, users.nickname, SUM(point) TOTAL_POINT 
            FROM points 
            INNER JOIN users 
            ON points.user_id=users.user_id 
            GROUP BY points.user_id, users.user_id 
            ORDER BY total_point DESC 
            LIMIT 3`
        );
        return rankerPoints[0];
    },

    getRank: async ({ user_id }) => {
        const rank = await sequelize.query(
            `SELECT total_point, rank 
            FROM (
                SELECT user_id, total_point, RANK() OVER (ORDER BY total_point DESC) RANK 
                FROM (
                    SELECT user_id, SUM(point) AS total_point 
                    FROM points 
                    GROUP BY user_id) AS new_points
                ) AS final_points 
            WHERE user_id='${user_id}'`
        );
        return rank[0][0];
    },
};

module.exports = Point;
