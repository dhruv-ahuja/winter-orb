import { Pagination } from "./common";

export type Price = {
  timestamp: Date;
  price: string;
};

export type PriceInfo = {
  chaos_price: string;
  divine_price: string;
  price_history: Price[];
  price_history_currency: string;
  price_prediction: Price[];
  price_prediction_currency: string;
  low_confidence: boolean;
  listings: number;
};

export type Item = {
  poe_ninja_id: number;
  id_type: string;
  name: string;
  price_info: PriceInfo;
  type_: null;
  variant: null;
  icon_url: string;
  links: null;
};

export type ItemsData = {
  items: Item[];
  pagination: Pagination;
};
