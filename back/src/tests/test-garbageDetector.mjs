import assert from "assert/strict";
import * as fs from "fs";
import * as fsp from "fs/promises";
import path from "path";
import { performance, PerformanceObserver } from "perf_hooks";
import url from "url";

import { AppError } from "../utils/errors.js";
import { GarbageDetector } from "../utils/od/garbageDetector.mjs";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => console.log(entry));
});
obs.observe({ entryTypes: ["measure"], buffer: true });

/** 테스트를 수행하고 성공 여부를 객체로 반환합니다. */
const main = async () => {
  const result = {};

  // 1. 말도 안되는 경로를 집어넣고 에러를 제대로 내는지 봅니다.
  console.info(`** Testing bailout functionality **\n`);
  performance.mark(`1.start`);

  try {
    assert.throws(
      () => {
        new GarbageDetector(`ham/jam/spam.eggs`);
      },
      AppError,
      `Failed to ignore ridiculous path`
    );
    result[`Bailout test`] = true;
  } catch (error) {
    result[`Bailout test`] = false;
    console.info(error);
  }

  performance.mark(`1.end`);
  performance.measure(`1`, `1.start`, `1.end`);
  console.log(`\n`);

  // 2. 모델을 만듭니다.
  console.info(`** Trying to load a valid model **\n`);
  performance.mark(`2.start`);

  let detector;
  try {
    const modelPath = path.resolve(
      __dirname,
      `..`,
      //   `utils/od/gdmodel/weights/last_web_model/model.json`,
      `utils/od/gdmodel/weights/last_saved_model`
    );
    console.info(`model's absolute path is "${modelPath}"`);
    detector = new GarbageDetector(modelPath);
    await detector.init();
    console.info(detector);
    result[`Model loading test`] = true;
  } catch (error) {
    result[`Model loading test`] = false;
    return result;
  } finally {
    performance.mark(`2.end`);
    performance.measure(`2`, `2.start`, `2.end`);
  }
  console.log(`\n`);

  // 이미지를 하나 넣어 봅니다.
  console.info(`** Inference i/o format test **\n`);
  performance.mark(`3.start`);

  const imagePath = path.join(__dirname, `test-images`, `11-bicycle.jpg`);
  try {
    fsp.access(imagePath, fs.constants.R_OK);
  } catch (error) {
    console.info(`FAIL: "${imagePath}" file not found, aborting`);
    return result;
  }
  const image = await fsp.readFile(imagePath);
  const res = await detector.guess(image);
  console.info(res);
  try {
    assert(
      res[0].classId === 11 &&
        res[0].imageWidth === 320 &&
        res[0].imageHeight === 320 &&
        res[0].name("en") === "bicycle" &&
        res[0].name("ko") === "자전거" &&
        res[0]._xyxy.length === 4
    );
    result[`Inference io format test`] = true;
  } catch (error) {
    result[`Inference io format test`] = false;
  }

  performance.mark(`3.end`);
  performance.measure(`3`, `3.start`, `3.end`);
  console.log(`\n`);

  // 이미지를 많이 넣어 봅니다!
  console.info(`** Batch inference time measure **\n`);
  performance.mark(`4.start`);

  const fileNames = await fsp.readdir(path.join(__dirname, `test-images`));
  const detections = await Promise.all(
    fileNames.map(async (fileName) => {
      const pathName = path.join(__dirname, `test-images`, fileName);
      const res = await detector.guess(await fsp.readFile(pathName));
      return { input: fileName, ouput: res.map((d) => d.classId) };
    })
  );
  console.info(`detections: `, detections);

  performance.mark(`4.end`);
  performance.measure(`4`, `4.start`, `4.end`);

  return result;
};

main().then((res) => console.info(res));
