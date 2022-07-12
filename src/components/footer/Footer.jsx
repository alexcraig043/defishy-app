import "./footer.scss";
import Defishylogo from "../../assets/DefishylogoPNG.png";
import Discordlogo from "../../assets/Discordlogo.svg";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="defishyLogo">
            <img src={Defishylogo} className="logo" alt="" />
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
            <img src={Discordlogo} alt="" className="svgIcon" />
            Discord
          </div>
        </a>
        <a
          href="https://dartmouthblockchain.gitbook.io/defishy.xyz/intro/welcome"
          rel="noreferrer"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          {/* <div className="item">
          <TwitterIcon className="icon" />
          Twitter
        </div> */}
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
