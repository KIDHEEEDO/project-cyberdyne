const db = require("../index.js");
const userModel = db.user;

const User = {
    create: async ({ newUser }) => {
        console.log("잘 넘어오니?", newUser);
        const createdNewUser = await userModel.create(newUser, {
            fields: ["nickname", "email", "password"],
        });

        return { message: "success", data: createdNewUser };
    },

    findById: async ({ id }) => {
        const user = await userModel.findOne({ where: { id } });
        return user;
    },
};

module.exports = User;
