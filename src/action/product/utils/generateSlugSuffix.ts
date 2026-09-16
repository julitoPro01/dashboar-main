import { randomInt } from "crypto";

const SLUG_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

export const generateSlugSuffix = (length = 6) => {
    let value = "";

    for (let i = 0; i < length; i++) {
        value += SLUG_CHARS[randomInt(SLUG_CHARS.length)];
    }

    return value;
};