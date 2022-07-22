import "./header.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Defishylogo from "../../assets/DefishylogoPNG.png";
import Aavelogo from "../../assets/AavelogoPNG.png";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { IoFishOutline, IoFish } from "react-icons/io5";

const Header = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const { dropDown, setDropDown } = useState(false);

  return (
    <div className="header">
      <div className="wrapper">
        <div className="right">
          {" "}
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
    </div>
  );
};

export default Header;
