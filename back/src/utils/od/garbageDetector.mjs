// import { Buffer } from "buffer";
import * as fs from "fs";
import path from "path";
import url from "url";

import tf from "@tensorflow/tfjs-node";

import { AppError } from "../errors.js";
import * as status from "../status.js";

/** 모듈 사용법
 *
 * ```js
 * const { GarbageDetector, MODELDIR } = require("path/to/garbageDetector.mjs");
 * import { GarbageDetector, MODELDIR } from "path/to/garbageDetector.mjs";
 * ```
 *
 * 메소드별 자세한 사용법은 `vscode`의 인텔리센스를 활용해 주세요.
 */

const CLASSES_KO = [
  "종이류",
  "플라스틱류",
  "유리병류",
  "캔류",
  "고철류",
  "의류",
  "전자제품",
  "스티로폼류",
  "도기류",
  "비닐류",
  "가구류",
  "자전거",
  "형광등",
  "페트병류",
  "나무류",
];
const CLASSES_EN = [
  "paper",
  "plastic goods",
  "glass bottle",
  "can",
  "scrap metal",
  "clothing",
  "electric",
  "styrofoam",
  "ceramic",
  "plastic bag",
  "furniture",
  "bicycle",
  "lamp",
  "PET bottle",
  "wood",
];
const CLASSNAMES = { en: CLASSES_EN, ko: CLASSES_KO };

/** `back/src/utils/od/gdmodel`의 절대 경로입니다.
 *
 * @const {string} MODELDIR
 *
 * `gdmodel` 경로는 git이 무시하는 위치이기 때문에 크기가 큰 인공지능 모델을 두기 좋습니다.
 * `MODELDIR`의 사용 여부는 자유이지만, 편의성을 위해 추가된 상수입니다.
 *
 * ### 예제
 * ```js
 * // (예시 경로)
 * // /home/elice/project-cyberdyne/back/src/utils/od/gdmodel/myAwesomeModel
 * const modelPath = path.join(MODELDIR, "myAwesomeModel");
 * ```
 */
const MODELDIR = path.resolve(
  path.join(path.dirname(url.fileURLToPath(import.meta.url)), "gdmodel")
);

/** 인공지능이 찾은 물건 하나를 표현하는 자료형입니다.
 * `GarbageDetector.guess` 메소드는 `Detection`의 배열을 반환합니다.
 *
 * > (주의) `Detection` 오브젝트는 사용자가 직접 만들 일이 없습니다!
 *
 * ### 예제
 * ```js
 * const obj = new Detection(11, 0.8, [0.2, 0.4, 0.6, 0.8], [640, 480])
 *
 * obj.classId      // 11
 * obj.confidence   // 0.8
 * obj.imageWidth   // 640
 * obj.imageHeight  // 480
 * obj.name('ko')   // '자전거'
 * obj.name('en')   // 'bicycle'
 * obj.xyxy()       // [128, 256, 288, 384]
 * obj.xywh()       // [208, 320, 160, 128]
 * ```
 *
 * ### 프로퍼티
 *
 * - `Detection.classId: int`
 * - `Detection.confidence: float`
 * - `Detection.imageWidth: number`, `Detection.imageHeight: number`
 *
 * ### 메소드
 *
 * - `Detection.name(lang: string)` - 물체의 분류 이름을 반환합니다.
 * - `Detection.xyxy(
 *      dim: number[] = [this.imageWidth, this.imageHeight],
 *      decimal: boolean = false
 *    )` - `xyxy` 형식으로 바운딩 박스 좌표를 반환합니다.
 * - `Detection.xywh(
 *      dim: number[] = [this.imageWidth, this.imageHeight],
 *      decimal: boolean = false
 *    )` - `xywh` 형식으로 바운딩 박스 좌표를 반환합니다.
 */
class Detection {
  #_xyxy = null;
  #_xywh = null;
  /**
   * @arg {number} classId - 물체가 속한 클래스의 인덱스 값입니다.
   * @arg {number} confidence - 인공지능이 정답을 확신하는 정도입니다.
   * @arg {[number, number, number, number]} xyxy -
   *  바운딩 박스의 왼쪽 위, 오른쪽 아래 상대 좌표값의 배열입니다.
   * @arg {[number, number]} dim - 이미지의 가로, 세로 치수의 배열입니다.
   */
  constructor(classId, confidence, xyxy, dim = [1.0, 1.0]) {
    this.classId = classId;
    this.confidence = confidence;
    this.imageWidth = dim[0];
    this.imageHeight = dim[1];
    this.#_xyxy = xyxy;
  }

  /** 물체의 분류 이름을 반환합니다.
   *
   * @arg {string} lang - `'en'`, `'ko'` 둘 중 하나입니다.
   *  둘 중 하나가 아닌 값이면 `AppError[ValueError]`를 던집니다.
   * @return {string} name - 분류 이름을 반환합니다.
   */
  name(lang) {
    if (lang in CLASSNAMES) {
      return CLASSNAMES[lang][this.classId];
    } else {
      throw new AppError(
        {
          name: `ValueError`,
          operational: true,
          detail: {},
        },
        `Unknown language "${lang}"`
      );
    }
  }

  /** `xyxy` 형식으로 바운딩 박스 좌표를 반환합니다.
   *
   * @arg {number[]} dim - 이미지의 가로, 세로 치수의 배열입니다.
   *  기본값은 원본 이미지의 치수입니다.
   * @arg {boolean} decimal - `true`이면 좌표의 소수점 아래 값을 보존합니다.
   *    기본값은 `false`입니다.
   * @return {number[]} xyxy
   *  - `dim` 값에 맞춰 계산한 `[ x1, y1, x2, y2]` 형식을 반환합니다.
   *  - `decimal` 인자가 `false`이면 좌표값을 가까운 정수로 반올림합니다.
   */
  xyxy(dim = [this.imageWidth, this.imageHeight], decimal = false) {
    const [width, height] = dim;
    const coord = [
      this.#_xyxy[0] * width,
      this.#_xyxy[1] * height,
      this.#_xyxy[2] * width,
      this.#_xyxy[3] * height,
    ];
    return decimal ? coord : coord.map((v) => Math.round(v));
  }

  /** `xywh` 형식으로 바운딩 박스 좌표를 반환합니다.
   *
   * @arg {number[]} dim - 이미지의 가로, 세로 치수의 배열입니다.
   *  - 기본값은 원본 이미지의 치수입니다.
   * @arg {boolean} decimal - `true`이면 좌표의 소수점 아래 값을 보존합니다.
   *    기본값은 `false`입니다.
   * @return {number[]} xyxy
   *  - `dim` 값에 맞춰 계산한 `[ xc, yc, w, h]` 형식을 반환합니다.
   *    `xc`, `yc`는 각각 바운딩 박스 중앙 지점의 좌표입니다.
   *  - `decimal` 인자가 `false`이면 좌표값을 가까운 정수로 반올림합니다.
   */
  xywh(dim = [this.imageWidth, this.imageHeight], decimal = false) {
    if (this.#_xywh === null) {
      this.#_xywh = new Float32Array([
        (this.#_xyxy[0] + this.#_xyxy[2]) / 2.0,
        (this.#_xyxy[1] + this.#_xyxy[3]) / 2.0,
        this.#_xyxy[2] - this.#_xyxy[0],
        this.#_xyxy[3] - this.#_xyxy[1],
      ]);
    }
    const [width, height] = dim;
    const coord = [
      this.#_xywh[0] * width,
      this.#_xywh[1] * height,
      this.#_xywh[2] * width,
      this.#_xywh[3] * height,
    ];
    return decimal ? coord : coord.map((v) => Math.round(v));
  }
}

/** 쓰레기 분류 인공지능의 추론 인터페이스입니다.
 *
 * 인스턴스를 생성한 후에는 반드시 `init()` 메소드를 호출해야 합니다.
 * 초기화되지 않은 상태에서 사용할 경우 `AppError[DetectionError]`를 던집니다.
 *
 * `guess` 메소드의 반환 형식은 `Detection` 인스턴스의 배열입니다.
 * `Detection` 자료형에 대한 문서를 참조해 주세요.
 *
 * ### 예제
 *
 * - `tests/test-garbageDetector.mjs` 파일에도 예제가 있습니다.
 *
 * ```js
 * const detector = new GarbageDetector(
 *   path.join(MODELDIR, `path/to/model/dir/or.json`)
 * )
 * detector.init().then(
 *    () => console.log(`AI model initialized`)
 * )
 *
 * if (detector.initDone) {
 *    const inferences = await detector.guess(
 *      Buffer.from(image_b64, `base64`)
 *    )
 *    // 반환값은 Detection 인스턴스의 배열입니다.
 *    for (const obj of inferences) {
 *      console.log(obj.name('ko'))   // '전자제품', etc.
 *    }
 * }
 * ```
 *
 * ### 프로퍼티
 *
 * - `GarbageDetector.initDone`: `boolean`
 * - `GarbageDetector.model`: `tf.node.TFSavedModel`
 * - `GarbageDetector.modelPath`: `string`
 *
 * ### 메소드
 *
 * - `async GarbageDetector.init()` - 모델을 준비합니다.
 * - `async GarbageDetector.guess(image: Buffer)` -
 *  이미지에서 쓰레기를 찾아 분류합니다.
 */
class GarbageDetector {
  /**
   * @arg {string} modelPath - 모델 경로입니다.
   *  - 경로가 잘못되는 등 읽을 수 없으면 `AppError[OSError]`를 던집니다.
   *    `AppError.detail` 프로퍼티는 파일의 `stats` 정보를 담고 있거나,
   *    존재하지 않는 파일이었다면 빈 객체입니다.
   */
  constructor(modelPath) {
    try {
      fs.accessSync(modelPath, fs.constants.R_OK);
    } catch {
      const stats = fs.statSync(modelPath, { throwIfNoEntry: false });
      throw new AppError(
        {
          name: "OSError",
          operational: true,
          detail: stats ?? {},
        },
        `"${path.resolve(modelPath)}" file not readable`
      );
    }

    this.modelPath = modelPath;
    this.model = null;
    this.initDone = false;
  }

  /** 모델을 준비합니다. 인스턴스 생성 후 반드시 이 메소드를 호출하세요. */
  async init() {
    const stats = fs.statSync(this.modelPath);
    if (stats.isFile()) {
      // web model 포맷입니다.
      const handler = tf.io.fileSystem(modelPath);
      this.model = await tf.loadGraphModel(handler);
    } else {
      // saved model 포맷입니다.
      this.model = await tf.node.loadSavedModel(this.modelPath);
    }
    this.initDone = true;
  }

  /** 이미지에서 쓰레기를 찾아 분류합니다.
   *
   * 이미지 한 장에 물체가 여러 개 있을 수도 있기 때문에,
   * 이 메소드는 찾아낸 물체 정보를 배열 형태로 반환합니다.
   *
   * `GarbageDetector` 인스턴스를 초기화하지 않고 이 메소드를 사용할 경우
   * `AppError[DetectionError]`를 던집니다.
   *
   * @arg {Buffer} image - 해독되지 않은 이미지 버퍼입니다.
   *  bmp, gif, jpeg, png 포맷을 해독 가능합니다.
   *  - 이미지 디코딩에 실패하면 `AppError[ImageDecodeError]`를 던집니다.
   *    에러 인스턴스는 `AppError.detail.message` 프로퍼티에 디코딩 중에 나온
   *    원래 에러 메시지를 담고 있습니다.
   * @return {Detection[]} detections -
   *  `Detection` 인스턴스의 배열을 반환합니다.
   *  각각의 `Detection`은 인공지능이 발견한 물체 하나에 대한 정보를 담고 있습니다.
   */
  async guess(image) {
    if (!this.initDone) {
      throw new AppError(
        {
          name: `DetectionError`,
          status: status.STATUS_503_SERVICEUNAVAILABLE,
          operational: true,
          detail: {},
        },
        `AI is not ready`
      );
    }
    let image_;
    try {
      image_ = tf.node.decodeImage(image, 3);
    } catch (error) {
      throw new AppError(
        {
          name: `ImageDecodeError`,
          operational: true,
          detail: { message: error.message },
        },
        `Image format is unknown`
      );
    }
    const [height, width] = image_.shape;
    const dim = [width, height];

    const input = tf.image
      .resizeBilinear(image_, [320, 320])
      .div(255.0)
      .expandDims(0);

    const raw = this.model.predict(input);
    let [boxes, confidences, classIds, numDetections] = raw;
    numDetections = numDetections.dataSync();
    classIds = classIds.dataSync().slice(0, numDetections);
    confidences = confidences.dataSync().slice(0, numDetections);
    boxes = boxes.dataSync().slice(0, numDetections * 4);

    // 반환값은 Detection의 배열입니다.
    const result = [];
    for (let idx = 0; idx < numDetections; idx++) {
      result.push(
        new Detection(
          classIds[idx],
          confidences[idx],
          boxes.slice(idx * 4, (idx + 1) * 4),
          dim
        )
      );
    }

    return result;
  }
}

// 타입힌팅 및 인텔리센스를 돕기 위해 Detection 클래스도 익스포트합니다.
export { GarbageDetector, Detection, MODELDIR };
