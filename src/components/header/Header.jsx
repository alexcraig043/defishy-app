import "./header.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Defishylogo from "../../assets/DefishylogoPNG.png";
import Aavelogo from "../../assets/AavelogoPNG.png";
import EulerLogo from "../../assets/EulerLogo.png";
import CircleIcon from "@mui/icons-material/Circle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";
import { IoFishOutline, IoFish } from "react-icons/io5";

const Header = ({ logo, name, market }) => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const [isAave, setIsAave] = useState(true);

  const handleMarketClick = () => {
    setIsAave(!isAave);
  };

  return (
    <div className="header">
      <div className="wrapper">
        <div className="right">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="defishyLogo">
              <img src={Defishylogo} className="logo" alt="" />
              {/* <div className="title">defishy</div> */}
            </div>
          </Link>
        </div>
        <div className="left">
          <div className="item">
            <IoFishOutline
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
              style={darkMode ? { display: "none" } : {}}
            />
            <IoFish
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
              style={!darkMode ? { display: "none" } : {}}
            />
          </div>
          <div className="dropDown" onClick={handleMarketClick}>
            <img src={logo} className="logo" alt="" />
            <div className="platformName">
              {name}
              <CircleIcon className="bullet" />
              {market}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpandedDropDown = () => {};

export default Header;
