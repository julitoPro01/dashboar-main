import clsx from 'clsx'
import { UseFormRegister } from 'react-hook-form';
import { INPUT_FIELD_STYLE } from '@/src/shared/theme/inputField/inputFieldStyle';
import { SupplierForm } from '../../../types';
import { SUPPLIER_RELATION_MODE_LABEL } from '../../../constants';
import { Select } from '@/src/shared/form';

interface Props {
    errorMsg?: string;
    register: UseFormRegister<SupplierForm>;
    dirty?: boolean;
}

const { OWNER: _, ...rest } = SUPPLIER_RELATION_MODE_LABEL;
export const RelacionModeSelect = ({ errorMsg, register, dirty }: Props) => {
    return (

        <Select
            label='Modo de Relación'
            isDirty={dirty}
            error={errorMsg}
            isRequired
            {...register("relationMode")}
        >
            {Object.entries(rest).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
            ))}
        </Select>

    )
}
