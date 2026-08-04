"use client";

import { useEffect, useState } from "react"

import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";


interface Props {
  children: React.ReactNode,
  title?: string,
  Search?: React.ReactNode;
  description?: string,
  open: boolean,
  onClose: () => void,
  effectOnEndModal?: (_: boolean) => void,
  clickBgClose?: boolean,
  inactiveClose?: boolean,
  size?: 'sm' | 'md' | 'lg' | 'xl' | "2xl" | "3xl" | "4xl",
  sizeTitle?: 'sm' | 'lg' | 'xl' | '2xl' | "3xl" | "4xl",
  inactiveScroll?: boolean;
  fixedHeight?: boolean;
}

const SIZE = (size: string) => `max-w-${size}`;


export const DynamicModal = ({
  children, title, description, open = false, Search,
  onClose, effectOnEndModal,
  clickBgClose, inactiveClose, size = "3xl", sizeTitle, inactiveScroll = false, fixedHeight: minHeightInclude
}: Props) => {

  const [okModal, setOkModal] = useState(open)

  const onAnimationEnd = () => {
    if (!open)
      setOkModal(false);

    effectOnEndModal && effectOnEndModal(okModal);
  }

  useEffect(() => {

    if (open) {
      setOkModal(true)
    }


  }, [open])

  return (
    <Dialog.Root open={okModal}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className={clsx("fixed z-50 inset-0 bg-black/50",
          {
            "DialogOverlayOpen": okModal,
            "DialogOverlayClose": !open
          }
        )}
          onClick={() => clickBgClose && onClose()}
        />

        {/* Contenido */}
        <Dialog.Content
          className={
            clsx(`fixed w-[90%] left-1/2 top-1/2 z-100 -translate-x-1/2 -translate-y-1/2 
                 bg-surface rounded-2xl overflow-hidden  focus:outline-none data-[state=closed]:animate-fadeOut`,
              SIZE(size),
              {
                "DialogContentOpen": okModal,
                "DialogContentClose": !open
              })
          }
          onAnimationEnd={onAnimationEnd}
        >
          <Dialog.Title className="text-lg font-bold bg-background">
            <div className="w-full flex  relative border-b border-border py-4 px-6 sm:px-8 sm:py-6" >
              <div className="flex-1 flex flex-col ">

                <p className={`${inactiveClose ? "" : "pe-4"}`}>
                  <span className={`block text-text text-${sizeTitle || "3xl"} leading-tight`}>{title}</span>
                  {description &&
                    <span className="block font-normal text-text-muted text-sm mt-1">{description}</span>
                  }
                </p>
                {(Search && title) && <div className="mt-3" />}
                {
                  Search &&
                  <div className="pr-6">
                    {Search}
                  </div>
                }
              </div>
              <div>
                {
                  !inactiveClose &&
                  <Dialog.Close
                    onClick={() => onClose()}
                    className="ml-auto px-2 py-1 cursor-pointer text-text rounded bg-background border border-border hover:bg-hover">
                    <IoClose size={25} />
                  </Dialog.Close>
                }
              </div>

            </div>
          </Dialog.Title>
          <Dialog.Description className="relative text-sm text-gray-500" asChild>
            <div className={`${minHeightInclude ? "h-[70vh]" : "max-h-[70vh]"} ${inactiveScroll ? "flex flex-col" : "overflow-auto scrollbar-hide"}  scrollbar-track-transparent  scrollbar-thumb-bg-select `}>
              {
                okModal &&
                children
              }
            </div>
          </Dialog.Description>

        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
  )
};
