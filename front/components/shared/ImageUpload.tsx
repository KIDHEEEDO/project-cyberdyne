import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import uploadingImage from "../../public/images/image.upload.png";
import { sendImageFile } from "../../api";
import Loading from "./Loading";

type ImageUploadProps = {
    width?: number;
    height?: number;
    route?: string;
};

const ImageUpload = ({ width, height, route }: ImageUploadProps) => {
    const [isUploaded, setIsUploaded] = useState("standBy");
    // img upload 상태 : ["standBy"] "대기, 아직 아무것도 일어나지 않음" / ["loading"] "서버에 img를 보내고 결과를 기다림" / ["complete"] "결과를 저장하고 라우팅할 것"
    const router = useRouter();

    // 이미지 dnd 함수 분기 처리
    const dragEvent = (e: React.DragEvent<HTMLDivElement>, text: string) => {
        e.preventDefault();
        e.stopPropagation();
        switch (text) {
            case "dragOver":
                (e.target as HTMLElement).style.backgroundColor = "#a7c4bc";
            case "dragEnter":
                return;
            case "dragLeave":
                (e.target as HTMLElement).style.backgroundColor = "#F2F2F2";
            case "fileDrop":
                (e.target as HTMLElement).style.backgroundColor = "#F2F2F2";
                const file = e.dataTransfer.files[0];
                sendImage(file);
        }
    };

    // 서버에 이미지를 보내는 함수
    const sendImage = async (file: Blob) => {
        setIsUploaded("loading");
        const formData = new FormData();
        formData.append("image", file);
        // console.log(formData.getAll("image")); // formData에 잘 들어가는지 확인
        if (route === "recycleInfo") {
            const res = await sendImageFile("recycle-info", formData);
            const info = await res?.data?.data;
            // if (info) {
            //     localStorage.setItem(
            //         "recycleInfo",
            //         JSON.stringify(info.recycleInfo)
            //     );
            //     setIsUploaded("complete");
            // }

            if (info) {
                localStorage.setItem("recycleInfo", JSON.stringify(info)); // 페이지 라우팅 전, localStorage에 저장하여 넘어간 페이지에서 꺼내올 예정
                // 용량 제한이 된다면, sessionStorage를 이용해야하는가...
            }
        } else {
        }
        setTimeout(async () => {
            console.log("로딩중이 되나");
            setIsUploaded("complete");
        }, 5000); // 임시로 약 5초가 걸린다고 생각하고, loading component가 실행되도록 한다
    };

    useEffect(() => {
        // 완료 전까지 특별한 작업이 없고 or 프로필 업로드의 경우 특정페이지로 routing 하지 않음
        if (isUploaded !== "complete" || route !== "recycleInfo") {
            return;
        } else if (isUploaded === "complete") {
            router.push("/recycling/recycleInfo"); // 정보 페이지로 routing
        }
    }, [isUploaded]);

    return (
        <Wrapper>
            {isUploaded === "loading" ? (
                <Loading width={width} height={height} />
            ) : (
                <DragImage
                    width={width}
                    height={height}
                    onDragOver={(e) => dragEvent(e, "dragOver")}
                    onDragEnter={(e) => dragEvent(e, "dragEnter")}
                    onDragLeave={(e) => dragEvent(e, "dragLeave")}
                    onDrop={(e) => dragEvent(e, "fileDrop")}
                >
                    <Image
                        src={uploadingImage}
                        alt="uploading image"
                        width={30}
                        height={40}
                    />
                    <p>이미지를 넣어주세요!</p>
                </DragImage>
            )}
            <div>
                <InputLabel htmlFor="input-file">사진 업로드</InputLabel>
                <input
                    type="file"
                    id="input-file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => sendImage(e.target.files[0])}
                />
            </div>
        </Wrapper>
    );
};

export default ImageUpload;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DragImage = styled.div<{ width: number; height: number }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 2px dashed #a7c4bc;
    margin-bottom: 16px;
    color: #a7c4bc;
    cursor: pointer;
`;

const InputLabel = styled.label`
    cursor: pointer;
    background-color: #a7c4bc;
    color: #fff;
    padding: 7px 30px;
    border-radius: 15px;
`;
