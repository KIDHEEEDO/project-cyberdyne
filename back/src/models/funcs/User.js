const db = require("../index.js");
const userModel = db.user;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const User = {
    create: async ({ newUser }) => {
        const createdNewUser = await userModel.create(newUser, {
            fields: [
                "user_id",
                "nickname",
                "email",
                "password",
                "register_date",
            ],
        });

        return createdNewUser;
    },

    findById: async ({ user_id }) => {
        const user = await userModel.findOne({ where: { user_id } });
        return user;
    },

    findByEmail: async ({ email }) => {
        const user = await userModel.findOne({ where: { email } });
        return user;
    },

    update: async ({ user_id, toUpdate }) => {
        const count = await userModel.update(toUpdate, { where: { user_id } });
        return count;
    },

    delete: async ({ user_id }) => {
        await userModel.destroy({ where: { user_id } });
    },
};

module.exports = User;
