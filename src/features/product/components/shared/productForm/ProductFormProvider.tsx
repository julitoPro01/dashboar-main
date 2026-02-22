import { FormProvider, UseFormReturn } from "react-hook-form"
import { UpsertProductForm } from "../../../type/upsertProductForm.type";

interface Props {
    form: UseFormReturn<UpsertProductForm>;
    onSubmit: (data: UpsertProductForm) => void | Promise<void>;
    children: React.ReactNode;
}

export const ProductFormProvider = ({ form, onSubmit, children }: Props) => {
    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)} >
                {children}
            </form>
        </FormProvider>
    )
}
