import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css"
import Logo from "../../assets/MetaKart.png"

import { RiGithubFill, RiLinkedinBoxFill, RiInstagramLine, RiTwitterLine, RiFacebookBoxFill, RiUserLine, RiPaypalLine, RiHome2Line, RiMapPinLine} from 'react-icons/ri';


const Footer = () => {
  return (
 
      <div id="main" className="row">
          <div className="col-lg-4">


            
              <img id="logo" src={Logo}/>
                    
                <div id="social" className="d-flex">
                  {/* <a href="#"><img src={Email} style={{  width:'50%', height: '100%'}} /></a>
                  <a href="#"><img src={GitHub} style={{  width:'100%', height: '100%'}} /></a>
                  <a href="#"><img src={Instagram} style={{ width:'50%', height: '100%'}} /></a>
                  <a href="#"><img src={LinkedIn} style={{ width:'50%', height: '100%'}} /></a>
                  <a href="#"><img src={Twitter} style={{ width:'70%', height: '100%'}} /></a> */}

                  <a href="#"><RiGithubFill className="logo" style={{ fontSize: '5.65vmin'}} /></a>
                  <a href="#"><RiLinkedinBoxFill className="logo" style={{ fontSize: '5.65vmin' }} /></a>
                  <a href="#"><RiInstagramLine className="logo" style={{ fontSize: '5.65vmin' }} /></a>
                  <a href="#"><RiTwitterLine className="logo" style={{ fontSize: '5.65vmin' }} /></a>
                  <a href="#"><RiFacebookBoxFill className="logo" style={{ fontSize: '5.65vmin' }} /></a>
              </div>
              </div>
                  
          
          <div class="col-lg-4">
              <h2>Locate us</h2>
              <p id="locate-p"> Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/>
                  Eius cupiditate cum assumenda corporis <br/>
                    aspernatur vel voluptate odio nulla reiciendis? <br/>
                  Facere ipsam dolor iure modi. Tempore laboriosam<br/>
                  eius, dolorum quod id modi rerum!</p>
          </div>
          <div id="profile-m" className="col-lg-4">
              <h2 id="profile">Profile</h2>
              <div id="profile-item">          
                  <a href=""><RiUserLine className="logo" ></RiUserLine><h4 className="profile-icon">My Account</h4></a><br/>
                  <a href="" ><RiPaypalLine className="logo" ></RiPaypalLine><h4 className="profile-icon">Checkout</h4></a><br/>
                  <a href=""><RiHome2Line className="logo"></RiHome2Line><h4 className="profile-icon">Order Tracking</h4></a><br/>
                  <a href=""><RiMapPinLine className="logo"></RiMapPinLine><h4 className="profile-icon">Help & Support</h4></a>
              </div>
          </div>
          <h8 id="action-m">All Right Reserved © Turing Bitz. Inspectors</h8>
          <div >
              <div id="action">
                  <br/>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/policy">Privacy Policy</Link>
                  
              </div>
          </div>
      </div>
  );
};

export default Footer;


