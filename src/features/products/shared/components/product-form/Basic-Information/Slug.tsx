import { Input } from '@/src/shared/form'

export const Slug = () => {
    return (
        <Input
            label="Slug (Fragmento de URL)"
            labelOption={{type:"top"}}
            placeholder="premium-watch"
            disabled
        />

    )
}
