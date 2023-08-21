const hre = require("hardhat");
async function main() {

    const loyalty = await hre.ethers.getContractFactory("loyalty");
    const contract = await loyalty.deploy();

    console.log(`Deployed address to:${contract.target}`);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });