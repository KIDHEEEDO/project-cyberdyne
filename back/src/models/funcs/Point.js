import QueryTypes from "sequelize";
import db from "../index.js";
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
    const point = await pointModel.findAll({
      attributes: ["point"],
      where: { user_id, route, raised_at: { [Op.gt]: today } },
    });
    return point;
  },

  findAllById: async ({ user_id }) => {
    const points = await pointModel.findAll({
      attributes: ["route", "point", ["raised_at", "raisedAt"]],
      where: { user_id },
    });
    return points;
  },

  getRankers: async () => {
    const rankerPoints = await sequelize.query(
      `SELECT u.nickname, SUM(point) TOTAL
            FROM points AS p
            INNER JOIN users AS u
            ON p.user_id=u.user_id
            GROUP BY p.user_id, u.user_id
            ORDER BY total DESC
            LIMIT 3`
    );
    return rankerPoints[0];
  },

  getRank: async ({ user_id }) => {
    const rank = await sequelize.query(
      `SELECT total, rank
            FROM (
                SELECT user_id, total, RANK() OVER (ORDER BY total DESC) RANK
                FROM (
                    SELECT user_id, SUM(point) AS total
                    FROM points
                    GROUP BY user_id) AS new_points
                ) AS final_points 
            WHERE user_id=$user_id`,
      {
        bind: { user_id },
        type: QueryTypes.SELECT,
      }
    );
    return rank[0][0];
  },
};

export default Point;
