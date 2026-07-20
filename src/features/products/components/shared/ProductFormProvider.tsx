import { FormProvider, UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./types/productForm.type";

interface Props {
    children: React.ReactNode;
    form: UseFormReturn<ProductFormData>;
    onSubmit: (value:ProductFormData) => void;
}
export const ProductFormProvider = ({ children, form, onSubmit }: Props) => {

    return (
        <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}
