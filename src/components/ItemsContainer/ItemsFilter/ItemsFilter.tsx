import { useRef } from "react";
import "./itemsContainer.css";

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
        onChange={(e) => setSearchInput(e.target.value.trim())}
        // onInput="enableItemsSearchClearButton(); filterItems('name')"
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
  return (
    <select
      name="item-type"
      id="items-type-selection"
      className="items-type-selection"
      value={selectedItemType}
      onChange={(e) => setSelectedItemType(e.target.value)}
      //   onChange="filterItems('type')"
    >
      <option value="">Item Type</option>
      <option value="Two Handed Sword">Two Handed Sword</option>
      <option value="Claw">Claw</option>
      <option value="Wand">Wand</option>
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
