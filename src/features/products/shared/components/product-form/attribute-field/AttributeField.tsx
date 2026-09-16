import { AttributeInputType, CategorizationForm } from "@/src/features/products/types";
import { Checkbox, Input, FieldLayout, Select, Textarea } from "@/src/shared/form";
import { FieldErrors, FieldNamesMarkedBoolean, UseFormRegister } from "react-hook-form";

type Attribute = NonNullable<CategorizationForm["categorization"]["systemAttributes"]>[number]["attributes"][number];

interface Props {
  inputType: AttributeInputType;
  attr: Attribute;
  register: UseFormRegister<CategorizationForm>;
  error?: FieldErrors<Attribute>;
  dirty?: FieldNamesMarkedBoolean<Attribute>;
  index: number;
  groupIndex: number;
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
            ...register(`categorization.systemAttributes.${groupIndex}.attributes.${index}.valueText`
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
            ...register(`categorization.systemAttributes.${groupIndex}.attributes.${index}.valueNumber`, {
              valueAsNumber: true
            })
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
            ...register(`categorization.systemAttributes.${groupIndex}.attributes.${index}.valueText`)
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
        >
          <Checkbox
            id={id}
            {...register(`categorization.systemAttributes.${groupIndex}.attributes.${index}.valueBoolean`)}
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
          options={attr.systemAttributeValues?.map(v => ({ value: v.id, label: v.value }))}
          selectedValue={attr.valueNumber}
          defaultValue={0}
          error={error?.valueNumber?.message}
          {...register(`categorization.systemAttributes.${groupIndex}.attributes.${index}.valueNumber`,{
            valueAsNumber:true
          })}
        />
      );

    default:
      return null;
  }
}
