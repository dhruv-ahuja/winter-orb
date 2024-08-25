const categoryMapping: Map<string, string[][]> = new Map([
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

type categoryProps = {
  categoryDetails: string[];
};
const Category = (props: categoryProps) => {
  const [name, imageName] = props.categoryDetails;
  const link = `/${name}`;

  return (
    <div className="sidebar-category">
      <img src={`/sidebar/${imageName}`} className="sidebar-category-img" />
      <a href={link}>{name}</a>
    </div>
  );
};

type categoryGroupProps = {
  name: string;
  categoryDetails: string[][];
};
const CategoryGroup = (props: categoryGroupProps) => {
  console.log(props);
  return (
    <div className="sidebar-group">
      {props.name}
      <hr className="sidebar-category-gap" />
      <div className="sidebar-categories">
        {props.categoryDetails.map((categoryDetails) => (
          <Category categoryDetails={categoryDetails} key={categoryDetails[0]}></Category>
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div id="sidebar" className="sidebar">
      {Array.from(categoryMapping).map(([group, categoryDetails]) => (
        <CategoryGroup name={group} categoryDetails={categoryDetails} key={group} />
      ))}
    </div>
  );
};

export default Sidebar;
