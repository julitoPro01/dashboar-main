import { Button } from "@/src/shared/components/btn";
import { UpsertAttributeForm } from "../../types";
import { Fields } from "./attribute-form/Fields";
import { BasicFormReturn } from "@/src/shared/form";

type FormMode = "create" | "edit";
type BtnLabel = Record<FormMode, { label: string, loadingLabel: string }>;

interface Props {
    form: BasicFormReturn<UpsertAttributeForm>;
    mode?: FormMode;
    isSubmitting:boolean
}

const label: BtnLabel = {
    create: { label: "Guardar", loadingLabel: "Guardando" },
    edit: { label: "Guardar cambios", loadingLabel: "Guardando cambios" }
}

export const AttributeForm = ({ form, mode = "create" , isSubmitting}: Props) => {


    return (
        <form onSubmit={form.onSubmit}>

            <Fields form={form} />

            <div className="px-8 py-5 bg-background border-t border-border-subtle flex justify-end gap-3">

                <button className="px-6 py-2.5 rounded-lg font-medium text-text-muted hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    type="button"
                    onClick={form.onCancel}
                >
                    Cancelar
                </button>

                <Button type="submit" variant="secondary"
                    disabled={form.hasError}
                    loading={isSubmitting}
                    >

                    {isSubmitting ? label[mode].loadingLabel : label[mode].label}
                </Button>
            </div>

        </form>
    )
}
