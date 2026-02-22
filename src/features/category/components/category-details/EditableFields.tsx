import { UseFormRegister } from "react-hook-form"
import { InitDetailsForm } from "../CategoryDetails"
import clsx from "clsx";
import { CategoryStatusBadgeConfig } from "../../constants";
import { categoryStatusGroup } from "../../utils";

interface Props {
    register: UseFormRegister<InitDetailsForm>;
    categoryStatus: any[];
    disabled: boolean,
    parentStatusId?: number,
}

export const EditableFields = ({ register, categoryStatus, disabled, parentStatusId }: Props) => {

    const statusGroup = categoryStatusGroup(categoryStatus);
    const isPublic = statusGroup.publicStatus.some(v => v.id === parentStatusId);
    const draft = statusGroup.draft;

    const status = !parentStatusId
        ? categoryStatus
        : isPublic
            ? categoryStatus
            :[ ...statusGroup.privateStatus, draft];


    return (
        <div className="rounded-xl bg-white p-4 border border-slate-200 h-50">
            {/* ESTADO */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500">Estado *</label>
                <select
                    className={clsx("w-full border bg-white  text-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none", {
                        "border-slate-200": disabled,
                        "border-slate-300": !disabled
                    })}
                    {...register("recordStatusId", {
                        min: { value: 1, message: "El estado no es válido" },
                    })}
                >

                    {status.map(val => {

                        return (
                            <option key={val.id} value={val.id} disabled={ val.id === draft.id}  >
                                {CategoryStatusBadgeConfig[val.name].label} </option>
                        )
                    })}

                    <option value={0} className="text-gray-500">--- Seleccione estado ---</option>
                </select>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="space-y-1 h-full">
                <label className="text-xs font-medium text-slate-500">Descripción</label>
                <textarea
                    className={clsx("w-full h-20 max-h-20  bg-white border  rounded-lg px-3 py-2 text-sm  focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none scrollbar-thin", {
                        "border-slate-200": disabled,
                        "border-slate-300": !disabled
                    })}
                    {...register("description")}
                />
            </div>

        </div>)
}
