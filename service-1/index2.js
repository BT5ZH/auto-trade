import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import express from 'express';
import zlib from 'zlib';

dotenv.config({ path: './config.env' });
const app = express();
const port = 3000;

const timestamp = new Date().toISOString();
// const dirUrl = url.replace(/.*\/\/[^\/]*/, '');

let sign = CryptoJs.enc.Base64.stringify(
  CryptoJs.HmacSHA256(
    timestamp +
      'GET' +
      'https://www.okx.com/api/v5/market/books?instId=BTC-USDT',
    process.env.SECRET_KEY
  )
);

let options = {
  method: 'get',
  headers: {
    'OK-ACCESS-KEY': process.env.ACCESS_KEY,
    'OK-ACCESS-SIGN': sign,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': process.env.PASSPRASE,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

console.log(timestamp);
console.log(process.env.SECRET_KEY);
console.log(sign);
console.log(process.env.PASSPRASE);

fetch('https://www.okx.com/api/v5/market/books?instId=BTC-USDT', options)
  .then((res) => {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%');

    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
