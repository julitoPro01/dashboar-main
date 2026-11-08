"use client";
import { isValidHtmlDate } from "@/src/shared/utils";
import { useReducer } from "react";

type Values = { registeredFrom: string; registeredTo: string; }
type Errors = Partial<Record<keyof Values, string>>;
type PrevState = { values?: Values, errors?: Errors, open: boolean }

type State = { values: Values; errors: Errors; prevState: PrevState; open: boolean }

type StateReducer =
    | { type: "[value]", payload: Partial<Values> }
    | { type: "[error]", payload: Errors }
    | { type: "[prev-value]", payload: PrevState }
    | { type: "[clean]" }
    | { type: "[active-filter]", payload: boolean }
    | { type: "[reset-prev]", payload: PrevState }


const initFilters: State = { values: { registeredFrom: "", registeredTo: "" }, errors: {}, prevState: { open: false }, open: false };

const todoReducer = (state: State, action: StateReducer): State => {
    switch (action.type) {
        case "[value]": return { ...state, values: { ...state.values, ...action.payload } };
        case "[error]": return { ...state, errors: { ...state.errors, ...action.payload } };
        case "[prev-value]": return { ...state, prevState: action.payload, open: !state.open };
        case "[clean]": return initFilters;
        case "[active-filter]": return { ...state, open: action.payload }
        case "[reset-prev]": return {
            ...state,
            values: { ...(action.payload?.values ?? initFilters.values) },
            errors: { ...action.payload.errors },
            open: action.payload.open
        }
        default: return state;
    }
}

export const useDateFilter = () => {


    const [state, dispatch] = useReducer(todoReducer, initFilters)

    const handleChange = (field: keyof Values, value: string) => {
        const msgError = "Fecha inválida";
        const rangeError = "La fecha inicial no puede ser mayor a la final";

        // 1️⃣ Validamos que la fecha actual ingresada sea un formato HTML real
        const isCurrentValid = value === "" || isValidHtmlDate(value);
        const resMsgError = isCurrentValid ? undefined : msgError;

        const newData = { ...state.values, [field]: value };

        if (resMsgError) {
            // Si la fecha individual está mal formada, despachamos el error inmediatamente
            dispatch({ type: "[error]", payload: { [field]: resMsgError } });
        } else {
            // 2️⃣ Si ambas fechas existen, validamos el rango cronológico
            if (newData.registeredFrom && newData.registeredTo) {
                // YYYY-MM-DD es un formato ISO ordenable; al ser fechas calendario,
                // no hace falta convertirlas a instantes ni aplicar zona horaria.
                if (newData.registeredFrom > newData.registeredTo) {
                    // Si la fecha de inicio es posterior a la de fin, marcamos error de rango
                    dispatch({ type: "[error]", payload: { [field]: rangeError } });
                } else {
                    // Si el rango se corrigió, limpiamos los errores de ambos campos
                    dispatch({ type: "[error]", payload: { registeredFrom: undefined, registeredTo: undefined } });
                }
            } else {
                // Al borrar o dejar incompleto el rango, quitamos errores previos de rango.
                dispatch({ type: "[error]", payload: { registeredFrom: undefined, registeredTo: undefined } });
            }
        }

        // 3️⃣ Guardamos siempre el valor en el estado para que el input no se quede trabado
        dispatch({
            type: "[value]",
            payload: { [field]: value }
        });
    };



    const handleClose = () =>
        dispatch({ type: "[active-filter]", payload: false })

    const handleOpen = () =>
        dispatch({ type: "[prev-value]", payload: { values: { ...state.values }, errors: { ...state.errors }, open: true }, })

    const handleCancel = () =>
        dispatch({ type: "[reset-prev]", payload: { values: state.prevState.values, errors: state.prevState.errors, open: false } })


    const handleClean = (call?: () => void) => {

        dispatch({ type: "[clean]" });
        call?.()
    }

    const filter: Partial<Values> = Object.fromEntries(
        Object.entries(state.values)
            .filter(([key, value]) => !state.errors[key as keyof Errors] && value.trim())
    );

    return {
        handleChange, handleCancel, handleClose, handleOpen, handleClean,
        values: state.values,
        errors: state.errors,
        isActive: state.open,
        filter
    }
}

