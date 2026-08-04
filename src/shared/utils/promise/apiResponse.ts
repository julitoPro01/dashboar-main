type SuccessCode = 200 | 201;

export type ApiSuccessReturn<T=never> = {
  ok: true;
  code: SuccessCode;
  msg: string;
  data: T
}

export type ApiEntityInUseData = { entity: string, count: number }

//-----------------------

type ErrorCode = 404 | 400 | 409 | 500;

export type ApiErrorType =
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "CONFLICT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "SERVER_ERROR";

export type ApiErrorCode =
  | "VALIDATION"
  | "ENTITY_IN_USE"
  | "DUPLICATE"
  | "NOT_FOUND"
  | "UNKNOWN";

export type ApiErrorReturn<T=never> = {
  ok: false;
  code: ErrorCode;
  errorType: ApiErrorType;
  errorCode: ApiErrorCode;
  msg: string;
  data?: T ,
  error?: unknown
}

export type ApiMsgErrorReturn = Partial<Record<ApiErrorType, string>>;

export const ApiResponse = {
  success: <T>(msg = "Solicitud exitosa", data: T = {} as T, code: SuccessCode = 200): ApiSuccessReturn<T> => ({
    ok: true,
    code,
    msg,
    data
  }),

  created: <T>(msg = "Solicitud exitosa", data: T={} as T): ApiSuccessReturn<T> => ({
    ok: true,
    code: 201,
    msg,
    data
  }),

  notFound: <T>(msg = "Recurso no encontrado", errorCode: ApiErrorCode = "UNKNOWN", data: T = null as T): ApiErrorReturn<T> => ({
    ok: false,
    code: 404,
    errorType: "NOT_FOUND",
    errorCode,
    msg,
    data
  }),

  badRequest: <T>(msg = "Solicitud inválida", errorCode: ApiErrorCode = "UNKNOWN", error?: unknown, data?: T): ApiErrorReturn<T> => ({
    ok: false,
    code: 400,
    errorType: "BAD_REQUEST",
    errorCode: errorCode,
    msg,
    error,
    data
  }),

  serverError: <T>(msg = "Error interno del servidor", error?: unknown, data?: T): ApiErrorReturn<T> => ({
    ok: false,
    code: 500,
    errorType: "SERVER_ERROR",
    errorCode: "UNKNOWN",
    msg,
    error: error instanceof Error ? error.message : String(error),
    data
  }),

  conflict: <T>(msg = "El recurso ya existe", errorCode: ApiErrorCode = "UNKNOWN", error?: unknown, data?: T): ApiErrorReturn<T> => ({
    ok: false,
    code: 409,
    errorType: "CONFLICT",
    errorCode: errorCode,
    msg,
    error,
    data,
  }),
};
