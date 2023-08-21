import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
// import {styled} from '@mui/material';
// import Admin from "../../assets/admin-panel.png";
import User from "../../assets/user.png";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-4">
            <AdminMenu />
          </div>
          <div id="user-info" className="col-md-4">
            <img id="user-image" src={User} alt="User" />
            <p>{auth?.user?.name}</p>

            <h3 style={{ textAlign: "center" }}>Email : {auth?.user?.email}</h3>
            <h3 style={{ textAlign: "center" }}>
              Contact : {auth?.user?.phone}
            </h3>
            <h3 style={{ textAlign: "center" }}>
              LinkedIn :{" "}
              <h3
                style={{ textDecoration: "underline" }}
                onClick={() =>
                  window.open("https://www.linkedin.com/", "_blank")
                }
              >
                {" "}
                https://www.linkedin.com/{" "}
              </h3>
            </h3>
            <h3 style={{ textAlign: "center" }}>
              Twitter :{" "}
              <h3
                style={{ textDecoration: "underline" }}
                onClick={() => window.open("https://twitter.com/", "_blank")}
              >
                https://twitter.com/
              </h3>
            </h3>
          </div>
        </div>
        {/* <div className="col-md-4">
            <img src={Admin} alt="Admin"/>
          </div> */}
      </div>
      <div id="admin-box"></div>
    </Layout>
  );
};

export default AdminDashboard;
