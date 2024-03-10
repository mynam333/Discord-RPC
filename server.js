///////////////////////////
// Aayu5h and Sahil
// https://discord.gg/uepgJzsf6n
// https://spicydevs.me/
///////////////////////////

const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          text-align: center;
          padding: 100px;
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>유아루 Discord RPC</h1>
      <p> </p>
      <p>모니터링용 페이지입니다!</p>
    </body>
    </html>
  `);
});

function keepAlive() {
  server.listen(3000, async () => {
    console.log("Server Online ✅!!");
  });
}

module.exports = keepAlive;

///////////////////////////
// Aayu5h and Sahil
// https://discord.gg/uepgJzsf6n
// https://spicydevs.me/
///////////////////////////
