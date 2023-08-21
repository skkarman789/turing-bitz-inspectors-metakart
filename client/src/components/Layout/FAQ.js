import React from "react";
import "../Form/styles/faq.css";
import Layout from "./Layout";

const faqData = [
  {
    question: "What are Flipcoins, and how do I earn them?",
    answer:
      "Flipcoins are the loyalty tokens of our program. You can earn Flipcoins by making purchases on our platform. If you're a Plus member, you'll receive 4 Flipcoins for every 100 rupees spent; otherwise, you'll get 2 Flipcoins for the same purchase. The maximum you can earn per purchase is 100 Flipcoins.",
  },
  {
    question: "How can I use my Flipcoins for purchases?",
    answer:
      "You can use your Flipcoins to offset your purchase costs. During checkout, you'll have the option to apply your Flipcoins. You can use up to 10% of the product's price in Flipcoins for each purchase, with a maximum of 100 Flipcoins per transaction.",
  },
  {
    question:
      "How do I earn 100 Flipcoins by sharing product links on social media?",
    answer:
      "You can earn 100 Flipcoins by sharing product links of items you've purchased on Instagram, Facebook, or Twitter. When you share a product link, make sure to use the provided sharing feature in our platform, which will automatically credit your account with 100 Flipcoins per successful share.",
  },
  {
    question: "Are Flipcoins the same as Ethereum?",
    answer:
      "No, FlipCoins are custom digital tokens created for a loyalty and rewards program within a specific blockchain ecosystem, separate from Ethereum. They enable users to earn and use tokens for various actions, like making purchases and sharing product links.",
  },
  {
    question: "How can I track my Flipcoin balance and transaction history?",
    answer:
      "You can view your Flipcoin balance and transaction history by logging into your account and accessing the Flipcoin Page or Dashboard section. There, you'll find a detailed breakdown of your Flipcoin activity.",
  },
  {
    question: "Are there any restrictions on using Flipcoins for purchases?",
    answer:
      "You can use Flipcoins for up to 10% of the product's price during each purchase. The maximum number of Flipcoins you can apply to a single transaction is 100 Flipcoins.",
  },
  {
    question:
      "Can I earn Flipcoins retroactively for past purchases, or do they only apply to future transactions?",
    answer:
      "Flipcoins are typically earned for future purchases, and they cannot be retroactively applied to past transactions. You'll start earning Flipcoins from the moment you join our loyalty program.",
  },
  {
    question: "Can I transfer or gift my Flipcoins to another user or friend?",
    answer:
      "Currently, Flipcoins are non-transferable and can only be used by the account holder who earned them.",
  },
  {
    question: "Is there an expiration date for Flipcoins?",
    answer:
      "Currently, Flipcoins do not have an expiration date. However, we encourage you to use them within a reasonable timeframe to enjoy the benefits of the program fully.",
  },

  // Add more FAQ items here
];

const FAQ = () => {
  return (
    <Layout>
      <div className="faq-container">
        <h2 style={{ color: "#2b3467", textAlign: "center" }}>
          Frequently Asked Questions
        </h2>
        <ul className="faq-list">
          {faqData.map((item, index) => (
            <li key={index}>
              <div className="faq-question">{item.question}</div>
              <div className="faq-answer">{item.answer}</div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default FAQ;