import React from "react";
import { useRouter } from "next/router";
import KakaoLogin from "../../../components/modal/socialLogin/KakaoLogin";
import NaverLogin from "../../../components/modal/socialLogin/NaverLogin";

const Callback = () => {
    const router = useRouter();
    const socialRoute = router.query?.id;

    return socialRoute === "kakao" ? <KakaoLogin /> : <NaverLogin />;
};

export default Callback;
