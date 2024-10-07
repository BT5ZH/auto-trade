const { log, error } = console;
const express = require('express');

const app = express();
const server = app.listen(3000, log('Proxy server is running on port 3000'));
const got = require('got');
const cors = require('cors');

app.use(cors());

app.get('/:symbol/:interval', async (req, res) => {
  try {
    // res.status(200).send('Proxy server works!')
    const { symbol, interval } = req.params;
    console.log(interval);
    const resp = await got(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
    );
    const data = JSON.parse(resp.body);
    console.log(data);
    const klinedata = data.map((d) => ({
      time: d[0] / 1000,
      open: d[1] * 1,
      close: d[2] * 1,
      low: d[3] * 1,
      high: d[4] * 1,
    }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
