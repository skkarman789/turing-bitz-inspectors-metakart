import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import User from "../../assets/user.png";

const Dashboard = ({ isPlusMember }) => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-4">
            <UserMenu />
          </div>
          <div id="user-info" className="col-md-4">
            <img id="user-image" src={User} alt="User" />
            <p className="mb-2">{auth?.user?.name}</p>
            {isPlusMember ? (
              <h4 style={{ textAlign: "center", color: "green" }} >
                You are a Plus Member
              </h4>
            ) : (
              <h4 style={{ textAlign: "center", color: "red" }}>
                You are Not a Plus Member
              </h4>
            )}

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
                {" "}
              </h3>
            </h3>
            <h3 style={{ textAlign: "center" }}>
              Github :{" "}
              <h3
                style={{ textDecoration: "underline" }}
                onClick={() => window.open("https://github.com/", "_blank")}
              >
                
              </h3>
            </h3>


          </div>
        </div>
      </div>
      <div id="user-box"></div>
    </Layout>
  );
};

export default Dashboard;
