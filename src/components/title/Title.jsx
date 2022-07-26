import "./title.scss";
import CircleIcon from "@mui/icons-material/Circle";
import ArticleIcon from "@mui/icons-material/Article";

const Title = ({ logo, content }) => {
  return (
    <div className="marketTitle">
      <div className="left">
        <div className="top">
          <img src={logo} alt="" className="logo" />
          <div className="contentContainer">
            {content.t1}
            <CircleIcon className="icon" />
            {content.t2}
          </div>
        </div>
        <div className="bottom">
          Identify liquidation cascades before they happen
        </div>
      </div>
      <div className="right">
        <a
          href="https://docs.defishy.xyz/intro/welcome"
          rel="noreferrer"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <div className="howToContainer">
            How to Defishy <CircleIcon className="bullet" />
            <ArticleIcon className="icon" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Title;
