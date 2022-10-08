import React, { useEffect } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { abi, contractAddresses } from '../constants';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { networks } from '../constants/availableNetworks';
const LotteryEntrance = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  let chainId = parseInt(chainIdHex, 16);
  const raffleAddress = contractAddresses?.[chainId]?.[0];
  const [entranceFee, setEntranceFee] = React.useState('0');
  const [numPlayers, setNumPlayers] = React.useState(0);
  const [recentWinner, setRecentWinner] = React.useState('');
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'enterRaffle',
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getEntranceFee',
    params: {},
  });
  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getNumberOfPlayers',
    params: {},
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getRecentWinner',
    params: {},
  });
  const { runContractFunction: getPlayer } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getPlayer',
    params: {
      // index: 0,
    },
  });
  async function updateData() {
    const eFee = (await getEntranceFee()).toString();
    setNumPlayers((await getNumberOfPlayers()).toString());
    setRecentWinner((await getRecentWinner()).toString());
    setEntranceFee(eFee);
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      updateData();
    }
  }, [isWeb3Enabled]);
  const [isLoading, setIsLoading] = React.useState(false);
  // console.log({ recentWinner, numPlayers, entranceFee });
  const handleEnterRaffle = async () => {
    setIsLoading(true);
    if (!isLoading)
      await enterRaffle({
        onSuccess: async (tx) => {
          // console.log(tx);
          await tx.wait(1);
          await updateData();
          toast.success('You have entered the raffle!');
          setIsLoading(false);
        },
        onError: (error) => {
          console.log(error);
          toast.error('Something went wrong!');
          setIsLoading(false);
        },
        onComplete: () => {
          console.log('Complete');
        },
      });
  };
  return (
    <div className="px-8 space-y-4">
      <h1 className="text-xl">Lottery Entrance</h1>
      {raffleAddress ? (
        <div className="flex flex-col space-y-3">
          <button
            className={`${
              isLoading ? 'bg-blue-500/50' : 'bg-blue-500'
            } w-fit px-4 py-1 rounded-sm text-white`}
            onClick={handleEnterRaffle}
          >
            Enter Raffle
          </button>
          <p>Entrance Fee: {ethers.utils.formatEther(entranceFee)}ETH</p>
          <p>Number of players: {numPlayers}</p>
          {recentWinner?.includes('0x00000000000000') ? (
            ''
          ) : (
            <p>Recent Winner: {recentWinner}</p>
          )}
        </div>
      ) : (
        <p>Raffle Contract not deployed on this network</p>
      )}
      <div>
        <p>Available Networks</p>
        {Object.keys(contractAddresses).map((chainId) => {
          return (
            <p key={chainId}>
              {networks[chainId].name} - {contractAddresses[chainId][0]}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default LotteryEntrance;
