declare type ITypes = "image" | "video";
interface IOptions {
    type?: ITypes;
    page?: number;
}
export default function searchPins(query: string, options?: IOptions): Promise<import("../typings/ISearchPinsResults.js").SearchResults[]>;
export {};
