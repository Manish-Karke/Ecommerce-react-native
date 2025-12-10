import { CartState } from "@/types/type";
import { create } from "zustand";

export const useCart = create<CartState>()((set) => ({
  count: 0,
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);

      if (existingItem) {
        return {
          count: state.count + 1,
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      return {
        count: state.count + 1,
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    }),

  removeCart: (id) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === id);

      if (existingItem && existingItem.quantity > 1) {
        return {
          count: state.count - 1,
          cart: state.cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        };
      }

      return {
        count: state.count - 1,
        cart: state.cart.filter((i) => i.id !== id),
      };
    }),

  clearCart: () =>
    set({
      count: 0,
      cart: [],
    }),
}));
