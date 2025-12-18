import AdminTitle from "@/admin/components/AdminTitle"
import ProductsTable from "./components/ProductsTable"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

const AdminProductsPage = () => {
  return (
    <main className="space-y-14">
        <AdminTitle
        title="Lista de Productos"
        subtitle="Stock de Productos existentes y vendidos"
      />
      <div className="m-auto max-w-4xl mb-4 grid place-content-end">
        <Link to={`/admin/products/new`}>
        <Button variant={'default'} size={'sm'}>
          Agregar Producto +
        </Button>
        </Link>
      </div>
      <ProductsTable />
    </main>
  )
}

export default AdminProductsPage