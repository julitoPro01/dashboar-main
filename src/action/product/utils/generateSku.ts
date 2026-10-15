import "server-only";

import { randomInt } from "crypto";

const SKU_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const generateSku = (length = 8, entity?: "variant") => {
    let code = "";

    for (let i = 0; i < length; i++) {
        code += SKU_CHARS[randomInt(SKU_CHARS.length)];
    }
    if (entity === "variant")
        return `VAR-${code}`;

    return `PRD-${code}`;
};