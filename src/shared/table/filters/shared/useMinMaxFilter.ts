"use client";

import { useState } from "react";

type Values = { min: number, max: number };
type Errors = Partial<Record<keyof Values, string>>;
type Init = { values: Values, isActive: boolean, errors: Errors, prev: Values, parsed: Partial<Values> };

const init: Init = { values: { min: 0, max: 0 }, isActive: false, errors: {}, prev: { min: 0, max: 0 }, parsed: {} }

export const useMinMaxFilter = (val?: Values) => {

    const [state, setState] = useState({ ...init, values: val ?? init.values });

    const handleChange = (field: keyof Values, value: string) => {

        const newValues = { ...state.values, [field]: +value };

        let isMin = true;
        let isMax = true;

        if (newValues.min && newValues.max) {
            if (field === "min")
                isMin = newValues.min <= newValues.max;
            if (field === "max")
                isMax = newValues.max >= newValues.min;
        }

        let msgMin = undefined;
        let msgMax = undefined;

        if (!isMin) {
            msgMin = "El valor mínimo no es válido"
        } else {
            msgMin = "";
        }
        if (!isMax) {
            msgMax = "El valor máximo no es válido"
        } else {
            msgMax = "";
        }

        setState(v => ({
            ...v,
            values: newValues,
            errors: { min: msgMin, max: msgMax }
        }))
    }

    const handleCancel = () => {
        setState(v => ({
            ...v,
            values: v.prev,
            isActive: false
        }))
    }

    const handleOpen = () => {
        setState(v => ({
            ...v,
            prev: v.values,
            isActive: true
        }))
    }

    const handleClose = () => { setState(v => ({ ...v, isActive: false })); }

    const handleClean = () =>
        setState(init)

    const filter: Partial<Values> = Object.fromEntries(
        Object.entries(state.values).filter(([key, value]) =>
            value > 0 && !state.errors[key as keyof Errors]
        )
    ) as Partial<Values>;

    return {
        handleChange, handleOpen, handleClose, handleCancel, handleClean,
        values: state.values,
        isActive: state.isActive,
        errors: state.errors,
        filter
    }
}