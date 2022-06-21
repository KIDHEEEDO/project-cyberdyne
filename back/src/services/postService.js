const Post = require("../models/funcs/Post");

const postService = {
  createPost: async ({ newPost }) => {
    const { post_id, user_id, title, content, createdAt, post_img } =
      await Post.create({ newPost });

    const createdPost = {
      postId: post_id,
      userId: user_id,
      title,
      content,
      createdAt,
      postImg: post_img,
    };
    return { message: "success", data: createdPost };
  },

  getAllPost: async () => {
    //count 넘겨주는 것 추가하고 if를 제거?
    const listedPost = await Post.findAllPost();
    if (listedPost.length === 0) {
      const errorMessage = "게시글 존재하지 않습니다.";
      return { errorMessage };
    }

    const postList = listedPost.map((post) => ({
      postId: post.post_id,
      title: post.title,
      nickname: post.nickname,
      createdAt: post.createdAt,
      postImg: post.post_img,
    }));

    return { message: "success", data: postList };
  },
  getAllPostPaged: async ({ page, perPage }) => {
    const listedPost = await Post.findAllPostPaged({ page, perPage });
    if (listedPost.length === 0) {
      const errorMessage = "게시글 존재하지 않습니다.";
      return { errorMessage };
    }
    const totalPage = await Post.findAllPostTotalPage({ perPage });
    const postList = listedPost.map((post) => ({
      postId: post.post_id,
      title: post.title,
      content: post.content,
      nickname: post.nickname,
      createdAt: post.createdAt,
      postImg: post.post_img,
    }));
    return { message: "success", data: { totalPage, postList } };
  },

  getPostById: async ({ userId }) => {
    const listedPost = await Post.findPostByUserId({
      user_id: userId,
    });

    if (listedPost.length === 0) {
      const errorMessage =
        "게시글 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const searchedPostById = listedPost.map((post) => ({
      postId: post.post_id,
      userId: post.user_id,
      title: post.title,
      nickname: post.nickname,
      createdAt: post.createdAt,
      postImg: post.post_img,
    }));
    return { message: "success", data: searchedPostById };
  },
  getPostByPostId: async ({ postId }) => {
    const listedPost = await Post.findPostByPostId({ post_id: postId });

    if (listedPost.length === 0) {
      const errorMessage =
        "게시글 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const searchedPostByPostId = listedPost.map((post) => ({
      postId: post.post_id,
      userId: post.user_id,
      title: post.title,
      nickname: post.nickname,
      createdAt: post.createdAt,
      postImg: post.post_img,
    }));
    return { message: "success", data: searchedPostByPostId };
  },
  getPostByText: async ({ text, page, perPage }) => {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    // test() ㅡ 찾는 문자열이 들어있는지 확인
    if (regExp.test(text)) {
      text = text.replace(regExp, ""); // 찾은 특수 문자를 제거
    }
    text = text.replace(" ", "");

    const searchedPost = await Post.searchPostPaged({
      text,
      page,
      perPage,
    });

    if (searchedPost.length === 0) {
      const errorMessage = "게시글 존재하지 않습니다.";
      return { errorMessage };
    }
    const totalPage = Math.ceil(searchedPost.length / perPage);
    const searchedData = searchedPost.map((post) => ({
      postId: post.post_id,
      title: post.title,
      content: post.content,
      nickname: post.nickname,
      createdAt: post.createdAt,
      postImg: post.post_img,
    }));

    return { message: "success", data: { totalPage, searchedData } };
  },

  setPost: async ({ postId, toUpdate }) => {
    const findedPost = await Post.findPostByPostId({ post_id: postId });
    if (findedPost.length === 0) {
      const errorMessage =
        "게시글이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const toUpdateField = Object.keys(toUpdate);
    toUpdateField.forEach((key) => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    const { title, content, createdAt, updatedAt, post_img } =
      await Post.update({
        post_id: postId,
        toUpdate,
      });

    const updatedPost = {
      title,
      content,
      createdAt,
      updatedAt,
      postImg: post_img,
    };
    return { message: "success", data: updatedPost };
  },

  deletePost: async ({ postId }) => {
    const deletedPost = await Post.delete({
      post_id: postId,
    });

    if (!deletedPost) {
      const errorMessage =
        "게시글 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { message: "success", data: "삭제가 완료되었습니다." };
  },
};

module.exports = postService;
