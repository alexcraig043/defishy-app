import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataTableSource";

const DataTable = () => {
  return (
    <div className="dataTable">
      <DataGrid
        sx={{
          border: "none",
        }}
        className="dataGrid"
        rows={userRows}
        columns={userColumns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableColumnMenu
        disableSelectionOnClick
        autoHeight={true}
      />
    </div>
  );
};

export default DataTable;
