import { baseItemRow, Price } from "../../config";
import { Pagination } from "./common";

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

export type baseTableData = {
  itemRows: baseItemRow[];
  pagination?: Pagination;
};

export function parseItemToTableData(items: Item[]): baseItemRow[] {
  const itemRows = items.map((item) => {
    const itemRow: baseItemRow = {
      name: item.name,
      imgSrc: item.icon_url,
      type: item.type_,
      priceChaos: item.price_info.chaos_price,
      priceDivine: item.price_info.divine_price,
      priceHistoryData: item.price_info.price_history,
      pricePredictionData: item.price_info.price_prediction,
      listings: item.price_info.listings,
    };
    return itemRow;
  });

  return itemRows;
}
