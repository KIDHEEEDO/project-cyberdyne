import logger from "../config/logger.js";

const errorMiddleware = (error, req, res, next) => {
    logger.error(error);
    res.status(400).json({ message: "fail", data: error.message });
};

export default errorMiddleware;
