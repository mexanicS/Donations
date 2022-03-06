const hre = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contracts with the account:", deployer.address); 

  const Donations = await hre.ethers.getContractFactory('Donations');
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
