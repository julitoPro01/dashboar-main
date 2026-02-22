import { useMemo, useState, } from "react";
import { useBasicForm } from "@/src/hooks";
import { addCategoryAttr } from "@/src/action";
import { SelectedAttrEditable } from "./SelectedAttr-editable";
import { CatgAttr } from "../CategoryAttributes";
import { AttributeDefinitionsResponse } from "@/src/interfaces/attribute/attribute.api";
import { ToastError, ToastSuccess } from "@/src/components/ui";


interface Props {
  closeModal: () => void;
  attributes: AttributeDefinitionsResponse;
  categoryId: number;
  selectedAttrs: CatgAttr[];
  setNewAttrs: (_: CatgAttr[]) => void;
}

export const Attributes = ({ closeModal, attributes, selectedAttrs, categoryId, setNewAttrs }: Props) => {

  const { state, handleChange } = useBasicForm<{ search: string, toProduct: boolean }>({ search: "", toProduct: true });
  // Copia de los atributos seleccionados;

  const [newSelectedAttrs, setNewSelectedAttrs] = useState<CatgAttr[]>(selectedAttrs);

  const onFieldChange = (key: keyof CatgAttr, value: boolean, attributeDefinitionId: number) => {
    setNewSelectedAttrs(v => v.map(v => v.attributeDefinitionId === attributeDefinitionId ? { ...v, [key]: value } : v));
  }

  // Filtrado optimizado con useMemo
  const filteredAttrs = useMemo(() => {

    const search = state.search.trim().toUpperCase();
    const toProduct = state.toProduct;

    if (!search) return attributes.filter(attr => attr.toProduct === toProduct);

    return attributes.filter(attr =>
      attr.name.toUpperCase().includes(search) && attr.toProduct === toProduct
    );
  }, [state.search, state.toProduct, attributes]);

  const toogleSelectAttr = (attr: { name: string, attributeDefinitionId: number, toProduct: boolean }) => {

    const find = selectedAttrs.find(v => v.attributeDefinitionId === attr.attributeDefinitionId);
    if (find && !find.isNewSelection) return;

    const existsAttr = newSelectedAttrs.some(val => (val.attributeDefinitionId === attr.attributeDefinitionId));

    const initCategoryAttr: CatgAttr = {
      categoryId: 0,
      isFilter: false,
      isRequired: false,
      attributeDefinitionId: attr.attributeDefinitionId,
      attr: { name: attr.name, toProduct: attr.toProduct },
      isNewSelection: true,
      isDelete:false
    }

    if (existsAttr)
      setNewSelectedAttrs(v => v.filter(v => v.attributeDefinitionId !== attr.attributeDefinitionId));
    else
      setNewSelectedAttrs(v => ([...v, initCategoryAttr]))
  }

  const deleteAttr = (attributeDefinitionId: number, isNewSelection: boolean) => {

    const existsAttr = newSelectedAttrs.some(val => val.attributeDefinitionId === attributeDefinitionId);

    if (existsAttr && isNewSelection)
      setNewSelectedAttrs(v => v.filter(v => v.attributeDefinitionId !== attributeDefinitionId));

  }

  const onSave = async () => {

    const updateStates = newSelectedAttrs.filter(v => v.isNewSelection && !v.isDelete).map(v => ({
      categoryId,
      attributeDefinitionId: v.attributeDefinitionId,
      isRequired: Array.isArray(v.isRequired) ? v.isRequired.length > 0 : v.isRequired,
      isFilter: Array.isArray(v.isFilter) ? v.isFilter.length > 0 : v.isFilter
    }));

    const res = await addCategoryAttr(updateStates);

    if (res.ok) {

      ToastSuccess({
        title: "msgSuccess.title",
        description: "msgSuccess.description"
      }, { duration: 3000 });

      setNewAttrs(newSelectedAttrs.map(v => ({
        ...v,
        id: res.data!.find(v => v.attributeDefinitionId === v.attributeDefinitionId)?.id,
        isNewSelection: false
      })));
      closeModal();

    }
    else
      ToastError({
        title: "msgError.title",
        description: "msgError.description"
      }, { duration: 5000 })


  }


  return (
    <div className="space-y-4 px-2 relative">
      {/* Campo de búsqueda */}
      <div className="py-4">
        <div className="space-x-2 mb-2" >
          <button className={`underline-offset-2 hover:underline hover:text-black ${state.toProduct ? "underline text-black" : ""}`}
            onClick={() => handleChange("toProduct", true)}>Productos</button>
          <button className={`underline-offset-2 hover:underline hover:text-black ${!state.toProduct ? "underline text-black" : ""}`}
            onClick={() => handleChange("toProduct", false)}>Variantes</button>
        </div>
        <input
          type="text"
          placeholder="Buscar atributos..."
          className="w-full border px-3 py-2 rounded-md outline-none focus:ring focus:ring-blue-300"
          value={state.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>

      {/* Lista de atributos*/}
      <div className="flex flex-wrap justify-start items-start gap-4 py-2 min-h-2 max-h-70 h-full overflow-x-auto scrollbar-hide">
        {filteredAttrs.map(attr => {

          const selected = newSelectedAttrs.find(v => v.attributeDefinitionId === attr.id);

          return <Item key={attr.id}
            isNewSelection={selected ? selected.isNewSelection : true}
            attr={attr} isSelected={!!selected}
            onSelect={() => toogleSelectAttr({ name: attr.name, attributeDefinitionId: attr.id, toProduct: attr.toProduct })} />
        })}
      </div>
      {/* Lista de atributos seleccionados */}
      <div className="border border-gray-400 rounded p-3 relative" >

        <span>Atributos seleccionados:</span>
        <div className="pt-5 flex flex-wrap gap-3">
          {newSelectedAttrs.map((val, i) => (
            <SelectedAttrEditable
              key={val.attributeDefinitionId}
              isEditing={val.isNewSelection}
              onDelete={() => deleteAttr(val.attributeDefinitionId, val.isNewSelection)}
              onChange={onFieldChange}
              state={val}
            />
          ))}
        </div>


      </div>

      <div className="flex gap-3 mt-5 justify-end sticky bottom-0  bg-white">
        <button
          disabled={!newSelectedAttrs.some(v => v.isNewSelection)}
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-medium disabled:bg-gray-500">
          Aceptar
        </button>

        <button
          onClick={() => closeModal()}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition font-medium">
          Cancelar
        </button>
      </div>

    </div>
  );
};

// const msgError = MessageError.aggregates("Atributos");
// const msgSuccess = MessageSuccess.aggregates("Atributos");


interface ItemProps {
  attr: any;
  isSelected: boolean;
  isNewSelection: boolean;
  onSelect: () => void;
}

export const Item = ({ attr, isSelected, onSelect, isNewSelection }: ItemProps) => {
  return (
    <div
      className={`
                relative cursor-pointer hover:shadow-md  hover:border-orange-300 transition-all p-3 max-w-xs min-w-25  justify-between border  rounded-md bg-white shadow-sm
                ${(isSelected && isNewSelection) ? "border-orange-300 shadow-orange-100" : (!isNewSelection && isSelected) ? "border-blue-300 shadow-blue-100" : ""} 
                `}
      onClick={onSelect}
    >
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">
          {attr.name}
        </span>
        {attr.description && (
          <span className="text-sm text-gray-500">
            {attr.description}
          </span>
        )}
      </div>

      <span
        className={`px-2 py-1 absolute -top-4 right-2 rounded bg-white font-semibold  text-sm
                     ${attr.isActive ? "text-green-500" : "text-red-500"}`}
      >
        {attr.isActive ? "Activo" : "Inactivo"}
      </span>
    </div>
  )
}
