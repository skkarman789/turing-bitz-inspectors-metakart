import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
// import { ethers } from "ethers";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

import loyalty from "../artifacts/contracts/loyalty.sol/loyalty.json";
import FlipCoin1 from "../assets/flipCoin1.png";
const ethers = require("ethers");

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [Account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [state, setState] = useState(null);
  const [signer, setSigner] = useState(null);
  const [Result, setDiscountResult] = useState(null);
  const [isCartEmpty, setIsCartEmpty] = useState(cart.length === 0);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      total -= Result;
      if (total <= 0) {
        total = 0;
      }
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x7beFb899f168daBAf758995257d0BBBEC778352A";
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

          setState({ contract, provider, signer });
          setContract(contract);
          setProvider(provider);
          setSigner(signer);
          let balanceBigN = await contract.balanceOf(account[0]);
          let balanceNumber = balanceBigN.toNumber();
          setBalance(balanceNumber);
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
    setIsCartEmpty(cart.length === 0);

    getToken();
  }, [auth?.token, cart]);
  const handleSpent = async () => {
    try {
      if (contract) {
        const total = totalPrice().replace(/[^\d]/g, "");
        const ss = total.slice(0, -2);
        console.log(Number(ss));

        // Get initial balance
        const initialBalance = await contract.balanceOf(Account);
        console.log("Initial Balance:", initialBalance.toString());

        // Call the spend function
        const result = await contract.spend(Account, ss);

        // Wait for the transaction to be confirmed
        await result.wait();

        // Get updated balance
        const updatedBalance = await contract.balanceOf(Account);
        console.log("Updated Balance:", updatedBalance.toString());

        // Calculate the discounted amount
        const discountedAmount = initialBalance.sub(updatedBalance).toString();
        setDiscountResult(discountedAmount);
        console.log("Transaction hash:", result.hash);
      } else {
        console.log("Contract not available");
      }
    } catch (error) {
      console.error("Contract interaction error:", error);
    }
  };
  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);

      localStorage.removeItem("cart");

      try {
        if (contract) {
          const total = totalPrice().replace(/[^\d]/g, "");
          const ss = total.slice(0, -2);
          console.log(Number(ss));
          const result = await contract.spendAndEarnTokens(Account, ss);
          await result.wait();
          Result = 0;
          console.log("Transaction hash:", result.hash);
        } else {
          console.log("Contract not available");
        }
      } catch (error) {
        console.error("Contract interaction error:", error);
      }

      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setCart([]);
  };

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div id="cart-banner" className="col-md-12">
            <h1 id="cart-hello" className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "Please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div id="cart-main" className="col-md-7  p-3 m-0">
              {cart?.map((p) => (
                <div id="cart-main-child" className="row " key={p._id}>
                  <div id="cart-main-childs" className="col-md-3">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-7 mt-4">
                    <p>
                      <b>
                        Product Name
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;:
                      </b>{" "}
                      &nbsp;&nbsp; {p.name}
                    </p>
                    <p>
                      <b id="product-d">
                        Product Description &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                      </b>
                      <div id="product-d-layout">{p.description}</div>
                    </p>

                    <p>
                      <b>
                        Price
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      </b>{" "}
                      &nbsp;&nbsp;₹{p.price}
                    </p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p> </p>
                </div>
              ))}
            </div>
            {/* <div style={{backgroundColor: "#279EFF"}}>
                <img id="cart-crypto-img" src={FlipCoin1}></img>
              </div> */}

            <div id="cart-summary-div" className="col-md-5  cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address :&nbsp;{auth?.user?.address}</h4>
                    <h5></h5>

                    {/* <button class="button-50" role="button">FlipCoin</button> */}
                    <button
                      className="btn btn-outline-warning"
                      onClick={handleSpent}
                    >
                      Use FlipCoins to Get Discount
                    </button>
                    {!isCartEmpty && (
                      <div>
                        {Result !== null && (
                          <h4 className="mt-4">
                            Discounted Amount: {Result} FlipCoins
                          </h4>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div id="main-cart" className="mt-2 ">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      id="cart-update"
                      className="btn btn-primary mt-2 "
                      // className="btn btn-outline-warning mt-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>

                    <button
                      id="cart-b"
                      // className="btn btn-primary mt-2 "
                      className="btn btn-primary mt-2 "
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        
    </Layout>
  );
};

export default CartPage;
// onClick={handleSpent} >Use FlipCoins to Get Discount
