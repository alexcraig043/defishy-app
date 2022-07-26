import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cols, userRows } from "../../dataTableSource";
import LinearProgress from "@mui/material/LinearProgress";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import {
  query,
  where,
  orderBy,
  limit,
  collection,
  getDocs,
  startAt,
  endAt,
  startAfter,
  endBefore,
  getDoc,
  doc,
  limitToLast,
} from "firebase/firestore";

const DataTable = ({ totalRows }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(totalRows);
  const [searchWallet, setSearchWallet] = useState("");
  const [isWalletQuery, setIsWalletQuery] = useState(false);
  const [firstVisible, setFirstVisible] = useState();
  const [lastVisible, setLastVisible] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sortMode, setSortMode] = useState("totalDebtETH");
  const [sortDirection, setSortDirection] = useState("desc");
  const addressesRef = collection(
    db,
    `aave/v2/pools/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9/addresses`
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initQuery = await query(
          addressesRef,
          orderBy("totalDebtETH", "desc"),
          limit(pageSize)
        );
        await getWalletData(initQuery);
      } catch (err) {
        console.log(err);
      }
    };
    setRowCount(totalRows);
    fetchData();
  }, [totalRows]);

  const getWalletData = async (query) => {
    let list = [];
    setIsLoading(true);

    const snapshots = await getDocs(query);
    setFirstVisible(snapshots.docs[0]);
    setLastVisible(snapshots.docs[snapshots.docs.length - 1]);
    snapshots.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    const axios = require("axios");
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD&api_key=${process.env.CRYPTO_COMPARE_API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        const rate = response.data.ETH.USD;

        list.forEach((address) => {
          address.totalCollateralETH *= rate;
          address.totalDebtETH *= rate;
        });
      })
      .then(() => {
        if (list.length <= 0) {
          list.push({
            id: "No wallets found",
            totalCollateralETH: 0,
            totalDebtETH: 0,
            healthFactor: -1,
          });
        }
        setRows(list);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = async (prevPage, currPage) => {
    try {
      let newPageQuery;
      if (currPage > prevPage) {
        newPageQuery = await query(
          addressesRef,
          orderBy(`${sortMode}`, `${sortDirection}`),
          startAfter(lastVisible),
          limit(pageSize)
        );
      } else {
        if (prevPage === 0) {
          return;
        }
        newPageQuery = await query(
          addressesRef,
          orderBy(`${sortMode}`, `${sortDirection}`),
          endBefore(firstVisible),
          limitToLast(pageSize)
        );
      }
      await getWalletData(newPageQuery);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageSizeChange = async (size) => {
    try {
      let newPageQuery;
      if (isWalletQuery) {
        if (searchWallet.length === 42) {
          newPageQuery = await query(
            addressesRef,
            where("address", "==", `${searchWallet}`),
            limit(size)
          );
        } else {
          newPageQuery = await query(
            addressesRef,
            orderBy("address"),
            where("address", ">=", `${searchWallet}0`),
            where("address", "<=", `${searchWallet}z`),
            limit(size)
          );
        }
        setRowCount(size);
      } else {
        newPageQuery = await query(
          addressesRef,
          orderBy(`${sortMode}`, `${sortDirection}`),
          startAt(firstVisible),
          limit(size)
        );
      }

      await getWalletData(newPageQuery);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInput = (e) => {
    setSearchWallet(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setRowCount(pageSize);
      setIsWalletQuery(true);
      let addressQuery;

      if (searchWallet.length === 42) {
        addressQuery = await query(
          addressesRef,
          where("address", "==", `${searchWallet}`),
          limit(pageSize)
        );
      } else {
        addressQuery = await query(
          addressesRef,
          orderBy("address"),
          where("address", ">=", `${searchWallet}0`),
          where("address", "<=", `${searchWallet}z`),
          limit(pageSize)
        );
      }
      getWalletData(addressQuery);
    } catch (err) {
      console.log(err);
    }
  };

  const closeSearch = async () => {
    try {
      document.getElementById("searchInput").value = "";
      setIsWalletQuery(false);
      setRowCount(totalRows);
      const initQuery = await query(
        addressesRef,
        orderBy("totalDebtETH", "desc"),
        limit(pageSize)
      );
      await getWalletData(initQuery);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSortModelChange = async (sortModel) => {
    let sortQuery;
    try {
      if (!isWalletQuery) {
        if (sortModel[0]) {
          setSortMode(sortModel[0].field);
          setSortDirection(sortModel[0].sort);
          if (sortModel[0].field === "healthFactor") {
            sortQuery = await query(
              addressesRef,
              orderBy(`${sortModel[0].field}`, `${sortModel[0].sort}`),
              where("healthFactor", ">", -1),
              limit(pageSize)
            );
          } else if (sortModel[0].field === "id") {
            setSortMode("address");
            sortQuery = await query(
              addressesRef,
              orderBy("address", `${sortModel[0].sort}`),
              limit(pageSize)
            );
          } else {
            sortQuery = await query(
              addressesRef,
              orderBy(`${sortModel[0].field}`, `${sortModel[0].sort}`),
              limit(pageSize)
            );
          }
        } else {
          setSortMode("totalDebtETH");
          setSortDirection("desc");
          sortQuery = await query(
            addressesRef,
            orderBy("totalDebtETH", "desc"),
            limit(pageSize)
          );
        }
        await getWalletData(sortQuery);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dataTable">
      <div className="searchContainer">
        <div className="search">
          <input
            type="text"
            placeholder="Search Wallet..."
            onKeyDown={handleKeyDown}
            onChange={handleInput}
            id="searchInput"
          />
          {isWalletQuery ? (
            <CloseIcon className="icon" onClick={closeSearch} />
          ) : (
            <></>
          )}
          <SearchIcon className="icon" onClick={handleSearch} />
        </div>
      </div>
      <DataGrid
        sx={{
          border: "none",
        }}
        className="dataGrid"
        components={{
          LoadingOverlay: LinearProgress,
        }}
        loading={isLoading}
        rows={rows}
        columns={cols}
        disableColumnMenu
        disableSelectionOnClick
        autoHeight={true}
        rowsPerPageOptions={[10, 25, 50]}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        pageSize={pageSize}
        page={page}
        onPageChange={(newPage) => {
          handlePageChange(page, newPage);
          setPage(newPage);
        }}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          handlePageSizeChange(newPageSize);
        }}
        onSortModelChange={(sortModel) => {
          setPage(0);
          handleSortModelChange(sortModel);
        }}
      />
    </div>
  );
};

export default DataTable;
