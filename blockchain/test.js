const fetch = require('node-fetch');
const web3ApiKey =
  'MGLOpL9alcMMoNTeZvvepKCxlvLZvKSsp4rKzN9utvHYG0r9CeUcjBNJ64x4kpCa';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': web3ApiKey,
  },
};
const address = '0x5f3fA04b939CFD4De83538814A14Af2fe8c09301';
const chainId = '0x5';
fetch(
  `https://deep-index.moralis.io/api/v2/${address}/balance?chain=${chainId}`,
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
