import { APIError } from "./api/schemas/common";
import { priceTableData } from "./api/schemas/poe";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export class BackendError extends Error {
  statusCode: number;
  apiError?: APIError;

  constructor(statusCode: number, apiError?: APIError) {
    super(apiError?.message ?? "Server error occured");
    this.statusCode = statusCode;
    this.apiError = apiError;
    this.name = "BackendError";
  }
}

export function isBackendError(error: Error): error is BackendError {
  return error instanceof BackendError && "statusCode" in error && "apiError" in error;
}

export type Price = {
  timestamp: Date;
  price: string;
};

// * base item row impl.; can be extended by other table components
export interface baseItemRow {
  name: string;
  imgSrc: string;
  type?: string | null;
  priceChaos: string;
  priceDivine: string;
  priceHistoryData: priceTableData;
  pricePredictionData: priceTableData;
  listings: number;
}

export interface tableHeader {
  name: string;
  width: string;
}

export const commonHeaders: tableHeader[] = [
  { name: "Name", width: "27.5%" },
  { name: "Type", width: "17.5%" },
  { name: "Value", width: "10%" },
  { name: "Last 7 Days", width: "12%" },
  { name: "Next 4 Days", width: "12%" },
  { name: "Listings", width: "10%" },
];

// format numerical values in number form
// see https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export function kFormatter(num: number | string): string | number {
  num = Number(num);
  return Math.abs(num) > 999
    ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + "k"
    : Math.sign(num) * Math.abs(num);
}

export function calculateItemPriceChange(priceData: number[]): number {
  const initialValue = priceData[0];
  const finalValue = priceData[priceData.length - 1];

  const priceChange = ((finalValue - initialValue) / initialValue) * 100;
  return Math.round(priceChange);
}
