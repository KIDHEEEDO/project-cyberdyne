const userRouter = require("express").Router();
const userService = require("../services/userService");
const { body, validationResult } = require("express-validator");
const loginRequired = require("../middlewares/loginRequired");

userRouter.post(
    "/register",
    body("email").isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
    body("password")
        .isLength({ min: 8, max: 16 })
        .withMessage("8 ~ 16자리 비밀번호를 입력해주세요"),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new Error(errors.errors[0].msg);
            }

            const { nickname, email, password } = req.body;

            const newUser = await userService.addUser({
                nickname,
                email,
                password,
            });

            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

userRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getUser({ email, password });

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.get("/:userId/myPage", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;

        const userPage = await userService.getUserPage({ userId });

        res.status(200).json(userPage);
    } catch (error) {
        next(error);
    }
});

userRouter.put("/:userId/profile", loginRequired, async (req, res, next) => {
    try {
        // URI로부터 사용자 id를 추출함.
        const loginId = req.currentUserId;
        const userId = req.params.userId;

        if (loginId !== userId) {
            throw new Error("수정 권한이 없습니다. 다시 한 번 확인해 주세요.");
        }
        const { nickname, picture } = req.body ?? null;
        const updateData = { nickname, picture };

        const updatedUser = await userService.updateProfile({
            userId,
            updateData,
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userRouter.put(
    "/:userId/password",
    loginRequired,
    body("password")
        .isLength({ min: 8, max: 16 })
        .withMessage("8 ~ 16자리 비밀번호를 입력해주세요"),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new Error(errors.errors[0].msg);
            }

            const loginId = req.currentUserId;
            const userId = req.params.userId;

            if (loginId !== userId) {
                throw new Error(
                    "수정 권한이 없습니다. 다시 한 번 확인해 주세요."
                );
            }

            const password = req.body.password;

            const updatedUser = await userService.updatePassword({
                userId,
                password,
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);

userRouter.delete("/:userId", loginRequired, async (req, res, next) => {
    try {
        const loginId = req.currentUserId;
        const userId = req.params.userId;

        if (loginId !== userId) {
            throw new Error("탈퇴 권한이 없습니다. 다시 한 번 확인해 주세요.");
        }

        await userService.deleteUser({ userId });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = userRouter;
