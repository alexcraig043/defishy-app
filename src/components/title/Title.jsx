import "./title.scss";
import Aavelogo from "../../assets/AavelogoPNG.png";

const Title = ({ logo, content }) => {
  return (
    <div className="marketTitle">
      <div className="top">
        <img src={logo} alt="" className="logo" />
        <div className="contentContainer">{content}</div>
      </div>
      <div className="bottom">Identify liquidation cascades before they happen</div>
    </div>
  );
};

export default Title;
