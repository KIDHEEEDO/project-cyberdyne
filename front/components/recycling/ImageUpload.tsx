import React from "react";
import Image from "next/image";
import uploadingImage from "../../public/image.upload.png";
import imgUploadStyles from "../../styles/ImgUpload.module.css";

const ImageUpload = () => {
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

    const sendImage = async (file: Blob) => {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData.getAll("file")); // formData에 잘 들어가는지 확인
        // const res = await --> 이 후 서버에 post로 해당 formData와 같이 보낼 예정
    };

    return (
        <div
            className="container"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                className={imgUploadStyles.dragImage}
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
            </div>
            <div>
                <label
                    htmlFor="input-file"
                    className={imgUploadStyles.inputLabel}
                >
                    사진 업로드
                </label>
                <input
                    type="file"
                    id="input-file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => sendImage(e.target.files[0])}
                />
            </div>
        </div>
    );
};

export default ImageUpload;
