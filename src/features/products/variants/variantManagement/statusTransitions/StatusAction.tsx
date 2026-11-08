import { MenuItem } from "@/src/shared/components/items";
import { RECORD_STATUS_TRANSITIONS_OPTIONS, RECORD_STATUS_VALUE, RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { BaseProduct, SelectedVariant } from "@/src/store/variantSlice";
import {
    IoArchiveOutline,
    IoCheckmarkCircleOutline,
    IoDocumentTextOutline,
    IoPauseCircleOutline,
    IoTrashOutline,
} from "react-icons/io5";
import { ArchiveVariant } from './ArchiveVariant';
import { Dispatch, SetStateAction, useState } from "react";
import { LuTrash2 } from "react-icons/lu";

import { DeleteVariant } from "./DeleteVariant";
import { DynamicModal } from "@/src/shared/components/modal";
import { DeactivateVariant } from "./DeactivateVariant";
import { PublishVariant } from "./PublishVariant";
import { RestoreArchivedVariant } from "./RestoreArchivedVariant";
import { StatusProps } from "./type";
import { useStore } from "@/src/store/useStore";
import { useRouter } from "next/navigation";

type DeleteMode = "logical" | "physical";
type Modal = { open: boolean, status?: RecordStatusDb, deleteMode?: DeleteMode }


interface Props {
    selected: SelectedVariant;
    baseProduct: BaseProduct
}
export const StatusAction = ({ selected, baseProduct }: Props) => {

    // MODAL
    const [modal, setModal] = useState<Modal>({ open: false, status: undefined, deleteMode: undefined });

    const closeFloatingPanel = useStore((state) => state.setCloseFloatingPanel);
    const clearSelection = useStore((state) => state.setVariantSelect);
    const router = useRouter();

    const { recordStatus } = selected;

    const successAction = () => {
        setModal(v => ({ ...v, open: false }));
        closeFloatingPanel();
        clearSelection();
        router.refresh();
    }

    const closeModal = () => setModal(v => ({ ...v, open: false }))

    return (
        <>
            {
                RECORD_STATUS_TRANSITIONS_OPTIONS[recordStatus.name]
                    .map(({ value, label, desc }) => {
                        return (
                            <div key={value}>
                                {Actions({
                                    setModal,
                                    label,
                                    desc,
                                    currentStatus: recordStatus.name === value,
                                })[value]}
                            </div>
                        );
                    })
            }

            {/* ---Mostramos en la últíma fila */}
            {(recordStatus.name === RECORD_STATUS_VALUE.DRAFT || recordStatus.name === RECORD_STATUS_VALUE.DELETED)
                && <MenuItem
                    icon={<LuTrash2 />}
                    label="Eliminar permanentemente"
                    danger
                    onClick={() => setModal({ open: true, status: RECORD_STATUS_VALUE.DELETED, deleteMode: "physical" })}
                />}


            <DynamicModal
                open={modal.open}
                onClose={closeModal}
                size="md"
            >
                <>
                    {modal.status && ModalContent({
                        variantId: selected.id,
                        productId: baseProduct.id,
                        sku: selected.sku,
                        mode: modal.deleteMode ?? "physical",
                        sourceStatus: recordStatus.name,
                        onCloseModal: closeModal,
                        successAction
                    })[modal.status]}
                </>
            </DynamicModal>
        </>
    )
}

type ActionsProps = {
    setModal: Dispatch<SetStateAction<Modal>>
    label: string, desc: string,
    currentStatus:boolean
}
const Actions = ({ label, desc, setModal, currentStatus }: ActionsProps): Record<RecordStatusDb, React.ReactNode> => {

    const check = currentStatus ? "✓":null;

    return {
        [RECORD_STATUS_VALUE.DRAFT]: <>
            <MenuItem
                icon={<IoDocumentTextOutline />}
                label={label}
                description={desc}
                iconRight={check}
                disabled={currentStatus}
                onClick={() => setModal({ open: true, status: RECORD_STATUS_VALUE.DRAFT })}
            />
        </>,
        [RECORD_STATUS_VALUE.ACTIVE]: <>
            <MenuItem
                icon={<IoCheckmarkCircleOutline />}
                label={label}
                description={desc}
                iconRight={check}
                disabled={currentStatus}
                onClick={() => setModal({ open: true, status: RECORD_STATUS_VALUE.ACTIVE })}
            />
        </>,
        [RECORD_STATUS_VALUE.INACTIVE]: <>
            <MenuItem
                icon={<IoPauseCircleOutline />}
                label={label}
                description={desc}
                iconRight={check}
                disabled={currentStatus}
                onClick={() => setModal({ open: true, status: RECORD_STATUS_VALUE.INACTIVE })}
            />
        </>,
        [RECORD_STATUS_VALUE.ARCHIVED]: <>
            <MenuItem
                icon={<IoArchiveOutline />}
                label={label}
                description={desc}
                iconRight={check}
                disabled={currentStatus}
                onClick={() => setModal({ open: true, status: RECORD_STATUS_VALUE.ARCHIVED })}
            />
        </>,
        [RECORD_STATUS_VALUE.DELETED]: <>
            <MenuItem
                icon={<IoTrashOutline />}
                label={label}
                description={desc}
                danger
                iconRight={check}
                disabled={currentStatus}
                onClick={() => setModal({ open: true, status: RECORD_STATUS_VALUE.DELETED, deleteMode: "logical" })}
            />

        </>,
    }
}

interface ContentProps extends StatusProps {
    mode: DeleteMode;
    sourceStatus: RecordStatusDb;
};
const ModalContent = (params: ContentProps): Record<RecordStatusDb, React.ReactNode> => {

    const { mode, sourceStatus, ...props } = params;

    return {
        [RECORD_STATUS_VALUE.DRAFT]: <></>,
        [RECORD_STATUS_VALUE.ACTIVE]: <PublishVariant {...props} />,
        [RECORD_STATUS_VALUE.INACTIVE]: sourceStatus === RECORD_STATUS_VALUE.ARCHIVED
            ? <RestoreArchivedVariant {...props} />
            : <DeactivateVariant {...props} />,
        [RECORD_STATUS_VALUE.ARCHIVED]: <ArchiveVariant {...props} />,
        [RECORD_STATUS_VALUE.DELETED]: <DeleteVariant {...params} />,
    }
}
