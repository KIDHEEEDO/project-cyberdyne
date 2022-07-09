import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// 모바일 기기
export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    const mobile = useMediaQuery({ query: "(max-width: 500px)" }); // 600 이나 500 정도
    useEffect(() => {
        setIsMobile(mobile);
    }, [mobile]);

    return isMobile;
}

// 패드 류, 미들
export function useIsMiddle() {
    const [isMiddle, setIsMiddle] = useState(false);
    const Middle = useMediaQuery({ query: "(max-width: 900px)" });
    useEffect(() => {
        setIsMiddle(Middle);
    }, [Middle]);

    return isMiddle;
}

// 와이드
export function useIsWide() {
    const [isWide, setIsWide] = useState(false);
    const Wide = useMediaQuery({ query: "(max-width: 1224px)" });
    useEffect(() => {
        setIsWide(Wide);
    }, [Wide]);

    return isWide;
}
