import { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const TrackFlipCoins = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memosData = await contract.getfc();
      setMemos(memosData);
    };
    contract && memosMessage();
  }, [contract]);
  const reversedMemos = [...memos].reverse();

  return (
    <Layout title={"Track Flipcoins"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3"></div>
          <div>
            <p
              className="text-center"
              style={{ fontWeight: 1000, fontSize: 20 }}
            >
              FlipCoin Track
            </p>
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: "#0f0489ff" }}>
                  <th
                    className="text-center"
                    style={{ fontWeight: "bold", color: "white " }}
                  >
                    Timestamps
                  </th>
                  <th
                    className="text-center"
                    style={{ fontWeight: "bold", color: "white " }}
                  >
                    From
                  </th>
                  <th
                    className="text-center"
                    style={{ fontWeight: "bold", color: "white " }}
                  >
                    Activity
                  </th>
                  <th
                    className="text-center"
                    style={{ fontWeight: "bold", color: "white " }}
                  >
                    To
                  </th>
                  <th
                    className="text-center"
                    style={{ fontWeight: "bold", color: "white " }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {reversedMemos.map((memo, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      {new Date(memo.issueTime * 1000).toLocaleString()}
                    </td>
                    <td className="text-center">{memo.from}</td>
                    <td className="text-center">{memo.Activity}</td>
                    <td className="text-center">{memo.to}</td>
                    <td className="text-center">{String(memo.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrackFlipCoins;
