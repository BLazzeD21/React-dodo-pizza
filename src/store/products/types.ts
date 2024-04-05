export enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export interface productsSliceState {
  products: Product[];
  status: Status;
}