import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import "../../styles/ProductDetailsStyles.css";
import { Instagram } from "@mui/icons-material";
import { Facebook } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 id="orders-h" className="text-center">
              All Orders
            </h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container" id="box-user">
                    {o?.products?.map((p, i) => (
                      <div className="row  mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="70%"
                            // height="auto"
                          />
                        </div>
                        <div id="product-d" className="col-md-8">
                          <p></p>
                          <p>
                            <span className="product-t">Name</span> : {p.name}
                          </p>
                          <p>
                            <span className="product-t">Description</span> :{" "}
                            {p.description}
                          </p>
                          <p>
                            <span className="product-t">Price</span> : ₹
                            {p.price}
                          </p>

                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "flex",
                              paddingRight: "20px",
                              marginTop: "28%",
                              marginRight: "80%",
                              margin: "0%",
                            }}
                          >
                            <InstapaperShareButton
                              url="https://www.flipkart.com/"
                              quote="ajhca"
                              hashtag="#flipkart"
                            >
                              <Instagram
                                style={{
                                  fontSize: "36px", // Adjust the icon size as needed
                                  marginRight: "20px", // Adjust as needed for spacing between icons
                                  cursor: "pointer", // Add a pointer cursor for better UX
                                }}
                              />
                            </InstapaperShareButton>
                            <FacebookShareButton
                              url="https://www.flipkart.com/"
                              quote="ajhca"
                              hashtag="#flipkart"
                            >
                              <Facebook
                                style={{
                                  fontSize: "36px", // Adjust the icon size as needed
                                  marginRight: "20px", // Adjust as needed for spacing between icons
                                  cursor: "pointer", // Add a pointer cursor for better UX
                                }}
                              />
                            </FacebookShareButton>
                            <TwitterShareButton
                              url="https://www.flipkart.com/"
                              quote="ajhca"
                              hashtag="#flipkart"
                            >
                              <Twitter
                                style={{
                                  fontSize: "36px", // Adjust the icon size as needed
                                  cursor: "pointer", // Add a pointer cursor for better UX
                                }}
                              />
                            </TwitterShareButton>
                          </Box>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
