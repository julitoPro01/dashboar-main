import clsx from "clsx"
import { INPUT_FIELD_FILTER_STYLE } from "../theme/inputField"
import { ChangeEvent, MouseEvent } from "react";

interface Props {
  label?: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent) => void;
  isError?: any;
  className?: string
  type:"number"|"text"|"date"
}

//TODO: ELIMINAR
export const FilterInput = (p: Props) => {
  return (
    <>
      <div className={p.className}>
        <label className={INPUT_FIELD_FILTER_STYLE.label}>
          {p.label ? <span className={`block mb-1`}>{p.label}</span> :""}
          <input
            value={p.value}
            type={p.type}
            min={0}
            onChange={p.onChange}
            onClick={p.onClick}
            className={clsx(INPUT_FIELD_FILTER_STYLE.base,
              p.isError ? INPUT_FIELD_FILTER_STYLE.states.error : INPUT_FIELD_FILTER_STYLE.states.normal
            )} />
        </label>
      </div>
    </>
  )
}
