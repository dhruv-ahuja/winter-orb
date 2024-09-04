import { useQuery } from "@tanstack/react-query";
import { APIData } from "../schemas/common";
import { baseTableData, ItemsData, parseItemToTableData } from "../schemas/poe";
import { BackendError, backendUrl, filterQuery, paginationQuery, sortQuery } from "../../config";

type getItemsDataProps = {
  pagination?: paginationQuery;
  sortQueries?: sortQuery[];
  filterQueries?: filterQuery[];
};

export const useGetItemsData = ({ pagination, sortQueries, filterQueries }: getItemsDataProps) =>
  useQuery({
    queryKey: ["itemData"],
    queryFn: () => getItemsData(pagination, sortQueries, filterQueries),
    retry: false,
    select(data): baseTableData {
      return {
        itemRows: parseItemToTableData(data.data?.items ?? []),
        pagination: data.data?.pagination,
      };
    },
  });

async function getItemsData(
  pagination?: paginationQuery,
  sortQueries?: sortQuery[],
  filterQueries?: filterQuery[]
): Promise<APIData<ItemsData>> {
  const url = new URL(backendUrl + "/poe/items");
  const searchParams = new URLSearchParams();

  if (pagination) {
    searchParams.append("page", String(pagination.page));
    searchParams.append("per_page", String(pagination.perPage));
  }

  if (sortQueries) {
    sortQueries.forEach((entry) => {
      const sortString = entry.operation == "desc" ? `-${entry.field}` : entry.field;
      searchParams.append("sort", sortString);
    });
  }

  if (filterQueries) {
    filterQueries.forEach((entry) => {
      const filterString = `${entry.field}:${entry.operation}:${entry.value}`;
      searchParams.append("sort", filterString);
    });
  }

  url.search = searchParams.toString();

  const response = await fetch(url);
  const jsonData = await response.json();

  if (!response.ok) {
    throw new BackendError(response.status, jsonData.error);
  }

  return jsonData;
}
