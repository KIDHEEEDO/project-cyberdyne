import axios from "axios";

const backendPortNumber = "5000";
const serverUrl = "http://" + "localhost" + ":" + backendPortNumber + "/";
// window.location.hostname

async function get(endpoint, params = "") {
    return axios.get(serverUrl + endpoint + params, {
        // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function getQuary(endpoint, { params = {} }) {
    return axios.get(serverUrl + endpoint, {
        params,
        // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}
async function getPost(endpoint, params = "") {
    return axios.get(serverUrl + endpoint + params);
} // 중고마켓 게시글만 불러올때, 로그인 하지 않아도 되는것으로 하기

async function patch(endpoint, data) {
    return axios.patch(serverUrl + endpoint, data, {
        // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function post(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);

    return axios.post(serverUrl + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function sendImageFile(endpoint: string, formData) {
    return axios.post(serverUrl + endpoint, formData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            "content-type": "multipart/form-data",
        },
    });
}

async function put(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);

    return axios.put(serverUrl + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = "") {
    return axios.delete(serverUrl + endpoint + "/" + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export {
    get,
    getQuary,
    patch,
    post,
    getPost,
    sendImageFile,
    put,
    del as delete,
};
