require("@nomicfoundation/hardhat-toolbox");
const { PrivateKey } = require('./secret.json');

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  networks: {
    core_mainnet: {
      url: "https://rpc.coredao.org/",
      chainId: 1116,
      accounts: [PrivateKey],
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1.2,
    }
  },
  mocha: {
    timeout: 200000,
  },
};