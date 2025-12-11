export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  category: string;
};

export interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onPressAddToCart?: () => void;
  containerClass?: string;
}

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type CartState = {
  count: number;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeCart: (id: number) => void;
  clearCart: () => void;
};

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  className?: string;
}
