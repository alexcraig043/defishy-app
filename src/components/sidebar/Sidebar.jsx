import "./sidebar.scss";
import Defishylogo from "../../assets/DefishylogoPNG.png";
import DiscordlogoLight from "../../assets/DiscordlogoLight.svg";
import DiscordlogoDark from "../../assets/DiscordlogoDark.svg";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArticleIcon from "@mui/icons-material/Article";
import Aavelogo from "../../assets/AavelogoPNG.png";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

const Sidebar = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="sidebarContainer">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo">
              <img src={Defishylogo} className="logo" alt="" />
            </div>
          </Link>
        </div>
        <div className="middle">
          <div className="navItem">
            <img src={Aavelogo} alt="" className="logo" />
            Aave
          </div>
        </div>
        <div className="bottom">
          <a
            href="https://discord.gg/zmrpWJH7"
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <div className="item">
              <img
                src={!darkMode ? DiscordlogoDark : DiscordlogoLight}
                alt=""
                className="svgIcon"
              />
              Discord
            </div>
          </a>
          <a
            href="https://dartmouthblockchain.gitbook.io/defishy.xyz/intro/welcome"
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <div className="item">
              <ArticleIcon className="icon" />
              Docs
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
