const { assert, expect } = require('chai');
const { network, deployments, ethers } = require('hardhat');
const {
  developmentChains,
  networkConfig,
} = require('../../helper-hardhat-config');
developmentChains.includes(network.name)
  ? describe.skip
  : describe('Raffle Stage Tests', function () {
      let raffle, raffleEntranceFee, deployer; // , deployer

      beforeEach(async () => {
        deployer = (await ethers.getSigners())[0];
        raffle = await ethers.getContract('Raffle', deployer);
        raffleEntranceFee = await raffle.getEntranceFee();
      });
      describe('fulfillRandomWords', function () {
        it('works with the Chainlink keepers and chainlinkk VRF, we get a random winner', async function () {
          // enter the raffle
          console.log('Setting up test...');
          const startingTimeStamp = await raffle.getLastTimeStamp();
          const accounts = await ethers.getSigners();

          console.log('Setting up Listener...');
          await new Promise(async (resolve, reject) => {
            console.log('Listening for WinnerPicked event...');
            raffle.on('WinnerPicked', async () => {
              console.log('WinnerPicked event fired!');
              try {
                // add our asserts here
                const recentWinner = await raffle.getRecentWinner();
                const raffleState = await raffle.getRaffleState();
                const winnerEndingBalance = await accounts[0].getBalance();
                const endingTimeStamp = await raffle.getLastTimeStamp();

                await expect(raffle.getPlayer(0)).to.be.reverted;
                assert.equal(recentWinner.toString(), accounts[0].address);
                assert.equal(raffleState, 0);
                assert.equal(
                  winnerEndingBalance.toString(),
                  winnerStartingBalance.add(raffleEntranceFee).toString()
                );
                assert(endingTimeStamp > startingTimeStamp);
                resolve();
              } catch (error) {
                reject(error);
              }
            });
            // Then entering the raffle
            console.log('Entering Raffle...');
            const tx = await raffle.enterRaffle({ value: raffleEntranceFee });
            await tx.wait(1);
            console.log('Ok, time to wait...');
            const winnerStartingBalance = await accounts[0].getBalance();

            // and this code WONT complete until our listener has finished listening!
          });
        });
      });
    });
