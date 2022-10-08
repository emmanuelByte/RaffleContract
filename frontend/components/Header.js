import React from 'react';
import { ConnectButton } from 'web3uikit';
const Header = () => {
  return (
    <div className="flex justify-between px-8 py-8 shadow-md mb-8">
      <h1 className="text-3xl font-bold">Decentralized Lottery</h1>
      <ConnectButton moralisAuth={false} />
    </div>
  );
};

export default Header;
