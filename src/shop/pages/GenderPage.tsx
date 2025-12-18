
import { CustomJombotron } from "../components/CustomJumbotron";
import ProductsGrid from "../components/ProductsGrid";
import { useParams } from "react-router";
import { useProducts } from "../hooks/useProducts"; 
import CustomPagination from "@/components/custom/CustomPagination";

const GenderPage = () => {
  const { gender } = useParams();
  const { data } = useProducts();

  const customLabel = (gender:string | undefined)=>{

    switch (gender) {
      case 'men':
        return 'Hombres' 
      case 'women':
        return 'Mujeres' 
      case 'kid':
        return 'Niños' 
      default:
        return ''
    }
  }
  
    return (
    <>
      <CustomJombotron title={`Productos para ${customLabel(gender)}`} />
      <ProductsGrid products={data?.products || []}/> 
      <CustomPagination totalPages={data?.pages} /> 
    </>
  );
};

export default GenderPage;
