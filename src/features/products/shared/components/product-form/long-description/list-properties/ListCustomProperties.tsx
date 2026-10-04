import { FIELD_STYLE, Input, Textarea, useBasicForm } from "@/src/shared/form";
import {
    OriginalLongDescription,
    ProductProperty,
} from "@/src/store/productSlice";
import { useEffect, useState } from "react";
import { Item } from "./Item";
import { Button } from "@/src/shared/components/btn";
import { FaCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useFormContext } from "react-hook-form";
import { longDescriptionForm } from "@/src/features/products/types";

const initForm = {
    id: 0,
    label: "",
    value: "",
};

interface Props {
    originalLong: OriginalLongDescription;
}

export const ListCustomProperties = ({ originalLong }: Props) => {
    const { setValue } = useFormContext<longDescriptionForm>();

    const [properties, setProperties] = useState<ProductProperty[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const {
        state,
        isValidate,
        isError,
        handleChange,
        resetForm,
    } = useBasicForm(initForm, {
        label: (v, state) => state.value.trim().length > 0 && v.trim().length < 1 ? "Completa el campo" : true,
        value: (v, state) => state.label.trim().length > 0 && v.trim().length < 1 ? "Completa el campo" : true,
    });

    const updateFormValue = (props: ProductProperty[]) => {
        setProperties(props);

        setValue(
            "longDescription.customProperties",
            props,
            { shouldDirty: true }
        );
    };

    // Agregar o editar propiedad
    const handleSave = () => {
        const isValid = isValidate();

        if (
            state.label.trim().length === 0 &&
            state.value.trim().length === 0
        ) {
            return;
        }

        if (!isValid) return;

        // EDITAR
        if (editingId !== null) {
            const updated = properties.map((property) =>
                property.id === editingId
                    ? {
                        ...property,
                        label: state.label.trim(),
                        value: state.value.trim(),
                    }
                    : property
            );

            updateFormValue(updated);

            resetForm();
            setEditingId(null);

            return;
        }

        // AGREGAR
        const newProperty: ProductProperty = {
            id: Date.now(),
            label: state.label.trim(),
            value: state.value.trim(),
        };

        updateFormValue([
            ...properties,
            newProperty,
        ]);

        resetForm();
    };

    // Iniciar edición
    const handleEdit = (property: ProductProperty) => {
        setEditingId(property.id);

        handleChange("id", property.id);
        handleChange("label", property.label);
        handleChange("value", property.value);
    };

    // Cancelar edición
    const handleCancelEdit = () => {
        resetForm();
        setEditingId(null);
    };

    // Eliminar propiedad
    const handleDel = (id: number) => {
        const filter = properties.filter(
            (property) => property.id !== id
        );

        updateFormValue(filter);

        if (editingId === id) {
            handleCancelEdit();
        }
    };

    // Inicializamos las propiedades
    // Restauramos el estado
    useEffect(() => {
        setProperties(originalLong.customProperties);
        setEditingId(null);
        resetForm();
    }, [originalLong.version]);

    return (
        <>
            <ul className="divide-y divide-border-subtle border-t border-border-subtle">
                {properties.map((property) => (
                    <Item
                        key={property.id}
                        property={{
                            ...property,
                            isCustom: true,
                        }}
                        onDel={() => handleDel(property.id)}
                        onEdit={() => handleEdit(property)}
                    />
                ))}
            </ul>

            {/* FORMULARIO */}
            <ul className="border-t border-border-subtle bg-bg-select">
                <li className="px-4 py-3">
                    <div className="flex flex-col gap-3">

                        {/* PROPIEDAD */}
                        <div>
                            <Input
                                type="text"
                                placeholder="Propiedad..."
                                fieldSize="sm"
                                fieldClass="bg-surface-black"
                                value={state.label}
                                onChange={({ target }) =>
                                    handleChange("label", target.value)
                                }
                                maxLength={80}
                            />

                            {isError.label && (
                                <span className={FIELD_STYLE.validation.errorMsg}>
                                    {isError.label}
                                </span>
                            )}
                        </div>

                        {/* VALOR */}
                        <div>
                            <Textarea
                                placeholder="Valor..."
                                fieldSize="sm"
                                fieldClass="bg-surface-black"
                                value={state.value}
                                onChange={({ target }) =>
                                    handleChange("value", target.value)
                                }
                                maxLength={300}
                                rows={3}
                            />

                            {isError.value && (
                                <span className={FIELD_STYLE.validation.errorMsg}>
                                    {isError.value}
                                </span>
                            )}
                        </div>

                        {/* ACCIONES */}
                        <div className="flex justify-end gap-2">
                            {editingId !== null && (
                                <Button
                                    type="button"
                                    variant="basic"
                                    padding="px-2 py-2"
                                    onClick={handleCancelEdit}
                                >
                                    <MdClose size={16} />
                                </Button>
                            )}

                            <Button
                                type="button"
                                variant="secondary"
                                padding="px-2 py-2"
                                onClick={handleSave}
                            >
                                <FaCheck size={16} />
                            </Button>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
};