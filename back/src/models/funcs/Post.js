const db = require("../index.js");
const postModel = db.post;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Post = {
  create: async ({ newPost }) => {
    const createdNewPost = await postModel.create(newPost);

    return createdNewPost;
  },

  findAllPostTotalPage: async ({ perPage }) => {
    const countPost = await postModel.count();
    const totalPage = Math.ceil(countPost / perPage);

    return totalPage;
  },
  findAllPostPaged: async ({ page, perPage }) => {
    const postlist = await sequelize.query(
      `SELECT posts.post_id, posts.title, posts.content, users.nickname, posts."createdAt", posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      ORDER BY posts."createdAt"
      LIMIT '${perPage}'
      OFFSET '${(page - 1) * perPage}'`
    );

    return postlist[0];
  },
  findAllPost: async () => {
    const postlist = await sequelize.query(
      `SELECT posts.post_id, posts.title, posts."createdAt", users.nickname, posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      ORDER BY posts."createdAt"`
    );
    return postlist[0];
  },
  findPostByUserId: async ({ user_id }) => {
    const post = await sequelize.query(
      `SELECT posts.post_id, users.user_id, posts.title, users.nickname, posts."createdAt", posts.content, posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      WHERE users.user_id='${user_id}'
      ORDER BY posts."createdAt"`
    );
    return post[0];
  },
  findPostByPostId: async ({ post_id }) => {
    const post = await sequelize.query(
      `SELECT posts.post_id, users.user_id, posts.title, users.nickname, posts."createdAt", posts.content, posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      WHERE posts.post_id='${post_id}'`
    );
    return post[0];
  },

  update: async ({ post_id, toUpdate }) => {
    const updatedPost = await postModel.update(toUpdate, {
      where: { post_id },
      returning: true,
      plain: true,
    });
    return updatedPost[1];
  },

  delete: async ({ post_id }) => {
    const deletedPost = await postModel.destroy({ where: { post_id } });
    return deletedPost;
  },
};

module.exports = Post;
