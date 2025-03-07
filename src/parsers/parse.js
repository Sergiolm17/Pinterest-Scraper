import got from "got";
import cheerio from "cheerio";
import { getRandomAgent } from "../helpers/getRandomAgents.js";
export async function parse(query, page) {
    const queryPage = !page ? 0 : page;
    const stringPage = String(queryPage);
    const pageToScrape = stringPage.includes("0")
        ? queryPage
        : Number(`${queryPage - 1}0`);
    const results = [];
    const userAgent = getRandomAgent(false);
    let header = {
        "User-Agent": `${userAgent}`,
    };
    const url = `https://www.google.com/search?q=${query}:site"pinterest.com"&tbm=vid&gl=us&hl=en&start=${pageToScrape}`;
    const request = await got(url, { headers: header });
    const body = request.body;
    const $ = cheerio.load(body);
    $(".MjjYud ").map((index, el) => {
        const text = $(el).find(".DhN8Cf").find("a").find("h3").text()?.trim();
        const url = $(el).find(".DhN8Cf").find("a").attr("href");
        const pinId = url?.replace(/^\D+/g, "").replace("/", "")?.trim();
        const data = {
            title: text,
            url,
            id: pinId,
            image: "",
        };
        results.push(data);
    });
    return results;
}
