import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

//s3 관련 정보
const {
  REGION: region,
  AWS_ACCESS_KEY: accessKey,
  AWS_SECRET_KEY: secretKey,
  BUCKET_NAME: bucketName,
} = process.env;

const bucket = bucketName;
const s3 = new AWS.S3({
  region: region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

//POST /upload/profile-img
const uploadProfileImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `profile_img/${Date.now()}_${file.originalname}`);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

//POST /upload/post-img
const uploadPostImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `post_img/${Date.now()}_${file.originalname}`);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

export { uploadPostImage, uploadProfileImage };
