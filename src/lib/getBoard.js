import got from "got";
import cheerio from "cheerio";
async function getBoard(url) {
    const baseURL = `${url}`;
    const request = await got(baseURL);
    const resolver = request.body;
    const $ = cheerio.load(resolver);
    const pwsData = $("body").find("script#__PWS_DATA__").html();
    const jsonData = JSON.parse(pwsData);
    const boards = JSON.stringify(jsonData?.props?.initialReduxState?.boards);
    const feeds = jsonData?.props?.initialReduxState?.feeds;
    const pins = feeds[Object.keys(feeds)[0]];
    const length = boards.indexOf(":");
    const boardId = boards.slice(0, length).replace(/\D/g, "");
    const currentBoard = JSON.parse(boards)[`${boardId}`];
    const lastUpdatedDate = getFormattedDate(currentBoard?.board_order_modified_at);
    const createdDate = getFormattedDate(currentBoard?.created_at);
    const returnObject = {
        name: currentBoard?.name,
        description: currentBoard?.description || "",
        boardURL: currentBoard?.url,
        coverURL: currentBoard?.image_cover_hd_url || "",
        pinCounts: currentBoard?.pin_count,
        followersCount: currentBoard?.follower_count,
        id: currentBoard?.id,
        pins: pins,
        sectionsCount: currentBoard?.section_count,
        author: {
            username: currentBoard?.owner?.username,
            displayName: currentBoard?.owner?.full_name,
            id: currentBoard?.owner?.id,
            avatarURL: currentBoard?.owner?.image_medium_url,
        },
        createdAt: createdDate,
        lastUpdatedAt: lastUpdatedDate,
    };
    return returnObject;
}
export default getBoard;
function getFormattedDate(time) {
    const date = new Date(time);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return `${day} ${month}, ${year}`;
}
