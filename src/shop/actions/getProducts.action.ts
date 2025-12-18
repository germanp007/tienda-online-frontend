import { tesloApi } from "@/api/teslo.api"
import type { ProductsResponse } from "@/shop/actions/types/products.response";


interface Options {
    limit?: number | string
    offset?: number | string
    sizes?: string
    gender?: string
    query?: string
    minPrice?: number
    maxPrice?: number
}

export const getProductsActions = async(options:Options):Promise<ProductsResponse>=>{

    const { limit, offset,sizes,gender, minPrice, maxPrice, query } = options;
    const { data } = await tesloApi.get<ProductsResponse>('products',{
        params:{
            limit,
            offset,
            sizes,
            gender,
            minPrice,
            maxPrice,
            q: query
        }
    });

    const dataResult = data.products.map(item => ({
        ...item,
        images: item.images.map(picture => `${import.meta.env.VITE_API_URL}/files/product/${picture}`)
    }));
    return {
        ...data,
        products: dataResult
    };
}