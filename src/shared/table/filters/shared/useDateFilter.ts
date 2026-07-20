"use client";
import { dateFormatter, isValidHtmlDate, parseLocalDate } from "@/src/shared/utils";
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
        const resMsgError = isValidHtmlDate(value) ? undefined : msgError;

        const newData = { ...state.values, [field]: value };
        if (resMsgError)
            dispatch({ type: "[error]", payload: { [field]: resMsgError } })
        else
            if (newData.registeredFrom && newData.registeredTo && (parseLocalDate(newData.registeredFrom) > parseLocalDate(newData.registeredTo)))
                dispatch({ type: "[error]", payload: { [field]: msgError } })
            else
                dispatch({ type: "[error]", payload: { registeredFrom: undefined, registeredTo: undefined } })

        dispatch({
            type: "[value]",
            payload: { [field]: value }
        })

    }


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

