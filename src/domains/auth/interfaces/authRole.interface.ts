import { UserRole } from "./roleType.interface";

export type AuthRole = {
  id: number;
  name: UserRole;
  level: number;
  description?: string | null;
};
