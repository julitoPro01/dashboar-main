import { INPUT_FIELD_STYLE } from '@/src/shared/theme/inputField'

export const Sku = () => {
    return (
        <div>
            <label className={INPUT_FIELD_STYLE.label} >SKU</label>
            <input className={INPUT_FIELD_STYLE.baseDisabled + " " + INPUT_FIELD_STYLE.states.normal}
                disabled
                placeholder='PRD-2023-X1'
            />
        </div>
    )
}
