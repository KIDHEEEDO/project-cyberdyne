import { Router } from "express";
import commentService from "../services/commentService.js";
import loginRequired from "../middlewares/loginRequired.js";
import {
  validationErrorCatcher,
  commentMiddleware,
} from "../middlewares/validationMiddleware.js";

const commentRouter = Router();

//로그인 필요
commentRouter.use(loginRequired);

//POST /comment: 댓글 추가
commentRouter.post(
  "/",
  commentMiddleware.postBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      //댓글 작성자 정보
      const userId = req.currentUserId;
      //추가할 댓글 관련 정보
      const { postId, content } = req.body;

      //추가할 댓글
      const newComment = {
        user_id: userId,
        post_id: postId,
        content,
      };

      //댓글 추가
      const createdComment = await commentService.createComment({
        newComment,
      });

      res.status(201).json(createdComment);
    } catch (error) {
      next(error);
    }
  }
);

//PUT /comment/:id: 댓글 수정
commentRouter.put(
  "/:id",
  commentMiddleware.putBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      //수정할 댓글 id
      const commentId = req.params.id;
      const { content } = req.body;

      //수정할 내용
      const toUpdate = { content };

      //댓글 수정
      const updatedComment = await commentService.setComment({
        commentId,
        toUpdate,
      });

      if (updatedComment.errorMessage) {
        throw new Error(updatedComment.errorMessage);
      }

      res.status(201).json(updatedComment);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE /comment/:id: 댓글 삭제
commentRouter.delete("/:id", async (req, res, next) => {
  try {
    //삭제할 댓글 id
    const commentId = req.params.id;

    //댓글 삭제
    const deletedComment = await commentService.deleteComment({
      commentId,
    });

    if (deletedComment.errorMessage) {
      throw new Error(deletedComment.errorMessage);
    }

    res.status(201).json(deletedComment);
  } catch (error) {
    next(error);
  }
});

//GET /comment/:id: 특정 게시글 관련 댓글 정보
commentRouter.get("/:id", async (req, res, next) => {
  try {
    //게시글 id
    const postId = req.params.id;

    //특정 게시글 관련 댓글 정보
    const listedComment = await commentService.getCommentByPostId({ postId });

    if (listedComment.errorMessage) {
      throw new Error(listedComment.errorMessage);
    }

    res.status(201).json(listedComment);
  } catch (error) {
    next(error);
  }
});

export default commentRouter;
