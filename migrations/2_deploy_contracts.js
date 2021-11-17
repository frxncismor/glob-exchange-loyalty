var LoyaltyRewards = artifacts.require("./LoyaltyRewards.sol");

module.exports = function(deployer) {
  deployer.deploy(LoyaltyRewards);
};
