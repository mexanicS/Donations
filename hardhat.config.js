require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    
    rinkeby:{
      url: "https://rinkeby.infura.io/v3/1ce839df793a46ab84f676d99bd77309",
      accounts: ["6693d9ad2a7a6ad3b638c039fda3c189e006b324850002cd74a287b0e9a48e2f"]
    },
  }
};
