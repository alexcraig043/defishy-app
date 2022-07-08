import "./header.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Defishylogo from "../../assets/Defishylogo.svg";
import Aavelogo from "../../assets/AavelogoPNG.png";
import { Link } from "react-router-dom";

const Header = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className="header">
      <div className="wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="defishyLogo">
            <img src={Defishylogo} className="logo" alt="" />
            <div className="title">defishy</div>
          </div>
        </Link>

        <div className="marketSelect">
          <div className="marketSelectContainer">
            <img src={Aavelogo} className="logo" alt="" />
            <div className="platformName">Aave • Ethereum Market</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
