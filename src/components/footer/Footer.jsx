import "./footer.scss";
import Defishylogo from "../../assets/Defishylogo.svg";
import Discordlogo from "../../assets/Discordlogo.svg";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArticleIcon from "@mui/icons-material/Article";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="left">
        <div className="defishyLogo">
          <img src={Defishylogo} className="logo" alt="" />
          <span className="title">defishy</span>
        </div>
        <div className="slogan">Fishing for data on the blockchain</div>
      </div>
      <div className="right">
        <div className="item">
          <img src={Discordlogo} alt="" className="svgIcon" id="discordIcon" />
          Discord
        </div>
        <div className="item">
          <TwitterIcon className="icon" />
          Twitter
        </div>
        <div className="item">
          <ArticleIcon className="icon" />
          Docs
        </div>
      </div>
    </div>
  );
};

export default Footer;
