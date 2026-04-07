export type PublicProductImage = {
  id: string;
  url: string;
};

export type PublicProduct = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  stockQuantity: number;
  imageUrl: string | null;
  images: PublicProductImage[];
};