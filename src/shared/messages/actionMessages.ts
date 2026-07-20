export type CrudAction = "create" | "update" | "delete" | "upload" | "restore";

type MessagePayload = {
  title: string;
  description: string;
};

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


const actionLabels: Record<CrudAction, string> = {
  create: "Creado",
  update: "Actualizado",
  delete: "Eliminado",
  upload: "Subido",
  restore: "Restaurado",
};

const successTemplates: Record<CrudAction, (entity: string) => MessagePayload> =
  Object.fromEntries(
    Object.entries(actionLabels).map(([action, label]) => [
      action,
      (entity: string) => ({
        title: label,
        description: `${entity} ${label.toLowerCase()} correctamente`,
      }),
    ])
  ) as Record<CrudAction, (entity: string) => MessagePayload>;

  
const fallbackSuccessMessage = (entity: string): MessagePayload => ({
  title: "Operación completada",
  description: `${entity} procesado correctamente`,
});

export const getSuccessMessage = (
  action: CrudAction,
  entity: string,
): MessagePayload => {
  const builder = successTemplates[action] ?? fallbackSuccessMessage;
  return builder(entity);
};

export const successMessage = {
  create: (entity: string) => getSuccessMessage("create", entity),
  updated: (entity: string) => getSuccessMessage("update", entity),
  deleted: (entity: string) => getSuccessMessage("delete", entity),
  upload: (entity: string) => getSuccessMessage("upload", entity),
  restore: (entity: string) => getSuccessMessage("restore", entity),
};


