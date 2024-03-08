
///////////////////////////
// Aayu5h and Sahil
// https://discord.gg/uepgJzsf6n
// https://spicydevs.me/
///////////////////////////

const axios = require('axios');
const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
};

async function checkNaverStatus() {
  try {
    const response = await axios.get("https://api.chzzk.naver.com/service/v2/channels/6d395c84c99777272f872171b4dfc122/live-detail", { headers: headers });
    if (response.status === 200) {
      return response.data.content.status;
    } else {
      console.log(`Error Status code: ${response.status}\nResponse: ${response.data}`);
      return null;
    }
  } catch (error) {
    console.error('Error:', error)
  }
};

const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});
require("dotenv").config();
const config = require("./config.js");
function validateConfig(config) {
  const requiredFields = [
    "showTime",
    "token",
    "timeZone",
    "Name",
    "State",
    "Details",
    "FirstButtonName",
    "FirstButtonUrl",
    "SecondButtonName",
    "SecondButtonUrl",
    "LargeImage",
    "LargeText",
    "SmallImage",
    "SmallText",
  ];

  const missingFields = requiredFields.filter((field) => !config[field]);

  if (missingFields.length > 0) {
    console.error(`Config is not filled properly. Missing fields: ${missingFields.join(", ")}`);
    process.exit(1); // Exit the process with an error code
  }
}
let showTime = config.showTime;

client.on("ready", async () => {
  var AsciiTable = require("ascii-table");
  var table = new AsciiTable();
  table.setBorder("❘", "─", "✾", "❀");
  table.setTitle(`Logged In As ${client.user.username}!`);
  table
    .addRow(`Node.js`, `${process.version}`)
    .addRow(
      `Memory`,
      `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(
        process.memoryUsage().rss /
        1024 /
        1024
      ).toFixed(2)} MB`
    );

  setTimeout(() => {
    console.log(table.toString());
  }, 3000);
});

setInterval(() => {
  const broadcasting = new Discord.CustomStatus(client).setEmoji('✨').setState('치지직 방송중!');
  const nope = new Discord.CustomStatus(client).setEmoji('🎲').setState('뒹굴거리는 중!');

  const r1 = new Discord.RichPresence(client)
    .setApplicationId("1212531074417303573")
    .setType("STREAMING") // PLAYING, STREAMING
    .setURL("https://chzzk.naver.com/6d395c84c99777272f872171b4dfc122")
    .setState("현재 방송중입니다!!")
    .setName(config.Name)
    .setDetails(config.Details)
    .setAssetsLargeImage(config.LargeImage)
    .setAssetsLargeText(config.LargeText)
    .setAssetsSmallImage(config.SmallImage)
    .setAssetsSmallText(config.SmallText)
    .addButton(config.FirstButtonName, config.FirstButtonUrl)
    .addButton(config.SecondButtonName, config.SecondButtonUrl);

  const r2 = new Discord.RichPresence(client)
    .setApplicationId("1212531074417303573")
    .setType("PLAYING") // PLAYING, STREAMING
    .setURL("https://chzzk.naver.com/6d395c84c99777272f872171b4dfc122")
    .setState(config.State)
    .setName(config.Name)
    .setDetails(config.Details)
    .setAssetsLargeImage(config.LargeImage)
    .setAssetsLargeText(config.LargeText)
    .setAssetsSmallImage(config.SmallImage)
    .setAssetsSmallText(config.SmallText)
    .addButton(config.FirstButtonName, config.FirstButtonUrl)
    .addButton(config.SecondButtonName, config.SecondButtonUrl);

  if (checkNaverStatus() == 'OPEN') {
    broadcasting
    client.user.setPresence({ activities: [r1, broadcasting] });
  } else {
    nope
    client.user.setPresence({ activities: [r2, nope] });
  }
}, 15000); // Update every 15 seconds


function formatTime() {
  const date = new Date();
  const options = {
    timeZone: config.timeZone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const time = new Intl.DateTimeFormat("en-US", options).format(date);
  const timeWithSeparator = time.replace(" ", " | "); // This is the time and date separator, don't touch, just use '|'
  return timeWithSeparator;
}
setTimeout(() => {
  if (!client || !client.user) {
    console.log("Cient didn't logged in.. Killing the process..")
    process.kill(1);
  } else {
    console.log("Client has succesfully logged in!")
  }
}, 1 * 1000 * 20);
const keepAlive = require("./server.js");
keepAlive();
client.login(
  config.token
);

///////////////////////////
// Aayu5h and Sahil
// https://discord.gg/uepgJzsf6n
// https://spicydevs.me/
///////////////////////////
