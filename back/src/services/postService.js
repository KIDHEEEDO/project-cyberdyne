import Post from "../models/funcs/Post.js";

const postService = {
  //POST /post
  createPost: async ({ newPost }) => {
    //게시글 추가
    const { post_id, user_id, title, content, createdAt, post_img } =
      await Post.create({ newPost });

    //추가된 게시글 정보
    //전달 데이터 형태 변경
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

  //PUT /post/:id
  setPost: async ({ postId, toUpdate }) => {
    //수정할 게시글 찾기
    const findedPost = await Post.findPostByPostId({ post_id: postId });
    //if: 수정할 게시글 존재X
    if (!findedPost) {
      const errorMessage =
        "게시글이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    //게시글 수정
    const toUpdateField = Object.keys(toUpdate);
    toUpdateField.forEach((key) => {
      if (!toUpdate[key]) delete toUpdate[key];
    });
    const { title, content, createdAt, updatedAt, post_img } =
      await Post.update({
        post_id: postId,
        toUpdate,
      });

    //수정된 게시글 정보
    //전달 데이터 형태 변경
    const updatedPost = {
      title,
      content,
      createdAt,
      updatedAt,
      postImg: post_img,
    };
    return { message: "success", data: updatedPost };
  },

  //DELETE /post/:id
  deletePost: async ({ postId }) => {
    //삭제할 게시글 찾기
    const findedPost = await Post.findPostByPostId({ post_id: postId });
    //if: 삭제할 게시글 존재X
    if (!findedPost) {
      const errorMessage =
        "게시글이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    //게시글 삭제
    const deletedPost = await Post.delete({
      post_id: postId,
    });

    return { message: "success", data: "삭제가 완료되었습니다." };
  },

  //GET /post/all-list
  getAllPost: async () => {
    //전체 게시글 리스트 (pagination 없음)
    const listedPost = await Post.findAllPost();

    //게시글 리스트
    //전달 데이터 형태 변경
    const postList = listedPost.map((post) => ({
      postId: post.post_id,
      title: post.title,
      nickname: post.nickname,
      createdAt: post.createdAt,
      postImg: post.post_img,
    }));

    return { message: "success", data: postList };
  },
  //GET /post/list
  getAllPostPaged: async ({ page, perPage }) => {
    //전체 게시글 리스트 (pagination 적용)
    const listedPost = await Post.findAllPostPaged({ page, perPage });
    //pagination적용된, 게시글 리스트 전체 페이지
    const totalPage = await Post.findAllPostTotalPage({ perPage });

    //게시글 리스트
    //전달 데이터 형태 변경
    const postList = listedPost.map((post) => ({
      postId: post.post_id,
      title: post.title,
      content: post.content,
      nickname: post.nickname,
      userId: post.user_id,
      userImg: post.picture,
      createdAt: post.createdAt,
      postImg: post.post_img,
      commentCnt: post.comment_cnt,
    }));

    return { message: "success", data: { totalPage, postList } };
  },
  //GET /post/search
  getPostByText: async ({ text, page, perPage }) => {
    //검색어에서 특수 문자 제거
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    if (regExp.test(text)) {
      text = text.replace(regExp, ""); // 찾은 특수 문자를 제거
    }
    //검색어에서 공백 제거
    text = text.replace(" ", "");

    //게시글 검색 결과
    const searchedPost = await Post.searchPostPaged({
      text,
      page,
      perPage,
    });
    //pagination적용된, 검색 게시글 리스트 전체 페이지
    const totalPage = Math.ceil(searchedPost.length / perPage);
    //게시글 리스트
    //전달 데이터 형태 변경
    const searchedData = searchedPost.map((post) => ({
      postId: post.post_id,
      title: post.title,
      content: post.content,
      nickname: post.nickname,
      userId: post.user_id,
      userImg: post.picture,
      createdAt: post.createdAt,
      postImg: post.post_img,
    }));

    return { message: "success", data: { totalPage, searchedData } };
  },
  //GET /post/user
  getPostByUserId: async ({ userId }) => {
    //특정 사용자 게시글 리스트
    const listedPost = await Post.findPostByUserId({
      user_id: userId,
    });

    //게시글 리스트
    //전달 데이터 형태 변경
    const searchedPostById = listedPost.map((post) => ({
      postId: post.post_id,
      title: post.title,
      content: post.content,
      nickname: post.nickname,
      userId: post.user_id,
      userImg: post.picture,
      createdAt: post.createdAt,
      postImg: post.post_img,
    }));

    return { message: "success", data: searchedPostById };
  },
  //GET /post/:id
  getPostByPostId: async ({ postId }) => {
    //특정 게시글 정보
    const findedPost = await Post.findPostByPostId({ post_id: postId });
    //if: 게시글 존재X
    if (!findedPost) {
      const errorMessage =
        "게시글이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    //특정 게시글 정보
    //전달 데이터 형태 변경
    const searchedPostByPostId = {
      postId: findedPost.post_id,
      title: findedPost.title,
      content: findedPost.content,
      nickname: findedPost.nickname,
      userId: findedPost.user_id,
      userImg: findedPost.picture,
      createdAt: findedPost.createdAt,
      postImg: findedPost.post_img,
    };

    return { message: "success", data: searchedPostByPostId };
  },
};

export default postService;
