import { VariantForm } from "@/src/features/products/types";
import { Button } from "@/src/shared/components/btn";
import { FloatingWrapper } from "@/src/shared/components/floating";
import { Input } from "@/src/shared/form";
import { SURFACE_VARIANTS } from "@/src/shared/theme/surface-variant";
import { parsePeruDateTime } from "@/src/shared/utils/date";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiCheckCircle, BiChevronDown } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaRegClock } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

interface Props { hasNoDiscount: boolean, isAlreadyScheduled: boolean }
export const ScheduleDiscountBtn = ({ hasNoDiscount, isAlreadyScheduled }: Props) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex justify-end">
             <Button variant="info" padding="p-0" onClick={() => setOpen(true)} disabled={hasNoDiscount}>

                {hasNoDiscount ? (
                    <CgLock size={16} />
                ) : isAlreadyScheduled ? (
                    <FaRegClock size={16} />
                ) : (
                    <FaCalendarDays size={16} />
                )}

                {isAlreadyScheduled ? "Descuento programado" : "Programar descuento"}

                <BiChevronDown size={16} className=" opacity-60 group-hover:opacity-100 transition-opacity" />

            </Button> 

            {open && <ScheduleDiscount open={open} onClose={() => setOpen(false)} />}
        </div>
    )
}

interface ScheduleProps {
    open: boolean;
    onClose: () => void;
}

type ScheduleErrors = {
    discountStartsAt?: string;
    discountEndsAt?: string;
};

export const ScheduleDiscount = ({ onClose, open }: ScheduleProps) => {

    const { getValues, setValue } = useFormContext<VariantForm>();

    const commercialInfo = getValues("commercialInfo");

    const [state, setState] = useState({
        discountStartsAt: commercialInfo?.discountStartsAt ?? "",
        discountEndsAt: commercialInfo?.discountEndsAt ?? "",
    });

    const [errors, setErrors] = useState<ScheduleErrors>({});

    const handleChange = (field: keyof typeof state, value: string) => {
        setState((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
            // Al cambiar una fecha, vuelve a validar la relación
            // entre ambas al pulsar Aplicar.
            discountEndsAt:
                field === "discountStartsAt"
                    ? undefined
                    : previous.discountEndsAt,
        }));
    };

    const onCancel = () => {
        setErrors({});
        onClose();
    };

    const onApply = () => {
        const nextErrors: ScheduleErrors = {};

        let start: Date | null = null;
        let end: Date | null = null;

        try {
            if (state.discountStartsAt) {
                start = parsePeruDateTime(state.discountStartsAt);
            }

            if (state.discountEndsAt) {
                end = parsePeruDateTime(state.discountEndsAt);
            }
        } catch {
            if (state.discountStartsAt) {
                nextErrors.discountStartsAt = "La fecha de inicio no es válida.";
            }

            if (state.discountEndsAt) {
                nextErrors.discountEndsAt = "La fecha de finalización no es válida.";
            }
        }

        if (
            !nextErrors.discountStartsAt &&
            !nextErrors.discountEndsAt &&
            start && end
        ) {
            if (start.getTime() >= end.getTime()) {
                nextErrors.discountEndsAt = "La finalización debe ser posterior al inicio.";
            }
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setValue(
            "commercialInfo.discountStartsAt",
            state.discountStartsAt || null,
            { shouldDirty: true, shouldValidate: true }
        );

        setValue(
            "commercialInfo.discountEndsAt",
            state.discountEndsAt || null,
            { shouldDirty: true, shouldValidate: true }
        );

        setErrors({});
        onClose();
    };

    return (
        <FloatingWrapper
            className={SURFACE_VARIANTS.card}
            open={open}
            positionX={{ custom: "right-0" }}
            positionY={{ custom: "top-8" }}
            overlay={false}
        >
            <div className="space-y-5 p-5">
                <Input
                    type="datetime-local"
                    label="Fecha y hora de inicio"
                    labelOption={{ type: "top-floating" }}
                    roundedSize="sm"
                    labelBg="bg-surface-black"
                    value={state.discountStartsAt}
                    onChange={({ target }) =>
                        handleChange("discountStartsAt", target.value)
                    }
                    error={errors.discountStartsAt}
                />

                <Input
                    type="datetime-local"
                    label="Fecha y hora de finalización"
                    labelOption={{ type: "top-floating" }}
                    roundedSize="sm"
                    labelBg="bg-surface-black"
                    value={state.discountEndsAt}
                    onChange={({ target }) =>
                        handleChange("discountEndsAt", target.value)
                    }
                    error={errors.discountEndsAt}
                />

                <div className="flex justify-end gap-8">
                    <Button
                        type="button"
                        variant="basic"
                        select="tab"
                        padding="p-none"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        variant="basic"
                        select="tab"
                        padding="p-none"
                        onClick={onApply}
                    >
                        Aplicar
                    </Button>
                </div>
            </div>
        </FloatingWrapper>
    );
};
