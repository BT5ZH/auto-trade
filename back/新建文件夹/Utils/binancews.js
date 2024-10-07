const { log, error } = console;
const Websocket = require('ws');
const events = require('events');

let binancews = {
  EE: new events(), //event emitter
  ws: '',
  stopInfo() {
    if (binancews.ws) binancews.ws.terminate();
  },
  switchSymbol({ v_symbol }) {
    if (binancews.ws) binancews.ws.terminate();
    binancews.ws = new Websocket(
      `wss://fstream.binance.com/stream?streams=${v_symbol.toLowerCase()}@markPrice`
    );
    // log(binancews.ws);
    binancews.ws.on('message', binancews.processStream);
  },
  processStream(payload) {
    const pl = JSON.parse(payload);
    // log(pl);
    binancews.EE.emit('OBUPDATES', pl);
  },
};

module.exports = binancews;
