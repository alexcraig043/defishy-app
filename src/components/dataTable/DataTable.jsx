import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cols, userRows } from "../../dataTableSource";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import { db } from "../../firebase";
import { useState } from "react";
import {
  query,
  where,
  orderBy,
  limit,
  collection,
  getDocs,
  doc,
} from "firebase/firestore";

const DataTable = () => {
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
          limit(300)
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

              wallet.totalCollateralETH = wallet.totalCollateralETH.toFixed(2);
              wallet.totalDebtETH = wallet.totalDebtETH.toFixed(2);

              wallet.totalCollateralETH = wallet.totalCollateralETH
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
              wallet.totalDebtETH = wallet.totalDebtETH
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

              wallet.totalCollateralETH = "$" + wallet.totalCollateralETH;
              wallet.totalDebtETH = "$" + wallet.totalDebtETH;

              setTableData(list);
            });
          })
          .then(() => {})
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
        loading={tableData.length < 1}
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
