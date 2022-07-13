import { db } from "./firebase";
import { useState, useEffect } from "react";
import {
  query,
  where,
  orderBy,
  limit,
  collection,
  getDocs,
  doc,
} from "firebase/firestore";

const FetchData = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("hi");
    const fetchData = async () => {
      let list = [];
      try {
        const addressesRef = collection(
          db,
          `aave/v2/pools/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9/addresses`
        );

        const q = await query(
          addressesRef,
          orderBy("totalDebtETH", "desc"),
          limit(3000)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        const axios = require("axios");
        const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD&api_key=${process.env.CRYPTO_COMPARE_API_KEY}`;

        axios
          .get(url)
          .then((response) => {
            const rate = response.data.ETH.USD;

            list.forEach((wallet) => {
              wallet.totalCollateralETH *= rate;
              wallet.totalDebtETH *= rate;

              setData({ list: list, ...data });
              console.log(data);
            });
          })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return data;
};

export default FetchData;
