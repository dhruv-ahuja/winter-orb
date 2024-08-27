import { useState } from "react";
import "./itemsContainer.css";
import ItemsFilterContainer from "./ItemsFilter/ItemsFilter";

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
    </div>
  );
};

export default ItemsContainer;
