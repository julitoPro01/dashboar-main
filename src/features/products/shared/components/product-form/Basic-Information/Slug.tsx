import { ProductFormData } from '@/src/features/products/types';
import { Input } from '@/src/shared/form'
import { generateSlug } from '@/src/shared/utils'
import { useEffect } from 'react';
import { useFormContext, useFormState, useWatch } from 'react-hook-form'

export const Slug = () => {

    const { control, setValue } = useFormContext<ProductFormData>();
    const {dirtyFields } = useFormState({ control, name: "basicInfo.name" })

    const name = useWatch({ control, name: "basicInfo.name" }) ?? "";
    const slug = generateSlug(name);

    useEffect(() => {
        if (slug)
            setValue("basicInfo.slug", slug);

    }, [slug])


    return (
        <Input
            label="Slug canónico (URL)"
            labelOption={{ type: "top" }}
            placeholder="premium-watch"
            value={slug}
            isDirty={dirtyFields.basicInfo?.name}
            readOnly
        />

    )
}
