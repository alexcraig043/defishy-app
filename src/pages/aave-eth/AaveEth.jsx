import "./aaveEth.scss";
import Navbar from "../../components/header/Header";
import Widget from "../../components/widget/Widget";
import Aavelogo from "../../assets/AavelogoPNG.png";
import Title from "../../components/title/Title";
import DataTable from "../../components/dataTable/DataTable";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  query,
  where,
  orderBy,
  limit,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const AaveEth = () => {
  const [rows, setRows] = useState([]);
  const [widgetData, setWidgetData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      let fields = {};
      try {
        const poolRef = doc(
          db,
          `aave/v2/pools/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9`
        );
        const poolSnap = await getDoc(poolRef);

        if (!poolSnap.exists) {
          console.log("Cannot find pool!");
        } else {
          fields.totalWallets = poolSnap.data().totalWallets;
          fields.walletsAtRisk = poolSnap.data().walletsAtRisk;
          fields.totalDebt = poolSnap.data().totalDebt;
        }

        const addressesRef = collection(
          db,
          `aave/v2/pools/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9/addresses`
        );
        const addressesQuery = await query(
          addressesRef,
          orderBy("totalDebtETH", "desc"),
          limit(3000)
        );
        const addressesQuerySnapshot = await getDocs(addressesQuery);
        addressesQuerySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        const axios = require("axios");
        const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD&api_key=${process.env.CRYPTO_COMPARE_API_KEY}`;

        axios
          .get(url)
          .then((response) => {
            const rate = response.data.ETH.USD;

            fields.totalDebt = (fields.totalDebt * rate).toFixed(2);

            list.forEach((wallet) => {
              wallet.totalCollateralETH *= rate;
              wallet.totalDebtETH *= rate;
            });
          })
          .then(() => {
            setRows(list);
            setWidgetData(fields);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
          <Widget type="activeWallets" value={widgetData.totalWallets} />
          <Widget type="walletsAtRisk" value={widgetData.walletsAtRisk} />
          <Widget type="totalDebt" value={widgetData.totalDebt} />
        </div>
        <div className="data">
          <DataTable rowData={rows} />
        </div>
        <div className="footer"></div>
        <Footer />
      </div>
    </div>
  );
};

export default AaveEth;
