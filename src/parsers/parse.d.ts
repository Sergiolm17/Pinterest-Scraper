import type { SearchResults } from "../typings/index.js";
export declare function parse(query: string, page?: number): Promise<SearchResults[]>;
