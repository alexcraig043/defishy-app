import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cols, userRows } from "../../dataTableSource";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import {
  ref,
  get,
  onChildAdded,
  limitToLast,
  limitToFirst,
  orderByChild,
  onValue,
  query,
} from "firebase/database";
import { db } from "../../firebase";
import { useState } from "react";

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let list = [];
    const fetchData = async () => {
      try {
        const dbRef = ref(
          db,
          `aave/pools/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9/addresses`
        );
        const q = await query(dbRef, limitToLast(1000));

        get(q)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const keys = Object.keys(snapshot.val());
              keys.forEach((key) => {
                setTableData((tableData) => [
                  ...tableData,
                  { id: key, ...snapshot.child(`${key}`).val() },
                ]);
                console.log(tableData);
                // list.push({ id: key, ...snapshot.child(`${key}`).val() });
              });
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
        console.log(tableData);
        // onChildAdded(q, (snapshot) => {
        //   list.push({ id: snapshot.key, ...snapshot.val() });
        // });
        setTableData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dataTable">
      <DataGrid
        sx={{
          border: "none",
        }}
        className="dataGrid"
        rows={tableData}
        columns={cols}
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
