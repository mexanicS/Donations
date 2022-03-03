// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contracts with the account:", deployer.address); 

  const Donations = await hre.ethers.getContractFactory("Donations");
  const donations = await Donations.deploy(); //deploying the contract

  await donations.deployed(); // waiting for the contract to be deployed

  console.log("Donations deployed to:", donations.address); // Returning the contract address on the rinkeby
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
