let id = [];
let openPrice = [];
let rsis = [];

//rsi 및 거래시점
fetch('http://localhost:3333/price/rsis')
  .then((res) => res.json())
  .then((data) => {
    data.map((e) => {
      //   console.log(e);
      id.push(e.id);
      openPrice.push(e.open);
      rsis.push(e.rsi);
    });
  })
  .then(() => {
    // console.log(id);
    // console.log(openPrice);
    // console.log(rsis);
    graph(id, openPrice, rsis);
  })
  .catch((e) => console.log(e));
//거래내역
fetch('http://localhost:3333/trade')
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    data.map((e) => {
      console.log(e);
      makeHistory(e.count, e.type, e.coin.time);
    });
  })
  .catch((e) => console.log(e));

const test = () => {
  const rateForm = document.getElementById('rate');
  const id = rateForm.id.value;
  const url = `http://localhost:3333/user/rate/${id}`;

  fetch(url, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      myRate(data);
    })
    .catch((e) => console.log(e));
  //   console.log('시점', id);
};

const myRate = (data) => {
  const myRate = document.getElementById('my-rate');
  //   myRate = null;

  const newDiv1 = document.createElement('div');
  const newDiv2 = document.createElement('div');
  const newDiv3 = document.createElement('div');
  const newDiv4 = document.createElement('div');
  const newDiv5 = document.createElement('div');
  const newDiv6 = document.createElement('div');
  const newDiv7 = document.createElement('div');
  newDiv1.innerHTML = '매수평균가 :' + data.averagePrice;
  newDiv2.innerHTML = '보유수량 :' + data.count;
  newDiv3.innerHTML = '평가손익 :' + data.profit;
  newDiv4.innerHTML = '수익률 :' + data.profitRate;
  newDiv5.innerHTML = '총 매수' + data.purchaseAmount;
  newDiv6.innerHTML = '총 보유자산 :' + data.totalHoldings;
  newDiv7.innerHTML = '보유 현금 :' + data.wallet;

  myRate.appendChild(newDiv1);
  myRate.appendChild(newDiv2);
  myRate.appendChild(newDiv3);
  myRate.appendChild(newDiv4);
  myRate.appendChild(newDiv5);
  myRate.appendChild(newDiv6);
  myRate.appendChild(newDiv7);
  console.log(data);
};

const makeHistory = (count, type, time) => {
  console.log(time);
  const history = document.getElementById('history');

  console.log('history', history);

  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', `history-container`);

  const date = new Date(time / 1);
  const newSpan1 = document.createElement('span');
  newSpan1.setAttribute('class', `time`);

  const newSpan2 = document.createElement('span');
  newSpan2.setAttribute('class', `${type}`);

  const newSpan3 = document.createElement('span');
  newSpan3.setAttribute('class', `count`);

  newDiv.innerText = id;
  newSpan1.innerText = `${date.getFullYear()}년 ${date.getMonth()} 월 ${date.getDate()} 일 ${date.getHours()} 시 ${date.getMinutes()} 분`;
  newSpan2.innerText = type;
  newSpan3.innerText = count + 'btc';

  newDiv.appendChild(newSpan1);
  newDiv.appendChild(newSpan2);
  newDiv.appendChild(newSpan3);

  history.appendChild(newDiv);
};

const graph = (id, openPrice, rsis) => {
  //   let data = [];
  //   console.log(rsis);

  new Chart(document.getElementById('price-chart'), {
    type: 'line',
    data: {
      labels: id,
      datasets: [
        {
          data: openPrice,
          label: 'Bitcoin Price',
          borderColor: '#3e95cd',
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)',
      },
    },
  });

  new Chart(document.getElementById('rsi-chart'), {
    type: 'line',
    data: {
      labels: id,
      datasets: [
        {
          data: rsis,
          label: 'Rsi',
          borderColor: '#8e5ea2',
          fill: false,
        },
      ],
    },
    options: {
      //   title: {
      //     display: true,
      //     text: 'World population per region (in millions)',
      //   },
    },
  });
};
