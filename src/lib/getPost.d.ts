import type { IPosts } from "../typings/index.js";
/**
 * @default
 * @description There's a separate function for fetching video post information. This function only supports images.
 */
declare function getPost(id: number | string): Promise<IPosts>;
export default getPost;
