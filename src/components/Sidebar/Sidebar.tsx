import { categoryMapping } from "../../api/schemas/poe";
import "./sidebar.css";

type categoryProps = {
  categoryDetails: string[];
};

const Category = (props: categoryProps) => {
  const [name, imageName] = props.categoryDetails;
  const link = "/" + name.toLowerCase().replace(" ", "_");

  return (
    <a href={link}>
      <div className="sidebar-category">
        <img src={`/sidebar/${imageName}`} className="sidebar-category-img" />
        {name}
      </div>
    </a>
  );
};

type categoryGroupProps = {
  name: string;
  categoryDetails: string[][];
  addSpacing: boolean;
};

const CategoryGroup = (props: categoryGroupProps) => {
  return (
    <>
      <div className="sidebar-group">
        {props.name}
        <hr className="sidebar-category-gap" />

        <div className="sidebar-categories">
          {props.categoryDetails.map((categoryDetails) => (
            <Category categoryDetails={categoryDetails} key={categoryDetails[0]}></Category>
          ))}
        </div>
      </div>

      {props.addSpacing && <hr className="sidebar-group-gap" />}
    </>
  );
};

const Sidebar = () => {
  return (
    <div id="sidebar" className="sidebar">
      {Array.from(categoryMapping).map(([group, categoryDetails], index) => (
        <CategoryGroup
          name={group}
          categoryDetails={categoryDetails}
          key={group}
          addSpacing={index != categoryDetails.length - 1}
        />
      ))}
    </div>
  );
};

export default Sidebar;
