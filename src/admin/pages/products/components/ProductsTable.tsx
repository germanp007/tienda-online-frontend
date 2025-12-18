import CustomPagination from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Table, 
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";    
import { currencyFormatter } from "@/lib/currency-formater";
import { useProducts } from "@/shop/hooks/useProducts";
import { Link } from "react-router";

const ProductsTable = () => {
 
   const { data  } = useProducts();
   
  return (
    <main className="space-y-10">
    <Table className="max-w-4xl bg-white rounded-xl m-auto overflow-hidden shadow-personalized"> 
      <TableHeader className="bg-slate-300">
        <TableRow>
          <TableHead className="w-[100px]">Imagen</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.products.map((item) => {
          return (
            <TableRow className="cursor-pointer" key={item.id}> 
              <TableCell className="font-medium">
                <img src={item.images[0]} alt="clothes" />
              </TableCell>

              <TableCell>{item.title}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{currencyFormatter(item.price)}</TableCell>
              <TableCell className="flex justify-end items-center">
                <Link to={`/admin/products/${item.id}`}>
                <Button size="sm" variant="default">
                  Editar
                </Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      
      </TableBody>
    </Table>
    <CustomPagination totalPages={data?.pages}/>
        </main>
  );
};

export default ProductsTable;
