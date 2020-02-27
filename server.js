var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);

let timeId = null;

const db = [
  { isin: "DE000BASF111", price: 240.32, bid: 240.31, ask: 241.31 },
  { isin: "DE000BASF112", price: 240.33, bid: 240.32, ask: 241.32 },
  { isin: "DE000BASF113", price: 240.34, bid: 240.33, ask: 241.33 },
  { isin: "DE000BASF114", price: 240.35, bid: 240.34, ask: 241.34 },
  { isin: "DE000BASF115", price: 240.36, bid: 240.35, ask: 241.35 }
];

app.use(function(req, res, next) {
  req.testing = "testing";
  return next();
});

app.get("/", function(req, res, next) {
  res.end();
});

app.ws("/", function(ws, req) {
  ws.on("close", function(req) {
    ws.close();
  });

  ws.on("message", function(msg) {
    const data = JSON.parse(msg);

    if (data.subscribe) {
      clearInterval(timeId);

      timeId = setInterval(() => {
        const isin = db.filter(({ isin }) => {
          return data.subscribe === isin;
        });

        ws.send(JSON.stringify(isin[0]));
      }, 3000);
    }

    if (data.unsubscribe) {
      clearInterval(timeId);
    }
  });
});

app.listen(8080);
