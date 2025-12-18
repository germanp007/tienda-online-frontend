import CustomPagination from "@/components/custom/CustomPagination";
import { CustomJombotron } from "../components/CustomJumbotron";
import ProductsGrid from "../components/ProductsGrid";  
import { useProducts } from "../hooks/useProducts";

const HomePage = () => { 

  const { data } = useProducts();   
  return (
    <main>
      <CustomJombotron
        title="Tienda TESLA" 
      /> 
      <ProductsGrid  products={data?.products || []}/>
      <CustomPagination  totalPages={data?.pages || 0}/>
    </main>
  );
};

export default HomePage;
