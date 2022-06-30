import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useRef,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import uploadingImage from "../../public/images/image.upload.png";
import { sendImageFile, sendProfileFile } from "../../api";
import Loading from "./Loading";

type ImageUploadProps = {
    width?: number;
    height?: number;
    route?: string;
    setProfileImage?: any;
    setOpenInfo?: Dispatch<SetStateAction<boolean>>;
    setInfo?: Dispatch<SetStateAction<Object>>;
    setImgUrl?: any;
};

const matchType = [
    "종이류",
    "플라스틱류",
    "유리병",
    "캔류",
    "고철류",
    "의류",
    "전자제품",
    "스티로폼",
    "도기류",
    "비닐류",
    "가구",
    "자전거",
    "형광등",
    "페트병류",
    "나무류",
];

const ImageUpload = ({
    width,
    height,
    route,
    setProfileImage,
    setOpenInfo,
    setInfo,
    setImgUrl,
}: ImageUploadProps) => {
    const [isUploaded, setIsUploaded] = useState("standBy");
    // img upload 상태 : ["standBy"] "대기, 아직 아무것도 일어나지 않음" / ["loading"] "서버에 img를 보내고 결과를 기다림" / ["complete"] "결과를 저장하고 라우팅할 것"
    const router = useRouter();
    const inputRef = useRef();

    // 이미지 dnd 함수 분기 처리
    const dragEvent = (e: React.DragEvent<HTMLDivElement>, text: string) => {
        e.preventDefault();
        e.stopPropagation();
        switch (text) {
            case "dragEnter":
                break;
            case "dragOver":
                return ((e.target as HTMLElement).style.backgroundColor =
                    "#a7c4bc");
            case "dragLeave":
                return ((e.target as HTMLElement).style.backgroundColor =
                    "#F2F2F2");
            case "fileDrop":
                (e.target as HTMLElement).style.backgroundColor = "#F2F2F2";
                if (e.dataTransfer.items[0].kind !== "file") {
                    alert("파일로 업로드 가능합니다.");
                    location.reload();
                } // FILE로 업로드 안 하는 경우 alert
                const file = e.dataTransfer.files[0];
                findAllowableExt(file);
        }
    };
    // 확장자 제어를 위한 함수
    const findAllowableExt = (file: File) => {
        const ext = file.name.split(".").pop(); // 파일 확장자 뽑아오기
        const allowExt = "jpeg,jpg,png,gif,bmp";
        const found = allowExt.match(ext); // found 가 null 이면 불가능한 확장자, 확장자 반환 시 true
        if (!found) {
            alert("파일 확장자는 jpeg, jpg, png, gif, bmp 만 가능합니다!");
            location.reload();
        } else {
            sendImage(file);
        }
    };
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
            // console.log(formData.getAll("image")); // formData에 잘 들어가는지 확인
            if (route === "recycleInfo") {
                const res = await sendImageFile("recycle-info/img", formData);
                const info = res?.data?.data.imgInfo;
                setInfo(info);
                setIsUploaded("complete");
                setOpenInfo(true);
            } else {
                const res = await sendProfileFile(
                    "upload/profile-img",
                    formData
                );
                const imageRoute = res.data.data;
                setProfileImage(imageRoute);
                setIsUploaded("complete");
            }
        } catch (e) {
            console.error(e);
            alert("다시 시도 해주세요!");
            location.reload();
        }
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
                    ref={inputRef}
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
                <InputLabel htmlFor="input-file" ref={inputRef}>
                    사진 업로드
                </InputLabel>
                <input
                    type="file"
                    id="input-file"
                    accept=".gif, .jpg, .png, .jpeg, .bmp"
                    style={{ display: "none" }}
                    onChange={(e) => findAllowableExt(e.target.files[0])}
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
