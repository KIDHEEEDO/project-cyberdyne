import User from "../models/funcs/User.js";
import Point from "../models/funcs/Point.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import setUtil from "../utils/setUtil.js";
import { v4 as uuidv4 } from "uuid";

const userService = {
    addUser: async ({ nickname, email, password }) => {
        const user = await User.findByEmail({ email });

        if (user) {
            throw new Error(
                "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        const registerDate = new Date();

        const newUser = {
            nickname,
            email,
            password: hashedPassword,
            user_id: userId,
            register_date: registerDate,
        };

        await User.create({ newUser });
        const data = {
            userId,
            nickname,
            email,
            registerDate,
        };

        return { message: "success", data };
    },

    getUser: async ({ email, password }) => {
        const user = await User.findByEmail({ email });

        if (!user) {
            throw new Error(
                "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
            );
        }

        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(
            password,
            correctPasswordHash
        );

        if (!isPasswordCorrect) {
            throw new Error(
                "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
            );
        }

        const today = new Date();
        // 최근 로그인 날짜를 업데이트해줌
        const toUpdate = { last_login: today };
        await User.update({ user_id: user.user_id, toUpdate });

        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user.user_id }, secretKey);

        const { user_id, nickname, picture } = user;

        const loginUser = {
            token,
            userId: user_id,
            nickname,
            picture,
        };

        return { message: "success", data: loginUser };
    },

    getUserInfo: async ({ userId }) => {
        const user = await User.findById({ user_id: userId });
        const data = { userId, nickname: user.nickname, picture: user.picture };

        return { message: "success", data };
    },

    getUserPage: async ({ userId }) => {
        const user = await User.findById({ user_id: userId });

        if (!user) {
            throw new Error(
                "이미 탈퇴했거나 존재하지 않는 사용자입니다. 다시 한 번 확인해 주세요."
            );
        }

        const { email, nickname, picture } = user;

        const [rankers, rank] = await Promise.all([
            // 랭커들의 nickname과 total_point
            Point.getRankers(),
            // 현 사용자의 total_point와 rank
            Point.getRank({ user_id: userId }),
        ]);

        const data = { email, nickname, picture, rankers, rank };

        return { message: "success", data };
    },

    updateProfile: async ({ userId, updateData }) => {
        const user = await User.findById({ user_id: userId });

        if (!user) {
            throw new Error(
                "이미 탈퇴했거나 존재하지 않는 사용자입니다. 다시 한 번 확인해 주세요."
            );
        }

        // 기존 값과 비교해서 달라진 값만 수정
        const toUpdate = setUtil.compareValues(updateData, user);

        const data = await User.update({ user_id: userId, toUpdate });
        return { message: "success", data };
    },

    updatePassword: async ({ userId, password }) => {
        const user = await User.findById({ user_id: userId });

        if (!user) {
            throw new Error(
                "이미 탈퇴했거나 존재하지 않는 사용자입니다. 다시 한 번 확인해 주세요."
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const toUpdate = { password: hashedPassword };

        const data = await User.update({ user_id: userId, toUpdate });
        return { message: "success", data };
    },

    deleteUser: async ({ userId }) => {
        const user = await User.findById({ user_id: userId });

        if (!user) {
            throw new Error(
                "이미 탈퇴했거나 존재하지 않는 사용자입니다. 다시 한 번 확인해 주세요."
            );
        }

        await User.delete({ user_id: userId });
    },
};

export default userService;
