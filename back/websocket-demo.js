const WebSocket = require('ws');

const ws = new WebSocket(
  'wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/btcusdt@markPrice'
);
// const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

ws.on('message', function incoming(data) {
  console.log(data);
});
