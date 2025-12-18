import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: () => void;
}
const INITIAL_STATE:CartItem[] = []
export const useCartStore = create<CartContextType>()((set, get) => ({
  items: INITIAL_STATE,
  addItem: (item) =>
    set((state) => {
      const existedItem = state.items.find(
        (ele) => ele.id === item.id && ele.size === item.size
      );
      if (existedItem) {
        return {
          items: state.items.map((ele) =>
            ele.id === item.id && ele.size === item.size
              ? { ...ele, quantity: ele.quantity + 1 }
              : ele
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),
  removeItem: (id, size) =>
    set((state) => {
      return {
        items: state.items.filter(
          (item) => item.id !== id || item.size !== size
        ),
      };
    }),
  isCartOpen: false,
  setIsCartOpen: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
    })),
  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  updateQuantity: (id, size, quantity) =>
  set((state) => {
    const items = state.items.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity }
        : item
    );

    return { items };
  }),
  getTotalPrice: ()=> get().items.reduce((total, item)=> (item.price * item.quantity) + total, 0 ),
  clearCart: ()=> set((state)=> ({...state, items: INITIAL_STATE}))
}));
