import "./title.scss";
import CircleIcon from "@mui/icons-material/Circle";

const Title = ({ logo, content }) => {
  return (
    <div className="marketTitle">
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
  );
};

export default Title;
