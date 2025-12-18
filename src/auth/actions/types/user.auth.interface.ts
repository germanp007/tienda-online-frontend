
export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: UserRole[];
}

export type UserRole = "admin" | "user" | "editor"; // Agregá más si tu backend los soporta