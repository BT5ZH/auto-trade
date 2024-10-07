const { log, error } = console;

const dotenv = require('dotenv');
const express = require('express');
dotenv.config({ path: './config.env' });

const app = express();
const server = app.listen(3000, log('Proxy server is running on port 3000'));
const cors = require('cors');
global.rawData = [];
global.g_interval = '';
global.exec_start = false;
global.exec_policy = '';
global.g_symbol = '';
global.g_quantity = 0.1;
let counter = 0;
// signal actionTime
const actionTime = 30;

//Tulind Function
const { sma_inc, ema_inc, rsi_inc, macd_inc, macd_plo } = require('./Utils/indicators');

// const { fbuy, positionRisk, balance } = require('./Utils/ftrade');
const { macd_stragety } = require('./strategy/macd.js');
const api = process.env.ACCESS_KEY;
const sec = process.env.SECRET_KEY;
const keys = { api, sec };

// Express Server
app.use(express.json());
app.use('/api/v1/info', require('./Routes/futureRoutes.js'));
app.use('/', require('./Routes/pages'));
app.get('/', (_, res) => {
  console.log('coming soon....');
  res.redirect('/home');
});

app.use(cors());

//Dependent Modules
const binancews = require('./Utils/binancews');

//Socket
const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
  log(`New socket connection established with id ${socket.id}`);
  socket.on('SYMBOL', (payload) => {
    console.log(payload.v_symbol);
    // console.log(payload.v_interval + 'payload.v_interval');
    g_symbol = payload.v_symbol;
    g_interval = payload.v_interval;
    console.log(g_interval + '  g_interval');
    binancews.switchSymbol(payload);
  });
  socket.on('POLICY', (payload) => {
    exec_policy = payload.v_policy;
    exec_start = payload.v_action;
    log('policy....: ' + exec_policy + ' --start signal....: ' + exec_start);
  });
  socket.on('PAUSE', () => {
    console.log('stoping....');

    binancews.stopInfo();
  });
  socket.on('disconnect', () => {
    console.log('disconnect....');
  });
});

//Event Emitter
binancews.EE.on('OBUPDATES', async (payload) => {
  // counter++;
  // console.log(payload.data.E + '   counter: ' + counter);
  let temp;
  const netTime = Math.floor(payload.data.E / 1000);

  let judge_interval = -1000;

  switch (g_interval) {
    case '5m':
      // console.log(g_interval);
      judge_interval = 300;
      break;
    case '15m':
      judge_interval = 900;
      break;
    case '30m':
      judge_interval = 1800;
      break;
    case '1h':
      judge_interval = 3600;
      break;
    case '2h':
      judge_interval = 7200;
      break;
    case '4h':
      judge_interval = 14400;
      break;
  }

  // console.log(netTime - rawData[rawData.length - 1].time);
  if (netTime - rawData[rawData.length - 1].time == judge_interval) {
    // console.log(judge_interval);
    let newData = {
      time: netTime,
      close: +payload.data.p,
    };
    rawData.push(newData);
  } else {
    rawData[rawData.length - 1].close = +payload.data.p;
  }
  temp = await rsi_inc(rawData);

  temp = await macd_inc(temp);

  temp = macd_plo(temp);

  // log(netTime - rawData[rawData.length - 1].time);
  // 开始交易策略信号为真--执行买卖
  if (exec_start === true) {
    // log('准备中。。。。。');
    // log(g_symbol);
    //等待执行 --- 操作信号
    switch (exec_policy) {
      case 'MACD':
        if (netTime - rawData[rawData.length - 1].time == actionTime) {
          macd_stragety(temp, keys, g_symbol, g_quantity);
        }
        break;

      default:
        break;
    }
  }

  // console.log(temp.length);
  let { data } = payload;
  let subData = {
    ...data,
    time: temp[temp.length - 1].time,
    rsi: temp[temp.length - 1].rsi,
    mfa: temp[temp.length - 1].macd_fast,
    msl: temp[temp.length - 1].macd_slow,
    mhi: temp[temp.length - 1].macd_histogram,
  };
  payload.data = subData;
  // console.log(payload);
  io.emit('OBUPDATES', payload);
});
