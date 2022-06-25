//테스트 위해서 주석 처리
// import { parentPort, workerData } from "worker_threads";
// import { GarbageDetector, MODELDIR } from "./od/garbageDetector.mjs";

// //GarbageDetector 모델 생성
// const detector = new GarbageDetector(MODELDIR);
// await detector.init().then(() => {
//   //초기화 정상적으로 완료 : true
//   console.log(detector.initDone);
// });

// parentPort.on("message", async (imgBuffer) => {
//   if (!detector.initDone) {
//     console.log("초기화 실패");
//   }

//   const result = await detector.guess(imgBuffer);
//   console.log(workerData);

//   // return the result to main thread.
//   parentPort.postMessage(result);
// });
