import Comment from "../models/funcs/Comment.js";
import Post from "../models/funcs/Post.js";

const commentService = {
  //POST /comment
  createComment: async ({ newComment }) => {
    //댓글 추가
    const { comment_id, post_id, user_id, content, createdAt } =
      await Comment.create({
        newComment,
      });

    //추가된 댓글 정보
    //전달 데이터 형태 변경
    const createdComment = {
      commentId: comment_id,
      postId: post_id,
      userId: user_id,
      content,
      createdAt,
    };

    return { message: "success", data: createdComment };
  },

  //PUT /comment/:id
  setComment: async ({ commentId, toUpdate }) => {
    //수정할 댓글 찾기
    const findedComment = await Comment.findCommentByCommentId({
      comment_id: commentId,
    });
    //if: 수정할 댓글 존재X
    if (!findedComment) {
      const errorMessage =
        "댓글이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    //댓글 수정
    const toUpdateField = Object.keys(toUpdate);
    toUpdateField.forEach((key) => {
      if (!toUpdate[key]) delete toUpdate[key];
    });
    const { content, createdAt, updatedAt } = await Comment.update({
      comment_id: commentId,
      toUpdate,
    });

    //수정된 댓글 정보
    //전달 데이터 형태 변경
    const updatedComment = {
      content,
      createdAt,
      updatedAt,
    };

    return { message: "success", data: updatedComment };
  },

  //DELETE /comment/:id
  deleteComment: async ({ commentId }) => {
    //삭제할 댓글 찾기
    const findedComment = await Comment.findCommentByCommentId({
      comment_id: commentId,
    });

    //if: 삭제할 댓글 존재X
    if (!findedComment) {
      const errorMessage =
        "댓글이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    //댓글 삭제
    const deletedComment = await Comment.delete({
      comment_id: commentId,
    });

    return { message: "success", data: "삭제가 완료되었습니다." };
  },
  //GET /comment/:id
  getCommentByPostId: async ({ postId }) => {
    //특정 게시글 정보
    const findedPost = await Post.findPostByPostId({ post_id: postId });
    //if: 게시글 존재X
    if (!findedPost) {
      const errorMessage =
        "댓글이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    //특정 게시글 관련 댓글 정보
    const listedComment = await Comment.findCommentByPostId({
      post_id: postId,
    });

    //댓글 리스트
    //전달 데이터 형태 변경
    const searchedCommentByPostId = listedComment.map((comment) => ({
      commentId: comment.comment_id,
      userId: comment.user_id,
      nickname: comment.nickname,
      content: comment.content,
      createdAt: comment.createdAt,
    }));

    return { message: "success", data: searchedCommentByPostId };
  },
};

export default commentService;
