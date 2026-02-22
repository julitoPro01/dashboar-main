import { useFieldArray, useFormContext } from "react-hook-form"
import { UpsertVariantForm } from "../../../type/upsertVariantForm.type"
import { FORM_STYLES } from "@/src/constants";
import { AttributeValueField } from "../../shared";
import { getAttributeValidationRules } from "../../../validation/getAttributeValidationRules";

export const AttributesField = () => {

    const { control, register, formState: { errors } } = useFormContext<UpsertVariantForm>()

    const { fields } = useFieldArray({ control, name: "attributes", keyName: "customId" });

    return (
        <div>
            <span className={FORM_STYLES.label + " pb-1 "}>Atributos</span>
            <div className=" overflow-hidden border border-gray-300 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 w-10">#</th>
                            <th className="p-2 text-left">Atributo</th>
                            <th className="p-2 text-left">Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fields.map(({ key, isRequired, dataType, categoryAttributeId }, index) => {
                            const error = errors.attributes?.[index]?.value;

                            return (
                                <tr key={categoryAttributeId} className="border-t">
                                    <td className="p-2 text-center">{index + 1}</td>

                                    <td className={`p-2 font-medium ${isRequired ? FORM_STYLES.isRequired : ""}`}>
                                        {key}
                                    </td>

                                    <td className="p-2 space-y-1">

                                        {AttributeValueField({
                                            register: register(`attributes.${index}.value`, getAttributeValidationRules<UpsertVariantForm>({ isRequired, dataType, attribute: { key } })),
                                            dataType: dataType,
                                            label: key,
                                            error: error?.message
                                        })}

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
