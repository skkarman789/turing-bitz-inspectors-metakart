import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          {/* <h4>Information Collection and Use</h4>
          <p>add privacy policy</p>
          <h4>Tokenomics and Transparency</h4>
          <h4>Data Sharing</h4>
          <h4>Your Rights</h4>
          <h4>Updates to this Privacy Policyy</h4> */}

          <p style={{ textAlign: "justify" }}>
            We value the trust you place in us and recognize the importance of
            secure transactions and information privacy. This Privacy Policy
            describes how MetaKart Internet Private Limited and its affiliates
            (collectively “MetaKart, we, our, us”) collect, use, share or
            otherwise process your personal information through MetaKart
            website(hereinafter referred to as the “Platform”).
          </p>
          <p style={{ textAlign: "justify" }}>
            While you can browse sections of the Platform without the need of
            sharing any information with us, however, please note we do not
            offer any product or service under this Platform outside India.. By
            visiting this Platform, providing your information or availing out
            product/service, you expressly agree to be bound by the terms and
            conditions of this Privacy Policy, the Terms of Use and the
            applicable service/product terms and conditions, and agree to be
            governed by the laws of India including but not limited to the laws
            applicable to data protection and privacy. If you do not agree
            please do not use or access our Platform.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
