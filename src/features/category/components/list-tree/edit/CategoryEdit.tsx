"use client";
import { useStore } from "@/src/store/useStore";
import { DynamicModal } from "@/src/shared/components/modal";

import { Form } from "./Form";
import { Skeleton } from "@/src/shared/components/loading";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { getCategory } from "@/src/action/category";
import { MessageCard } from "@/src/shared/components/card";

export const CategoryEdit = () => {

  const setOpenModal = useStore(v => v.setOpenModalEditCategory);
  const openModal = useStore(v => v.openModalEditCategory);

  const onClose = () => { setOpenModal(false); }

  return (
    <DynamicModal
      title={`Editar categoría`}
      description="Modifica el nombre o la configuración de esta categoría. Los cambios se aplicarán a todos los elementos asociados de forma inmediata."
      sizeTitle="2xl"
      open={openModal}
      onClose={onClose}>
      <Render onClose={onClose} />
    </DynamicModal>
  )
}

const Render = ({ onClose }: { onClose: () => void }) => {

  const selected = useStore(v => v.selectedCategory);
  const id = selected?.id ?? 0

  const { data, status } = useQuery({
    queryKey: QUERY_KEYS.categories.edit(id),
    queryFn: () => getCategory({ id: id }),
    enabled: !!id,
    staleTime: 60 * 1000,
    gcTime: 2 * 60 * 1000
  })

  if (status === "error") {
    return (
      <MessageCard
        variant="error"
        title="Error de carga"
        message="Ocurrió un error al obtener la información de la categoría."
      />
    );
  }

  if (data?.ok === false) {
    return (
      <MessageCard
        variant="warning"
        title="Categoría no disponible"
        message={data.msg}
      />
    );
  }

  const res = data?.data!

  const parentStatus = selected?.paths.find(v => v.id === selected.parentId)?.recordStatus;

  const isAvailableForActive = (parentStatus !== "DRAFT" && parentStatus !== "DELETED") && selected?.recordStatus === "DRAFT";
  const isParentArchivate = parentStatus === "ARCHIVED";
  const selectStatus = selected?.recordStatus;
  return (
    <>
      {
        status === "pending"
          ? <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-22 col-span-2 " />
              <Skeleton className="w-full h-12 col-span-2" />
              <Skeleton className="w-full h-35 col-span-2" />
            </div>
          </>
          : (data)
            ? <Form
              onCloseModal={onClose}
              data={res}
              isAvailableForActive={isAvailableForActive}
              status={selectStatus ?? "DRAFT"}
              isParentArchivate={isParentArchivate}
            />
            : <></>

      }
    </>
  )
}