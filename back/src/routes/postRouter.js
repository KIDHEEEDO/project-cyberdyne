import { Router } from "express";
import postService from "../services/postService.js";
import loginRequired from "../middlewares/loginRequired.js";
import {
  validationErrorCatcher,
  postMiddleware,
} from "../middlewares/validationMiddleware.js";

const postRouter = Router();

//POST /post: 게시글 추가
//로그인 필요
postRouter.post(
  "/",
  loginRequired,
  postMiddleware.postBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
        //게시글 작성자 정보
        const userId = req.currentUserId;
        //게시글 관련 정보
        const { title, post_img, content } = req.body;

        //추가할 게시글
        const newPost = {
            user_id: userId,
            title,
            post_img,
            content,
        };

        const createdPost = await postService.createPost({ newPost });
        res.status(201).json(createdPost);
    } catch (error) {
        next(error);
    }
  }
);

//PUT /post/:id: 게시글 수정
//로그인 필요
postRouter.put(
  "/:id",
  loginRequired,
  postMiddleware.putBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
        //전체 게시글 리스트
        const listedPost = await postService.getAllPost({});

        res.status(201).json(listedPost);
    } catch (error) {
        next(error);
    }
});
//게시글 리스트 찾기
postRouter.get("/list", async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const perPage = req.query.perPage || 10;

        //전체 게시글 리스트
        const listedPost = await postService.getAllPostPaged({ page, perPage });

        res.status(201).json(listedPost);
    } catch (error) {
        next(error);
    }
});
//특정 사용자의 게시글 찾기
postRouter.get("/user", async (req, res, next) => {
    try {
        //특정 사용자 정보
        const userId = req.currentUserId;

        //특정 게시글 정보
        const currentPost = await postService.getPostById({
            userId,
        });

        res.status(201).json(currentPost);
    } catch (error) {
        next(error);
    }
});
//특정 게시글 찾기
postRouter.get("/:id", async (req, res, next) => {
    try {
        //특정 게시글 id
        const postId = req.params.id;

        //특정 게시글 정보
        const currentPost = await postService.getPostByPostId({
            postId,
        });
        res.status(201).json(currentPost);
    } catch (error) {
        next(error);
    }
});

//DELETE /post/:id: 게시글 삭제
//로그인 필요
postRouter.delete("/:id", loginRequired, async (req, res, next) => {
  try {
    //삭제할 게시글 id
    const postId = req.params.id;

        //수정된 게시글
        const updatedPost = await postService.setPost({
            postId,
            toUpdate,
        });

        res.status(201).json(updatedPost);
    } catch (error) {
        next(error);
    }
});

//특정 게시글 삭제
postRouter.delete("/:id", async (req, res, next) => {
    try {
        //특정 게시글 id
        const postId = req.params.id;

        //삭제된 게시글
        const deletedPost = await postService.deletePost({
            postId,
        });

        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(201).json(deletedPost);
    } catch (error) {
        next(error);
    }
});

//GET /post/all-list: 전체 게시글 리스트 (pagination 없음)
postRouter.get("/all-list", async (req, res, next) => {
    try {
        //전체 게시글 리스트
        const listedPost = await postService.getAllPost();

        res.status(201).json(listedPost);
    } catch (error) {
        next(error);
    }
});
//GET /post/list: 전체 게시글 리스트 (pagination 적용)
postRouter.get("/list", async (req, res, next) => {
    try {
        //현재 페이지
        const page = req.query.page || 1;
        //페이지 당 게시글 수
        const perPage = req.query.perPage || 10;

        //전체 게시글 리스트 (pagination 적용)
        const listedPost = await postService.getAllPostPaged({ page, perPage });

        res.status(201).json(listedPost);
    } catch (error) {
        next(error);
    }
});
//GET /post/search: 게시글 검색 (pagination 적용)
postRouter.get("/search", async (req, res, next) => {
    try {
        //검색어
        const text = req.query.text;
        //현재 페이지
        const page = req.query.page || 1;
        //페이지 당 게시글 수
        const perPage = req.query.perPage || 10;

        //검색 결과 (pagination 적용)
        const searchedPostList = await postService.getPostByText({
            text,
            page,
            perPage,
        });

        if (searchedPostList.errorMessage) {
            throw new Error(searchedPostList.errorMessage);
        }

        res.status(200).json(searchedPostList);
    } catch (e) {
        next(e);
    }
});
//GET /post/user: 특정 사용자 게시글 리스트
postRouter.get("/user", loginRequired, async (req, res, next) => {
  try {
    //사용자 정보
    const userId = req.currentUserId;

    //특정 사용자 게시글 리스트
    const currentPost = await postService.getPostByUserId({
      userId,
    });

    res.status(201).json(currentPost);
  } catch (error) {
    next(error);
  }
});
//GET /post/:id: 특정 게시글 정보
postRouter.get("/:id", loginRequired, async (req, res, next) => {
  try {
    //게시글 id
    const postId = req.params.id;

        //특정 게시글 정보
        const currentPost = await postService.getPostByPostId({
            postId,
        });

        if (currentPost.errorMessage) {
            throw new Error(currentPost.errorMessage);
        }

        res.status(201).json(currentPost);
    } catch (error) {
        next(error);
    }
});

export default postRouter;
