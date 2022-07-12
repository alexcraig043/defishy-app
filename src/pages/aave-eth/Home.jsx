import Navbar from "../../components/header/Header";
import Widget from "../../components/widget/Widget";
import Aavelogo from "../../assets/AavelogoPNG.png";
import Title from "../../components/title/Title";
import DataTable from "../../components/dataTable/DataTable";
import "./home.scss";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <div className="titleContainer">
          <Title
            logo={Aavelogo}
            content={{ t1: "Aave", t2: "Ethereum Market" }}
          />
        </div>
        <div className="widgets">
          <Widget type="activeWallets" value="729" />
          <Widget type="riskWallets" value="4" />
          <Widget type="collateralAtRisk" value="5.6M" />
        </div>
        <div className="data">
          <DataTable />
        </div>
        <div className="footer"></div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
