export function findList(totalInfo, action) {
    switch (action.route) {
        case "SEARCH":
            return {
                ...totalInfo,
                type: action.infos[0]?.category,
                infoList: action.infos,
            };
        case "IMAGE":
            return {
                ...totalInfo,
                type: action.infos?.category,
                infoList: action.infos?.recycleInfo,
            };
        default:
            return alert("결과가 없습니다");
    }
}
