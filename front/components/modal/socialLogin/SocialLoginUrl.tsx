const kakaoUrl = () => {
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    const config = {
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT,
        redirect_uri: "http://kdt-ai4-team09.elicecoding.com/auth/kakao/callback",
        response_type: "code",
    };
    const params = new URLSearchParams(config).toString();

    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);

    return finalUrl;
};

const naverUrl = () => {
    const baseUrl = "https://nid.naver.com/oauth2.0/authorize"; 
    const config = {
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT,
        redirect_uri: "http://kdt-ai4-team09.elicecoding.com/auth/naver/callback",
        response_type: "code",
    };
    const params = new URLSearchParams(config).toString();

    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);

    return finalUrl;
};

export { kakaoUrl, naverUrl };
