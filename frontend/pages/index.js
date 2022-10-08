import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import LotteryEntrance from '../components/LotteryEntrance';
import ManualHeader from '../components/ManualHeader';

const index = () => {
  return (
    <div>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Smart Contract Lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LotteryEntrance />
    </div>
  );
};

export default index;
