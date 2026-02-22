export type CrudAction = "create" | "update" | "delete" | "upload" | "restore";

export const MessageInfo = {
  create: (entity: string) => ({
    title: `Creando`,
    description: `Estamos registrando el ${entity}.`
  }),

  update: (entity: string) => ({
    title: `Actualizando`,
    description: `Se están guardando los cambios del ${entity}.`
  }),

  delete: (entity: string) => ({
    title: `Eliminando`,
    description: `Estamos eliminando el ${entity}.`
  }),

  upload: (entity: string) => ({
    title: `Subiendo`,
    description: `Estamos cargando el ${entity}.`
  }),

  restore: (entity: string) => ({
    title: `Restaurando`,
    description: `Estamos restaurando el ${entity}.`
  })
};

export const successMessage ={
  create:(entity:string)=>({
    title:"Registrado",
    desc:`${entity} registrado correctamente`,
  }),
  updated:(entity:string)=>({
    title:"Actualizado",
    desc:`${entity} actualizado correctamente`,
  }),
  deleted:(entity:string)=>({
    title:"Eliminado",
    desc:`${entity} eliminado correctamente`,
  })
}


//TODO: No se esta usando
// export const MessageError = {
//   // 🔹 SINGULAR
//   create: (entity: string, gender: Gender = "M") => ({
//     title: `Error al crear ${article(gender, "S")} ${entity}`,
//     description: `No se pudo registrar ${article(gender, "S")} ${entity}.`
//   }),

//   update: (entity: string, gender: Gender = "M") => ({
//     title: `Error al actualizar ${article(gender, "S")} ${entity}`,
//     description: `No se pudieron guardar los cambios.`
//   }),

//   delete: (entity: string, gender: Gender = "M") => ({
//     title: `Error al eliminar ${article(gender, "S")} ${entity}`,
//     description: `No se pudo eliminar ${article(gender, "S")} ${entity}.`
//   }),

//   upload: (entity: string, gender: Gender = "M") => ({
//     title: `Error al subir ${article(gender, "S")} ${entity}`,
//     description: `No se pudo cargar ${article(gender, "S")} ${entity}.`
//   }),

//   // 🔹 PLURAL
//   aggregates: (entity: string, gender: Gender = "M") => ({
//     title: `Error al crear ${article(gender, "P")} ${entity}`,
//     description: `No se pudieron registrar los elementos.`
//   }),

//   updates: (entity: string, gender: Gender = "M") => ({
//     title: `Error al actualizar ${article(gender, "P")} ${entity}`,
//     description: `No se pudieron guardar los cambios.`
//   }),

//   deletes: (entity: string, gender: Gender = "M") => ({
//     title: `Error al eliminar ${article(gender, "P")} ${entity}`,
//     description: `No se pudieron eliminar los elementos.`
//   }),
// };
