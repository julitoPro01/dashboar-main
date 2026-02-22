
import { FORM_STYLES } from '@/src/constants';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

type DataType = | "VARCHAR" | "INT" | "DECIMAL" | "BOOLEAN" | "DATE"


interface AttributeNumberFieldProps {
    register: UseFormRegisterReturn; // Usa el RETURN del register, no la función
    dataType: DataType; // Solo para campos numéricos
    label: string;
    placeholder?: string;
    error?: string;
}

export const AttributeValueField = ({ register, dataType, label, placeholder, error }: AttributeNumberFieldProps) => {

    const step = dataType === "INT" ? 1 : dataType === "DECIMAL" ? 0.01 : undefined;
    const type = dataType === "DECIMAL" || dataType === "INT" ? "number" : dataType === "DATE" ? "date" : "text"

    return (
        <div className="space-y-1">
            <input
                type={type}
                step={step}
                min={0}
                className={clsx(FORM_STYLES.base,{
                    [FORM_STYLES.states.error]: error,
                    [FORM_STYLES.states.normal]: !error
                })}

                placeholder={placeholder || `Ingrese ${label.toLowerCase()}`}
                {...register}
            />
            {error && (
                <p className={FORM_STYLES.labelError}>{error}</p>
            )}
        </div>
    );
};


