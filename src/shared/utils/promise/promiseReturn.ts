import { z } from "zod";
import { ApiErrorReturn, ApiMsgErrorReturn, ApiResponse, ApiSuccessReturn } from "./apiResponse";
import { handlePrismaError } from "./handlePrismaError";

export const PromiseReturn =
    async <T>(func: () => Promise<ApiSuccessReturn<T> | ApiErrorReturn<T>>, msg?: ApiMsgErrorReturn) => {
        try {
            return await func() as ApiSuccessReturn<T>;
        } catch (err) {

            if (err instanceof z.ZodError) {

                return ApiResponse.badRequest(
                    undefined, "VALIDATION"
                ) as ApiErrorReturn<T>
            }

            console.error(err);
            return handlePrismaError(err, msg) as ApiErrorReturn<T>

        }
    };