
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string | null;
  rating: number;
  category: string;
};

export type ProductCardProps = {
  product: Product;
  onPress?: () => void; 
  onPressAddToCart?: () => void;
  containerClass?: string; 
};