import { useRef } from "react";
import "./itemsFilter.css";
import { useLocation } from "react-router-dom";
import { categoryLinkMapping, typeCategoryMapping } from "../../../api/schemas/poe";
import { prepareCategoryName } from "../../../config";

type itemsSearchFilterProps = {
  searchInput: string;
  setSearchInput: (v: string) => void;
};

const ItemsSearchFilter = ({ searchInput, setSearchInput }: itemsSearchFilterProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  function resetItemSearchFilter() {
    setSearchInput("");

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }

  return (
    <div className="items-search-wrapper">
      <input
        id="items-search"
        value={searchInput}
        className="items-search"
        placeholder="Search for Item"
        onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        ref={searchInputRef}
      />
      <button
        id="items-search-clear-btn"
        className="items-search-clear-btn"
        onClick={() => resetItemSearchFilter()}
        title="Clear Search Input"
        disabled={!searchInput}
      >
        <img src="/search/cross.svg" />
      </button>
    </div>
  );
};

type itemsTypeSelectorProps = {
  selectedItemType: string;
  setSelectedItemType: (v: string) => void;
};

const ItemsTypeSelector = ({ selectedItemType, setSelectedItemType }: itemsTypeSelectorProps) => {
  const location = useLocation();
  const category = categoryLinkMapping.get(location.pathname) ?? "Currency";
  const itemTypes = typeCategoryMapping.get(prepareCategoryName(category)) ?? [];

  return (
    <select
      name="item-type"
      className="items-type-selection"
      value={selectedItemType}
      onChange={(e) => setSelectedItemType(e.target.value)}
      disabled={itemTypes.length < 1}
    >
      <option value="">Item Type</option>
      {itemTypes.map((entry, index) => (
        <option key={index} value={entry}>
          {entry}
        </option>
      ))}
    </select>
  );
};

type itemsFilterContainerProps = {
  searchInput: string;
  setSearchInput: (v: string) => void;
  selectedItemType: string;
  setSelectedItemType: (v: string) => void;
};

const ItemsFilterContainer = (props: itemsFilterContainerProps) => {
  return (
    <div className="items-filter-wrapper">
      <ItemsSearchFilter searchInput={props.searchInput} setSearchInput={props.setSearchInput} />
      <ItemsTypeSelector selectedItemType={props.selectedItemType} setSelectedItemType={props.setSelectedItemType} />
    </div>
  );
};

export default ItemsFilterContainer;
