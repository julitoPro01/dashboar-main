import { UseFormRegister } from 'react-hook-form';
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
            labelOption={{ type: "top", required: true }}
            isDirty={dirty}
            error={errorMsg}
            {...register("relationMode")}
            options={Object.entries(rest).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
            ))}
        />
    )
}
