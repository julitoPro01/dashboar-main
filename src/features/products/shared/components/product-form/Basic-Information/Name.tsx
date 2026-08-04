import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField"
import { useFormContext } from "react-hook-form"
import clsx from 'clsx';

export const Name = () => {

  const { register } = useFormContext<{ name: string }>()

  return (
    <div>
      <label className={INPUT_FIELD_STYLE.label+" "+INPUT_FIELD_STYLE.isRequired}>Nombre</label>
      <input className={clsx(INPUT_FIELD_STYLE.base,
        {
          [INPUT_FIELD_STYLE.states.normal]: true
        })}
        placeholder="e.g Premiun Watch"
        {...register("name")}
      />
    </div>
  )
}
