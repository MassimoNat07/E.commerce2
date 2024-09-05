export interface UserData {
  username: string;
  surname: string;
}

export interface ProductsData {
  product: string;
  title: string;
  image: string;
  id: number;
  description: string;
  category?: string | undefined;
  price: number;
}

export interface NationsType {
  name: string;
  geonameId: number;
}

export interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
