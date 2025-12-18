import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/getProductById"
import type { Product } from "../actions/types/adminTypes";
import { createUpdateProductAction } from "../actions/create-update-product";

const useProduct = (id:string) => {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['admin-product', { id }],
        queryFn:()=> getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5
    });

    // Mutations
    const mutation = useMutation({
      mutationFn: createUpdateProductAction,
      onSuccess: (product:Product)=>{
        
        //Con esta funcionalidad nos ahorramos de hacer un fetch para tener la lista actualizada de los productos
        queryClient.invalidateQueries({queryKey:['products']})
        queryClient.invalidateQueries({queryKey: ['admin-product', { id: product.id}]})
      }
    }) 
 

  return {
    ...query, 
    mutation, 
  }
}

export default useProduct