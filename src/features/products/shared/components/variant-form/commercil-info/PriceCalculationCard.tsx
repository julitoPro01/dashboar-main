
import { VariantForm } from '@/src/features/products/types';
import { Overlay } from '@/src/shared/components/floating';
import { formatPrice } from '@/src/shared/utils';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { IoCalendarOutline } from 'react-icons/io5';
import { ScheduleDiscountBtn } from './ScheduleDiscountBtn';
import { dateFormatter, parsePeruDateTime } from '@/src/shared/utils/date';

export const PriceCalculationCard = () => {

    const { control } = useFormContext<VariantForm>();
    const { errors } = useFormState({ control, name: "commercialInfo" });

    const errorPrice = errors.commercialInfo?.basePrice?.message;
    const errorDiscount = errors.commercialInfo?.discount?.message;

    const comercialInfo = useWatch({ control, name: "commercialInfo" });
    // Precios
    const price = comercialInfo?.basePrice;
    const discount = comercialInfo?.discount;
    // Programación de descuento
    const parseScheduleDate = (value?: string | null): Date | null => {
        if (!value) return null;

        try {
            return parsePeruDateTime(value);
        } catch {
            return null;
        }
    };

    const startsAt = parseScheduleDate(comercialInfo?.discountStartsAt);
    const endsAt = parseScheduleDate(comercialInfo?.discountEndsAt);
    const discountStartsAt = dateFormatter.format(startsAt, "dateTime");
    const discountEndsAt = dateFormatter.format(endsAt, "dateTime");
    const hasSchedule = Boolean(
        comercialInfo?.discountStartsAt || comercialInfo?.discountEndsAt
    );
    const hasInvalidScheduleDate = Boolean(
        (comercialInfo?.discountStartsAt && !startsAt)
        || (comercialInfo?.discountEndsAt && !endsAt)
    );
    const hasConfiguredDiscount = Number.isFinite(discount) && discount! > 0;
    const now = Date.now();
    const expired = hasConfiguredDiscount && !!endsAt && endsAt.getTime() <= now;
    const scheduled = hasConfiguredDiscount
        && !expired
        && !!startsAt
        && startsAt.getTime() > now;
    const discountIsActive = hasConfiguredDiscount
        && !expired
        && !scheduled
        && !hasInvalidScheduleDate;

    // si existen precios
    const hasPrice = Number.isFinite(price);

    //-----
    const isFree = !errorPrice && !errorDiscount && hasPrice &&
        (
            price === 0 ||
            (discountIsActive && discount === 100)
        );

    //----------
    const discountAmount =
        !errorPrice &&
            !errorDiscount &&
            hasPrice &&
            discountIsActive
            ? price! * (discount! / 100)
            : 0;

    const finalPrice =
        !errorPrice && hasPrice
            ? price! - discountAmount
            : null;

    const scheduleStatus = expired
        ? "Vencido"
        : hasInvalidScheduleDate
            ? "Fecha no válida"
            : scheduled
                ? "Programado"
                : discountIsActive
                    ? "Activo"
                    : null;

    return (
        <div className="rounded-md border border-border-subtle bg-bg-soft-blue px-4 py-3 text-sm">

            {/* Descuento */}
            <div className="space-y-3 w-full">

                <ScheduleDiscountBtn hasNoDiscount={!discount} isAlreadyScheduled={hasSchedule} />

                {hasSchedule && (
                    <div className="relative rounded-md border border-border-subtle bg-surface-light p-3">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-text">
                            <IoCalendarOutline
                                size={16}
                                className="text-text-muted"
                            />
                            Vigencia del descuento {scheduleStatus && (
                                <span className={expired ? "text-amber-500" : hasInvalidScheduleDate ? "text-error-strong" : "text-primary-light"}>
                                    ({scheduleStatus})
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {discountStartsAt && (
                                <div className="min-w-0">
                                    <p className="text-xs text-text-muted">Inicio</p>
                                    <p className="text-sm text-text">
                                        {discountStartsAt}
                                    </p>
                                </div>
                            )}

                            {discountEndsAt && (
                                <div className="min-w-0">
                                    <p className="text-xs text-text-muted">
                                        Finalización
                                    </p>
                                    <p className="text-sm text-text">
                                        {discountEndsAt}
                                    </p>
                                </div>
                            )}
                        </div>

                        {hasInvalidScheduleDate && (
                            <p className="mt-2 text-xs text-error-strong">
                                Revisa las fechas y horas de vigencia del descuento.
                            </p>
                        )}

                        <Overlay open={!discount} />
                    </div>
                )}

                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-text">
                            Descuento calculado
                        </p>
                        <p className="text-xs text-text-muted">
                            Importe descontado del precio base
                        </p>
                    </div>

                    <span className="shrink-0 font-semibold tabular-nums text-error-strong">
                        {hasPrice && hasConfiguredDiscount && discountIsActive
                            ? `−S/ ${discountAmount.toFixed(2)}`
                            : hasPrice && hasConfiguredDiscount
                                ? "S/ 0.00"
                                : "—"}
                    </span>
                </div>
            </div>
            {/* Precio */}
            <div className="mt-2 border-t border-border-strong pt-2">
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-text">
                        Precio final al cliente
                    </span>

                    <span className="text-base text-primary-light">
                        {isFree ? (
                            <span className="inline-flex items-baseline gap-1.5">
                                <span className="text-xs text-text-muted">
                                    S/ 0.00
                                </span>

                                <span className="font-semibold">
                                    Gratis
                                </span>
                            </span>
                        ) : finalPrice !== null ? (
                            <span className='tabular-nums'>
                                S/ {formatPrice(finalPrice)}
                            </span>
                        ) : (
                            <span className="font-semibold">
                                —
                            </span>
                        )}
                    </span>
                </div>
            </div>

        </div>
    );
};

