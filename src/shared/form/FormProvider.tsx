import {
    FieldValues,
    FormProvider as Provider,
    SubmitHandler,
    UseFormReturn,
} from "react-hook-form";

interface Props<T extends FieldValues> {
    children: React.ReactNode;
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
}

export const FormProvider = <T extends FieldValues>({
    children,
    form,
    onSubmit,
}: Props<T>) => {   
    return (
        <Provider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </Provider>
    );
};