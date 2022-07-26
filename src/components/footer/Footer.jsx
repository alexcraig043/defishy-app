import "./footer.scss";
import DefishylogoLight from "../../assets/DefishylogoLightPNG.png";
import DefishylogoDark from "../../assets/DefishylogoDarkPNG.png";
import DiscordlogoLight from "../../assets/DiscordlogoLight.svg";
import DiscordlogoDark from "../../assets/DiscordlogoDark.svg";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Footer = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="footerContainer">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="defishyLogo">
            <img
              src={darkMode ? DefishylogoDark : DefishylogoLight}
              className="logo"
              alt=""
            />
            {/* <span className="title">defishy</span> */}
          </div>
        </Link>
        <div className="slogan">Fishing for blockchain data</div>
      </div>
      <div className="right">
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
          href="https://docs.defishy.xyz/intro/welcome"
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
  );
};

export default Footer;
