import "server-only";

import { randomInt } from "crypto";

const SKU_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const generateSku = (length = 8) => {
    let code = "";

    for (let i = 0; i < length; i++) {
        code += SKU_CHARS[randomInt(SKU_CHARS.length)];
    }

    return `PRD-${code}`;
};