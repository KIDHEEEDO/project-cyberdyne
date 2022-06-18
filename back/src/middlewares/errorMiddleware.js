// // import { logger } from "../utils/winstonLogger.js";
// const logger = console;

// const { AppError, RequestError } = require("../utils/errors.js");
// const status = require("../utils/status.js");

// function errorMiddleware(error, req, res, next) {
//   if (error instanceof AppError) {
//     // 로거를 사용하게 되면 코멘트를 제거할 수 있습니다.
//     if (error.logas in logger) {
//       logger[error.logas](error.stack, error.detail);
//     }
//     res.status(error.status).json({
//       // 이 부분은 합의가 필요하고 프로젝트마다 달라집니다.
//       success: false,
//       detail: {
//         status: error.status,
//         message: error.message,
//         operational: !!error.operational,
//       },
//     });
//     if (!error.operational) {
//       process.exit(1);
//     }
//   } else {
//     res.status(status.STATUS_500_INTERNALSERVERERROR).json({
//       success: false,
//       detail: {
//         status: status.STATUS_500_INTERNALSERVERERROR,
//         message: `Something is not quite right here`,
//         operational: false,
//       },
//     });
//     process.exit(1);
//     // 로거를 사용하게 되면 코멘트를 제거할 수 있습니다.
//     logger.warn(error.stack);
//   }
// }

const errorMiddleware = (error, req, res, next) => {
    // 터미널에 노란색으로 출력됨.
    console.log("\x1b[33m%s\x1b[0m", error);
    res.status(400).json({ message: "fail", data: error.message });
};

module.exports = errorMiddleware;
