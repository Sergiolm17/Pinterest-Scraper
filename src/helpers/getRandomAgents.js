import { USER_AGENTS } from "../constants/agents.js";
export function getRandomAgent(mobile) {
    const statement = mobile
        ? USER_AGENTS.mobile
        : USER_AGENTS.desktop;
    const randomNumber = Math.floor(Math.random() * statement?.length);
    const randomUserAgent = statement[randomNumber];
    return randomUserAgent;
}
