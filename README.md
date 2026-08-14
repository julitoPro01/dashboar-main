

## CORRER EN DEV
1. Clonar el repositorio
2. Cambiar las variables de entorno. Realizar una compi del ``.env.template`` a ``.env``
3. Instalar dependencias ``pnpm install``
4. Levantamos la base de datos ``docker compose up -d`` 
5. Iniciar prisma ```npx prisma generate``
# Semilla
5.01 ``pnpm add -D tsx``
5.1 Ejecutar semilla ``npx prisma db seed``

6. Correr el proyecto `pnpm run dev`

00. Para resetear datos ``npx prisma migrate reset``
01. Para enviar cambios de codigo ``npx prisma migrate dev --name "name"``
02. para guardar los cambios ```npx prisma generate``

## STYLES
1. Stilos en scrollbar ``pnpm install tailwind-scrollbar``
1.1 Importado en ``global.css``
2. Para ocultar ``pnpm tailwind-scrollbar-hide``

## MENSAGES DE INFORMATIVOS 
    
✅ Corrección mínima (manteniendo tu estilo)

Error al inicializar los datos requeridos. Intente de nuevo más tarde.

✅ Alternativas más naturales

👉 Más clara y común en aplicaciones:

No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde.

👉 Si quieres transmitir que podría ser un error temporal:

No pudimos cargar la información. Intenta nuevamente en unos segundos.

👉 Si hay un botón de acción (como "Reintentar"):

Hubo un error al cargar los datos. Vuelve a intentarlo.

## ICONOS UTILES

1. Lapiz encima de una linea ``CiEdit``
2. Lapiz dentro de un cuatro ``FaRegEdit`` 
3. Signo mayor ``MdKeyboardArrowRight | MdArrowForwardIos MdArrowBackIosNew`` = ```>``
5. Tres puntos en vertical ``<MdMoreVert  />``
6. Refresh ``GrRefresh ``
7. volver atras "<" ``IoIosArrowBack``
8. volver atras "<-" ``IoMdArrowRoundBack``              
9. Mas "+" `` <BiPlus />``
10. activar un formulario para una lista ``MdPostAdd``
10. Info ``MdOutlineInfo``
4. Confirmar,guardar cambios, Check simple /fa6 ``<FaCheck />``
11. Eliminar lista ``<MdOutlineDeleteSweep />``
12. Restaura todo a valor original ``MdRestartAlt ``
13.Agregar, Asignar a una lista existente ``<MdOutlinePlaylistAdd  />``

## CREAR COMPONENT PAGE "FUNCTION"
-- prc
## CREAR COMPONENTS "CONTS"
-- raf, raf...


## 💡 Reglas de oro para nombrar funciones

- ``Sustantivo`` - Es el concepto principal.
- ``Adjetivo`` - Es la palabra que describe al sustantivo.
- ``Adjetivo + Sustantivo``

- Sustantivo: Es el nombre (la etiqueta) que elegimos.
# Vervo + Sustantivo 
Estándar. Ideal para funciones que ejecutan la acción de cambiar el valor.
set...: Para asignar un valor directamente (ej. setName).
update...: Para modificar un registro existente (ej. updateName).
handle...: Para funciones que reaccionan a una acción del usuario (ej. handleNameChange).
is... / has...: Para funciones que devuelven un booleano (ej. isNameValid).
# Sustantivo + Vervo
Eventos. Se usa más para describir qué sucedió (ej. en un manejador de eventos como onNameChange).
# (Verbo + Objeto/Contexto).
los nombres yendo de la acción general a la entidad específica - useRefreshSelectedMain


## NOMBRE DE COMPONENTES O FUNCIONES
# Acciones flotantes
1. Seleccionar una fila de la tabla ``RowFloatingActions.tsx``
2. Varias items seleccionados incluir ``selection`` ej: selectionRows (Seleccionar filas)


## EXPORTACION DE ARCHIVOS DE UNA CARPETA
1. Si existe un archivo con el mismo nombre de  la carpeta, sera el unico que sera exportado.
2. Si los archivos contienen nombres distintos a la carpeta, todos seran exportados.

<!-- -----------CRUD---------------------- -->
## DIFERENCIA ENTRE UPDATE Y EDIT
# Edit -> cambio visual en pantalla editField, editName.
# Update -> cambio persistente en la DB.

## DIFERENCIA ENTRE SET, ADD, CREATE
# Set -> reemplaza por completo un valor.
# Add -> Añade un valor existente a otro objeto.
# Create -> Crea un valor nuevo y lo agrega al objeto.

## DIFERENCIA ENTRE DELETE, REMOVE
# Delete -> Elimina por completo de la DB.
# Remove -> Saca de una lista local (UI)
<!-- ---------------------------------------- -->

## ESTADO DE CONSULTAS https
# GET
- isLoading: primera carga.
- isFetching: cualquier petición en curso (incluye refetch).
# POST, PUT, PATCH, DELETE
- isPending: esta realizando una operación