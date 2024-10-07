const { log, error } = console;
const binance = require('./binance');
const NP = require('number-precision');
NP.enableBoundaryChecking(false);
const scientificToDecimal = require('scientific-to-decimal');

let eInfo = {};

const loadeInfo = async ({ symbol }) => {
  try {
    const resp = await binance({
      method: 'GET',
      path: '/fapi/v1/exchangeInfo',
    });
    if (resp?.statusCode !== 200) throw resp;
    const einfoSymbol = resp.body.symbols.find((s) => s?.symbol === symbol);
    if (!einfoSymbol) throw 'Symbol missing in Exchange Info API';
    eInfo[symbol] = { ...einfoSymbol };
  } catch (err) {
    throw err;
  }
};

const getQty = ({ symbol, price, usdt }) => {
  const qty = usdt / price;
  const qstep = Math.log10(1 / eInfo[symbol]['filters'][2]['stepSize']);
  return NP.strip(Math.floor(qty * 10 ** qstep) / 10 ** qstep);
};

const fbuy = async ({
  keys,
  qty,
  symbol,
  side,
  positionSide,
  type,
  timestamp,
}) => {
  try {
    // keys: { api, sec }, quantity, symbol

    const resp = await binance({
      method: 'POST',
      path: '/fapi/v1/order',
      keys,
      params: {
        quantity: scientificToDecimal(qty),
        symbol,
        side,
        positionSide,
        type,
        timestamp,
      },
    });
    if (resp?.statusCode !== 200) throw resp;
    return resp.body;
  } catch (err) {
    throw err;
  }
};

const fsell = async ({
  keys,
  qty,
  symbol,
  side,
  positionSide,
  type,
  timestamp,
}) => {
  try {
    // keys: { api, sec }, quantity, symbol

    const resp = await binance({
      method: 'POST',
      path: '/fapi/v1/order',
      keys,
      params: {
        quantity: scientificToDecimal(qty),
        symbol,
        side,
        positionSide,
        type,
        timestamp,
      },
    });
    if (resp?.statusCode !== 200) throw resp;
    return resp.body;
  } catch (err) {
    throw err;
  }
};

const sell = async ({ keys, buyPrice, symbol, qty, profit, sloss }) => {
  try {
    if (sloss) {
      //OCO order
      const pstep = Math.log10(1 / eInfo[symbol]['filters'][0]['tickSize']);
      const price = NP.strip(
        Math.floor(buyPrice * (1 + profit / 100) * 10 ** pstep) / 10 ** pstep
      );
      const stopPrice = NP.strip(
        Math.floor(buyPrice * (1 - sloss / 100) * 10 ** pstep) / 10 ** pstep
      );
      log(`Sell Price is ${price}`);
      log(`Stop-Loss Price is ${stopPrice}`);
      const resp = await binance({
        method: 'POST',
        path: '/api/v3/order/oco',
        keys,
        params: {
          symbol,
          side: 'SELL',
          quantity: scientificToDecimal(qty),
          price: scientificToDecimal(price),
          stopPrice: scientificToDecimal(stopPrice),
          stopLimitPrice: scientificToDecimal(stopPrice),
          stopLimitTimeInForce: 'GTC',
        },
      });
      if (resp?.statusCode !== 200) throw resp;
      return resp.body;
    } else {
      //limit sell order
      const pstep = Math.log10(1 / eInfo[symbol]['filters'][0]['tickSize']);
      const price = NP.strip(
        Math.floor(buyPrice * (1 + profit / 100) * 10 ** pstep) / 10 ** pstep
      );
      log(`Sell Price is ${price}`);
      const resp = await binance({
        method: 'POST',
        path: '/api/v3/order',
        keys,
        params: {
          quantity: scientificToDecimal(qty),
          symbol,
          side: 'SELL',
          type: 'LIMIT',
          price: scientificToDecimal(price),
          newOrderRespType: 'RESULT',
          timeInForce: 'GTC',
        },
      });
      if (resp?.statusCode !== 200) throw resp;
      return resp.body;
    }
  } catch (err) {
    throw err;
  }
};

const balance = async ({ keys, currentTime }) => {
  try {
    // keys: { api, sec }, quantity, symbol

    const resp = await binance({
      method: 'GET',
      path: '/fapi/v1/balance',
      keys,
      params: {
        timestamp: currentTime,
      },
    });
    // log(resp.body);
    if (resp?.statusCode !== 200) throw resp;
    return resp.body;
  } catch (err) {
    throw err;
  }
};

// 查询持仓模式
const dualInfo = async ({ keys, currentTime }) => {
  try {
    // keys: { api, sec }, quantity, symbol

    const resp = await binance({
      method: 'GET',
      path: '/fapi/v1/positionSide/dual',
      keys,
      params: {
        timestamp: currentTime,
      },
    });
    // log(resp.body);
    if (resp?.statusCode !== 200) throw resp;
    return resp.body;
  } catch (err) {
    throw err;
  }
};

// 查询持仓模式
const openInterest = async ({ keys, symbol }) => {
  try {
    // keys: { api, sec }, quantity, symbol

    const resp = await binance({
      method: 'GET',
      path: '/fapi/v1/openInterest',
      keys,
      symbol,
    });
    // log(resp.body);
    if (resp?.statusCode !== 200) throw resp;
    return resp.body;
  } catch (err) {
    throw err;
  }
};

const multiAssetsMargin = async ({ keys, currentTime }) => {
  try {
    // keys: { api, sec }, quantity, symbol

    const resp = await binance({
      method: 'GET',
      path: '/fapi/v1/multiAssetsMargin',
      keys,
      params: {
        timestamp: currentTime,
      },
    });
    // log(resp.body);
    if (resp?.statusCode !== 200) throw resp;
    return resp.body;
  } catch (err) {
    throw err;
  }
};

const positionRisk = async ({ keys, currentTime, symbol }) => {
  try {
    // keys: { api, sec }, quantity, symbol

    const resp = await binance({
      method: 'GET',
      path: '/fapi/v2/positionRisk',
      keys,
      params: {
        timestamp: currentTime,
        symbol,
      },
    });
    // log(resp.body);
    if (resp?.statusCode !== 200) throw resp;
    return resp.body;
  } catch (err) {
    throw err;
  }
};

// /fapi/v1/leverageBracket
const leverageBracket = async ({ keys, currentTime, symbol }) => {
  try {
    // keys: { api, sec }, quantity, symbol

    const resp = await binance({
      method: 'GET',
      path: '/fapi/v1/leverageBracket',
      keys,
      params: {
        timestamp: currentTime,
        symbol,
      },
    });
    // log(resp.body);
    if (resp?.statusCode !== 200) throw resp;
    return resp.body;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  loadeInfo,
  getQty,
  fsell,
  balance,
  fbuy,
  dualInfo,
  openInterest,
  multiAssetsMargin,
  positionRisk,
  leverageBracket,
};
