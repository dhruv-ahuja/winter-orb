import { useEffect, useState } from "react";
import "./itemsContainer.css";
import ItemsFilterContainer from "./ItemsFilter/ItemsFilter";
import ItemsTable from "./ItemsTable/ItemsTable";
import { baseItemRow, isBackendError, paginationQuery, sortQuery } from "../../config";
import { useGetItemsData } from "../../api/routes/poe";
import { Pagination } from "../../api/schemas/common";

const PER_PAGE = 100;

// TODO: we could set display: none instead of removing the entries from the array
function filterTableData(searchInput: string, selectedItemType: string, itemRows: baseItemRow[]) {
  if (!searchInput && !selectedItemType) {
    return itemRows;
  }

  let filteredRows = searchInput
    ? itemRows.filter((row) => row.name.toLowerCase().includes(searchInput.trim().toLowerCase()))
    : itemRows;
  filteredRows = selectedItemType ? filteredRows.filter((row) => row.type === selectedItemType) : filteredRows;

  return filteredRows;
}

type refetchDataButtonProps = {
  onButtonClick: () => void;
};

// TODO: replace table with this button on failures
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
  onButtonClick: (pageNumber: number) => void;
  disablePageButtons: boolean;
};
const PaginationElement = ({ pagination, pageNumber, onButtonClick, disablePageButtons }: paginationElementProps) => {
  const currentPage = pagination.page;
  const itemsPerPage = pagination.per_page;

  const itemsStart = currentPage == 1 ? currentPage : currentPage * itemsPerPage;
  const itemsEnd = pagination.page == 1 ? currentPage * itemsPerPage : currentPage * itemsPerPage + itemsPerPage;

  return (
    <div className="pagination">
      <span>
        Showing items {itemsStart} to {itemsEnd} of {pagination?.total_items}
      </span>

      <div className="paginationButtonGroup">
        <button
          className="paginationButton"
          onClick={() => onButtonClick(pageNumber - 1)}
          disabled={currentPage == 1 || disablePageButtons}
        >
          Prev
        </button>
        <button
          className="paginationButton"
          onClick={() => onButtonClick(pageNumber + 1)}
          disabled={currentPage == pagination.total_pages || disablePageButtons}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ItemsContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedItemType, setSelectedItemType] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [disablePageButtons, setDisablePageButtons] = useState(false);

  const paginationRequest: paginationQuery = {
    page: pageNumber,
    perPage: PER_PAGE,
  };
  const sortRequest: sortQuery[] = [{ field: "price_info.chaos_price", operation: "desc" }];

  const { data, isLoading, isError, error, refetch, isSuccess } = useGetItemsData({
    pagination: paginationRequest,
    sortQueries: sortRequest,
  });

  function refetchItemsData() {
    refetch();
  }

  function handlePaginationButtonClick(pageNumber: number) {
    setPageNumber(pageNumber);
  }

  // TODO: show a skeleton or some transition state (if needed)
  if (isLoading) {
    console.log("loading data");
  }

  if (isError) {
    if (isBackendError(error)) {
      console.log("Error getting items data:", error.apiError, error.statusCode);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }

  const filteredRows = filterTableData(searchInput, selectedItemType, data?.itemRows ?? []);

  // disable pagination buttons until we load the table with new data
  useEffect(() => {
    refetch();
    setDisablePageButtons(true);
  }, [pageNumber, refetch]);

  useEffect(() => {
    if (isSuccess && disablePageButtons) {
      setDisablePageButtons(false);
    }
  }, [disablePageButtons, isSuccess]);

  return (
    <div id="items-container" className="items-container">
      <span className="items-container-title">Unique Weapons</span>

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
