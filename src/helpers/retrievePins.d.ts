import type { SearchResults as ISearchPinsResults } from "../typings/index.js";
export default function retrievePins(q?: string): Promise<ISearchPinsResults[]>;
