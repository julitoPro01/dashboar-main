import { Button } from "@/src/shared/components/btn"
import { useFieldArray, useFormContext, useFormState } from "react-hook-form"
import { MdPostAdd, MdRestartAlt, MdTune } from "react-icons/md"
import { CustomAttributeForm } from "../../../types"
import { CustomAttributeField } from './attribute-field/CustomAttributeField';
import { FormCard } from "@/src/shared/form";
import { useEffect, useRef } from "react";
import { useCustomAttributes } from "../../hooks";
import { FaCheck } from "react-icons/fa6";

type Props =
    | { isEdit?: false }
    | {
        isEdit: true;
        entity: "product" | "variant";
        id: number;
    };

export const CustomAttributes = (props: Props) => {
    const { register, control, reset } = useFormContext<CustomAttributeForm>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "customAttributes",
        keyName: "customId",
    });

    const { errors, isSubmitting, dirtyFields } = useFormState({
        control,
        name: "customAttributes",
    });

    const { attributes, isError, isLoading, msg, } = useCustomAttributes();

    const getAttributes = async () => {
        if (!props.isEdit) return;

        const data = await attributes({
            entity: props.entity,
            id: props.id,
        });

        const mapped = data.map(v => ({
            id: v.id,
            customName: v.customName ?? "",
            valueText: v.valueText ?? "",
        }));

        reset({customAttributes:mapped})
    };

    const handleAdd = () => {
        if (fields.length >= 10) return;

        append({
            customName: "",
            valueText: "",
        });
    };

    const handleRemove = (index: number) => {
        remove(index);
    };

    const handleReset = () => {
        reset()
    };

    useEffect(() => {
        getAttributes();
    }, []);

    if (isError) {
        return (
            <p className="text-error-strong text-sm">
                {msg}

                <Button
                    variant="basic"
                    size="xs"
                    select="underline"
                    padding="p-0"
                    className="text-text ml-2"
                    onClick={getAttributes}
                >
                    Reintentar
                </Button>
            </p>
        );
    }

    if (isLoading) {
        return (
            <p className="text-text text-sm">
                {msg}
            </p>
        );
    }

    return (
        <FormCard
            description="Agrega una propiedad personalizada exclusiva para este producto cuando no encuentres una propiedad adecuada en su categoría."
            titleIcon={<MdTune />}
            title={
                <div className="inline-flex items-center justify-between w-full">
                    <span className="block">
                        Propiedades personalizadas
                    </span>
                    <span className="rounded-full bg-bg-soft-blue px-3 py-1 text-xs font-medium text-primary">
                        {fields.length} / 10
                    </span>
                </div>
            }
            actionNode={
                props.isEdit && <>
                    <Button variant="basic" size="xs" padding="p-0"
                    disabled={isSubmitting || !dirtyFields.customAttributes}
                    onClick={handleReset}  >
                        <MdRestartAlt size={20} />
                    </Button>
                    <Button variant="basic" size="xs" padding="p-0" type="submit"
                    disabled={!dirtyFields.customAttributes}
                    loading={isSubmitting}
                    >
                        <FaCheck size={20} />
                    </Button>
                </>
            }

        >
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2">
                {fields.map((field, index) => (
                    <CustomAttributeField
                        key={field.customId}
                        index={index}
                        register={register}
                        onRemove={() => handleRemove(index)}
                        error={errors.customAttributes?.[index]}
                    />
                ))}

                <div>
                    <Button
                        variant="secondary"
                        disabled={fields.length >= 10}
                        onClick={handleAdd}
                    >
                        <MdPostAdd size={22} />
                    </Button>
                </div>
            </div>
        </FormCard>

    );
};