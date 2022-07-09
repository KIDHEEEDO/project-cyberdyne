import { validationResult } from "express-validator";
import { body } from "express-validator";

const postMiddleware = {};
postMiddleware.postBodyValidator = [
  body("title").notEmpty().withMessage("게시글 제목을 작성하세요.").bail(),
  body("content").notEmpty().withMessage("게시글 내용을 작성하세요.").bail(),
];

postMiddleware.putBodyValidator = [
  body("title")
    .exists({ checkNull: true })
    .withMessage("게시글 제목을 작성하세요.")
    .isString()
    .trim(),

  body("content")
    .exists({ checkNull: true })
    .withMessage("게시글 내용을 작성하세요.")
    .isString(),
];

const commentMiddleware = {};
commentMiddleware.postBodyValidator = [
  body("postId").notEmpty().withMessage("게시글 아이디를 작성하세요.").bail(),
  body("content").notEmpty().withMessage("댓글 내용을 작성하세요.").bail(),
];

commentMiddleware.putBodyValidator = [
  body("content").exists({ checkNull: true }).isString(),
];

const validationErrorCatcher = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const error = new Error(errors.array()[0].msg);
  error.status = 400;
  throw error;
};

export { postMiddleware, commentMiddleware, validationErrorCatcher };
