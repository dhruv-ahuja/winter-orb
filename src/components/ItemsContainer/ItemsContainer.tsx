import { useState } from "react";
import "./itemsContainer.css";
import ItemsFilterContainer from "./ItemsFilter/ItemsFilter";
import ItemsTable from "./ItemsTable/ItemsTable";
import { baseItemRow, isBackendError } from "../../config";
import { useGetItemsData } from "../../api/routes/poe";

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

const ItemsContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedItemType, setSelectedItemType] = useState("");

  const { data, isLoading, isError, error, refetch } = useGetItemsData();

  function refetchItemsData() {
    refetch();
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
      <ItemsTable
        itemRows={filteredRows}
        searchInput={searchInput}
        selectedItemType={selectedItemType}
        pagination={data?.pagination}
      />
    </div>
  );
};

export default ItemsContainer;
