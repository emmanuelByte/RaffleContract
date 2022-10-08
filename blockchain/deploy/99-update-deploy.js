const { ethers, network } = require('hardhat');
const fs = require('fs');
const FRONTEND_ADDRESSES_PATH = '../frontend/constants/contractAddresses.json';
const FRONTEND_ABI_PATH = '../frontend/constants/abi.json';

module.exports = async function () {
  if (process.env.UPDATE_FRONTED_END) {
    updateContractAddresses();
    updateAbi();
  }
};
async function updateAbi() {
  const raffle = await ethers.getContract('Raffle');
  const abi = raffle.interface.format(ethers.utils.FormatTypes.json);
  fs.writeFileSync(FRONTEND_ABI_PATH, abi);
}
async function updateContractAddresses() {
  const raffle = await ethers.getContract('Raffle');
  const contractAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESSES_PATH, { encoding: 'utf8' })
  );
  const chainId = network.config.chainId.toString();
  if (chainId in contractAddresses) {
    if (!contractAddresses[chainId]?.includes(raffle.address)) {
      contractAddresses[chainId].push(raffle.address);
    }
  } else {
    contractAddresses[chainId] = [raffle.address];
  }
  fs.writeFileSync(
    FRONTEND_ADDRESSES_PATH,
    JSON.stringify(contractAddresses, null, 2)
  );
}
