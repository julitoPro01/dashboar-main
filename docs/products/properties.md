

# ATRIBUTOS / PROPIEDADES

   - Atributos - Claves definidas de un objeto.
   - Propiedades - Clave + Valor

## PROPIEDADES DEL SISTEMA

## CREAR PROPIEDADES PERSONALIZADAS

1. Los datos de inicialización se almacenan en `Zustand` y se controlan mediante `version`.

2. Inicialización:
   - `CreateProduct.tsx` → `useForm`
   - `ListCustomProperties.tsx` → `useState`
     - Cuando cambia `version`, se restaura el estado interno de `useState` con `originalLongDescription.customAttributes`.

3. No se utiliza `useFieldArray`.
   - Se utiliza un estado interno para evitar que la gestión de las propiedades personalizadas afecte el control de `dirtyFields` de `useForm`.