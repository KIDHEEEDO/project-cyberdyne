const db = require("../index.js");
const postModel = db.post;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Post = {
  create: async ({ newPost }) => {
    const createdNewPost = await postModel.create(newPost, {
      fields: ["user_id", "title", "post_img", "content"],
    });

    return createdNewPost;
  },

  findAllPost: async () => {
    const postlist = await sequelize.query(
      `SELECT posts.title, posts."createdAt", users.nickname, posts.post_img
      FROM posts 
      INNER JOIN users 
      ON posts.user_id=users.user_id 
      ORDER BY posts."createdAt"`
    );
    return postlist[0];
  },
  findPostByUserId: async ({ user_id }) => {
    const posts = await postModel.findAll({ where: { user_id } });
    return posts;
  },
  findPostById: async ({ post_id }) => {
    const post = await postModel.findOne({ where: { post_id } });
    return post;
  },

  update: async ({ post_id, toUpdate }) => {
    const updatedPost = await postModel.update(toUpdate, {
      where: { post_id },
      returning: true,
      plain: true,
    });
    return updatedPost;
  },

  delete: async ({ post_id }) => {
    const deletedPost = await postModel.destroy({ where: { post_id } });
    return deletedPost;
  },
};

module.exports = Post;
