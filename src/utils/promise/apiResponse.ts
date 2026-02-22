export const ApiResponse = {
  success: <T> (msg: string, data?:T, code = 200) => ({
    ok: true,
    code,
    msg,
    data: data ?? null
  }),

  created: <T>(msg: string, data?: T) => ({
    ok: true,
    code: 201,
    msg,
    data: data ?? null
  }),

  notFound: (msg = "Recurso no encontrado") => ({
    ok: false,
    code: 404,
    msg,
    data: null
  }),

  badRequest: (msg = "Solicitud inválida",error?:unknown) => ({
    ok: false,
    code: 400,
    msg,
    error,
    data: null
  }),

  serverError: (error?: unknown) => ({
    ok: false,
    code: 500,
    msg: "Error interno del servidor",
    error: error instanceof Error ? error.message : String(error),
    data: null
  })
};
