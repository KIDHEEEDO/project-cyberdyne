import { useEffect } from "react";
import WasteInfo from "../../public/wasteInfo.json";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  mapData: string[] | null;
  setClickData: any;
}

const addressData = Array.from(new Set(WasteInfo.map((data) => data.address)));

function Map({ mapData, setClickData }: MapProps) {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(mapScript);

    useEffect(() => {
        setClickData(null);
        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                // 지도 생성
                const mapContainer = document.getElementById('map'), // 지도를 표시할 div  
                    mapOption = { 
                        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3        // 지도의 확대 레벨
                    };
                const map = new window.kakao.maps.Map(mapContainer, mapOption)
                const geocoder = new window.kakao.maps.services.Geocoder(); // 주소로 좌표를 검색

                // 조건 좌표 출력
                if (mapData !== null) {
                    geocoder.addressSearch(mapData[0]["address"], function (result, status) {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const coords  = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                            const mapContainer = document.getElementById('map'), // 지도를 표시할 div  
                                mapOption = { 
                                    center: coords,
                                    level: 3   
                                };
                            ;
                            const map = new window.kakao.maps.Map(mapContainer, mapOption)
                            
                            // 결과값을 마커로 표시
                            const marker = new window.kakao.maps.Marker({
                                map: map,
                                position: coords,
                            });
                            // 지도의 중심을 결과값으로 받은 위치로 이동
                            marker.setMap(map);

                            const mapData = WasteInfo.filter((data) => data.address === result[0].address_name)
                            setClickData(mapData)
                        }
                    })
                } else { 
                    // 현재 위치 받아오는 함수
                    navigator.geolocation.getCurrentPosition((pos) => {
                        const currentPos = new window.kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
                        let nearesetDistance = 10000;
                        // 모든 좌표 출력
                        for (var i=0; i < addressData.length; i++) {
                            geocoder.addressSearch(addressData[i], function (result, status) {
                                if (status === window.kakao.maps.services.Status.OK) {
                                    const coords  = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                                    
                                    // 결과값을 마커로 표시
                                    const marker = new window.kakao.maps.Marker({
                                        map: map,
                                        position: coords,
                                    });

                                    // 현재 위치와 가장 가까운 마커로
                                    const distance = new window.kakao.maps.Polyline({
                                        path: [currentPos, coords]
                                    });
                                    const dist = distance.getLength(); // m 단위로 리턴

                                    if (dist < nearesetDistance) {
                                        nearesetDistance = dist;
                                        map.panTo(coords); // 지도 이동
                                        const mapData = WasteInfo.filter((data) => data.address === result[0].address_name)
                                        setClickData(mapData)
                                    }

                                    window.kakao.maps.event.addListener(marker, 'click', function() {
                                        const mapData = WasteInfo.filter((data) => data.address === result[0].address_name)
                                        setClickData(mapData)
                                    });
                                }
                            })
                        }
                        
                    })
                }
            });
        };
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [mapData]);
    
    return (
        <div id="map" />
    );
}

export default Map;
