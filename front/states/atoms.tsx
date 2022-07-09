import { atom } from "recoil";

export const LoginState = atom({
    key: "loginState",
    default: false,
});

export const UserState = atom({
    key: "userState",
    default: {},
});
