import WarningIcon from "@mui/icons-material/Warning";

export const cols = [
  { field: "id", headerName: "Wallet", flex: 2 },
  {
    field: "totalCollateralETH",
    headerName: "Total Supplied (USD)",
    flex: 1,
    renderCell: (params) => {
      let val = params.row.totalCollateralETH;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      val = "$" + val;

      return <div className="money">{val}</div>;
    },
  },
  {
    field: "totalDebtETH",
    headerName: "Total Borrowed (USD)",
    flex: 1,
    renderCell: (params) => {
      let val = params.row.totalDebtETH;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      val = "$" + val;

      return <div className="money">{val}</div>;
    },
  },
  {
    field: "healthFactor",
    headerName: "Liquidation Health",
    flex: 1,
    renderCell: (params) => {
      let health;
      let inDanger = false;

      try {
        if (params.row.healthFactor <= 1.1) {
          health = "poor";
        } else if (params.row.healthFactor > 1.5) {
          health = "good";
        } else {
          health = "moderate";
        }

        if (params.row.healthFactor <= 1) {
          inDanger = true;
        }
      } catch (err) {
        console.log(err);
        health = null;
      }

      return (
        <div className={"healthCell"}>
          <div className={`health ${health}`}>{params.row.healthFactor}</div>
          {inDanger ? <WarningIcon className="icon" /> : <></>}
        </div>
      );
    },
  },
];
