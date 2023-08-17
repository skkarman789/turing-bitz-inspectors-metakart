const hardhat =require("hardhat")

async function main() {
    try {
        const loyalty = await hardhat.ethers.deployContract("loyalty"); // Make sure to use the correct contract name
        const contract = await loyalty.waitForDeployment();
        console.log("Address of contract:",contract.target);
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
});