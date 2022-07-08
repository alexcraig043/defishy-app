import WarningIcon from "@mui/icons-material/Warning";

export const userColumns = [
  { field: "id", headerName: "Wallet", flex: 1 },
  {
    field: "totalSupplied",
    headerName: "Total Supplied (USD)",
    flex: 1,
  },
  {
    field: "totalBorrowed",
    headerName: "Total Borrowed (USD)",
    flex: 1,
  },
  {
    field: "health",
    headerName: "Liquidation Health",
    flex: 1,
    renderCell: (params) => {
      let health;
      let inDanger = false;

      try {
        if (params.row.health <= 1.1) {
          health = "poor";
        } else if (params.row.health > 1.5) {
          health = "good";
        } else {
          health = "moderate";
        }

        if (params.row.health <= 1) {
          inDanger = true;
        }
      } catch (err) {
        console.log(err);
        health = null;
      }

      return (
        <div className={"healthCell"}>
          <div className={`health ${health}`}>{params.row.health}</div>
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
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 1.1,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd082",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 0.8,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd083",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 0.6,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd084",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 3.1,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd085",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 2.3,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd086",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 1.5,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd087",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 1.3,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd088",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 1.8,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd0839",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 1.2,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd093",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 1.1,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd094",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 1.9,
  },
  {
    id: "0x0E93388CD7a1Ec5f80A60EE3bc593C7Bc4CCd095",
    totalSupplied: "$1,953,128",
    totalBorrowed: "$1,353,128",
    health: 1.0,
  },
];
