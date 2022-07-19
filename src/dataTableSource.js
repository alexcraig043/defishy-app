import WarningIcon from "@mui/icons-material/Warning";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

export const cols = [
  {
    field: "id",
    renderHeader: () => <div className="columnHeader">Wallet</div>,
    flex: 2,
  },
  {
    field: "totalCollateralETH",
    renderHeader: () => (
      <div className="columnHeader">Total Supplied (USD)</div>
    ),

    flex: 1,
    renderCell: (params) => {
      let val = params.row.totalCollateralETH;
      val = val.toFixed(2);
      val = Number(val).toLocaleString("en-US");
      val = "$" + val;

      return <div className="money">{val}</div>;
    },
  },
  {
    field: "totalDebtETH",
    renderHeader: () => (
      <div className="columnHeader">Total Borrowed (USD)</div>
    ),
    flex: 1,
    renderCell: (params) => {
      let val = params.row.totalDebtETH;
      val = val.toFixed(2);
      val = Number(val).toLocaleString("en-US");
      val = "$" + val;

      return <div className="money">{val}</div>;
    },
  },
  {
    field: "healthFactor",
    flex: 1,
    renderHeader: () => (
      <div className="columnHeader">
        Liquidation Health
        <Tooltip
          placement="top"
          title="Less than 1 means the loan is at risk of liquidation"
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                fontWeight: "300",
              },
            },
          }}
        >
          <InfoOutlinedIcon className="icon" />
        </Tooltip>
      </div>
    ),
    renderCell: (params) => {
      let health;
      let inDanger = false;

      try {
        const HF = params.row.healthFactor.toFixed(3);

        if (HF < 1.2 && HF > -1) {
          health = "poor";
        } else if (HF <= 1.5) {
          health = "moderate";
        } else {
          health = "good";
        }

        if (HF <= -1.0) {
          health = "good";
        }

        if (HF < 1 && HF > -1) {
          inDanger = true;
        }
      } catch (err) {
        console.log(err);
        health = null;
      }

      return (
        <div className={"healthCell"}>
          <div className={`health ${health}`}>
            {params.row.healthFactor > -1 ? (
              params.row.healthFactor.toFixed(3)
            ) : (
              <AllInclusiveIcon className="infinityIcon" />
            )}
          </div>
          {inDanger ? (
            <Tooltip
              placement="top"
              title="Liquidation health is less than 1!"
              PopperProps={{
                sx: {
                  "& .MuiTooltip-tooltip": {
                    fontWeight: "300",
                  },
                },
              }}
            >
              <WarningIcon className="icon" />
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      );
    },
  },
];
