import { Button } from "@/src/shared/components/btn";
import { useTableContext } from "@/src/shared/table/core";
import { useStore } from "@/src/store/useStore";
import { useRouter } from "next/navigation";
import { LuArrowDownUp, LuSave } from "react-icons/lu";
import { MdRestartAlt } from "react-icons/md";
import { useReorderVariant } from "../../../shared/hooks";

interface Props {
  reorderedCount: number;
  onUndo: () => void;
}

export const ReorderVariants = ({ reorderedCount, onUndo }: Props) => {

  const router = useRouter();

  const setVariantTableAction = useStore(v => v.setVariantTableAction);

  const productId = useStore(v => v.variantBaseProduct?.id)

  const variants = useTableContext().table!.getRowModel().rows;

  const { saveChange, isPending } = useReorderVariant();

  const handleConfirm = async () => {
    if (!productId) return;

    const res = await saveChange({
      productId,
      variants: variants.map(({ original, index }) => ({
        id: original.id
      }))
    })

    if (!res.ok) return;

    router.refresh();

    setVariantTableAction("list", true)

  }

  return (
    <>
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <LuArrowDownUp size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="font-semibold text-on-surface">Reordenar variantes</h2>
          <p className="mt-0.5 text-sm text-on-surface-variant">Arrastra las filas desde la columna Orden para cambiar su posición.</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-text-muted">Reordenados:</span>
        <span className="font-semibold text-text">{reorderedCount}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">

        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={isPending}
          onClick={() => {
            onUndo();
            setVariantTableAction("list");
          }}
        >
          Cancelar
        </Button>

        <Button
          variant="secondary"
          size="sm"
          disabled={isPending || !reorderedCount}
          onClick={onUndo}
        >
          <MdRestartAlt size={16} aria-hidden="true" />
          Restablecer
        </Button>

        <Button
          variant="confirm"
          size="sm"
          disabled={isPending || !reorderedCount}
          loading={isPending}
          onClick={handleConfirm}
        >
          <LuSave size={16} aria-hidden="true" />
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>


      </div>
    </>
  )
}
