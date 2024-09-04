export interface APIError {
  type: string;
  message: string;
  fields: Map<string, unknown>[];
}

export interface APIData<T> {
  data?: T;
  error?: APIError;
}

export type Pagination = {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
};
