import "./header.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Defishylogo from "../../assets/DefishylogoPNG.png";
import Aavelogo from "../../assets/AavelogoPNG.png";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

const Header = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className="header">
      <div className="wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="defishyLogo">
            <img src={Defishylogo} className="logo" alt="" />
            {/* <div className="title">defishy</div> */}
          </div>
        </Link>

        <div className="marketSelect">
          <img src={Aavelogo} className="logo" alt="" />
          <div className="platformName">
            Aave
            <CircleIcon className="icon" />
            Ethereum Market
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
