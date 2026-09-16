import { FieldErrors, FieldNamesMarkedBoolean, UseFormRegister } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import { CustomAttributeForm } from "@/src/features/products/types";
import { Input } from "@/src/shared/form";

type Attribute = NonNullable<CustomAttributeForm["customAttributes"]>[number]

interface Props {
    index: number;
    onRemove: () => void;
    register: UseFormRegister<CustomAttributeForm>;
    error?: FieldErrors<Attribute>;
    dirty?: FieldNamesMarkedBoolean<Attribute>;
}

export const CustomAttributeField = ({
    index, onRemove, register, error, dirty
}: Props) => {

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-border-subtle p-4">
            <div className="flex items-center justify-end">
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-text-muted transition-colors hover:text-red-500"
                    aria-label="Eliminar atributo personalizado"
                >
                    <FiTrash2 />
                </button>
            </div>
            
            <Input
                id={`customName-${index}`}
                label="Nombre"
                labelOption={{ type: "top-floating" }}
                placeholder="Ej. Tipo de cierre"
                error={error?.customName?.message}
                isDirty={dirty?.customName}
                {...register(`customAttributes.${index}.customName`)}
            />

            <Input
                id={`customValue-${index}`}
                label="Valor"
                labelOption={{ type: "top-floating" }}
                placeholder="Ej. Cordones"
                error={error?.valueText?.message}
                isDirty={dirty?.valueText}
                {...register(`customAttributes.${index}.valueText`)}
            />
        </div>
    );
};