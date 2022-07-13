import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cols, userRows } from "../../dataTableSource";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  query,
  where,
  orderBy,
  limit,
  collection,
  getDocs,
  doc,
} from "firebase/firestore";

const DataTable = ({ rowData }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const addressesRef = collection(
          db,
          `aave/v2/pools/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9/addresses`
        );

        const q = await query(
          addressesRef,
          orderBy("totalDebtETH", "desc"),
          limit(3000)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        const axios = require("axios");
        const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD&api_key=${process.env.CRYPTO_COMPARE_API_KEY}`;

        axios
          .get(url)
          .then((response) => {
            const rate = response.data.ETH.USD;

            list.forEach((wallet) => {
              wallet.totalCollateralETH *= rate;
              wallet.totalDebtETH *= rate;
            });
          })
          .then(() => {
            setTableData(list);
          })
          .catch((error) => {
            console.log(error);
          });
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
        components={{
          LoadingOverlay: LinearProgress,
        }}
        loading={rowData.length < 1}
        rows={rowData}
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
