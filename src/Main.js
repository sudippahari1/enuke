import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";

const Main = () => {
  const [intra, setIntra] = useState([]);

  useEffect(() => {
    async function runAPI() {
      try {
        // calling the API
        const res = await axios.get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        );

        //  checking if respoanse is there or not
        if (res.status === 200 && res.data && res.data["Time Series (5min)"]) {
          // the arry where we store data
          const finalArry = [];

          // loop through teh object keys
          for (var key in res.data["Time Series (5min)"]) {
            // pushing the value of each object key
            finalArry.push({
              DataTime: key,
              Open: res.data["Time Series (5min)"][key]["1. open"],
              high: res.data["Time Series (5min)"][key]["2. high"],
              low: res.data["Time Series (5min)"][key]["3. low"],
              close: res.data["Time Series (5min)"][key]["4. close"],
              volume: res.data["Time Series (5min)"][key]["5. volume"]
            });
          }

          // final arry printing
          console.log(finalArry);
          setIntra(finalArry);
        }
      } catch (err) {
        console.log(err);
      }
    }
    runAPI();
  }, []);

  return (
    <div>
      <table style={{ borderCollapse: "collapse" }}>
        <tr className="tr">
          <th>DateTime</th>
          <th>Open</th>
          <th>High</th>
          <th>low</th>
          <th>close</th>
          <th>Volume</th>
        </tr>
        {intra
          ? intra.map((v) => (
              <tr className="trtd">
                <td>{v.DataTime}</td>
                <td>{v.Open}</td>
                <td>{v.high}</td>
                <td>{v.low}</td>
                <td>{v.close}</td>
                <td> {v.volume}</td>
              </tr>
            ))
          : "no"}
      </table>
    </div>
  );
};

export default Main;
