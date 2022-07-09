import React, { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Loading from "./Loading";
import { sendImageFile } from "../../api";
import instax from "../../public/images/Instax.png";
import styled from "styled-components";
import { toast } from "react-toastify";

type ImageUploadProps = {
    setOpenInfo?: Dispatch<SetStateAction<boolean>>;
    setInfo?: Dispatch<SetStateAction<Object>>;
    setImgUrl?: Dispatch<SetStateAction<string | ArrayBuffer>>;
};

const MobileCamera = ({
    setImgUrl,
    setOpenInfo,
    setInfo,
}: ImageUploadProps) => {
    const [isUploaded, setIsUploaded] = useState("standBy");
    // img upload 상태 : ["standBy"] "대기, 아직 아무것도 일어나지 않음" / ["loading"] "서버에 img를 보내고 결과를 기다림" / ["complete"] "결과를 저장하고 라우팅할 것"
    const [isCameraOn, setIsCameraOn] = useState(false);

    // image preview를 위한 함수
    const encodeFileToBase64 = (file: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImgUrl(reader.result);
                resolve(reader.result);
            };
        });
    };

    const sendImage = async (file: Blob) => {
        try {
            encodeFileToBase64(file);
            setIsUploaded("loading");
            const formData = new FormData();
            formData.append("image", file);
            const res = await sendImageFile("recycle-info/img", formData);
            const info = res?.data?.data.imgInfo;
            setInfo(info);
            setOpenInfo(true);
            setIsUploaded("complete");
        } catch (e) {
            toast.error("다시 시도해주세요!");
        }
    };

    return isUploaded !== "loading" ? (
        <Wrapper>
            <Image src={instax} alt="camera" width={250} height={250} />
            <InputLabel htmlFor="input-mobile-file">{"사진 찍기"}</InputLabel>
            <input
                type="file"
                id="input-mobile-file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => sendImage(e.target.files[0])}
            />
            <Comment>
                ⚠️&quot;사물이 너무 많거나, 과도한 확대 등 <br />
                불분명한 사진은 분석 오류 사항이 될 수 있습니다!&quot;{" "}
            </Comment>
        </Wrapper>
    ) : (
        <Wrapper>
            <Loading width={250} height={250} />
        </Wrapper>
    );
};

export default MobileCamera;

const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    min-height: 100vh;
    padding: 100px 0 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 600px) {
        height: 300px;
    } ;
`;

const InputLabel = styled.label`
    height: 50px;
    cursor: pointer;
    padding: 10px 50px;
    border-radius: 15px;
    margin-top: 40px;
    font-size: 18px;
    font-weight: bold;
    background-color: #82c8a0;
    box-shadow: 0 0 0 1px #82c8a0 inset,
        0 0 0 2px rgba(255, 255, 255, 0.15) inset,
        0 8px 0 0 rgba(126, 194, 155, 0.7), 0 8px 0 1px rgba(0, 0, 0, 0.4),
        0 8px 8px 1px rgba(0, 0, 0, 0.5);
        :active {
            box-shadow: 0 0 0 1px #82c8a0 inset,
                  0 0 0 2px rgba(255,255,255,0.15) inset,
                  0 0 0 1px rgba(0,0,0,0.4);
`;

const Comment = styled.p`
    padding-top: 50px;
    font-size: 17px;
    font-weight: bold;
`;
