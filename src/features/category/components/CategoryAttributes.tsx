"use client";

import { deleteCategoryAttr, getCategoryAttrs, updateCategoryAttr } from "@/src/action";
import { useStore } from "@/src/store/useStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { DropMenu, FooterBtnActions } from "./category-details";
import { SelectedAttrEditable } from "./categoryAttributes/SelectedAttr-editable";
import { Attributes } from "./categoryAttributes/Attributes";
import { CategoryAttr } from "@/src/interfaces/category";
import { AttributeDefinitionsResponse } from "@/src/interfaces/attribute/attribute.api";
import { ToastError, ToastSuccess } from "@/src/components/ui";
import { DynamicModal } from "@/src/components/modal";

interface Props {
    attributes: AttributeDefinitionsResponse;
}

export const CategoryAttributes = ({ attributes }: Props) => {

    const selectedCategory = useStore(v => v.selectedCategory);
    const prevAttrs_ref = useRef<CatgAttr[]>([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [attrs, setAttrs] = useState<CatgAttr[]>([]);

    // START - funciones para actulizar
    const onFieldChange = (key: keyof CatgAttr, value: boolean, attributeDefinitionId: number) => {
        setAttrs(v => v.map(v => v.attributeDefinitionId === attributeDefinitionId ? { ...v, [key]: value } : v));
    }

    const onActivateEditing = () => {
        setIsEditing(true);

        // guardamos el objeto para restaurar luego
        prevAttrs_ref.current = structuredClone(attrs);

    }

    const onCancel = () => {

        setIsEditing(false);

        setAttrs(prevAttrs_ref.current)
        // Eliminamos el objeot una vez restaurado
        prevAttrs_ref.current = []
    }

    const updateAttrs = async () => {
        const data = attrs.filter(v => !v.isDelete).map(v => ({
            id: v.id!,
            categoryId: selectedCategory!.id,
            attributeDefinitionId: v.attributeDefinitionId,
            isRequired: v.isRequired,
            isFilter: v.isFilter
        }));

        const res = await updateCategoryAttr(data);

        if (res.ok) {

            ToastSuccess({
                title: msgSuccess,
                description: msgSuccess
            }, { duration: 5000 });

            setIsEditing(false);
        }
        else
            ToastError({
                title: msgError,
                description: msgError
            }, { duration: 5000 })
    }

    const deleteAttrs = async () => {
        const data = attrs.filter(v => v.isDelete).map(v => v.id!);

        const res = await deleteCategoryAttr(data);

        if (res.ok) {

            ToastSuccess({
                title: msgDelSuccess,
                description: msgDelSuccess
            }, { duration: 5000 });

            setAttrs(v => v.filter(v => v.id !== data.find(id => id === v.id)))
            setIsEditing(false);
        }
        else
            ToastError({
                title: msgDelError,
                description: msgDelError
            }, { duration: 5000 })
    }

    const onSaveChange = async (e: FormEvent) => {
        e.preventDefault();

        await updateAttrs()
        await deleteAttrs();
    }
    // END

    const onCloseModal = (type?: "acepted") => {


        setIsEditing(false);
        setModalOpen(false);
        if (!type) {

            // resetField("categoryAttrs", { defaultValue: prevAttrs_ref.current });
        }
        // Eliminamos el objeot una vez restaurado
        prevAttrs_ref.current = []
    }
    // Cargamos los listados de categoría atributos
    useEffect(() => {

        if (!selectedCategory) return;

        getCategoryAttrs( { categoryId: selectedCategory.id } )
            .then(v => {
                if (v.ok) {
                    setAttrs(v.data!.map(v => ({
                        id: v.id,
                        categoryId: v.categoryId,
                        attributeDefinitionId: v.attributeDefinitionId,
                        isFilter: v.isFilter,
                        isRequired: v.isRequired,
                        attr: { name: v.attributeDefinition.name, toProduct: v.attributeDefinition.toProduct },
                        isNewSelection: false,
                        isDelete: false
                    })))
                }
            })

    }, [selectedCategory?.id])


    if (!selectedCategory)
        return null;

    return (
        <>
            <form onSubmit={onSaveChange} >

                {
                    selectedCategory &&
                    <>
                        <DropMenu
                            title="Atributos requeridos"
                            isEditing={isEditing}
                            onActivateEditing={() => onActivateEditing()}
                            onAddAttribute={() => setModalOpen(true)}
                        />

                        <div className="rounded-xl bg-white p-4 mx-6 my-10 flex flex-wrap gap-3 shadow-sm border border-slate-200">

                            {
                                attrs.length > 0

                                    ? attrs.map((val, i) => (
                                        <SelectedAttrEditable
                                            key={val.attributeDefinitionId}
                                            isEditing={isEditing}
                                            onChange={onFieldChange}
                                            onDelete={() => { }}
                                            state={val}
                                        />
                                    ))
                                    : <span className="text-sm text-slate-400 italic text-center">
                                        No hay atributos requeridos para esta categoría.
                                    </span>
                            }

                        </div>

                        {
                            (isEditing && !modalOpen)
                            &&
                            < FooterBtnActions
                                onCancel={onCancel}
                                disabled={isEditing}

                            />
                        }
                    </>
                }


            </form>
            {/* MODAL */}
            <DynamicModal
                title="Agregar atributos"
                modalOpen={modalOpen}
                onCloseModal={onCloseModal}
                inactiveClose={true}
            >
                <Attributes
                    selectedAttrs={attrs}
                    attributes={attributes}
                    categoryId={selectedCategory?.id ?? 0}
                    closeModal={onCloseModal}
                    setNewAttrs={(attrs) => setAttrs(attrs)}
                />

            </DynamicModal>
        </>
    )
}



export interface CatgAttr extends CategoryAttr {
    attr: { name: string, toProduct: boolean },
    isNewSelection: boolean; // Estado para manejar atributos existes y nuevos
    isDelete: boolean;
}

export interface InitCatgAttr {
    categoryAttrs: CatgAttr[]
}

const msgError = "TODO:Error";
const msgSuccess = "TODO:Success";

const msgDelError = "TODO:Error";
const msgDelSuccess = "TODO:Success";

