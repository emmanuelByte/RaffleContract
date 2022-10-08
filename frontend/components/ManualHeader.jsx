import React, { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { safeWindow } from '../hooks/useWindow';

const ManualHeader = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();
  useEffect(() => {
    const isConnected = safeWindow(() =>
      window.localStorage.getItem('connected')
    );
    if (!isWeb3Enabled && isConnected) enableWeb3();
  }, [isWeb3Enabled]);
  const handleConnect = async () => {
    await enableWeb3();
    //  inject to localStorage
    safeWindow(() => window.localStorage.setItem('connected', true));
  };
  // useEffect to detect if user is disconnected
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log('account changed', account);
      if (!account) {
        safeWindow(() => window.localStorage.removeItem('connected'));
        deactivateWeb3();
      }
    });
  }, []);
  return (
    <div>
      {(() => {
        if (account)
          return (
            <div>
              Account:{' '}
              {`${account.slice(0, 6)}...${account.slice(account.length - 4)}`}
            </div>
          );
        else
          return (
            <button disabled={isWeb3EnableLoading} onClick={handleConnect}>
              Connect Wallet
            </button>
          );
      })()}
    </div>
  );
};

export default ManualHeader;
