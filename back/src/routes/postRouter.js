const postRouter = require("express").Router();
const postService = require("../services/postService");
const loginRequired = require("../middlewares/loginRequired");

postRouter.use(loginRequired);

//게시글 추가
postRouter.post("/", async (req, res, next) => {
  try {
    //게시글 작성자 정보
    const userId = req.currentUserId;
    //게시글 관련 정보
    const { title, post_img, content } = req.body;

    //추가할 게시글
    const newPost = await postService.createPost({
      userId,
      title,
      post_img,
      content,
    });

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

//게시글 리스트 찾기
postRouter.get("/list", async (req, res, next) => {
  try {
    //전체 게시글 리스트
    const listedPost = await postService.getAllPost();

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
    const post_id = req.params.id;

    //특정 게시글 정보
    const currentPost = await postService.getPost({
      post_id,
    });
    res.status(201).json(currentPost);
  } catch (error) {
    next(error);
  }
});

//특정 게시글 수정
postRouter.put("/:id", async (req, res, next) => {
  try {
    //특정 게시글 id
    const post_id = req.params.id;
    const { title, post_img, content } = req.body;

    //수정할 게시글 정보
    const toUpdate = { title, post_img, content };

    //수정된 게시글
    const updatedPost = await postService.setPost({
      post_id,
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
    const post_id = req.params.id;

    //삭제된 게시글
    const deletedPost = await postService.deletePost({
      post_id,
    });

    if (deletedPost.errorMessage) {
      throw new Error(deletedPost.errorMessage);
    }

    res.status(201).json("삭제가 완료되었습니다.");
  } catch (error) {
    next(error);
  }
});

module.exports = postRouter;
