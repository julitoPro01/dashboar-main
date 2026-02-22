import { BtnSubmitLoading } from "@/src/components/ui";
import { FORM_STYLES } from "@/src/constants";
import { sleep } from "@/src/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form"
import { z } from "zod";

export const ProductEditForm = () => {

  const { register, handleSubmit, formState: { errors, dirtyFields, isSubmitting } } = useForm<InitForm>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (state: InitForm) => {
    await sleep(2000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 px-4 pb-4">

      <div>
        <label className={FORM_STYLES.label + " " + FORM_STYLES.isRequired}>Nombre </label>
        <input
          className={clsx(FORM_STYLES.base,
            {
              [FORM_STYLES.states.error]: errors.name,
              [FORM_STYLES.states.dirty]: !errors.name && dirtyFields.name,
              [FORM_STYLES.states.normal]: !errors.name && !dirtyFields.name
            }
          )}
          {...register("name")}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className={FORM_STYLES.label + " " + FORM_STYLES.isRequired}>Descripción corta </label>
        <input
          className={clsx(FORM_STYLES.base,
            {
              [FORM_STYLES.states.error]: errors.shortDescription,
              [FORM_STYLES.states.dirty]: !errors.shortDescription && dirtyFields.shortDescription,
              [FORM_STYLES.states.normal]: !errors.shortDescription && !dirtyFields.shortDescription
            }
          )}
          {...register("shortDescription")}
        />
        {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}
      </div>

      <div>
        <label className={FORM_STYLES.label}>Descripción larga </label>
        <textarea
          className={clsx(FORM_STYLES.base,
            {
              [FORM_STYLES.states.dirty]: dirtyFields.longDescription,
              [FORM_STYLES.states.normal]: !dirtyFields.longDescription
            }
          )}
          {...register("longDescription")}
        />
        {errors.longDescription && <p className="text-xs text-red-500 mt-1">{errors.longDescription.message}</p>}
      </div>

      <div className="flex gap-5 justify-end">

        <button className="hover:text-black" type="button"
        > Cancelar
        </button>
          
        <BtnSubmitLoading
          disabled={isSubmitting}
          title="Guardar cambios"
          loadingTitle="Guardando..."
          type="submit"
        />
      </div>
    </form>
  )
}


const formSchema = z.object({
  name: z.string().trim()
    .min(3, "Mínimo 3 caracteres")
    .max(150, "Máximo 150 caracteres"),

  shortDescription: z
    .string().trim()
    .min(10, "Mínimo 10 caracteres")
    .max(250, "Máximo 250 caracteres"),

  longDescription: z
    .string()
    .optional()
});


type InitForm = z.infer<typeof formSchema>;