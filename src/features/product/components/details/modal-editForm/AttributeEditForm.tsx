"use client";

import { FORM_STYLES } from "@/src/constants";
import { useStore } from "@/src/store/useStore";
import { useForm } from "react-hook-form";
import { getAttributeValidationRules } from "../../../validation/getAttributeValidationRules";
import { AttributeValueField } from "../../shared";
import { BtnSubmitLoading } from "@/src/components/ui";
import { AttributeDetailsResponse } from "@/src/interfaces/attribute";

export const AttributeEditForm = () => {

  const setModal = useStore(v => v.setModalTypeProductDetails);
  const data = useStore(v => v.productDetailsData);

  const attributes = data?.attributesDetails ?? [];

  const { register, getValues, handleSubmit, formState: { errors } } = useForm<InitForm>({ defaultValues: { attributes: attributes } });



  const onSubmit = ({ attributes }: InitForm) => {
    console.log(attributes)
  }

  if (attributes.length === 0) {
    return <p className="text-gray-500">No hay atributos configurados.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" px-4 pb-4 ">
      <div className="overflow-hidden border border-gray-300 rounded-lg">
        <table className="w-full text-sm ">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 w-10">#</th>
              <th className="p-2 text-left">Atributo</th>
              <th className="p-2 text-left">Valor</th>
            </tr>
          </thead>

          <tbody>
            {getValues("attributes").map(({ key, isRequired, dataType, categoryAttributeId }, index) => {
              const error = errors.attributes?.[index]?.value;

              return (
                <tr key={categoryAttributeId} className="border-t border-gray-300">
                  <td className="p-2 text-center">{index + 1}</td>

                  <td className={`p-2 font-medium ${isRequired ? FORM_STYLES.isRequired : ""}`}>
                    {key}
                  </td>

                  <td className="p-2 space-y-1">

                    {AttributeValueField({
                      register: register(`attributes.${index}.value`, getAttributeValidationRules<InitForm>({ isRequired, dataType, attribute: { key } })),
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

      <div className="flex gap-5 justify-end mt-4">

        <button className="hover:text-black" type="button"
          onClick={() => setModal({ open: false })}
        > Cancelar
        </button>

        <BtnSubmitLoading
          // disabled={isSubmitting}
          title="Guardar cambios"
          loadingTitle="Guardando..."
          type="submit"
        />
      </div>
    </form>
  );
};


interface InitForm {
  attributes: AttributeDetailsResponse[]
}
