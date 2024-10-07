const { log, error } = console;
const ftrade = require('../Utils/ftrade');
const NP = require('number-precision');
NP.enableBoundaryChecking(false);
const scientificToDecimal = require('scientific-to-decimal');

//ftrade Function
const { fbuy, positionRisk, balance } = require('../Utils/ftrade');
// const { fbuy, positionRisk, balance } = require('./Utils/ftrade');
const checkPositionInfo = async (keys, symbol) => {
  const targetCheck = await positionRisk({
    keys,
    symbol: symbol,
    timestamp: Date.now() - 1000,
  });
  const checkLong = targetCheck.filter((d) => d.positionSide == 'LONG');
  const checkShort = targetCheck.filter((d) => d.positionSide == 'SHORT');
  const payload = {
    l_positionAmt: parseFloat(checkLong[0].positionAmt),
    l_unRealizedProfit: parseFloat(checkLong[0].unRealizedProfit),
    l_positionSide: parseFloat(checkLong[0].positionSide),
    s_positionAmt: parseFloat(checkShort[0].positionAmt),
    s_unRealizedProfit: parseFloat(checkShort[0].unRealizedProfit),
    s_positionSide: parseFloat(checkShort[0].positionSide),
  };
  return payload;
};

const macd_stragety = async (t_data, keys, symbol, quantity) => {
  // if (exec_policy == 'MACD' && netTime - rawData[rawData.length - 1].time == actionTime) {
  log(
    '开始触发时刻的信号值 --long: ' +
      t_data[t_data.length - 1].m_long +
      ' --short: ' +
      t_data[t_data.length - 1].m_short
  );
  try {
    if (t_data[t_data.length - 1].m_long == true) {
      const checkData = await checkPositionInfo(keys, symbol);
      log('LONG信号出现。。。。。');
      //1.1> 查看SHORT方向是否有持仓
      //1.1.1>     有：再查看该持仓是否盈利
      //1.1.1.1>         是：平仓SHORT方向盈利
      //1.1.1.2>         否：如何操作？？？？(下一步)
      //1.1.2>     无：(下一步)

      //2.1> 查看LONG方向是否有持仓
      //2.1.1>     有：再查看该持仓是否盈利
      //2.1.1.1>         是：平仓LONG方向盈利 / 还是继续加仓LONG方向(暂时选加仓)
      //2.1.1.2>         否：是否继续加仓？？？？ / 还是等待(暂时选加仓等待)
      //2.1.2>     无：在LONG方向开仓

      if (checkData.s_positionAmt > 0 && checkData.s_unRealizedProfit > 0) {
        //1.1.1.1>         是：平仓SHORT方向盈利
        log('平仓SHORT方向盈利.....: ');
        const bresp = await fbuy({
          keys,
          symbol: symbol,
          side: 'BUY',
          positionSide: 'SHORT',
          qty: checkData.s_positionAmt,
          type: 'MARKET',
          timestamp: Date.now() - 1000,
        });
        log(bresp);
      } else if (checkData.s_positionAmt > 0 && checkData.s_unRealizedProfit <= 0) {
        //1.1.1.2>         否：如何操作？？？？(下一步)
        log('下一步.....: ');
      } else if (checkData.s_positionAmt == 0) {
        log('下一步.....: ');
      }

      if (checkData.l_positionAmt > 0 && checkData.l_unRealizedProfit > 0) {
        //2.1.1.1>         是：平仓LONG方向盈利 / 还是继续加仓LONG方向(暂时选加仓)
        log('暂时选加仓.....: ');
        const bresp = await fbuy({
          keys,
          symbol: symbol,
          side: 'BUY',
          positionSide: 'LONG',
          qty: quantity,
          type: 'MARKET',
          timestamp: Date.now() - 1000,
        });
        log(bresp);
      } else if (checkData.l_positionAmt > 0 && checkData.l_unRealizedProfit <= 0) {
        //2.1.1.2>         否：是否继续加仓？？？？ / 还是等待(暂时选加仓等待)
        log('等待下一步.....: ');
      } else if (checkData.l_positionAmt == 0) {
        //2.1.2>     无：在LONG方向开仓
        log('在LONG方向开仓.....: ');
        const bresp = await fbuy({
          keys,
          symbol: symbol,
          side: 'BUY',
          positionSide: 'LONG',
          qty: quantity,
          type: 'MARKET',
          timestamp: Date.now() - 1000,
        });
        log(bresp);
      }
    } else if (t_data[t_data.length - 1].m_short == true) {
      const checkData2 = await checkPositionInfo(keys, symbol);
      log('SHORT信号出现。。。。。');
      //3.1> 查看LONG方向是否有持仓
      //3.1.1>     有：再查看该持仓是否盈利
      //3.1.1.1>         是：平仓LONG方向盈利
      //3.1.1.2>         否：如何操作？？？？(下一步)
      //3.1.2>     无：(下一步)

      //4.1> 查看SHORT方向是否有持仓
      //4.1.1>     有：再查看该持仓是否盈利
      //4.1.1.1>         是：平仓SHORT方向盈利 / 还是继续加仓SHORT方向(暂时选加仓)
      //4.1.1.2>         否：是否继续加仓？？？？ / 还是等待(暂时选加仓等待)
      //4.1.2>     无：在SHORT方向开仓

      if (checkData2.l_positionAmt > 0 && checkData2.l_unRealizedProfit > 0) {
        //3.1.1.1>         是：平仓LONG方向盈利
        log('平仓LONG.....: ');
        const bresp = await fbuy({
          keys,
          symbol: symbol,
          side: 'BUY',
          positionSide: 'LONG',
          qty: checkData2.s_positionAmt,
          type: 'MARKET',
          timestamp: Date.now() - 1000,
        });

        log(bresp);
      } else if (checkData2.l_positionAmt > 0 && checkData2.l_unRealizedProfit <= 0) {
        //3.1.1.2>         否：如何操作？？？？(下一步)
        log(' 方向下一步.....: ');
      } else if (checkData2.l_positionAmt == 0) {
        //3.1.2>     无：(下一步)
        log(' 方向下一步.....: ');
      }

      if (checkData2.s_positionAmt > 0 && checkData2.s_unRealizedProfit > 0) {
        //4.1.1.1>         是：平仓SHORT方向盈利 / 还是继续加仓SHORT方向(暂时选加仓)
        log('暂时选加仓.....: ');
        const bresp = await fbuy({
          keys,
          symbol: symbol,
          side: 'SELL',
          positionSide: 'SHORT',
          qty: quantity,
          type: 'MARKET',
          timestamp: Date.now() - 1000,
        });
        log(bresp);
      } else if (checkData2.s_positionAmt > 0 && checkData2.s_unRealizedProfit <= 0) {
        //4.1.1.2>         否：是否继续加仓？？？？ / 还是等待(暂时选加仓等待)
        log('等待下一步.....: ');
      } else if (checkData2.s_positionAmt == 0) {
        //4.1.2>     无：在SHORT方向开仓
        log('在LONG方向开仓.....: ');
        const bresp = await fbuy({
          keys,
          symbol: symbol,
          side: 'SELL',
          positionSide: 'SHORT',
          qty: quantity,
          type: 'MARKET',
          timestamp: Date.now() - 1000,
        });
        log(bresp);
      }
    }
  } catch (error) {
    log(error);
  }
  //2> 交易记录写入数据库
  // }
};
module.exports = {
  macd_stragety,
};
