export enum SEARCHPRICERANGE {
  FROM = '0',
  TO = '100000',
}

export type ItemsType = {
  id: string;
  price: number;
};
export interface FilteredArray {
  items: ItemsType[];
}
