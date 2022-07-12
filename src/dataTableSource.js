import WarningIcon from "@mui/icons-material/Warning";

export const cols = [
  { field: "id", headerName: "Wallet", flex: 2 },
  {
    field: "totalCollateralETH",
    headerName: "Total Supplied (USD)",
    flex: 1,
  },
  {
    field: "totalDebtETH",
    headerName: "Total Borrowed (USD)",
    flex: 1,
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

//temporary data
export const userRows = [
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd081",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 1.1,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd082",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 0.8,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd083",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 0.6,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd084",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 3.1,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd085",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 2.3,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd086",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 1.5,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd087",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 1.3,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd088",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 1.8,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd0839",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 1.2,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd093",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 1.1,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd094",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 1.9,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd095",
    totalCollateralEth: "$1,953,128",
    totalDebtEth: "$1,353,128",
    healthFactor: 1.0,
  },
];