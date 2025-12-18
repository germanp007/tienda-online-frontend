import { tesloApi } from "@/api/teslo.api";
import type { Product } from "@/shop/actions/types/product.interface"


export const getProductByIdAction = async(id:string):Promise<Product>=>{

    if( !id ) throw new Error('Id is Required');

    if(id === 'new'){
        return {
            id: 'new',
              title: '',
              price: 0,
              description: '',
              slug: '',
              stock: 0,
              sizes: [],
              gender: 'men',
              tags: [],
              images: []
        } as unknown as Product;
    }

    const { data } = await tesloApi.get(`/products/${id}`);

     const dataWithUrl = data.images.map((item:string) => `${import.meta.env.VITE_API_URL}/files/product/${item}`);
    return {
        ...data,
        images: dataWithUrl
    }
}