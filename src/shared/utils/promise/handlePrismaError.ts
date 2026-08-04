
import { ApiErrorReturn, ApiMsgErrorReturn, ApiResponse } from "./apiResponse";


export function handlePrismaError<T>(error: unknown, msg?: ApiMsgErrorReturn):ApiErrorReturn<T> {

    if (!(isPrismaKnownError(error)))
        throw error;

    switch (error.code) {

        case "P2002":
            return ApiResponse.conflict(msg?.CONFLICT, "DUPLICATE", error);

        case "P2025":
            return ApiResponse.notFound(msg?.NOT_FOUND, "NOT_FOUND");

        case "P2003":
            return ApiResponse.badRequest(msg?.BAD_REQUEST, "ENTITY_IN_USE", error);

        default:
            return ApiResponse.serverError(msg?.SERVER_ERROR, error);
    }

}

function isPrismaKnownError(
    error: unknown
): error is { code: string; meta?: unknown } {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error
    );
}