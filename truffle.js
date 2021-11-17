const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();
const mnemonic = process.env.MNEMONIC;
console.log('mnemonic',mnemonic);
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
     provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/7e94e18aa0974e53bf3e34db38a8b78e"),
     network_id: 4
   }
  },
};
