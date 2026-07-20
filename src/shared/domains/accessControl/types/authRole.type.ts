import { UserRole } from "./roleType.type";

export type AuthRole = {
  id: number;
  name: UserRole;
  level: number;
  description?: string | null;
};
