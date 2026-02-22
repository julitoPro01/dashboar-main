
import { MdDeleteOutline } from "react-icons/md";
import { CatgAttr } from "../CategoryAttributes";

interface Props {
    isEditing: boolean;
    onDelete: () => void;
    onChange: (key: keyof CatgAttr, value: boolean, attributeDefinitionId: number) => void;
    state: CatgAttr
}

export const SelectedAttrEditable = (props: Props) => {

    const { state, onDelete, isEditing, onChange } = props;

    return (
        <div className=" relative px-2 py-1 mt-1 font-semibold shadow">

            {
                (state.isNewSelection) &&
                <button
                    onClick={() => onDelete()}
                    type="button"
                    className="bg-red-500 text-white text-sm px-1.5 rounded-full absolute -top-2 -right-2 hover:bg-red-400 cursor-pointer" > x
                </button>
            }
            {
                (isEditing && !state.isNewSelection) &&
                <button
                    type="button"
                    name="delete"
                    onClick={() => onChange("isDelete",!state.isDelete, state.attributeDefinitionId)  }
                    className={`border border-red-500 text-sm p-1 active:bg-red-600 rounded-full absolute -top-2 -right-2 hover:bg-red-400 hover:text-white cursor-pointer
                        ${state.isDelete ? "bg-red-500 text-white" : "bg-white text-red-500"}
                    `} >
                    <MdDeleteOutline />
                </button>
            }

            <span>
                {state.attr.name}
            </span>
            <div className="flex flex-col py-1">


                <div className=" text-gray-400">
                    <label className={`flex items-center gap-2 text-sm`}>
                        <input
                            disabled={true}
                            defaultChecked={true}
                            className=" cursor-pointer"
                            type="checkbox"
                        />
                        <span className={`text-xs pb-1 ${state.attr.toProduct ? "text-blue-500" : "text-sky-500"}`}> {state.attr.toProduct ? "Tipo Producto" : "Tipo variante"} </span>
                    </label>
                </div>

                <div className=" text-gray-400">
                    <label className={`flex items-center gap-2 text-sm`}>
                        <input
                            className=" cursor-pointer"
                            type="checkbox"
                            checked={state.isFilter}
                            name="isFilter"
                            disabled={!isEditing}
                            onChange={() => onChange("isFilter", !state.isFilter, state.attributeDefinitionId)}
                        />
                        <span className="text-xs">Aplicar filtro</span>
                    </label>
                </div>

                <div className=" text-gray-400">
                    <label className={`flex items-center gap-2 text-sm`}>
                        <input
                            className=" cursor-pointer"
                            type="checkbox"
                            name="isRequired"
                            checked={state.isRequired}
                            disabled={!isEditing}
                            onChange={() => onChange("isRequired", !state.isRequired, state.attributeDefinitionId)}
                        // {...props.register(`categoryAttrs.${props.index}.isRequired`)}
                        />
                        <span className="text-xs">Es obligatorio</span>
                    </label>
                </div>
            </div>
        </div>
    )
}
