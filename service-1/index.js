import axios from 'axios';

import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config({ path: './config.env' });
const app = express();
app.use(bodyParser.json());
const port = 3000;

const timestamp = new Date().toISOString();
const encodedTemp = CryptoJs.HmacSHA256(
  timestamp + 'GET' + 'https://www.okx.com/api/v5/trade/order',
  process.env.SECRET_KEY
);
const sign = CryptoJs.enc.Base64.stringify(encodedTemp);

console.log(timestamp);
console.log(process.env.ACCESS_KEY);
console.log(sign);
console.log(process.env.PASSPRASE);

const instance = axios.create({
  baseURL: 'https://www.okx.com',
  timeout: 5000,
});
instance.defaults.headers.common['OK-ACCESS-KEY'] = process.env.ACCESS_KEY;
instance.defaults.headers.common['OK-ACCESS-SIGN'] = sign;
instance.defaults.headers.common['OK-ACCESS-TIMESTAMP'] = timestamp;
instance.defaults.headers.common['OK-ACCESS-PASSPHRASE'] =
  process.env.PASSPRASE;
instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.headers.common['Content-Type'] = 'application/json';

// instance
//   .get('/api/v5/market/books?instId=ETH-USDT')
//   .then(function (response) {
//     console.log('response is fetched');
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

instance
  .post('/api/v5/trade/order', {
    instId: 'ETH-USDT-SWAP',
    tdMode: 'cross',
    clOrdId: '20220426',
    side: 'buy',
    ordType: 'market',
    sz: '0.1',
  })
  .then(function (response) {
    console.log('response is fetched');
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
