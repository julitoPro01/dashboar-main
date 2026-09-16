import { z } from "zod";
import { ApiErrorReturn, ApiMsgErrorReturn, ApiResponse } from "./apiResponse";
import { handlePrismaError } from "./handlePrismaError";

export const PromiseReturn =
    async <R>(
        func: () => Promise<R>,
        msg?: ApiMsgErrorReturn
    ): Promise<R | ApiErrorReturn> => {
        try {
            return await func();
        } catch (err) {

            if (err instanceof z.ZodError) {

                return ApiResponse.badRequest(
                    undefined, "VALIDATION",err
                ) 
            }

            console.error(err);
            return handlePrismaError(err, msg)

        }
    };


