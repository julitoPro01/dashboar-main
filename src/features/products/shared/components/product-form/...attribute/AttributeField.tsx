import { AttributeInputType, ProductFormData } from "@/src/features/products/types";
import { Checkbox, Input, FieldLayout, Select, Textarea } from "@/src/shared/form";
import { FieldErrors, FieldNamesMarkedBoolean, UseFormRegister } from "react-hook-form";

type Attribute = ProductFormData["systemAttributes"][number]["data"][number];

interface Props {
  inputType: AttributeInputType;
  attr:Attribute;
  register: UseFormRegister<ProductFormData>;
  error?: FieldErrors<Attribute>;
  dirty?: FieldNamesMarkedBoolean<Attribute>;
  index: number;
  groupIndex:number;
}
export const AttributeField = ({ inputType, attr, register, index, error, dirty, groupIndex }: Props) => {
  const id = attr.attributeDefinitionId.toString();

  switch (inputType) {
    case "text":
      return (
        <Input
          {...{
            id,
            type: attr.dataType === "DATE" ? "date" : "text",
            label: attr.name,
            labelOption: {
              type: "top",
              required: attr.isRequired,
            },
            placeholder: `${attr.name}...`,
            border: 1,
            fieldSize: "sm",
            error: error?.valueText?.message,
            isDirty: dirty?.valueText,
            ...register(`systemAttributes.${groupIndex}.data.${index}.valueText`
            )
          }}
        >
        </Input>
      );

    case "number":
      return (
        <Input
          {...{
            id,
            type: "number",
            label: attr.name,
            placeholder: `${attr.name}...`,
            labelOption: {
              type: "top",
              required: attr.isRequired,
            },
            border: 1,
            fieldSize: "sm",
            error: error?.valueNumber?.message,
            isDirty: dirty?.valueNumber,
            ...register(`systemAttributes.${groupIndex}.data.${index}.valueNumber`)
          }}
        />

      );

    case "textarea":
      return (
        <Textarea
          {...{
            id,
            label: attr.name,
            placeholder: `${attr.name}...`,
            labelOption: {
              type: "top",
              required: attr.isRequired,
            },
            border: 1,
            fieldSize: "sm",
            error: error?.valueText?.message,
            isDirty: dirty?.valueText,
            ...register(`systemAttributes.${groupIndex}.data.${index}.valueText`)
          }}
        >
        </Textarea>
      );

    case "checkbox": {
      return (
        <FieldLayout
          id={id}
          label={attr.name}
          labelOption={{ type: "left", required: attr.isRequired }}
          error={error?.valueBoolean?.message}
          isDirty={dirty?.valueBoolean}
        >
          <Checkbox
            id={id}
            {...register(`systemAttributes.${groupIndex}.data.${index}.valueBoolean`)}
          />
        </FieldLayout>
      );
    }

    case "select":
      return (
        <Select
          id={id}
          label={attr.name}
          labelOption={{ type: "top", required: attr.isRequired }}
          border={1}
          fieldSize="sm"
          options={attr.options?.map(v => (
            <option key={v.id} value={v.id} > {v.value} </option>
          ))}
          error={error?.valueNumber?.message}
          isDirty={dirty?.valueNumber}
          {...register(`systemAttributes.${groupIndex}.data.${index}.valueNumber`, {
            valueAsNumber: true
          })}
        />
      );

    case "multiselect": {
      return (
        <Select
          id={id}
          label={attr.name}
          labelOption={{ type: "top", required: attr.isRequired }}
          border={1}
          fieldSize="sm"
          options={attr.options?.map(v => (
            <option key={v.id} value={v.id} > {v.value} </option>
          ))}
          error={error?.valueNumber?.message}
          isDirty={dirty?.valueNumber}
          {...register(`systemAttributes.${groupIndex}.data.${index}.valueNumber`, {
            valueAsNumber: true
          })}

        />
      );
    }

    default:
      return null;
  }
}
