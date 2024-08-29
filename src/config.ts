import { APIError } from "./api/schemas/common";

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
