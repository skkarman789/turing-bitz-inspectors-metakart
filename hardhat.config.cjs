require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
const POLYGON_URL="https://polygon-mumbai.g.alchemy.com/v2/cGp_jzhAHD4cFBjedsKjF0-mvAIEk_yj";
const PRIVATE_KEY="9a3bcb77d9d76580751aa0575adbbcf7742a88282cd144a41cfb584b7af46d3e";



module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks : {
    polygon_mumbai:{
      url: POLYGON_URL,
      accounts:[PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.9"},
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  paths: {
    sources: "./contracts",
    artifacts : "./client/src/artifacts",
  }
}