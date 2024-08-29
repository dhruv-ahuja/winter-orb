import { useState } from "react";
import "./itemsContainer.css";
import ItemsFilterContainer from "./ItemsFilter/ItemsFilter";
import ItemsTable from "./ItemsTable/ItemsTable";

const ItemsContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedItemType, setSelectedItemType] = useState("");

  return (
    <div id="items-container" className="items-container">
      <span className="items-container-title">Unique Weapons</span>

      <ItemsFilterContainer
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedItemType={selectedItemType}
        setSelectedItemType={setSelectedItemType}
      />

      <ItemsTable searchInput={searchInput} selectedItemType={selectedItemType} />
    </div>
  );
};

export default ItemsContainer;
