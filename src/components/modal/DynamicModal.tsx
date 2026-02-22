"use client";

import { useEffect, useState } from "react"

import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";


interface Props {
  children: React.ReactNode,
  title?: string,
  modalOpen: boolean,
  onCloseModal: () => void,
  effectOnEndModal?: (_: boolean) => void,
  clickBgClose?: boolean,
  inactiveClose?: boolean,
  size?: 'sm' | 'md' | 'lg' | 'xl' | "4xl",
  sizeTitle?:'sm' | 'md' | 'lg' | 'xl' | "4xl"
}

const SIZE=(size:string)=>`max-w-${size}`;


export const DynamicModal = ({ children, title, modalOpen, onCloseModal, effectOnEndModal, clickBgClose, inactiveClose, size, sizeTitle }: Props) => {

  const [okModal, setOkModal] = useState(modalOpen)

  const onAnimationEnd = () => {
    if (!modalOpen)
      setOkModal(false);

    effectOnEndModal && effectOnEndModal(okModal);
  }

  useEffect(() => {

    if (modalOpen) {
      setOkModal(true)
    }


  }, [modalOpen])

  return (
    <Dialog.Root open={okModal}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className={clsx("fixed z-50 inset-0 bg-black/50",
          {
            "DialogOverlayOpen": okModal,
            "DialogOverlayClose": !modalOpen
          }
        )}
          onClick={() => clickBgClose && onCloseModal()}
        />

        {/* Contenido */}
        <Dialog.Content
          className={
            clsx(`fixed w-[90%] max-w-3xl left-1/2 top-1/2 z-100 -translate-x-1/2 -translate-y-1/2 
                 bg-surface rounded-lg p-4 pb-8 focus:outline-none data-[state=closed]:animate-fadeOut`,
              {
                "max-w-3xl": (!size),
                [size ? SIZE(size) : ""]: !!size,
                "DialogContentOpen": okModal,
                "DialogContentClose": !modalOpen
              })
          }
          onAnimationEnd={onAnimationEnd}
        >
          <Dialog.Title className="text-lg font-bold ">
            <div className="w-full flex items-start  relative pt-2" >
              <div className={` px-6 font-black text-text text-3xl`} >
                {title}
              </div>
              {
                !inactiveClose &&
                <Dialog.Close
                  onClick={() => onCloseModal()}
                  className="ml-auto px-2 py-1 cursor-pointer text-text rounded bg-background border border-border hover:bg-hover">
                  <IoClose size={25} />
                </Dialog.Close>
              }

            </div>
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-500" asChild>
            <div className="  max-h-[70vh] scrollbar-thin overflow-auto pr-2  scrollbar-track-transparent 
                  scrollbar-thumb-bg-select">
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
