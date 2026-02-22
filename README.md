

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
3. Signo mayor ``MdKeyboardArrowRight`` = ```>``
4. Check simple ``<FaCheck />``