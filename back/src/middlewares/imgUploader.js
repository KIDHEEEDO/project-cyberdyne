const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const {
  REGION: region,
  AWS_ACCESS_KEY: accessKey,
  AWS_SECRET_KEY: secretKey,
} = process.env;

const bucket = "team9-cyberdyne";
const s3 = new AWS.S3({
  region: region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

//이미지 업로드
const upload = multer({
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

module.exports = upload;
