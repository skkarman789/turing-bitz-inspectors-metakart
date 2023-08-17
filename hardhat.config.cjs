

/** @type import('hardhat/config').HardhatUserConfig */

const POLYGON_URL="https://polygon-mumbai.g.alchemy.com/v2/cGp_jzhAHD4cFBjedsKjF0-mvAIEk_yj";
const PRIVATE_KEY="2278cc9a03540ab1f385928b0a562570ef9b54022fdf38536c4c81c6ac90b926";


module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks : {
    polygon_mumbai:{
      url: POLYGON_URL,
      accounts:[PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
  
},
paths: {
  sources: "./contracts",
  artifacts: "./client/src/artifacts",
},
}

