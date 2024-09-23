import { APIError } from "./api/schemas/common";
import { priceTableData } from "./api/schemas/poe";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;

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

// TODO: clean up this module -- interfaces and the like should probably be elsewhere
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

interface rowProperties {
  visible: boolean;
}

export interface baseTableRow {
  rowData: baseItemRow;
  properties: rowProperties;
}

export interface tableHeader {
  name: string;
  width: string;
  mobileWidth: string;
}

export const commonHeaders: tableHeader[] = [
  { name: "Name", width: "20%", mobileWidth: "135px" },
  { name: "Type", width: "17.5%", mobileWidth: "130px" },
  { name: "Value", width: "14%", mobileWidth: "100px" },
  { name: "Last 7 Days", width: "14.25%", mobileWidth: "120px" },
  { name: "Next 4 Days", width: "14.25%", mobileWidth: "120px" },
  { name: "Listings", width: "10%", mobileWidth: "75px" },
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

export type paginationQuery = {
  page: number;
  perPage: number;
};

export type filterQuery = {
  field: string;
  operation: "like" | "=" | "!=" | ">" | "<" | ">=" | "<=";
  value: string;
};

export type sortQuery = {
  field: string;
  operation: "asc" | "desc";
};

export function prepareCategoryName(s: string): string {
  const formattedString = s.split(" ");
  formattedString.forEach((word) => word[0].toUpperCase());

  s = formattedString.join("");
  s = s.replace(" ", "").replace("-", "");

  if (s.endsWith("ies")) {
    return s.replace("ies", "y");
  }

  if (s.endsWith("s")) {
    return s.slice(0, s.length - 1);
  }

  return s;
}
