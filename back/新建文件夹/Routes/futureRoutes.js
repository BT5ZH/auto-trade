const express = require('express');
const router = express.Router();
const log = console.log;
const got = require('got');
const { URL } = require('url');
let globalString = require('../Utils/global.js');
const Binance = require('binance-api-node').default;
const client = Binance();
client.time().then((time) => console.log(time));

//Tulind Function
const {
  sma_inc,
  ema_inc,
  rsi_inc,
  macd_inc,
  macd_plo,
} = require('../Utils/indicators');

const serveapi = async (req, res) => {
  try {
    const fullurl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullurl);
    const url = new URL(fullurl);
    console.log(url);
    const response = await got(url.searchParams.get('url'));
    console.log(response.body);
    return res.status(200).send(response.body);
  } catch (err) {
    res.status(500).send(err);
  }
};
const futureapi = async (req, res) => {
  try {
    const { symbol, interval } = req.params;
    g_interval = interval;
    const data = await client.candles({ symbol, interval });
    let klinedata = data.map((d) => ({
      time: d.openTime / 1000,
      open: d.open * 1,
      high: d.high * 1,
      low: d.low * 1,
      close: d.close * 1,
    }));

    klinedata = await sma_inc(klinedata);
    klinedata = await ema_inc(klinedata);
    klinedata = await rsi_inc(klinedata);
    klinedata = await macd_inc(klinedata);
    klinedata = macd_plo(klinedata);
    rawData = klinedata;
    res.status(200).json(klinedata);
  } catch (error) {
    res.status(500).send(error);
  }
};

router.route('/').get(serveapi);
router.route('/:symbol/:interval').get(futureapi);

module.exports = router;
