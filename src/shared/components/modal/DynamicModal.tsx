"use client";

import { useEffect, useState } from "react"

import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";


interface Props {
  children: React.ReactNode,
  title?: string,
  description?: string,
  open: boolean,
  onClose: () => void,
  effectOnEndModal?: (_: boolean) => void,
  clickBgClose?: boolean,
  inactiveClose?: boolean,
  size?: 'sm' | 'md' | 'lg' | 'xl' | "4xl",
  sizeTitle?: 'sm' | 'lg' | 'xl' | '2xl' | "3xl" | "4xl"
}

const SIZE = (size: string) => `max-w-${size}`;


export const DynamicModal = ({ children, title, description, open, onClose, effectOnEndModal, clickBgClose, inactiveClose, size, sizeTitle }: Props) => {

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
            clsx(`fixed w-[90%] max-w-3xl left-1/2 top-1/2 z-100 -translate-x-1/2 -translate-y-1/2 
                 bg-surface rounded-2xl overflow-hidden  focus:outline-none data-[state=closed]:animate-fadeOut`,
              {
                "max-w-3xl": (!size),
                [size ? SIZE(size) : ""]: !!size,
                "DialogContentOpen": okModal,
                "DialogContentClose": !open
              })
          }
          onAnimationEnd={onAnimationEnd}
        >
          <Dialog.Title className="text-lg font-bold ">
            <div className="w-full flex  relative border-b border-border py-4 px-6 sm:px-8 sm:py-6" >
              <div className="flex-1 flex items-end">
                <p className={`${inactiveClose ? "" : "pe-4"}`}>
                  <span className={`block text-text text-${sizeTitle || "3xl"} leading-tight`}>{title}</span>
                  {description &&
                    <span className="block font-normal text-text-muted text-sm mt-1">{description}</span>
                  }
                </p>
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
            <div className="  max-h-[70vh] scrollbar-thin overflow-auto scrollbar-track-transparent 
                  scrollbar-thumb-bg-select scrollbar-hide ">
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
