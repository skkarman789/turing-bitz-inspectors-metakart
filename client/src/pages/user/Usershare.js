import React, { useState, useEffect } from "react";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { Instagram } from "@mui/icons-material";
import { Facebook } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Box, styled } from "@mui/material";

const Usershare = ({ Account }) => {
  const initialFormData = {
    url: "",
    chainAddress: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);

  const makeUserShareRequest = async (formData) => {
    const { url, chainAddress } = formData;
    // Create a new Entry using axios
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/userdata",
      { url, chainAddress },
      config
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    formData.chainAddress = account;
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send the request
      await makeUserShareRequest(formData);
      setIsSuccess(true);
      setError(null);
      setFormData(initialFormData);
    } catch (err) {
      setIsSuccess(false);
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setAccount(Account);
  }, [Account]);
  console.log(Account);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div id="social-media" className="col-md-9">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              {isSuccess && (
                <p className="success-message">Entry submitted successfully!</p>
              )}
              <form id="social-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <h3 className="title">#Tag Us On Social Media</h3>

                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter the Url of your Post"
                    autoFocus
                    required
                  />
                </div>

                <Box style={{ marginLeft: "30%", padding: "2%" }}>
                  <Instagram
                    style={{
                      width: "15%",
                      height: "15%",
                      cursor: "pointer",
                      marginRight: "8%",
                      marginLeft: "-5%",
                    }}
                  />
                  <Facebook
                    style={{
                      width: "15%",
                      height: "15%",
                      cursor: "pointer",
                      marginRight: "8%",
                    }}
                  />
                  <Twitter
                    style={{
                      width: "15%",
                      height: "15%",
                      cursor: "pointer",
                      marginRight: "6%",
                    }}
                  />
                </Box>
                <div id="social-submit" className="form-group">
                  <button
                    style={{ width: "50%", textAlign: "center" }}
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Usershare;
