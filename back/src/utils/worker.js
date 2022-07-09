import { parentPort, workerData } from "worker_threads";
import { GarbageDetector, Detection, MODELDIR } from "./od/garbageDetector.mjs";

//GarbageDetector 모델 생성
const detector = new GarbageDetector(MODELDIR);
await detector.init().then(() => {
  //초기화 정상적으로 완료 : true
  console.log("AI model initialized");
});

parentPort.on("message", async (imgBuffer) => {
  console.log(workerData);
  if (detector.initDone) {
    const inferences = await detector.guess(imgBuffer);
    // 반환값은 Detection 인스턴스의 배열입니다.

    for (const obj of inferences) {
      obj.xyxy = obj.xyxy([1, 1], true);
      obj.xywh = obj.xywh([1, 1], true);
    }
    // return the result to main thread.
    parentPort.postMessage(inferences);
  }
});
