import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import {styled} from '@mui/material'
import Admin from "../../assets/admin-panel.png";
import User from "../../assets/user.png"

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-4">
            <AdminMenu />
          </div>
          <div id="admin-info" className="col-md-4">
            
             
              <img id="admin-image" src={User} alt="User"/>
              <p>{auth?.user?.name}</p>
            
              
              <h3>Email : {auth?.user?.email}</h3>
              <h3>Contact : {auth?.user?.phone}</h3>
              <h3>LinkdIn : https://www.linkedin.com/login </h3>
              <h3>Github : https://github.com/</h3>
            </div>
          </div>
          <div className="col-md-4">
            <img src={Admin} alt="Admin"/>
          </div>
          
        
      </div>
      <div id="admin-box"></div>
    </Layout>
  );
};

export default AdminDashboard;
