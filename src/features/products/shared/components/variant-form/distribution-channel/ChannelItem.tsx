import { PUBLICATION_STATUS_OPTIONS } from "@/src/features/products/constants";
import { VariantForm } from "@/src/features/products/types";
import { Select } from "@/src/shared/form";
import { useFormContext, useFormState } from "react-hook-form";

interface ChannelItemProps {
    name:
    | "storeFront"
    | "marketplace"
    | "physicalStore"
    | "wholesale";
    label: string;
    description: string;
    disabled?: boolean
}

export const ChannelItem = ({
    name,
    label,
    description,
    disabled
}: ChannelItemProps) => {
    const { register, control } = useFormContext<VariantForm>();

    const { errors, dirtyFields } = useFormState({
        control,
        name: `distributionChannels.${name}`,
    });

    return (
        <div className="grid grid-cols-3 items-center gap-4 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
            <div className="col-span-1">
                <span className="block text-sm font-semibold text-primary">
                    {label}
                </span>

                <span className="block text-xs text-text-muted">
                    {description}
                </span>
            </div>

            <div className="col-span-2">
                {disabled &&
                    <span className="block p-0.5 text-end text-xs text-text-secondary" >No disponible</span>
                }
                <Select
                    disabled={disabled}
                    fieldSize="sm"
                    isValueSelected
                    options={PUBLICATION_STATUS_OPTIONS}
                    roundedSize="sm"
                    fieldClass="bg-surface-black"
                    positionError="floating"
                    error={
                        errors.distributionChannels?.[name]
                            ?.publicationStatus?.message
                    }
                    isDirty={
                        dirtyFields.distributionChannels?.[name]
                            ?.publicationStatus
                    }
                    {...register(
                        `distributionChannels.${name}.publicationStatus`
                    )}
                />
            </div>
        </div>
    );
};


