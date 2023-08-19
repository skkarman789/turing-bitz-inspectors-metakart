import React from 'react';
import axios from "axios";
import Layout from '../../components/Layout/Layout';
import AdminMenu from "./../../components/Layout/AdminMenu";


const AdminSocialMedia = () => {
  return (
    <Layout title={"Dashboard - Social Media"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Social Media Interaction</h1>
            
            
            
          </div>
        </div>
      </div>
    </Layout>
    
  )
}

export default AdminSocialMedia