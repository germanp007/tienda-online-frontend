import { tesloApi } from "@/api/teslo.api"

export const getProductAction = async(id: string)=>{ 
    const { data } = await tesloApi.get(`/products/${id}`);

    const dataWithUrl = data.images.map((item:string) => `${import.meta.env.VITE_API_URL}/files/product/${item}`);
    
    return {
        ...data,
        images: dataWithUrl
    }
}