interface ProductItem {
  product_retailer_id: string;
  quantity: number;
  item_price: number;
  currency: string;
}

export interface OrderMessage {
  catalog_id: string;
  product_items: ProductItem[];
}
