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
        {...{
          id,
          type: dataType === "DATE" ? "date" : "text",
          placeholder: `${label}...`,
          border: 1,
          fieldSize: "sm",
          error,
          isDirty,
          ...register
        }}
      >
      </Input>
    </div>

  );
}

export const NumberField = ({ id, label, isRequired, error, dataType, isDirty, ...register }: TextFieldProps) => {

  return (
    <Input
      {...{
        id,
        type: "number",
        label: label,
        placeholder: `${label}...`,
        labelOption: {
          type: "top",
          required: isRequired,
        },
        border: 1,
        fieldSize: "sm",
        error,
        isDirty,
        ...register
      }}
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
        {...{
          id,
          placeholder: `${label}...`,
          border: 1,
          fieldSize: "sm",
          error,
          isDirty,
          ...register
        }}
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
            id={id}
            border={1}
            fieldSize="sm"
            options={systemAttributeValues}
            selectedValue={valueNumber}
            defaultValue={0}
            error={error}
            isDirty={isDirty}
            {...register}
          />
        </div>
      )
}