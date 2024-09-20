import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import ItemsFilterContainer from "./ItemsFilter/ItemsFilter";
import ItemsTable from "./ItemsTable/ItemsTable";
import { useGetItemsData } from "../../api/routes/poe";
import { Pagination } from "../../api/schemas/common";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryLinkMapping } from "../../api/schemas/poe";
import { paginationQuery, sortQuery, filterQuery, prepareCategoryName, isBackendError } from "../../config";
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
  const [pageNumber, setPageNumber] = useState(1);
  const [disablePageButtons, setDisablePageButtons] = useState(false);

  const paginationRequest: paginationQuery = {
    page: pageNumber,
    perPage: PER_PAGE,
  };
  const sortQueries: sortQuery[] = [{ field: "price_info.chaos_price", operation: "desc" }];
  const filterQueries: filterQuery[] = [{ field: "category", operation: "=", value: prepareCategoryName(category) }];

  if (searchInput) {
    filterQueries.push({ field: "name", operation: "like", value: searchInput });
  }
  if (selectedItemType) {
    filterQueries.push({ field: "type_", operation: "=", value: selectedItemType });
  }

  const { data, isError, error, refetch, isFetched } = useGetItemsData({
    pagination: paginationRequest,
    sortQueries: sortQueries,
    filterQueries: filterQueries,
  });

  function handlePaginationButtonClick(newPageNumber: number, totalPages: number) {
    if (newPageNumber > 0 && newPageNumber <= totalPages) {
      setPageNumber(newPageNumber);
    }
  }

  function handleSearchInput(newSearchInput: string) {
    setSearchInput(newSearchInput);
    setPageNumber(1);
  }

  function handleItemTypeSelection(newTypeSelection: string) {
    setSelectedItemType(newTypeSelection);
    setPageNumber(1);
  }

  const debouncedRefetch = useMemo(() => {
    return debounce(() => {
      refetch();
    }, 200);
  }, [refetch]);

  function refetchItemsData() {
    refetch();
    setDisablePageButtons(true);
  }

  if (isError) {
    if (isBackendError(error)) {
      console.error("Error getting items data:", error.apiError, error.statusCode);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }

  useEffect(() => {
    if (isFetched && disablePageButtons) {
      setDisablePageButtons(false);
    }
  }, [disablePageButtons, isFetched, data]);

  useEffect(() => {
    debouncedRefetch();

    // Clean up debounce on unmount
    return () => {
      debouncedRefetch.cancel();
    };
  }, [searchInput, selectedItemType, debouncedRefetch]);

  useEffect(() => {
    refetch();
  }, [paginationRequest.page, refetch]);

  return (
    <div id="items-container" className="items-container">
      <span className="items-container-title">{category}</span>

      <ItemsFilterContainer
        searchInput={searchInput}
        setSearchInput={handleSearchInput}
        selectedItemType={selectedItemType}
        setSelectedItemType={handleItemTypeSelection}
      />

      {isError && <RefetchDataButton onButtonClick={refetchItemsData} />}
      <ItemsTable itemRows={data?.itemRows ?? []} searchInput={searchInput} selectedItemType={selectedItemType} />

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
