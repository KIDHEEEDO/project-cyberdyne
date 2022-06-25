import { atom, selector } from "recoil";

export const LoginState = atom({
    key: "loginState",
    default: false,
});

export const UserState = atom({
    key: "userState",
    default: {},
});

// export const LoginSelector = selector({
//     key: "loginSelector",
//     get: async ({get}) => {
//         const dispatch = get(Dispatch);
// });