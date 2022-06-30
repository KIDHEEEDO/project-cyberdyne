import db from "../index.js";
import QueryTypes from "sequelize";
const postModel = db.post;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Post = {
  //POST /post
  //게시글 추가
  create: async ({ newPost }) => {
    const createdNewPost = await postModel.create(newPost);

    return createdNewPost;
  },

  //PUT /post/:id
  //게시글 수정
  update: async ({ post_id, toUpdate }) => {
    const updatedPost = await postModel.update(toUpdate, {
      where: { post_id },
      returning: true,
      plain: true,
    });
    return updatedPost[1];
  },

  //DELETE /post/:id
  //게시글 삭제
  delete: async ({ post_id }) => {
    const deletedPost = await postModel.destroy({ where: { post_id } });
    return deletedPost;
  },

  //GET /post/all-list
  //전체 게시글 리스트 (pagination 없음)
  findAllPost: async () => {
    const postlist = await sequelize.query(
      `SELECT posts.post_id, posts.title, posts."createdAt", users.nickname, users.picture, posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      ORDER BY posts."createdAt" desc`
    );
    return postlist[0];
  },
  //GET /post/list
  //게시글 리스트 전체 페이지
  findAllPostPaged: async ({ page, perPage }) => {
    const postlist = await sequelize.query(
      `SELECT posts.post_id, posts.title, posts.content, users.user_id, users.nickname, users.picture, posts."createdAt", posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      ORDER BY posts."createdAt" desc
      LIMIT $perPage
      OFFSET (($page - 1) * $perPage)`,
      {
        bind: { perPage: perPage, page: page },
        type: QueryTypes.SELECT,
      }
    );

    return postlist[0];
  },
  //GET /post/list
  //전체 게시글 리스트 (pagination 적용)
  findAllPostTotalPage: async ({ perPage }) => {
    const countPost = await postModel.count();
    const totalPage = Math.ceil(countPost / perPage);

    return totalPage;
  },
  //GET /post/search
  //게시글 검색
  searchPostPaged: async ({ text, page, perPage }) => {
    const searchedData = await sequelize.query(
      `SELECT posts.post_id, posts.title, posts.content, users.user_id, users.nickname, users.picture, posts."createdAt", posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      WHERE (posts.title LIKE '%'||$text||'%') OR (posts.content LIKE '%'||$text||'%')
      LIMIT $perPage
      OFFSET (($page - 1) * $perPage)`,
      {
        bind: { text: text, perPage: perPage, page: page },
        type: QueryTypes.SELECT,
      }
    );
    return searchedData[0];
  },
  //GET /post/user
  //특정 사용자 게시글 리스트
  findPostByUserId: async ({ user_id }) => {
    const post = await sequelize.query(
      `SELECT posts.post_id, posts.title, posts.content, users.user_id, users.nickname, users.picture, posts."createdAt", posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      WHERE users.user_id=$user_id
      ORDER BY posts."createdAt" desc`,
      {
        bind: { user_id: user_id },
        type: QueryTypes.SELECT,
      }
    );
    return post[0];
  },
  //PUT /post/:id
  //DELETE /post/:id
  //GET /post/:id
  //특정 게시글 정보
  findPostByPostId: async ({ post_id }) => {
    const post = await sequelize.query(
      `SELECT posts.post_id, posts.title, posts.content, users.user_id, users.nickname, users.picture, posts."createdAt", posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      WHERE posts.post_id=$post_id`,
      {
        bind: { post_id: post_id },
        type: QueryTypes.SELECT,
      }
    );
    return post[0][0];
  },
};

export default Post;
