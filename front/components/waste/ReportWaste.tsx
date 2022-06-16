import React from "react";
import ReportWasteStyle from "../../styles/ReportWaste.module.css";
import Search from "./Search"
import Map from "./Map"

const ReportWaste = () => {
  return (
    <div>
      <div className={ReportWasteStyle.mapform_wrapper}>
        <h1>우리동네 대형폐기물 신고하기</h1>
        <p className={ReportWasteStyle.mapform_text}>
          {"대형폐기물은 구청/주민센터에서 납부 필증을 구매 후 버려야합니다.\n우리동네 어디에서 신고할 수 있는지 알아볼까요?"}
        </p>
        <div className={ReportWasteStyle.mapform}>
          <h2 className={ReportWasteStyle.mapform_title}>우리동네 사이트 찾기</h2>
          <div>
            <Search />
          </div>
          <div id="map" className={ReportWasteStyle.map}>
            <Map latitude={33.450701} longitude={126.570667} />
          </div>
        </div>
        <p>Tip! 대형폐기물은 무료로  수거가 가능하기도 해요!</p>
      </div>
    </div>
  );
};

export default ReportWaste;