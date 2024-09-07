import { calculateItemPriceChange, Price, baseTableRow } from "../../config";
import { Pagination } from "./common";

export const categoryMapping: Map<string, string[][]> = new Map([
  [
    "CURRENCY",
    [
      ["Currency", "currency.png"],
      ["Fragments", "fragment.png"],
      ["Tattoos", "tattoo.png"],
      ["Oils", "oil.png"],
      ["Omens", "omen.png"],
      ["Divination Cards", "div_card.png"],
      ["Artifacts", "artifact.png"],
      ["Kalguuran Runes", "power_rune.png"],
      ["Incubators", "incubator.png"],
    ],
  ],
  [
    "EQUIPMENT & GEMS",
    [
      ["Unique Weapons", "weapon.png"],
      ["Unique Armours", "armour.png"],
      ["Unique Accessories", "accessory.png"],
      ["Unique Flasks", "flask.png"],
      ["Unique Jewels", "jewel.png"],
      ["Unique Relics", "relic.png"],
      ["Skill Gems", "skill_gem.png"],
      ["Cluster Jewels", "cluster_jewel.png"],
    ],
  ],
  [
    "ATLAS TREE",
    [
      ["Maps", "map.png"],
      ["Blighted Maps", "blighted_map.png"],
      ["Blight-ravaged Maps", "blight_ravaged_map.png"],
      ["Unique Maps", "unique_map.png"],
      ["Delirium Orbs", "delirium_orb.png"],
      ["Invitations", "invitation.png"],
      ["Scarabs", "scarab.png"],
      ["Memories", "memory.png"],
    ],
  ],
  [
    "CRAFTING",
    [
      ["Base Types", "base_type.png"],
      ["Fossils", "fossil.png"],
      ["Resonators", "resonator.png"],
      ["Beasts", "beast.png"],
      ["Essences", "essence.png"],
      ["Vials", "vial.png"],
    ],
  ],
]);

export const categoryLinkMapping: Map<string, string> = new Map([
  ["/", "Currency"],
  ["/currency", "Currency"],
  ["/fragments", "Fragments"],
  ["/tattoos", "Tattoos"],
  ["/oils", "Oils"],
  ["/omens", "Omens"],
  ["/divination_cards", "Divination Cards"],
  ["/artifacts", "Artifacts"],
  ["/kalguuran_runes", "Kalguuran Runes"],
  ["/incubators", "Incubators"],
  ["/unique_weapons", "Unique Weapons"],
  ["/unique_armours", "Unique Armours"],
  ["/unique_accessories", "Unique Accessories"],
  ["/unique_flasks", "Unique Flasks"],
  ["/unique_jewels", "Unique Jewels"],
  ["/unique_relics", "Unique Relics"],
  ["/skill_gems", "Skill Gems"],
  ["/cluster_jewels", "Cluster Jewels"],
  ["/maps", "Maps"],
  ["/blighted_maps", "Blighted Maps"],
  ["/blight_ravaged_maps", "Blight-ravaged Maps"],
  ["/unique_maps", "Unique Maps"],
  ["/delirium_orbs", "Delirium Orbs"],
  ["/invitations", "Invitations"],
  ["/scarabs", "Scarabs"],
  ["/memories", "Memories"],
  ["/base_types", "Base Types"],
  ["/fossils", "Fossils"],
  ["/resonators", "Resonators"],
  ["/beasts", "Beasts"],
  ["/essences", "Essences"],
  ["/vials", "Vials"],
]);

export type priceTableData = {
  priceData: number[];
  priceChange: number;
  isPositive: boolean;
};

export type PriceInfo = {
  chaos_price: string;
  divine_price: string;
  price_history: Price[];
  price_history_currency: string;
  price_prediction: Price[];
  price_prediction_currency: string;
  low_confidence: boolean;
  listings: number;
};

export type Item = {
  poe_ninja_id: number;
  id_type: string;
  name: string;
  price_info: PriceInfo;
  type_: null;
  variant: null;
  icon_url: string;
  links: null;
};

export type ItemsData = {
  items: Item[];
  pagination: Pagination;
};

export type baseTableData = {
  itemRows: baseTableRow[];
  pagination?: Pagination;
};

function prepareItemPriceData(priceData: Price[]): priceTableData {
  const formattedPriceData = priceData.map((entry) => parseFloat(entry.price));
  const priceChange = calculateItemPriceChange(formattedPriceData);
  const isPositive = priceChange >= 0;

  return {
    priceData: formattedPriceData,
    priceChange: priceChange,
    isPositive: isPositive,
  };
}

export function parseItemToTableData(items: Item[]): baseTableRow[] {
  const itemRows = items.map((item) => {
    const itemRow: baseTableRow = {
      rowData: {
        name: item.name,
        imgSrc: item.icon_url,
        type: item.type_,
        priceChaos: item.price_info.chaos_price,
        priceDivine: item.price_info.divine_price,
        priceHistoryData: prepareItemPriceData(item.price_info.price_history),
        pricePredictionData: prepareItemPriceData(item.price_info.price_prediction),
        listings: item.price_info.listings,
      },
      properties: { visible: true },
    };
    return itemRow;
  });

  return itemRows;
}
