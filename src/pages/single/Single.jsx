import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import UserInfo from "../../components/userInfo/UserInfo";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />{" "}
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <UserInfo name="Jane Doe" />
            <UserInfo name="Meg Smith" />
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <div className="title">Last Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
