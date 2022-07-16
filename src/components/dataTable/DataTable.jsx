import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cols, userRows } from "../../dataTableSource";
import LinearProgress from "@mui/material/LinearProgress";
import DataTableSearch from "../dataTableSearch/DataTableSearch";

const DataTable = ({ rowData }) => {
  return (
    <div className="dataTable">
      {/* <DataTableSearch />
      <hr /> */}
      <DataGrid
        sx={{
          border: "none",
        }}
        className="dataGrid"
        components={{
          LoadingOverlay: LinearProgress,
        }}
        loading={rowData.length < 1}
        rows={rowData}
        columns={cols}
        pageSize={10}
        // rowsPerPageOptions={[10, 25, 50]}
        disableColumnMenu
        disableSelectionOnClick
        autoHeight={true}
      />
    </div>
  );
};

export default DataTable;
