import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import Image from "next/image";
import { post } from "../../api";

const QuillNoSSR = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    // useMemo를 써야한다는데..
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link"],
        ["clean"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
];

export default function Write({ title, setTitle, setHtmlStr }) {
    const [imgList, setImgList] = useState([]);

    // 바로 이미지를 서버로 보내 저장하지 않고, 해당 목록에서 자유자재로 삭제와 추가를 한 후, 최종 완성 시 form 파일을 만들어 보낼 예정
    // 다중 이미지 List 추가 함수
    const handleAddImages = (e: React.FormEvent<HTMLInputElement>) => {
        const images = e.currentTarget.files;
        let imageUrlLists = [...imgList];

        for (let i = 0; i < images.length; i++) {
            const currentImageUrl = URL.createObjectURL(images[i]);
            imageUrlLists.push({ show: currentImageUrl, file: images[i] });
        }

        if (imageUrlLists.length > 5) {
            imageUrlLists = imageUrlLists.slice(0, 5);
            alert("이미지는 최대 5장까지 업로드 가능합니다.");
        }
        setImgList(imageUrlLists);
    };
    // 다중 이미지 List에서 특정 이미지 제거 함수
    const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        const deleteIndex = e.currentTarget.id;
        let imageUrlLists = [...imgList];
        imageUrlLists = imageUrlLists.filter((item) => {
            return item !== imageUrlLists[deleteIndex];
        });
        setImgList(imageUrlLists);
    };

    return (
        <Wrapper>
            <ImgUploadContainer>
                <ImageWrapper>
                    {imgList.map((image, id) => (
                        <SingleGroup key={id}>
                            <Image
                                src={image.show}
                                alt={`image-${id}`}
                                width={150}
                                height={150}
                            />
                            <DeleteButton
                                id={`${id}`}
                                onClick={(
                                    e: React.MouseEvent<HTMLButtonElement>
                                ) => handleDeleteImage(e)}
                            >
                                삭제
                            </DeleteButton>
                        </SingleGroup>
                    ))}
                </ImageWrapper>
                <div>
                    <InputLabel htmlFor="input-file">사진 업로드</InputLabel>
                    <input
                        type="file"
                        multiple
                        id="input-file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleAddImages(e)
                        }
                    />
                </div>
                <AlertText>
                    ⚠ 이미지는 최대 5장까지 업로드 가능합니다.
                </AlertText>
            </ImgUploadContainer>
            <WriteWrapper>
                <InputWrapper>
                    <TitleInput
                        type="text"
                        id="title"
                        placeholder="제목을 입력해주세요."
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTitle(e.target.value)
                        }
                    />
                </InputWrapper>
                <QuillNoSSRWrapper>
                    <QuillNoSSR
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        onChange={(content, delta, source, editor) =>
                            setHtmlStr(editor.getHTML())
                        }
                    />
                </QuillNoSSRWrapper>
            </WriteWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    width: 80%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    min-height: auto;
`;
const ImgUploadContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    min-height: auto;
`;
const InputLabel = styled.label`
    cursor: pointer;
    background-color: #a7c4bc;
    color: #fff;
    padding: 7px 30px;
    border-radius: 15px;
`;
const SingleGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #a7c4bc;
    padding: 4px 4px;
    margin: 0 2px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

const AlertText = styled.p`
    font-size: 12px;
    color: red;
`;

const DeleteButton = styled.button`
    margin-top: 5px;
    font-family: Elice Digital Baeum;
    border: none;
    cursor: pointer;
    background-color: #f2f2f2;
    color: black;
    border-radius: 15px;
    width: 50px;
    height: 25px;
`;

const TitleInput = styled.input`
    font-size: 20px;
    font-family: Elice Digital Baeum;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 1.6px solid black;
`;
const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
`;

const WriteWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 500px !important;
    max-height: 1000px;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
`;

const QuillNoSSRWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;
