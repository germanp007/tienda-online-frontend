import type { User } from "@/auth/actions/types/user.auth.interface";

export type ProducTitle = 'Nuevo producto' | 'Editar producto'
export type ProducSubtitle = 'Aquí puedes crear un nuevo producto.' | 'Aquí puedes editar el producto.'


export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  tags: string[];
  images: string[]; 
  user?: User
}
 