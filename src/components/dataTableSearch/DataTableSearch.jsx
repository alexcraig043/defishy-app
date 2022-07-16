import "./dataTableSearch.scss";
import SearchIcon from "@mui/icons-material/Search";

const DataTableSearch = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Search..." />
      <SearchIcon className="icon" />
    </div>
  );
};

export default DataTableSearch;
