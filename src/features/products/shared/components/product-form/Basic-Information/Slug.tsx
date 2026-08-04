import { INPUT_FIELD_STYLE } from '@/src/shared/theme/inputField'

export const Slug = () => {
    return (
        <div>
            <label className={INPUT_FIELD_STYLE.label} >Slug (Fragmento de URL)</label>
            <input className={INPUT_FIELD_STYLE.baseDisabled+" "+INPUT_FIELD_STYLE.states.normal}
                disabled
                placeholder='premium-watch'
            />
        </div>
    )
}
