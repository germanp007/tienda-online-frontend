 
import { Navigate, useNavigate, useParams } from 'react-router'; 
import useProduct from '@/admin/hooks/useProduct';
import FullScreenLoading from '@/components/custom/FullScreenLoading';
import ProductForm from './components/ProductForm'; 
import { toast } from 'sonner';
import type { Product } from '@/interfaces/product.interface';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { isError, isLoading, data: product, mutation } = useProduct( id || '');

  const productTitle= id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';
  

   const handleSubmit = async(productLike:Partial<Product> & { files?: File[] })=>{

    await mutation.mutateAsync(productLike,{
      onSuccess: (data)=>{
        toast.success('Se ha Actualizado correctamente el Producto',{
          position: 'top-right'
        });
        navigate(`/admin/products/${data.id}`)
      },
      onError: (error)=>{
        console.log(error);
        toast.error('Hubo un error al actualizar el producto')
      }
    })
  }
 

  if (isError) {
  return <Navigate to="/admin/products" replace />;
}

  if(isLoading){

    return <FullScreenLoading />
  }

 
  

  return  (
    <>
    <ProductForm productTitle={productTitle} productSubtitle={productSubtitle} product={product!} onSubmit={handleSubmit} isPending={mutation.isPending}/>
    </>
  )
};