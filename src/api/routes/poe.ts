import { useQuery } from "@tanstack/react-query";
import { APIData } from "../schemas/common";
import { baseTableData, ItemsData, parseItemToTableData } from "../schemas/poe";
import { BackendError, backendUrl, filterQuery, paginationQuery, sortQuery } from "../../config";

type getItemsDataProps = {
  pagination?: paginationQuery;
};

export const useGetItemsData = ({ pagination }: getItemsDataProps) =>
  useQuery({
    queryKey: ["itemData"],
    queryFn: () => getItemsData(pagination),
    retry: false,
    select(data): baseTableData {
      return {
        itemRows: parseItemToTableData(data.data?.items ?? []),
        pagination: data.data?.pagination,
      };
    },
  });

// TODO: add query param support
// TODO: sort by price desc by default
async function getItemsData(pagination?: paginationQuery): Promise<APIData<ItemsData>> {
  const url = new URL(backendUrl + "/poe/items");
  const searchParams = new URLSearchParams();

  if (pagination) {
    searchParams.append("page", String(pagination.page));
    searchParams.append("per_page", String(pagination.perPage));
  }

  url.search = searchParams.toString();

  const response = await fetch(url);
  const jsonData = await response.json();

  if (!response.ok) {
    throw new BackendError(response.status, jsonData.error);
  }

  return jsonData;
}
