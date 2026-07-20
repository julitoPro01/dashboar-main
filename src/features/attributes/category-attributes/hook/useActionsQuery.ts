import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { AddCategoryAttrs, addCategoryAttrs, delCategoryAttrs, EditCategoryAttrs, editCategoryAttrs, getCategoryAttrs } from "@/src/action/attribute";
import { useStore } from "@/src/store/useStore";
import { useDelayedFetchState } from "@/src/shared/hooks";
import { useShallow } from "zustand/react/shallow";

import { useStableUrlPagination, type PaginationBasic } from "@/src/shared/table";
import { APP_ROUTES } from "@/src/shared/routes";
import { errorMessages, successMessage } from "@/src/shared/messages";
import { getToastStyle, ToastError } from "@/src/shared/components/toaster";
import { toast } from "sonner";
import { CategoryAttrsResponse } from "../types";

export const useDataQuery = (pagi: PaginationBasic) => {


    const { filters, setFetchStatus } = useStore(
        useShallow(v => ({
            filters: v.categoryAttrFilter,
            setFetchStatus: v.setFetchStatus
        }))
    );

    const pag = useStableUrlPagination(pagi, filters, APP_ROUTES.ATTRIBUTES.CATEGORY)

    const { data, isFetching, isError } = useQuery({
        queryKey: QUERY_KEYS.attributes.listCatg(pag, filters),
        queryFn: () => getCategoryAttrs(pag, filters),
        select: (res) => {
            if (!res) return null;
            return {
                data: res.data,
                ok: res.ok
            }
        },
        staleTime: 60 * 1000,
        enabled: !!filters.categoryId,
        // refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();
    const updateData = (id: any, columnId: string, value: any) => {
        queryClient.setQueryData(QUERY_KEYS.attributes.listCatg(pag, filters), (old: { data: CategoryAttrsResponse }) => {
            if (!old) return old;
            return {
                ...old,
                data: {
                    meta: old.data.meta,
                    categoryAttrs: old.data.categoryAttrs.map(item => (item.id === id ? { ...item, [columnId]: value } : item))
                }
            }
        });
    };

    // Mostramos el estado de carga (UI)
    useDelayedFetchState({
        isFetching,
        errorMsg: isError || (data ? !data.ok : false),
        setState: setFetchStatus,
        delay: 1000,
    });

    const catgAttrs = filters.actionType === "edit" ? [...data?.data?.categoryAttrs ?? []] : data?.data?.categoryAttrs ?? [];
    const metaPagination = data?.data?.meta;


    return {
        data: catgAttrs,
        metaPagination,
        actionType: filters.actionType,
        pag,
        updateData
    }
}

export const useCategoryAttrActions = () => {

    const queryClient = useQueryClient()
    //---------------
    const delMutation = useMutation({
        mutationFn: delCategoryAttrs,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.listCatg({}, {}) }); }
    })

    const deleteRows = ({ ids, updateIds }: { ids: number[], updateIds: number[] }, call: () => void) => {
        delMutation.mutate({ ids, updateIds }, {
            onSuccess: (val) => {
                if (val.ok) {
                    call()
                    toastDelete()
                } else toastError()
            }, onError: () => {
                toastError()
            }
        })
    }
    //---------------
    const createMutation = useMutation({
        mutationFn: addCategoryAttrs,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.listCatg({}, {}) }) }
    });

    const assignRows = async (categoryId: number, data: AddCategoryAttrs[], call: () => void) => {

        createMutation.mutate({
            categoryId: categoryId,
            data
        }, {
            onSuccess:async (data) => {
                if (data.ok) {
                    toastAssign();
                    call()

                } else
                    toastError()
            },
            onError: () => {
                toastError()
            },
        })

    }
    //---------------
    const editMutation = useMutation({
        mutationFn: editCategoryAttrs,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.listCatg({}, {}) }) }
    })

    const editRows = (data: EditCategoryAttrs[], call: () => void) => {
        editMutation.mutate(data, {
            onSuccess: (data) => {
                if (data.ok) {
                    toastEdit()
                    call()
                } else {
                    toastError()
                }
            },
            onError: () => {
                toastError()
            }
        })
    }
    const loading = createMutation.isPending || editMutation.isPending || delMutation.isPending;
    const isError = createMutation.isError || editMutation.isError || delMutation.isError;

    return {
        deleteRows,
        assignRows,
        editRows,
        loading,
        isError
    }
}

const succ = successMessage.deleted("Attributo");
const toastDelete = () => toast.success(succ.description, { style: getToastStyle("success") })

const toastAssign = () => toast.success("Los atributos se han asignado correctamente", { style: getToastStyle("success") })

const toastEdit = () => toast.success("Los valores se han actualizado correctamente", { style: getToastStyle("success") })

const toastError = () => ToastError({
    title: errorMessages.generic.title,
    description: errorMessages.generic.description
}, { duration: 5000 })