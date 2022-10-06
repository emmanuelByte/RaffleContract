const { network, ethers } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const BASE_FEE = ethers.utils.parseEther('0.25'); //0.25 is the premium it cost 0.25 per request
const GAS_PRICE_LINK = 1e9; //link per gas
module.exports = async function ({ getNamedAccounts, deployments }) {
  try {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    if (developmentChains.includes(network.name)) {
      log('Local Network Detected Deploying MockVRFConsumer...');
      await deploy('VRFCoordinatorV2Mock', {
        from: deployer,
        args: [BASE_FEE, GAS_PRICE_LINK],
        log: true,
      });
      log('Mocks Deployed');
      log(
        '--------------------------------------------------------------------- ---'
      );
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports.tags = ['all', 'mocks'];
