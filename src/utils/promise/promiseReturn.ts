import { z } from "zod";
import { ApiResponse } from "./apiResponse";


export type Result<T> = {
    ok: boolean,
    msg: string,
    data: T | null
    code: number,
    error?: any,
}

interface Props {
    msg?: string
}

export const PromiseReturn =
    async <T>(func: () => Promise<Result<T>>, options?: Props): Promise<Result<T>> => {

        try {
            return await func();
        } catch (err) {

            if (err instanceof z.ZodError) {

                return ApiResponse.badRequest(
                    undefined,err
                )
            }

            console.error(err);
            return ApiResponse.serverError()
        }
    };