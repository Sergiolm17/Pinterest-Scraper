import type { IPinUser as IUser } from "../typings/index.js";
/**
 * @default
 *
 * @message This is case sensitive. Make sure to pass the exact pinterest username.
 */
declare function getUser(username: string): Promise<IUser>;
export default getUser;
