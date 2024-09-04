import { calculateItemPriceChange, Price, baseTableRow } from "../../config";
import { Pagination } from "./common";

export type priceTableData = {
  priceData: number[];
  priceChange: number;
  isPositive: boolean;
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

export type baseTableData = {
  itemRows: baseTableRow[];
  pagination?: Pagination;
};

function prepareItemPriceData(priceData: Price[]): priceTableData {
  const formattedPriceData = priceData.map((entry) => parseFloat(entry.price));
  const priceChange = calculateItemPriceChange(formattedPriceData);
  const isPositive = priceChange >= 0;

  return {
    priceData: formattedPriceData,
    priceChange: priceChange,
    isPositive: isPositive,
  };
}

export function parseItemToTableData(items: Item[]): baseTableRow[] {
  const itemRows = items.map((item) => {
    const itemRow: baseTableRow = {
      rowData: {
        name: item.name,
        imgSrc: item.icon_url,
        type: item.type_,
        priceChaos: item.price_info.chaos_price,
        priceDivine: item.price_info.divine_price,
        priceHistoryData: prepareItemPriceData(item.price_info.price_history),
        pricePredictionData: prepareItemPriceData(item.price_info.price_prediction),
        listings: item.price_info.listings,
      },
      properties: { visible: true },
    };
    return itemRow;
  });

  return itemRows;
}
