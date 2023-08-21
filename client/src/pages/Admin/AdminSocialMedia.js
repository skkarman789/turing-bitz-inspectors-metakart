import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../../components/Layout/Layout";
import loyalty from "../../artifacts/contracts/loyalty.sol/loyalty.json";
import AdminMenu from "../../components/Layout/AdminMenu";
const ethers = require("ethers");

const AdminSocialMedia = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState(null);
  const [contract, setContract] = useState(null);
  const [Account, setAccount] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xDCF2F829115BC05a7FeF25eA91096D09ACa08903";
      const contractABI = loyalty.abi;

      try {
        if (window.ethereum) {
          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(account[0]);

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
            setAccount(account[0]);
          });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setContract(contract);
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/v1/userdata/getdata");
        const storedUserData =
          JSON.parse(localStorage.getItem("userData")) || [];

        // Update the isApproved status from stored data
        const updatedUserData = response.data.map((user) => ({
          ...user,
          isApproved: storedUserData.some(
            (storedUser) =>
              storedUser.chainAddress === user.chainAddress &&
              storedUser.isApproved
          ),
        }));

        setUserData(updatedUserData);
        setError(null);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    connectWallet();
  }, []);

  const handleApproveClick = async (userDataItem, index) => {
    try {
      setIsLoading(true);
      const chainAddress = userDataItem.chainAddress;
      const tx = await contract.SocialMediaInteraction(chainAddress);
      await tx.wait();

      // Update the isApproved status locally
      setUserData((prevUserData) => {
        const updatedUserData = [...prevUserData];
        updatedUserData[index].isApproved = true;
        return updatedUserData;
      });

      // Update the isApproved status in local storage
      const updatedLocalStorageData = userData.map((user) => ({
        ...user,
        isApproved: user.chainAddress === chainAddress ? true : user.isApproved,
      }));
      localStorage.setItem("userData", JSON.stringify(updatedLocalStorageData));

      setIsSuccess(true);
      setError(null);
    } catch (err) {
      setIsSuccess(false);
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title={"Social Media Interaction"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="my-4">Social Media Interaction</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {isSuccess && (
              <p className="success-message">Approval successful!</p>
            )}

            <table className="table">
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Chain Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        className="text-primary"
                        href={user.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.url}
                      </a>
                    </td>
                    <td>{user.chainAddress}</td>
                    <td>
                      {user.isApproved ? (
                        <span className="text-success">Approved</span>
                      ) : (
                        <button
                          className="btn btn-success"
                          onClick={() => handleApproveClick(user, index)}
                          disabled={isLoading}
                        >
                          Approve
                        </button>
                      )}
                    </td>
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

export default AdminSocialMedia;
