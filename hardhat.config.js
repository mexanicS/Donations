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
      accounts: ["89b00336b015aaf81b07b48adbd79ff38c99f7a5e809fccb5aab692cd89d87c3"]
    },
  }
};
