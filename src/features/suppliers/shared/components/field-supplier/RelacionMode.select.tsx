import clsx from 'clsx'
import { UseFormRegister } from 'react-hook-form';
import { INPUT_FIELD_STYLE } from '@/src/shared/theme/inputField/inputFieldStyle';
import { SupplierForm } from '../../../types';
import { SUPPLIER_RELATION_MODE_LABEL } from '../../../constants';

interface Props {
    errorMsg?: string;
    register: UseFormRegister<SupplierForm>;
    dirty?: boolean;
}

const { OWNER: _, ...rest } = SUPPLIER_RELATION_MODE_LABEL;
export const RelacionModeSelect = ({ errorMsg, register, dirty }: Props) => {
    return (
        <label className="block">
            <span className={`${INPUT_FIELD_STYLE.label} ${INPUT_FIELD_STYLE.isRequired}`}>
                Modo de Relación
            </span>
            <select className={clsx(INPUT_FIELD_STYLE.base, {
                [INPUT_FIELD_STYLE.states.normal]: !errorMsg && !dirty,
                [INPUT_FIELD_STYLE.states.dirty]: !errorMsg && dirty,
                [INPUT_FIELD_STYLE.states.error]: errorMsg
            })}
                {...register("relationMode")}
            >
                <option value="">Seleccione una opción</option>
                {Object.entries(rest).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            {errorMsg && <span className={INPUT_FIELD_STYLE.labelError} > {errorMsg} </span>}

        </label>)
}
