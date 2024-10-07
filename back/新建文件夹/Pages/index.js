const { log, error } = console;
var domElememt = document.getElementById('tvchart');
// var chart;
let FFlag = true;
let v_symbol = 'ETHUSDT';
let v_interval;
let v_policy = '';
let v_action = false;

// socket;
const socket = io.connect('/');
socket.on('connection', log(`Socket connection established successfully! `));

const getData = async (d_symbol, d_interval) => {
  const resp = await fetch(
    `http://47.88.11.55:3000/api/v1/info/${d_symbol.toUpperCase()}/${d_interval}`
  );
  const data = await resp.json();
  return data;
};

const renderChart = async (r_symbol, r_interval) => {
  const chartProperties = {
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
    pane: 0,
  };
  const chart = LightweightCharts.createChart(domElememt, chartProperties);
  // const domElememt = document.getElementById('tvchart');
  // console.log(domElememt);

  // const chart2 = LightweightCharts.createChart(subElememt, chartProperties);
  var candleseries = chart.addCandlestickSeries();
  const klinedata = await getData(r_symbol, r_interval);
  candleseries.setData(klinedata);

  //SMA
  const sma_series = chart.addLineSeries({ color: '#6495ED', lineWidth: 1 });
  const sma_data = klinedata
    .filter((d) => d.sma)
    .map((d) => ({ time: d.time, value: d.sma }));
  sma_series.setData(sma_data);

  //EMA
  const ema_series = chart.addLineSeries({ color: '#543777', lineWidth: 1 });
  const ema_data = klinedata
    .filter((d) => d.ema)
    .map((d) => ({ time: d.time, value: d.ema }));
  ema_series.setData(ema_data);

  // let markersArray = klinedata
  //   .filter((d) => d.m_long || d.m_short)
  //   .map((d) =>
  //     // console.log(d);
  //     d.m_long
  //       ? {
  //           time: d.time,
  //           position: 'belowBar',
  //           color: 'green',
  //           shape: 'arrowUp',
  //           text: 'LONG',
  //         }
  //       : {
  //           time: d.time,
  //           position: 'aboveBar',
  //           color: 'red',
  //           shape: 'arrowDown',
  //           text: 'SHORT',
  //         }
  //   );
  // log(markersArray);

  //MARKERS
  candleseries.setMarkers(
    klinedata
      .filter((d) => d.m_long || d.m_short)
      .map((d) =>
        // console.log(d);
        d.m_long
          ? {
              time: d.time,
              position: 'belowBar',
              color: 'green',
              shape: 'arrowUp',
              text: 'LONG',
            }
          : {
              time: d.time,
              position: 'aboveBar',
              color: 'red',
              shape: 'arrowDown',
              text: 'SHORT',
            }
      )
  );
  //RSI
  const rsi_series = chart.addLineSeries({
    color: '#26a69a',
    lineWidth: 1,
    pane: 1,
  });
  const rsi_data = klinedata
    .filter((d) => d.rsi)
    .map((d) => ({ time: d.time, value: d.rsi }));
  rsi_series.setData(rsi_data);

  //MACD FAST
  const macd_fast_series = chart.addLineSeries({
    color: 'blue',
    lineWidth: 1,
    pane: 2,
  });
  const macd_fast_data = klinedata
    .filter((d) => d.macd_fast)
    .map((d) => ({ time: d.time, value: d.macd_fast }));
  macd_fast_series.setData(macd_fast_data);
  //MACD SLOW
  const macd_slow_series = chart.addLineSeries({
    color: 'red',
    lineWidth: 1,
    pane: 2,
  });
  const macd_slow_data = klinedata
    .filter((d) => d.macd_slow)
    .map((d) => ({ time: d.time, value: d.macd_slow }));
  macd_slow_series.setData(macd_slow_data);
  //MACD HISOGRAM
  const macd_histogram_series = chart.addHistogramSeries({
    pane: 2,
  });
  const macd_histogram_data = klinedata
    .filter((d) => d.macd_histogram)
    .map((d) => ({
      time: d.time,
      value: d.macd_histogram,
      color: d.macd_histogram > 0 ? '#26a69a' : '#FF6347',
    }));
  macd_histogram_series.setData(macd_histogram_data);

  //当前BAR
  let currentBar = {
    open: klinedata[klinedata.length - 1].open,
    high: klinedata[klinedata.length - 1].high,
    low: klinedata[klinedata.length - 1].low,
    close: klinedata[klinedata.length - 1].close,
    time: klinedata[klinedata.length - 1].time,
  };

  //主图更新
  const mergeTickToBar = (price) => {
    //是否开始绘制新蜡烛
    if (currentBar.open === null) {
      currentBar.open = price;
      currentBar.high = price;
      currentBar.low = price;
      currentBar.close = price;
    } else {
      currentBar.close = price;
      currentBar.high = Math.max(currentBar.high, price);
      currentBar.low = Math.min(currentBar.low, price);
    }
    // console.log(currentBar.time);
    //更新蜡烛条
    candleseries.update(currentBar);
  };

  // RSI 更新
  let currentRSI = {
    time: klinedata[klinedata.length - 1].time,
    value: rsi_series[rsi_series.length - 1],
  };
  const mergeRSI = (rsi) => {
    //是否开始绘制新MACD
    currentRSI.value = rsi;
    // }
    //更新蜡烛条
    rsi_series.update(currentRSI);
  };
  //当前MACD LINE DATA
  let currentMFA = {
    time: klinedata[klinedata.length - 1].time,
    value: macd_fast_data[macd_fast_data.length - 1],
  };
  let currentMSL = {
    time: klinedata[klinedata.length - 1].time,
    value: macd_slow_data[macd_slow_data.length - 1],
  };
  let currentMHI = {
    time: klinedata[klinedata.length - 1].time,
    value: macd_histogram_data[macd_histogram_data.length - 1],
    color: '#26a69a',
  };
  // MACD更新
  const mergeMACD = (fast, slow, histogram, rsi) => {
    //是否开始绘制新MACD
    // currentRSI.value = rsi;
    currentMFA.value = fast;
    currentMSL.value = slow;
    currentMHI.value = histogram;
    currentMHI.color = histogram > 0 ? '#26a69a' : '#FF6347';
    // }
    //更新蜡烛条
    macd_fast_series.update(currentMFA);
    macd_slow_series.update(currentMSL);
    macd_histogram_series.update(currentMHI);
  };

  const mergeMarker = (long, short) => {
    currentLong.value = long;
    currentShort.value = short;
  };

  //上一个BAR收盘价
  var lastClose = klinedata[klinedata.length - 1].close;
  //上一个索引位置
  // var lastIndex = klinedata.length - 2;
  //当前时间点
  var lastTime = klinedata[klinedata.length - 1].time;
  // console.log(lastTime);

  var counter = 0;
  socket.on('OBUPDATES', (pl) => {
    // counter++;
    // log(counter);
    var deltaY = pl.data.p - lastClose;
    var basePrice = lastClose + deltaY;
    var noisedPrice = basePrice;
    mergeTickToBar(noisedPrice);
    mergeRSI(pl.data.rsi);
    mergeMACD(pl.data.mfa, pl.data.msl, pl.data.mhi);

    // console.log(lastTime + '---' + pl.data.time + '---' + pl.data.E);

    if (lastTime != pl.data.time) {
      // move to next bar
      lastTime = pl.data.time;

      currentBar = {
        open: null,
        high: null,
        low: null,
        close: null,
        time: lastTime,
      };
      currentMFA = {
        value: null,
        time: lastTime,
      };
      currentMSL = {
        value: null,
        time: lastTime,
      };
      currentMHI = {
        value: null,
        time: lastTime,
        color: '#26a69a',
      };
      currentRSI = {
        value: null,
        time: lastTime,
      };
      console.log(currentRSI);
    } else {
      // console.log(lastTime);
    }
  });
};

//Event listeners
let select_symbol = document.getElementById('symbol');
let select_interval = document.getElementById('interval');
let select_policy = document.getElementById('policy');
let policy_start = document.getElementById('start');
let policy_stop = document.getElementById('stop');
let policy_test = document.getElementById('test');
// 发送订阅信号
const symbolchange = async () => {
  v_symbol = select_symbol.value;
  v_interval = select_interval.value;
  // console.log(v_interval + '.....starting');
  if (!FFlag) {
    socket.emit('PAUSE');
    log(socket._callbacks['$OBUPDATES'].length);
    socket._callbacks['$OBUPDATES'].pop();
    log(socket._callbacks['$OBUPDATES'].length);

    removeElementsByClass('tv-lightweight-charts');
    await renderChart(v_symbol, v_interval);
  } else {
    await renderChart(v_symbol, v_interval);
    FFlag = false;
  }
  socket.emit('SYMBOL', { v_symbol, v_interval });
};

const intervalchange = async () => {
  // console.log(select_interval.value);
  v_interval = select_interval.value;
  if (!FFlag) {
    socket.emit('PAUSE');
    //避免数据重复
    log(socket._callbacks['$OBUPDATES'].length);
    socket._callbacks['$OBUPDATES'].pop();
    log(socket._callbacks['$OBUPDATES'].length);
    removeElementsByClass('tv-lightweight-charts');
    await renderChart(v_symbol, v_interval);
  } else {
    await renderChart(v_symbol, v_interval);
    FFlag = false;
  }
  socket.emit('SYMBOL', { v_symbol, v_interval });
};

const policychange = () => {
  v_policy = select_policy.value;

  socket.emit('POLICY', { v_policy });
};

const policystart = () => {
  v_policy = select_policy.value;
  v_action = true;
  log(' 策略开始执行: ' + v_action);
  socket.emit('POLICY', { v_policy, v_action });
};
const policystop = () => {
  v_policy = '';
  v_action = false;
  log(' 策略停止执行: ' + v_action);
  socket.emit('POLICY', { v_policy, v_action });
};
const policytest = () => {
  console.log(' sign: ');
};

const triggerChange = (element) => {
  let changeEvent = new Event('change');
  element.dispatchEvent(changeEvent);
};

const removeElementsByClass = (className) => {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

select_symbol.addEventListener('change', symbolchange);
select_interval.addEventListener('change', intervalchange);
select_policy.addEventListener('change', policychange);
policy_start.addEventListener('click', policystart);
policy_stop.addEventListener('click', policystop);
policy_test.addEventListener('click', policytest);
// select_symbol.value = select_symbol.value;

console.log(v_symbol + '.....starting');
triggerChange(select_symbol);
triggerChange(select_policy);
