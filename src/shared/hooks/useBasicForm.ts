import { FormEvent, useRef, useState } from "react";
import { sleep } from "../utils";

interface Modif<T> {
  hasDirty: boolean;
  isDirty: Partial<Record<keyof T, boolean>>;
  isError: Partial<Record<keyof T, boolean | string>>;
  hasError: boolean;
  isSubmitting: boolean;

}

type Schema<T> = Partial<Record<keyof T, (v: string, state: T) => boolean | string>>;


export interface UseBasicFormReturn<T> extends Modif<T> {
  /** El estado actual de los valores del formulario */
  state: T;
  original: T;
  /** Función para actualizar un campo específico y recalcular su suciedad y error */
  handleChange: <K extends keyof T>(field: K, value: T[K]) => void;
  /** Función para reiniciar el formulario a un estado inicial y limpiar metadatos */
  resetForm: (initialState: T) => void;
  isValidate: () => boolean;
  isSubmit: () => Promise<void>;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  onUndo: () => void;
}

interface Action<T> {
  onSubmit?: (state: T) => void;
  onCancel?: (state: T) => void;
  onUndo?: (state: T) => void;
}

const initModified = { isDirty: {}, isError: {}, hasDirty: false, hasError: false, isSubmitting: false }

export const useBasicForm = <T extends Record<string, any>>(iniState: T, schema: Schema<T> = {}, action?: Action<T>): UseBasicFormReturn<T> => {

  const [state, setState] = useState<T>(iniState)
  const [modified, setModified] = useState<Modif<T>>(initModified);

  const listenErrors = useRef(false);

  const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
    setState((val) => {
      const newState = { ...val, [field]: value }

      const isDirty = newState[field] !== iniState[field] && (newState[field] || iniState[field]);

      const validator = schema[field];
      const validationResult = validator ? validator(String(value ?? ""), newState) : undefined;
      setModified(prevMod => {
        const nextDirty = { ...prevMod.isDirty };

        if (isDirty) nextDirty[field] = true;
        else delete nextDirty[field];

        if (listenErrors.current) {
          const nextError = { ...prevMod.isError };
          if (typeof validationResult === "boolean" && validationResult) {
            delete nextError[field];
          } else if (validator) {
            nextError[field] = typeof validationResult === "boolean" ? !validationResult : validationResult;
          }
          return {
            ...prevMod,
            isDirty: nextDirty,
            isError: nextError,
            hasDirty: Object.keys(nextDirty).length > 0,
            hasError: Object.keys(nextError).length > 0,
          }
        } else {
          return {
            ...prevMod,
            isDirty: nextDirty,
            hasDirty: Object.keys(nextDirty).length > 0,
          };
        }

      });

      return newState
    });


  };

  const resetForm = (initialState: T) => {
    setState(initialState);
    setModified(v => ({ ...v, ...initModified }));
  };

  const isValidate = () => {

    const nextError = { ...modified.isError } as any;
    Object.entries(state).forEach(([field, value]) => {

      const validator = schema[field];
      const validationResult = validator ? validator(String(value ?? ""), state) : undefined;


      if (typeof validationResult === "boolean" && validationResult) {
        delete nextError[field];
      } else if (validator) {
        nextError[field] = typeof validationResult === "boolean" ? !validationResult : validationResult;
      }

    })
    const hasError = Object.keys(nextError).length > 0;
    setModified(prevMod => {

      return {
        ...prevMod,
        isError: nextError,
        hasError
      };
    });

    listenErrors.current = true;

    return !hasError;
  }

  const isSubmit = async () => {
    setModified(v => ({ ...v, isSubmitting: true }))
    await sleep(1000);
    setModified(v => ({ ...v, isSubmitting: false }))
  }



  const handleSubmit = (call: (values: T) => void) => {
    return (e: FormEvent) => {
      e.preventDefault();
      call(state)
    }
  }

  return {
    state,
    ...modified,
    isSubmit,
    handleChange,
    resetForm,
    isValidate,
    onCancel: () => action?.onCancel?.(state),
    onSubmit: (e: FormEvent) => {
      e.preventDefault();
      action?.onSubmit?.(state)
    },
    onUndo: () => action?.onUndo?.(state),
    original: iniState
  }
}
