const User = require("../models/funcs/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

class naverService {
    static addUser = async ({ newUser }) => {
        await User.create({ newUser });
        return;
    };

    static checkUser = async ({ nickname, email, picture }) => {
        const user = await User.findByEmail({ email });
        if (user) {
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
        } else {
            const registerDate = new Date();
            const userId = uuidv4();
            const newUser = {
                nickname,
                email,
                password: "noPassword",
                user_id: userId,
                register_date: registerDate,
                picture,
            };
            await this.addUser({ newUser });
            const data = {
                userId,
                nickname,
                email,
                registerDate,
            };

            const registerUser = { message: "success", data, register: true };
            return registerUser;
        }
    };

    static getUserData = async ({ accessToken }) => {
        const apiUrl = "https://openapi.naver.com/v1/nid/me";
        const userData = await axios.get(`${apiUrl}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { name, email, profile_image } = userData.data.response;

        return this.checkUser({
            nickname: name,
            email,
            picture: profile_image,
        });
    };

    static getToken = async ({ code }) => {
        const baseUrl = "https://nid.naver.com/oauth2.0/token";
        const config = {
            client_id: process.env.NAVER_CLIENT,
            client_secret: process.env.NAVER_SECRET,
            redirect_uri: "http://localhost:3000/auth/kakao/callback",
            grant_type: "authorization_code",
            code,
        };

        const params = new URLSearchParams(config);
        const finalUrl = `${baseUrl}?${params}`;

        const tokenRequest = await axios.post(finalUrl, config);

        const accessToken = tokenRequest.data.access_token;
        return this.getUserData({ accessToken });
    };
}

module.exports = naverService;
