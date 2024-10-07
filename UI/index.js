const { log, error } = console;

const getData = async () => {
  const resp = await fetch('http://47.88.11.55:3000/ETHUSDT/15m');
  const data = await resp.json();
  // log(data);
  return data;
};

// getData();

const renderChart = async () => {
  const chartProperties = {
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
    pane: 0,
  };

  const domElememt = document.getElementById('tvchart');
  // const subElememt = document.getElementById('subchart');
  const chart = LightweightCharts.createChart(domElememt, chartProperties);
  // const chart2 = LightweightCharts.createChart(subElememt, chartProperties);
  const candleseries = chart.addCandlestickSeries();
  const klinedata = await getData();
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

  //MARKERS
  candleseries.setMarkers(
    klinedata
      .filter((d) => d.long || d.short)
      .map((d) =>
        // console.log(d);
        d.long
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
  // const macd_histogram_data = klinedata
  //   .filter((d) => d.macd_histogram)
  //   .map((d) => ({ time: d.time, value: d.macd_histogram }));

  const macd_histogram_data = klinedata
    .filter((d) => d.macd_histogram)
    .map((d) => ({
      time: d.time,
      value: d.macd_histogram,
      color: d.macd_histogram > 0 ? '#26a69a' : '#FF6347',
    }));

  macd_histogram_series.setData(macd_histogram_data);
};

renderChart();
