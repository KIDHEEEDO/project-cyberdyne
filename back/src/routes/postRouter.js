const postRouter = require("express").Router();
const postService = require("../services/postService");

postRouter.post("/", async (req, res, next) => {
  try {
    //게시글 관련 정보
    const { title, post_img, content } = req.body;

    const newPost = await postService.createPost({
      title,
      post_img,
      content,
    });

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/:id", async (req, res, next) => {
  try {
    //게시글 관련 정보
    const post_id = req.params.id;
    const currentPost = await postService.getPost({
      post_id,
    });
    res.status(201).json(currentPost);
  } catch (error) {
    next(error);
  }
});
// postRouter.get("/list", async (req, res, next) => {
//   try {
//     //게시글 관련 정보
//     const listedPost = await postService.getAllPost();

//     res.status(201).json(listedPost);
//   } catch (error) {
//     next(error);
//   }
// });
// postRouter.get("/postlist/:user_id", async (req, res, next) => {
//   try {
//     res.status(201).json();
//   } catch (error) {
//     next(error);
//   }
// });

postRouter.put("/:id", async (req, res, next) => {
  try {
    const post_id = req.params.id;
    const { title, post_img, content } = req.body;

    const toUpdate = { title, post_img, content };
    const updatedPost = await postService.setPost({
      post_id,
      toUpdate,
    });

    res.status(201).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

postRouter.delete("/:id", async (req, res, next) => {
  try {
    const post_id = req.params.id;

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
