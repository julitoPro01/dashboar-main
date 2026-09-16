import { ApiEntityInUseData } from "../../utils";
import { ConfirmDialog } from "./ConfirmDialog"

interface Props {
    entity: string;
    name: string;
    loading: boolean;
    onConfirm: () => void;
    onCloseModal: () => void;
    entitiesInUse:ApiEntityInUseData[];

}
export const DeleteConfirmDialog = ({
    loading,
    onConfirm,
    onCloseModal,
    entity,
    name,
    entitiesInUse
}: Props) => {

    const notAvailable = entitiesInUse.length > 0;

    return (

        <ConfirmDialog
            title={
                notAvailable
                    ? `${entity} no disponible para su eliminación.`
                    : `Eliminar ${entity.toLowerCase()}`
            }
            variant={notAvailable ? "warning" : "danger"}
            variantBtn="danger"
            description={
                !notAvailable ? (
                    <>
                        {entity} <strong>{name}</strong> se eliminará
                        permanentemente. Esta acción no se puede deshacer.
                    </>
                ) : (
                    <>
                        {entity} <strong>{name}</strong> está siendo utilizado
                        por otros registros y no puede eliminarse.
                    </>
                )
            }
            loading={loading}
            confirmDisabled={notAvailable}
            confirmText="Eliminar"
            loadingText="Eliminando..."
            
            onCancel={onCloseModal}
            onConfirm={onConfirm}
            details={
                notAvailable && (
                    <>
                        <h4 className="mb-3 text-sm font-semibold">
                            Referencias encontradas
                        </h4>

                        <div className="space-y-2">
                            {entitiesInUse.map((item) => (
                                <div
                                    key={item.entity}
                                    className="flex items-center justify-between rounded-md bg-background px-3 py-2"
                                >
                                    <span className="text-sm text-text-muted">
                                        {item.entity}
                                    </span>

                                    <span className="rounded-md bg-surface-elevated px-2 py-1 text-sm font-semibold">
                                        {item.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        />

    )
}
