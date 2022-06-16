import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
}

function Map({ latitude, longitude }: MapProps) {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services,clusterer,drawing`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const geocoder = new window.kakao.maps.services.Geocoder();
        
        // 주소로 좌표를 검색
        geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {
          // 정상적으로 검색이 완료됐으면 
          if (status === window.kakao.maps.services.Status.OK) {
            const options = {
              center: new window.kakao.maps.LatLng(result[0].y, result[0].x),
            };
            const map = new window.kakao.maps.Map(container, options);
            const coords  = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            // 결과값을 마커로 표시
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords ,
            });
            // 지도의 중심을 결과값으로 받은 위치로 이동
            marker.setMap(map);
          }
        })
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);
  
  return (
    <div id="map" />
  );
}

export default Map;