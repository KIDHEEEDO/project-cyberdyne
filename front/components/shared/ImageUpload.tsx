import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import uploadingImage from "../../public/images/image.upload.png";
import { sendImageFile } from "../../api";

type ImageUploadProps = {
    width?: number;
    height?: number;
};

const ImageUpload = ({ width, height }: ImageUploadProps) => {
    const router = useRouter(); // 페이지 이동을 위해 useRouter 적용
    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        (e.target as HTMLElement).style.backgroundColor = "#a7c4bc";
    };

    const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        (e.target as HTMLElement).style.backgroundColor = "#F2F2F2";
    };

    const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        (e.target as HTMLElement).style.backgroundColor = "#F2F2F2";
        const file = e.dataTransfer.files[0];
        sendImage(file);
    };

    // 서버에 이미지를 보내는 함수
    const sendImage = async (file: Blob) => {
        // console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        // console.log(formData.getAll("image")); // formData에 잘 들어가는지 확인
        // const res = await --> 이 후 서버에 post로 해당 formData와 같이 보낼 예정
        // 로딩 중 모션 적용 필요!!!!
        const res = await sendImageFile("recycle-info", formData);
        const info = res.data.data;
        localStorage.setItem(
            `${info.category}`,
            JSON.stringify(info.recycleInfo)
        );

        await router.push(
            `/recycling/recycleInfo/?category=${info.category}`,
            "/recycling/recycleInfo/"
        ); // 정보 페이지로 routing
    };

    return (
        <Wrapper>
            <DragImage
                width={width}
                height={height}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
            >
                <Image
                    src={uploadingImage}
                    alt="uploading image"
                    width={30}
                    height={40}
                />
                <p>이미지를 넣어주세요!</p>
            </DragImage>
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
