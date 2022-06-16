const db = require("../index.js");
const postModel = db.post;
const Sequelize = db.Sequelize;

const Post = {
  create: async ({ newPost }) => {
    const createdNewPost = await postModel.create(newPost, {
      fields: ["title", "post_img", "content"],
    });

    return createdNewPost;
  },

  findPostById: async ({ post_id }) => {
    const post = await postModel.findOne({ where: { post_id } });
    return post;
  },
  // findAllPost: async () => {
  //   const postlist = await postModel.findAll({});

  //   return postlist;
  // },

  update: async ({ post_id, toUpdate }) => {
    const updatedPost = await postModel.update(toUpdate, {
      where: { post_id },
    });
    return updatedPost;
  },

  delete: async ({ post_id }) => {
    const deletedPost = await postModel.destroy({ where: { post_id } });
    return deletedPost;
  },
};

module.exports = Post;
