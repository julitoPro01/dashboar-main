import { FORM_STYLES } from '@/src/constants'
import clsx from 'clsx'
import { UseFormRegister } from 'react-hook-form';
import { UpsertSupplierForm } from '../../../shared/upsertSupplierForm.type';
import { SUPPLIER_RELATION_MODE_LABEL } from '../../../shared/relationMode.constants';

interface Props {
    errorMsg?: string;
    register: UseFormRegister<UpsertSupplierForm>;
    dirty?: boolean;
}

const { OWNED: _, ...rest } = SUPPLIER_RELATION_MODE_LABEL;
export const RelacionModeSelect = ({ errorMsg, register, dirty }: Props) => {
    return (
        <label className="block">
            <span className={`${FORM_STYLES.label} ${FORM_STYLES.isRequired}`}>
                Modo de Relación
            </span>
            <select className={clsx(FORM_STYLES.base, {
                [FORM_STYLES.states.normal]: !errorMsg && !dirty,
                [FORM_STYLES.states.dirty]: !errorMsg && dirty,
                [FORM_STYLES.states.error]: errorMsg
            })}
                {...register("relationMode")}
            >
                <option value="">Seleccione una opción</option>
                {Object.entries(rest).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            {errorMsg && <span className={FORM_STYLES.labelError} > {errorMsg} </span>}

        </label>)
}
