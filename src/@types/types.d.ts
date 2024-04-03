type SortItem = {
  name: string;
  sortBy: string;
  order: string;
}

type Product = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number[];
  rating: number;
}