import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import emptyCart from "../../assets/emptyCart.svg";
import { useCartStore } from "../store/Cart.store";

const Cart = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left text-2xl font-bold">
            Carrito de compras
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-3/4">
            <img src={emptyCart} alt="cart" className="size-46" />
            <p className="font-montserrat text-2xl text-muted-foreground">
              Tu carrito está vacío
            </p>
          </div>
        ) : (
          <>
          
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="flex justify-end px-4">

              <button
                onClick={clearCart}
                className="cursor-pointer font-montserrat flex items-center justify-center gap-2 "
              >
                <span>Eliminar Compra</span>
                <Trash2 size={20}/>
              </button>
              </div>
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 border-b border-border p-6 last:border-0"
                  >
                    {/* Product Image */}
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Talla: {item.size}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border p-6">
              <div className="mb-4 flex justify-between text-base font-semibold">
                <p>Subtotal</p>
                <p>${getTotalPrice().toFixed(2)}</p>
              </div>
              <Button
                variant={"default"}
                className="w-full text-white hover:bg-brand-black/90"
              >
                Proceder al pago
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Los gastos de envío se calcularán en el checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
