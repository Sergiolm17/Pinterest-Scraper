import retrievePins from "../helpers/retrievePins.js";
import { parse } from "../parsers/parse.js";
export default async function searchPins(query, options) {
    if (!query)
        throw new Error("No query specified");
    if (typeof query !== "string")
        throw new Error("You can only pass a string as query.");
    if (options?.type === "video") {
        const response = await parse(query);
        return response;
    }
    else {
        const response = await retrievePins(query);
        return response;
    }
}
