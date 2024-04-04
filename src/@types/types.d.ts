interface ImportMeta {
  env: {
    VITE_MOCKAPISECRET: string;
  };
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
};

type CartItem = {
  id: number;
  title: string;
  type: number;
  size: number;
  price: number;
  imageUrl: string;
  count?: number;
};

type sortNames =
  | "popularity (asc)"
  | "popularity (desc)"
  | "price (asc)"
  | "price (desc)"
  | "alphabet (asc)"
  | "alphabet (desc)";

type sort = {
  name: sortNames;
  sortBy: "rating" | "price" | "title";
  order: "asc" | "desc";
};

type filter = {
  categoryId: number;
  sortType: sort;
};
