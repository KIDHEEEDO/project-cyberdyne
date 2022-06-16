const Post = require("../models/funcs/Post");

const postService = {
  createPost: async ({ userId, title, post_img, content }) => {
    const newPost = { user_id: userId, title, post_img, content };
    const createdNewPost = await Post.create({ newPost });
    //
    return { message: "success", data: createdNewPost };
  },

  getAllPost: async () => {
    const listedPost = await Post.findAllPost();

    if (!listedPost) {
      const errorMessage = "게시글 존재하지 않습니다.";
      return { errorMessage };
    }

    return { message: "success", data: listedPost };
  },

  getPostById: async ({ userId }) => {
    const currentPost = await Post.findPostByUserId({ user_id: userId });

    if (!currentPost) {
      const errorMessage =
        "게시글 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { message: "success", data: currentPost };
  },
  getPost: async ({ post_id }) => {
    const currentPost = await Post.findPostById({ post_id });

    if (!currentPost) {
      const errorMessage =
        "게시글 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { message: "success", data: currentPost };
  },

  setPost: async ({ post_id, toUpdate }) => {
    const findedPost = await Post.findPostById({ post_id });

    if (!findedPost) {
      const errorMessage =
        "게시글 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const toUpdateField = Object.keys(toUpdate);
    toUpdateField.forEach((key) => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    const updatedPost = await Post.update({ post_id, toUpdate });

    return { message: "success", data: updatedPost[1] };
  },

  deletePost: async ({ post_id }) => {
    const deletedPost = await Post.delete({
      post_id,
    });

    if (!deletedPost) {
      const errorMessage =
        "게시글 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { message: "success", data: deletedPost };
  },
};

module.exports = postService;
