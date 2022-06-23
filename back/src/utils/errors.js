const {
  STATUS_400_BADREQUEST,
  STATUS_500_INTERNALSERVERERROR,
} = require("./status.js");

/** 기본 `Error` 타입에 더 구체적인 정보를 담을 수 있도록 확장한 범용 에러입니다. */
class AppError extends Error {
  static status = STATUS_500_INTERNALSERVERERROR;
  static operational = false;
  static logas = "warn";
  /** 더 구체적인 정보를 담을 수 있도록 확장한 범용 에러입니다.
   *
   * @arg {{
   *  name?: string,
   *  status?: number,
   *  operational?: boolean,
   *  logas?: string,
   *  detail?: any
   * }} kwargs - 일부는 생략 가능합니다. 전부 생략하려면 `{}`를 줍니다.
   *    - `name`: 기본값 `this.constructor.name` = `"AppError"`
   *    - `status`: http status code입니다. 기본값 `500 Internal Server Error`
   *    - `operational`: 거짓이면 프로세스를 끝냅니다. 기본값 `false`
   *    - `logas`: 거짓값이 아니면 해당 메소드를 사용해 로그합니다. 기본값 `warn`
   *    - `detail`: 에러 분류를 돕기 위한 추가 정보입니다.
   * @arg {string} [message] - `Error` 컨스트럭터로 릴레이할 메시지입니다.
   * @arg {{cause: Error}} [options] - `{ cause?: Error }`
   * @arg {string} [fileName]
   * @arg {number} [lineNumber]
   */
  constructor({ name, status, operational, logas, detail }, ...params) {
    super(...params);
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = name ?? this.constructor.name;
    this.status = status ?? this.constructor.status;
    this.operational = operational ?? Boolean(this.constructor.operational);
    // logas가 아예 없으면 기본값을 쓰고, 그 외 거짓값이면 받아들입니다.
    this.logas = logas === undefined ? this.constructor.logas : logas;
    this.detail = detail;
  }
}

/** `AppError` 타입을 Bad Request 용으로 쓰기 편하게 확장한 에러입니다. */
class RequestError extends AppError {
  static status = STATUS_400_BADREQUEST;
  static operational = true;
  static logas = "info";
  /** `AppError` 타입을 Bad Request 용으로 쓰기 편하게 확장한 에러입니다.
   *
   * @arg {{
   *  name?: string,
   *  status?: number,
   *  operational?: boolean,
   *  logas?: string,
   *  detail?: any
   * }} kwargs - 일부는 생략 가능합니다. 전부 생략하려면 `{}`를 줍니다.
   *    - `name`: 기본값 `this.constructor.name` = `"RequestError"`
   *    - `status`: http status code입니다. 기본값 `400 Bad Request`
   *    - `operational`: 거짓이면 프로세스를 끝냅니다. 기본값 `true`
   *    - `logas`: 거짓값이 아니면 해당 메소드를 사용해 로그합니다. 기본값 `info`
   *    - `detail`: 에러 분류를 돕기 위한 추가 정보입니다.
   * @arg {string} [message] - `Error` 컨스트럭터로 릴레이할 메시지입니다.
   * @arg {{cause: Error}} [options] - `{ cause?: Error }`
   * @arg {string} [fileName]
   * @arg {number} [lineNumber]
   */
  constructor({ name, status, operational, logas, detail }, ...params) {
    super(...arguments);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

module.exports = { RequestError, AppError };
