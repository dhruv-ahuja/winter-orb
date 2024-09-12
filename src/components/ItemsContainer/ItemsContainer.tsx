import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import ItemsFilterContainer from "./ItemsFilter/ItemsFilter";
import ItemsTable from "./ItemsTable/ItemsTable";
import { useGetItemsData } from "../../api/routes/poe";
import { Pagination } from "../../api/schemas/common";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryLinkMapping } from "../../api/schemas/poe";
import {
  paginationQuery,
  sortQuery,
  filterQuery,
  baseTableRow,
  prepareCategoryName,
  isBackendError,
} from "../../config";
import "./itemsContainer.css";

const PER_PAGE = 100;

type refetchDataButtonProps = {
  onButtonClick: () => void;
};

const RefetchDataButton = ({ onButtonClick }: refetchDataButtonProps) => {
  return (
    <div className="refetch-data-wrapper" onClick={() => onButtonClick()}>
      An error occured, try getting data again?
      <img src="/table/reload.svg" className="refetch-data-icon" />
    </div>
  );
};

type paginationElementProps = {
  pagination: Pagination;
  pageNumber: number;
  onButtonClick: (pageNumber: number, totalPages: number) => void;
  disablePageButtons: boolean;
};
const PaginationElement = ({ pagination, pageNumber, onButtonClick, disablePageButtons }: paginationElementProps) => {
  const currentPage = pagination.page;
  const itemsPerPage = pagination.per_page;
  const totalItems = pagination.total_items;
  const totalPages = pagination.total_pages;

  let itemsStart = 1;
  let itemsEnd = currentPage * itemsPerPage;

  if (currentPage > 1) {
    itemsStart = (currentPage - 1) * itemsPerPage + 1;
  }

  if (itemsEnd > totalItems) {
    itemsEnd = totalItems;
  }

  return (
    <div className="pagination">
      <span>
        Showing items {itemsStart} to {itemsEnd} of {totalItems}
      </span>

      <div className="paginationButtonGroup">
        <button
          className="paginationButton"
          onClick={() => (pageNumber > 1 ? onButtonClick(pageNumber - 1, totalPages) : undefined)}
          disabled={currentPage == 1 || disablePageButtons}
        >
          Prev
        </button>
        <button
          className="paginationButton"
          onClick={() => (itemsEnd < totalItems ? onButtonClick(pageNumber + 1, totalPages) : undefined)}
          disabled={currentPage == totalPages || itemsEnd == totalItems || disablePageButtons}
        >
          Next
        </button>
      </div>
    </div>
  );
};

function filterTableData(searchInput: string, selectedItemType: string, itemRows: baseTableRow[]) {
  if (!searchInput && !selectedItemType) {
    return itemRows;
  }

  itemRows.forEach((row) => {
    const name = row.rowData.name.toLowerCase();
    const input = searchInput.trim().toLowerCase();

    if (input && !name.includes(input)) {
      row.properties.visible = false;
    }

    if (selectedItemType && row.rowData.type !== selectedItemType) {
      row.properties.visible = false;
    }
  });

  return itemRows;
}

const ItemsContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = categoryLinkMapping.get(location.pathname) ?? "Currency";

  if (!category) {
    console.warn("redirecting");
    navigate("/");
  }

  const [searchInput, setSearchInput] = useState("");
  const [selectedItemType, setSelectedItemType] = useState("");
  const [filteredRows, setFilteredRows] = useState<Array<baseTableRow>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [disablePageButtons, setDisablePageButtons] = useState(false);

  const paginationRequest: paginationQuery = {
    page: pageNumber,
    perPage: PER_PAGE,
  };
  const sortQueries: sortQuery[] = [{ field: "price_info.chaos_price", operation: "desc" }];
  const filterQueries: filterQuery[] = [{ field: "category", operation: "=", value: prepareCategoryName(category) }];

  const { data, isError, error, refetch, isSuccess, isFetched } = useGetItemsData({
    pagination: paginationRequest,
    sortQueries: sortQueries,
    filterQueries: filterQueries,
  });

  function handlePaginationButtonClick(pageNumber: number, totalPages: number) {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPageNumber(pageNumber);
    }
  }

  const debouncedFilter = useMemo(() => {
    return debounce((searchInput: string, selectedItemType: string, itemRows: baseTableRow[]) => {
      const result = filterTableData(searchInput, selectedItemType, itemRows);
      setFilteredRows(result);
    }, 300);
  }, []); // No dependencies here to create the debounce only once

  function refetchItemsData() {
    refetch();
    setDisablePageButtons(true);
  }

  if (isError) {
    if (isBackendError(error)) {
      console.log("Error getting items data:", error.apiError, error.statusCode);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }

  useEffect(() => {
    if (isFetched && disablePageButtons) {
      setDisablePageButtons(false);
    }
  }, [disablePageButtons, isFetched]);

  useEffect(() => {
    if (isSuccess && data?.itemRows) {
      if (!searchInput && !selectedItemType) {
        setFilteredRows(data.itemRows);
      } else {
        debouncedFilter(searchInput, selectedItemType, filteredRows);
      }
    }

    // Clean up debounce on unmount
    return () => {
      debouncedFilter.cancel();
    };
  }, [searchInput, selectedItemType, data?.itemRows, debouncedFilter, filteredRows, isSuccess]);

  useEffect(() => {
    refetch();
  }, [paginationRequest.page, refetch]);

  return (
    <div id="items-container" className="items-container">
      <span className="items-container-title">{category}</span>

      <ItemsFilterContainer
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedItemType={selectedItemType}
        setSelectedItemType={setSelectedItemType}
      />

      {isError && <RefetchDataButton onButtonClick={refetchItemsData} />}
      <ItemsTable itemRows={filteredRows} searchInput={searchInput} selectedItemType={selectedItemType} />

      {data?.pagination && (
        <PaginationElement
          pagination={data.pagination}
          pageNumber={pageNumber}
          onButtonClick={handlePaginationButtonClick}
          disablePageButtons={disablePageButtons}
        />
      )}
    </div>
  );
};

export default ItemsContainer;
