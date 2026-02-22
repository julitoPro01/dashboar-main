import { useFieldArray, useFormContext } from "react-hook-form"
import { ImageSortableItem, ImageUpdateCard, ImageUploadCard, IsPrimaryField } from "../../shared"
import { UpsertVariantForm } from "../../../type/upsertVariantForm.type";
import { useSortableFieldArray } from "@/src/hooks";
import { FORM_STYLES } from "@/src/constants";
import { Sorteable } from "@/src/components/ui";

export const SeccionImage = () => {

  const { register, control, getValues, setValue } = useFormContext<UpsertVariantForm>();
  const { fields, move, update, remove, append } = useFieldArray({ control, name: "images", keyName: "customId" });

  const { dragEnd } = useSortableFieldArray({ fields, move });

  // Actualizamos la imagen 
  const onUpdate = (target: HTMLInputElement, index: number) => {
    const files = target.files;
    if (!files || files.length < 1) return;
    const file = files[0]
    const previewUrl = URL.createObjectURL(file);

    const image = getValues("images")[index];

    const newStateFile = {
      fileName: file.name,
      filePath: previewUrl,
      fileSize: file.size,
      mimeType: file.type,
      //TODO: ID del usuario logeado
      // uploadedBy:0
    }

    update(index, { ...image, previewUrl, mediaFile: newStateFile })
  }
  // Eliminamos y actualizamos los valores
  const onRemove = (index: number) => {

    remove(index);
    const images = getValues("images")
    const existsPrimary = images.some(img => img.isPrimary);

    images.forEach((img, i) => {
      update(i, {
        ...img,
        displayOrder: i + 1,
        isPrimary: existsPrimary ? img.isPrimary : i === 0 ? true : false,
      });
    });
  }

  // Agregamos la imagen
  const onAddImg = (target: HTMLInputElement) => {
    const files = target.files;
    if (!files || files.length < 1) return;

    const file = files[0]
    const previewUrl = URL.createObjectURL(file);

    // Si hay valores, ya existe un "isPrimary"
    const images = getValues("images");
    const hasValues = images.length > 0

    const initStateImg = {
      previewUrl: previewUrl,
      isPrimary: hasValues ? false : true,
      displayOrder: hasValues ? images.at(-1)!.displayOrder + 1 : 1,
      mediaFile: {
        id: 0,
        fileName: file.name,
        filePath: previewUrl,
        fileSize: file.size,
        mimeType: file.type,
        //TODO: ID del usuario logeado
        // uploadedBy:0
      }
    }

    append(initStateImg)
  }


  // Asignamos solo una imagen como principal
  const onSelectPrimaryChange = (index: number) => {
    const images = getValues("images")
    setValue("images", images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    })), { shouldDirty: true })
  }

  const handleDragEnd = (event: any) => {
    dragEnd(event, ({ minIndex, maxIndex }) => {

      // Actualizar solo los órdenes afectados
      const reorderedFields = getValues("images");

      // Solo actualizar los elementos en el rango afectado
      for (let i = minIndex; i <= maxIndex; i++) {
        update(i, { ...reorderedFields[i], displayOrder: i + 1 });
      }
    })
  }

  return (
    <div>
      <span className={FORM_STYLES.label + " pb-1 " + FORM_STYLES.isRequired}> Imagenes</span>
      <div className="p-6 flex max-w-full border border-gray-300 justify-start items-start overflow-y-hidden overflow-x-auto scrollbar-thin gap-4  rounded-lg" >
        <Sorteable items={fields.map(v => v.customId)} handleDragEnd={handleDragEnd} >
          {
            fields.map((v, i) => (
              <ImageSortableItem key={v.customId} id={v.customId} order={i + 1}>
                <ImageUpdateCard
                  imageUrl={v.previewUrl}
                  onRemove={() => onRemove(i)}
                  onUpdate={(target) => onUpdate(target, i)}
                />

                <IsPrimaryField register={register(`images.${i}.isPrimary`, { onChange: () => onSelectPrimaryChange(i) })} className="px-3.5 pt-4" />
              </ImageSortableItem>
            ))
          }
        </Sorteable>

        {fields.length < 3 &&
          <ImageUploadCard onChange={(target) => onAddImg(target)} />
        }
      </div>
    </div>

  )
}
