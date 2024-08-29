import { useQuery } from "@tanstack/react-query";
import { APIData } from "../schemas/common";
import { ItemsData } from "../schemas/poe";
import { BackendError, backendUrl } from "../../config";

export const useGetItemsData = () =>
  useQuery({
    queryKey: ["itemData"],
    queryFn: () => getItemsData(),
    retry: false,
    enabled: false,
  });

// TODO: add query param support
async function getItemsData(): Promise<APIData<ItemsData>> {
  const response = await fetch(backendUrl + "/poe/items");
  const jsonData = await response.json();

  if (!response.ok) {
    throw new BackendError(response.status, jsonData.error);
  }

  return jsonData;
}
