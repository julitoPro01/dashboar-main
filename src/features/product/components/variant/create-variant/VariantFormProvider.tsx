import { FormProvider, UseFormReturn } from "react-hook-form"
import { UpsertVariantForm } from "../../../type/upsertVariantForm.type";

interface Props {
    form: UseFormReturn<UpsertVariantForm>;
    onSubmit: (data: UpsertVariantForm) => void | Promise<void>;
    children: React.ReactNode;
};

export const VariantFormProvider = ({ form, onSubmit, children }: Props) => {
    return (
        <FormProvider {...form}  >
            <form onSubmit={form.handleSubmit(onSubmit)} >
                {children}
            </form>
        </FormProvider>
    )
}
