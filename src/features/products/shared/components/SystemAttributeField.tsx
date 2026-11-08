import { Checkbox, Input, FieldLayout, Select, Textarea, FIELD_STYLE } from "@/src/shared/form";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";



interface Field {
  error?: string;
  isDirty?: boolean;
  isRequired: boolean;
  dataType: string;
  label:string
}

interface TextFieldProps extends Field, InputHTMLAttributes<HTMLInputElement> { }

export const TextField = ({ label, isRequired, id, dataType, error, isDirty, ...register }: TextFieldProps) => {

  return (
    <div className="flex items-center min-h-10 px-4 py-1.5">
      <span
        className={`
            w-1/3 shrink-0
            text-sm font-medium text-text
            ${isRequired && FIELD_STYLE.validation["*"]}
        `}
      >
        {label}
      </span>
      <Input
        id={id}
        type={dataType === "DATE" ? "date" : "text"}
        placeholder={`${label}...`}
        custom={{ fieldSize: "sm", error, isDirty }}
        // required={isRequired}
        {...register}
      >
      </Input>
    </div>

  );
}

export const NumberField = ({ id, label, isRequired, error, dataType, isDirty, ...register }: TextFieldProps) => {

  return (
    <Input
      id={id}
      type="number"
      placeholder={`${label}...`}
      custom={{
        label,
        labelPosition: "top",
        border: 1,
        fieldSize: "sm",
        error,
        isDirty,
      }}
      required={isRequired}
      {...register}
    />

  );
}

interface TextareaFieldProps extends Field, TextareaHTMLAttributes<HTMLTextAreaElement> { }
export const TextareaField = ({ isRequired, label, id, error,dataType, isDirty, ...register }: TextareaFieldProps) => {

  return (
    <div className="flex items-center min-h-10 px-4 py-1.5">
      <span
        className={`
            w-1/3 shrink-0
            text-sm font-medium text-text
            ${isRequired && FIELD_STYLE.validation["*"]}
        `}
      >
        {label}
      </span>
      <Textarea
        id={id}
        placeholder={`${label}...`}
        custom={{ border: 1, fieldSize: "sm", error, isDirty }}
        required={isRequired}
        {...register}
      >
      </Textarea>
    </div>
  );
}

interface CheckboxFieldProps extends Field, Omit<InputHTMLAttributes<HTMLInputElement>, "size"> { }
export const CheckboxField = ({ isRequired, label, isDirty,dataType, error, id, ...register }: CheckboxFieldProps) => {

  return (
    <div className="flex items-center min-h-10 px-4 py-1.5">
      <span
        className={`
            w-1/3 shrink-0
            text-sm font-medium text-text
            ${isRequired && FIELD_STYLE.validation["*"]}
        `}
      >
        {label}
      </span>
      <FieldLayout id={id} error={error} >
        <Checkbox   id={id} {...register} />
      </FieldLayout>
    </div>
  );
}

interface SelectFieldProps extends Field, InputHTMLAttributes<HTMLSelectElement> {
  systemAttributeValues?: {value:number, label:string}[];
  valueNumber?:number | null
}
export const SelectField = ({isDirty,isRequired, label, dataType,error, id, systemAttributeValues, valueNumber,
   ...register}:SelectFieldProps) => {

  return (
        <div className="flex items-center min-h-10 px-4 py-1.5">
          <span
            className={`
            w-1/3 shrink-0
            text-sm font-medium text-text
            ${isRequired && FIELD_STYLE.validation["*"]}
        `}
          >
            {label}
          </span>
          <Select
            custom={{
              border: 1,
              fieldSize: "sm",
              options: systemAttributeValues,
              isValueSelected: !!valueNumber,
              error,
              isDirty,
            }}
            required={isRequired}
            id={id}
            defaultValue={0}
            {...register}
          />
        </div>
      )
}
