import googlethis from "googlethis";
import { GOOGLE_IMG_SCRAP } from "google-img-scrap";
export default async function retrievePins(q) {
    const query = `${q}    site:"pinterest.com"`;
    const pins = [];
    const V1 = await GOOGLE_IMG_SCRAP({
        search: `${q}`,
        domains: ["pinterest.com"],
        limit: 20,
    });
    const V2 = await googlethis.image(query);
    for (const response of V1.result) {
        pins.push({
            title: response.title,
            image: response.url,
            url: response.originalUrl,
        });
    }
    for (const response of V2) {
        pins.push({
            title: response.origin.title,
            image: response.url,
            url: response.origin.website.url,
        });
    }
    return pins;
}
