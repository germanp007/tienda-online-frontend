import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductAction } from "../actions/getProduct.action";
import { useCartStore } from "../store/Cart.store";
import { toast } from "sonner";

const ProductPage = () => {
  const { idSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const localitoRef = useRef(location.state?.from)
  const { addItem } = useCartStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const sizeSelected = searchParams.get("sizeSelected") || "";
  const { data } = useQuery({
    queryKey: ["product", { idSlug }],
    queryFn: ({ queryKey }) => {
      const [, { idSlug }] = queryKey as ["product", { idSlug: string }];
      return getProductAction(idSlug);
    },
  });

  const handleAddToCart = () => {
    const { id, title, price, images } = data;
    addItem({
      id: id,
      name: title,
      price: price,
      size: sizeSelected,
      image: images[0],
    });
    toast.success('Item agregado correctamente',{
      position:"top-center"
    })
  };  
const handleNavigate = () => {
   
  if (localitoRef.current) {
    navigate(localitoRef.current);  
  } else {
    navigate("/gender"); 
  }
};
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={handleNavigate}
            className="hover:bg-accent"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Button>
        </div>
      </header>

      {/* Product Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex gap-2">
            <div className="w-2/3 h-full aspect-square bg-accent rounded overflow-hidden m-auto">
              <img
                src={data?.images[selectedImage]}
                alt={data?.name}
                className="w-full h-full object-cover "
              />
            </div>
            <div className={`w-1/3`}>
              {data?.images.map((image:string, index:number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-accent rounded overflow-hidden transition-opacity ${
                    selectedImage === index
                      ? "opacity-100 ring-2 ring-foreground"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${data?.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {data?.gender}
              </p>
              <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
              <p className="text-2xl font-semibold">${data?.price}</p>
            </div>

            <Separator />

            <div>
              <p className="text-foreground leading-relaxed">
                {data?.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Selecciona tu talla
              </label>
              <div className="grid grid-cols-6 gap-2">
                {data?.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => {
                      searchParams.set("sizeSelected", size);
                      setSearchParams(searchParams);
                    }}
                    className={`cursor-pointer py-3 text-sm font-medium border border-border rounded transition-colors ${
                      sizeSelected === size
                        ? "bg-foreground text-background"
                        : "bg-background hover:bg-accent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full bg-foreground text-background hover:bg-foreground/90 "
              disabled={!sizeSelected}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al carrito
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
