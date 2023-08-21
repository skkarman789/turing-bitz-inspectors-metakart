import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import FlipCoin from "./pages/FlipCoin";
import AdminSocialMedia from "./pages/Admin/AdminSocialMedia";
import UserShareForm from "./pages/user/Usershare";
import { useEffect, useState } from "react";
import loyalty from "../src/artifacts/contracts/loyalty.sol/loyalty.json";
import TrackFlipCoins from "./pages/Admin/TrackFlipCoins";
import Usershare from "./pages/user/Usershare";
import FAQ from "./components/Layout/FAQ";
const ethers = require("ethers");

function App() {
  const [Account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [isPlusMember,SetIsPlusMember] =useState();

  const [provider, setProvider] = useState(null);
  const [state, setState] = useState(null);
  const [signer, setSigner] = useState(null);
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
          let N = await contract.isPlusMember(account[0]);
          SetIsPlusMember(N==true ? true : false )
          console.log(isPlusMember)
        
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/FlipCoin" element={<FlipCoin />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard Account={Account} />} />
          <Route
            path="user/usershare"
            element={<Usershare Account={Account} />}
          />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute isPlusMember={isPlusMember}/>}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route
            path="admin/trackflipcoins"
            element={<TrackFlipCoins state={state} />}
          />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/social-media" element={<AdminSocialMedia />} />
        </Route>
        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
