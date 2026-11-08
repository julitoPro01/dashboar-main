"use client";

import { MenuItem } from "@/src/shared/components/items";
import { useStore } from "@/src/store/useStore";
import { AdjustStock, RestockVariant } from "../variantManagement/inventory";
import { SetMainVariant } from "../variantManagement/setMainVariant";
import { IoCopyOutline, } from "react-icons/io5";
import { FloatingCard } from "@/src/shared/components/floating";
import { LuCircleDot, LuPackage } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import { SURFACE_VARIANTS } from "@/src/shared/theme/surface-variant";
import { ManageChannels } from "../variantManagement/manageChannels";
import { ViewVariantDetailsAction } from "../variantManagement/viewDetails";
import { EditVariantAction } from "../variantManagement/upsertVariant";
import { StatusAction } from "../variantManagement/statusTransitions";
import { editActionTransitions } from "./actionTransitions";

export const ItemActions = () => {

    const selected = useStore(v => v.variantSelected);

    const baseProduct = useStore(v => v.variantBaseProduct);

    if (!baseProduct)
        return <p className="text-text-muted"> Las acciones no estan disponibles. </p>

    if (!selected)
        return <p className="text-text-muted"> Las acciones no estan disponibles. </p>

    const recordStatus = selected.recordStatus.name;

    const includeSetMain = editActionTransitions.setMain.includes(recordStatus);
    const includeInventory = editActionTransitions.inventory.includes(recordStatus);
    const includeChannel = editActionTransitions.channel.includes(recordStatus);


    return (
        <>
            {/* #1 */}
            <ViewVariantDetailsAction selected={selected} />

            {editActionTransitions.edit.includes(recordStatus) &&
                <EditVariantAction id={selected.id} />
            }

            <MenuItem
                icon={<IoCopyOutline />}
                label="Duplicar variante"
            />
            {/* #2 */}
            {(includeSetMain || includeInventory || includeChannel) &&
                <div className="my-1 border-t border-border" />
            }
            {/* Establecer variante principal */}
            {includeSetMain && <SetMainVariant selected={selected} />}
            {/* inventario */}
            {includeInventory &&
                <FloatingCard
                    className={SURFACE_VARIANTS.tableActionMenu}
                    placement="right-start"
                    keepMounted
                    trigger={({ open, referenceRef, referenceProps }) => (
                        <MenuItem
                            ref={referenceRef}
                            {...referenceProps}
                            icon={<LuPackage />}
                            label="Inventario"
                            iconRight={<MdKeyboardArrowRight />}
                            active={open}
                        />
                    )}
                >
                    <RestockVariant selected={selected} />
                    <AdjustStock selected={selected} />
                </FloatingCard>
            }
            {/* canales de venta */}
            {includeChannel && <ManageChannels selected={selected} />}

            {/* #3 */}
            <div className="my-1 border-t border-border" />

            <FloatingCard
                className={SURFACE_VARIANTS.tableActionMenu}
                placement="right-start"
                keepMounted
                trigger={({ open, referenceRef, referenceProps }) => (
                    <MenuItem
                        ref={referenceRef}
                        {...referenceProps}
                        icon={<LuCircleDot />}
                        label="Estado"
                        iconRight={<MdKeyboardArrowRight />}
                        active={open}
                    />
                )}
            >
                <StatusAction selected={selected} baseProduct={baseProduct} />
            </FloatingCard>
        </>
    )
}
