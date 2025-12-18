import type { User } from "./user.auth.interface";

export interface AuthResponse {
  user: User;
  token: string;
}
