import "./widget.scss";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";

const Widget = ({ type, value }) => {
  let data;

  switch (type) {
    case "activeWallets":
      data = {
        title: "Active Wallets",
        isMoney: false,
        val: value,
        icon: <InfoOutlinedIcon className="icon" />,
      };
      break;
    case "riskWallets":
      data = {
        title: "Wallets at Risk",
        isMoney: false,
        val: value,
        icon: <InfoOutlinedIcon className="icon" />,
      };
      break;
    case "collateralAtRisk":
      data = {
        title: "Collateral Value at Risk",
        isMoney: true,
        val: value,
        icon: <InfoOutlinedIcon className="icon" />,
      };
      break;
    default:
      data = {
        title: "UNDEFINED",
        isMoney: false,
        link: "undefined",
        icon: <QuestionMarkOutlinedIcon className="icon" />,
      };
      break;
  }
  return (
    <div className="widget">
      <span className="title">
        {data.title}
        {data.icon}
      </span>
      <span className="counter">
        {data.isMoney && "$"}{data.val}
      </span>
    </div>
  );
};

export default Widget;
