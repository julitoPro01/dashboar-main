"use client"

import clsx from "clsx"
import { useForm } from "react-hook-form"
import { BiInfoCircle } from "react-icons/bi"
import { addSupplierUser } from "@/src/action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useStore } from "@/src/store/useStore"
import { RoleSelector } from "@/src/components/auth"
import { BtnSubmitLoading, ToastError, ToastSuccess } from "@/src/components/ui"
import { UserRole } from "@/src/domains/auth"
import { UpsertSupplierUserForm } from "../shared/upsertSupplierUserForm.type"
import { UpsertSupplierUserFormSchema } from "../shared/upsertSupplierUserForm.schema"

interface Props {
    suppliers: {id:number,name:string}[]
}

export const CreateSupplierUserForm = ({ suppliers }: Props) => {

    const authRoles = useStore(v => v.bootAuthRoles);

    const { handleSubmit, register, watch, setValue, formState: { errors }, clearErrors, reset } = useForm<UpsertSupplierUserForm>({
        resolver: zodResolver(UpsertSupplierUserFormSchema),
        defaultValues: {}
    })
    const primaryRole = watch("primaryRole");
    const secundaryRoles = watch("secundaryRoles") ?? [];

    const primaryChange = (role: UserRole) => {
        setValue("primaryRole", role, { shouldDirty: true });
        setValue("secundaryRoles", [], { shouldDirty: true });
    }
    const secondaryChange = (roles: UserRole[]) => {
        setValue("secundaryRoles", roles, { shouldDirty: true });
    }

    const onSubmit = async (state: UpsertSupplierUserForm) => {
        const secondaryRoleIds = authRoles.filter(v => state.secundaryRoles?.some(role => role === v.name)).map(v => v.id);
        secondaryRoleIds.unshift(authRoles.find(v => v.name === state.primaryRole)!.id)
        const res = await addSupplierUser({
            supplierId: state.supplierId,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            phone: state.phone,
            primaryRole: state.primaryRole,
            secondaryRoleIds: secondaryRoleIds
        }, {
            password: generarPasswordAleatory().toString(),
        });

        if (res.ok) {
            const { firstName, id } = res.data!
            reset();
            toastSuccess(firstName, id);
        } else {
            toastError()
        }
    }

    useEffect(() => {

        if (primaryRole) {
            clearErrors("primaryRole")
        }

    }, [primaryRole])



    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4" >
            <div className="grid grid-cols-2 gap-4" >
                {/* NOMBRE */}
                <div>
                    <div className="flex gap-2">
                        <label className="block text-xs text-gray-500">Nombre* </label>
                        <BiInfoCircle className=" cursor-pointer text-gray-500 hover:text-yellow-500" />
                    </div>
                    <input
                        className={clsx("mt-1 w-full border rounded-lg px-3 py-2 text-sm",
                            {
                                "border-red-400 focus:border-red-500 focus:ring-red-100": errors.firstName,
                                "border-gray-200": !errors.firstName
                            }
                        )}
                        {...register("firstName", { required: { value: true, message: "El nombre es obligatorio" } })}
                    />

                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
                </div>
                {/* APELLIDO */}
                <div>
                    <div className="flex gap-2">
                        <label className="block text-xs text-gray-500">Apellido completo* </label>
                        <BiInfoCircle className=" cursor-pointer text-gray-500 hover:text-yellow-500" />
                    </div>
                    <input
                        className={clsx("mt-1 w-full border rounded-lg px-3 py-2 text-sm",
                            {
                                "border-red-400 focus:border-red-500 focus:ring-red-100": errors.lastName,
                                "border-gray-200": !errors.lastName
                            }
                        )}
                        {...register("lastName", { required: { value: true, message: "El apellido es obligatorio" } })}
                    />

                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
                </div>
                {/* EMAIL */}
                <div>
                    <div className="flex gap-2">
                        <label className="block text-xs text-gray-500">Email* </label>
                        <BiInfoCircle className=" cursor-pointer text-gray-500 hover:text-yellow-500" />
                    </div>
                    <input
                        className={clsx("mt-1 w-full border rounded-lg px-3 py-2 text-sm",
                            {
                                "border-red-400 focus:border-red-500 focus:ring-red-100": errors.email,
                                "border-gray-200": !errors.email
                            }
                        )}
                        {...register("email", { required: { value: true, message: "El correo electrónico es obligatorio" } })}
                    />

                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                {/* TELEFONO */}
                <div>
                    <div className="flex gap-2">
                        <label className="block text-xs text-gray-500">Teléfono (+51)</label>
                        <BiInfoCircle className=" cursor-pointer text-gray-500 hover:text-yellow-500" />
                    </div>
                    <input
                        className={clsx("mt-1 w-full border rounded-lg px-3 py-2 text-sm",
                            {
                                "border-red-400 focus:border-red-500 focus:ring-red-100": errors.phone,
                                "border-gray-200": !errors.phone
                            }
                        )}
                        type="tel"
                        inputMode="numeric"
                        {...register("phone", {
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "Solo se permiten números",
                            },
                            minLength: {
                                value: 9,
                                message: "Mínimo 9 dígitos"
                            },
                            maxLength: {
                                value: 9,
                                message: "Máximo 9 dígitos"
                            }
                        })}
                    />

                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
                {/*TODO:  NEGOCIO - Disponible para ADMIN */}
                <div>
                    <div className="flex gap-2">
                        <label className="block text-xs text-gray-500">Negocío*</label>
                        <BiInfoCircle className=" cursor-pointer text-gray-500 hover:text-yellow-500" />
                    </div>
                    <select
                        className={clsx("mt-1 w-full border rounded-lg px-3 py-2 text-sm", {
                            "border-red-400 focus:border-red-500 focus:ring-red-100": errors.supplierId,
                            "border-gray-200": !errors.supplierId
                        })}
                        {...register("supplierId", { min: { value: 1, message: "Seleccione un negocio" }, valueAsNumber: true })}
                    >
                        <option className="text-gray-500" value={0}>--- Seleccionar ---</option>
                        {
                            suppliers.map(v => (
                                <option key={v.id} className="text-gray-500" value={v.id}>{v.name}</option>
                            ))
                        }

                    </select>
                    {errors.supplierId && <p className="text-xs text-red-500 mt-1">{errors.supplierId.message}</p>}
                </div>
            </div>
            {/* ROL */}
            <RoleSelector
                group="supplier"
                primaryRole={primaryRole}
                secondaryRoles={secundaryRoles}
                onPrimaryChange={primaryChange}
                onSecondaryChange={secondaryChange}
                errorMessage={errors?.primaryRole?.message}
            />

            <BtnSubmitLoading
                // loading={isSubmitting}
                title="Agregar asuario"
                loadingTitle="Agregando..."
                variant="primary"
                className="mt-10 w-60"
                type="submit" />
        </form>
    )
}



function generarPasswordAleatory(): number {
    return Math.floor(100000 + Math.random() * 900000);
}

const toastSuccess = (name: string, id: number) => ToastSuccess({
    title: "Usuario registrado",
    description: `"${name}" ha sido añadido al sistema.`,

    link: {
        title: "Ver detalles",
        href: `/suppliers-user/${id}`
    }
}, { duration: 5000 });

const toastError = () => ToastError({
    title: "Error al agregar",
    description: "No fue posible agregar un nuevo usuario.",
    activeBtnClose: true
}, { duration: 5000 })