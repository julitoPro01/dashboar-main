
"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { useStore } from "@/src/store/useStore";
import { SideModalType } from "@/src/store/uiSlice";

interface Props {
    children: React.ReactNode;
    title?: string;
    description?: string;
    // open: boolean;
    // onClose: () => void;

    width?: string;
    clickBgClose?: boolean;
    inactiveClose?: boolean;
    inactiveScroll?: boolean;
    sideType: SideModalType
}

export const SideModal = ({
    children,
    title,
    description,
    // open = false,
    // onClose,
    width = "w-[480px]",
    clickBgClose = false,
    inactiveClose = false,
    inactiveScroll = false,
    sideType
}: Props) => {

    const { open, type } = useStore(v => v.sideModal);
    const setClose = useStore(v => v.setSideModal);

    const [showPanel, setShowPanel] = useState<{ type: SideModalType | null, open: boolean }>({ type, open });


    const onAnimationEnd = () => {
        if (!open)
            setShowPanel({open:false, type});
    };

    useEffect(() => {
        if (open)
            setShowPanel({open:true, type});
    }, [open]);

    if (showPanel.type !== sideType){
        return null;
    }

    return (
        <Dialog.Root open={showPanel.open}>
            <Dialog.Portal>

                {/* Overlay */}
                <Dialog.Overlay
                    className={clsx(
                        "fixed inset-0 z-50 bg-black/50",
                        {
                            "DialogOverlayOpen": showPanel,
                            "DialogOverlayClose": !open,
                        }
                    )}
                    onClick={() => clickBgClose && setClose({ open: false, type: null })}
                />

                {/* Panel */}
                <Dialog.Content
                    className={clsx(
                        "fixed right-0 top-0 z-100 h-dvh",
                        "bg-surface shadow-2xl",
                        "focus:outline-none",
                        "flex flex-col",
                        {
                            "SidePanelOpen": showPanel,
                            "SidePanelClose": !open,
                        },
                        width
                    )}
                    onAnimationEnd={onAnimationEnd}
                >

                    <Dialog.Title >

                        {/* Header */}
                        <div className="shrink-0 border-b border-border bg-background">

                            <div className="flex items-start gap-4 px-5 py-4">

                                <div className="min-w-0 flex-1">

                                    <span className="text-lg font-bold leading-tight text-text"> {title}</span>

                                    {description && (
                                        <Dialog.Description className="mt-1 text-sm text-text-muted">
                                            {description}
                                        </Dialog.Description>
                                    )}

                                </div>

                                {!inactiveClose && (
                                    <Dialog.Close
                                        onClick={() => setClose({ open: false, type: null })}
                                        className="
                                        shrink-0 cursor-pointer
                                        rounded-md border border-border
                                        bg-background px-2 py-1
                                        text-text
                                        hover:bg-hover
                                    "
                                    >
                                        <IoClose size={24} />
                                    </Dialog.Close>
                                )}

                            </div>

                        </div>
                    </Dialog.Title>
                    {/* Content */}
                    <div
                        className={clsx(
                            "min-h-0 flex-1",
                            inactiveScroll
                                ? "flex flex-col"
                                : "overflow-auto scrollbar-hide"
                        )}
                    >
                        {showPanel && children}
                    </div>

                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    );
};