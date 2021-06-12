# 도커 pg 접속

docker exec -it <컨테이너아이디> bash
psql -U pro4

# pg 테이블 확인

\d

# 유저 넣기

> 초기자산 10만 달러

INSERT INTO users (email, password, wallet) values ('test@gmail.com', 'test', 100000);

# csv 넣기

> copy 테이블명(id, field1, field 2) from 'C:\test.csv' with delimiter ',' csv header;

- 5.csv
  \COPY prices(time, count, open, high, low, close, volume, vwap) from '../5.csv' WITH (FORMAT CSV, DELIMITER ',');
- 6.csv
  \COPY prices(time, count, open, high, low, close, volume, vwap) from '../6.csv' WITH (FORMAT CSV, DELIMITER ',');

# routes

## static

- 프론트 보기

  url : "http://localhost:3333"

## user

- 유저 전체 보기

  "GET /user"

- 특정 시점에서 손익률

  "GET /user/rate/:id"

## trade

- 코인 매수

  POST /trade/buy

  (Body : {
  "id": number,
  "count": number
  })

- 코인 매도

  POST /trade/sell

  (Body : {
  "id": number,
  "count": number
  })

- 전체 거래내역

  GET /trade

## price

- 전체 가격보기

  GET /price

- 특정 시점 가격보기

  GET /price/:id

- 특정 시점 RSI 보기

  POST /price/:id

  <!-- (Body : {
  "id": number,
  }) -->

# RSI 지수

## 매수 시그널

- 68 180 181

## 매도 시그널

- 121 122 123 124 125 126 127 128 129 130 151 152 255 256 257
