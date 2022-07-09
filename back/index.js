import app from "./src/app.js";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT || 5001;
// const swaggerDefinition = {
//   openapi: "3.0.0",
//   info: {
//     title: "Skynet API | Cyberdyne Korea",
//     version: "1.0.0",
//     description: "API 문서입니다.",
//   },
//   servers: [
//     {
//       url: `http://localhost:${PORT}`,
//       description: "Development server",
//     },
//   ],
// };
// const options = {
//   swaggerDefinition,
//   // Paths to files containing OpenAPI definitions
//   apis: ["./src/routers/*.js"],
// };
// const swaggerSpec = swaggerJSDoc(options);

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
