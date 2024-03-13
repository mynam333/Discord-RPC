
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
      return response;
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

setInterval(async () => {
  const rawdata = await checkNaverStatus();
  const data = rawdata.json()
  const { status, liveTitle, liveCategoryValue, concurrentUserCount, channel } = data.content;
  const category = liveCategoryValue || '기타';
  const user_count = concurrentUserCount || 'None';
  const channel_name = channel ? channel.channelName || 'None' : 'None';
  const channel_image = channel ? (channel.channelImageUrl || "https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na") : "https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na";
  const preview_image = (data.content.liveImageUrl || '').replace('{type}', '1080');
  const user_count_2 = user_count.toLocaleString();
  const image = await Discord.RichPresence.getExternal(client,'1212531074417303573',preview_image,preview_image)
  const broadcasting = new Discord.CustomStatus(client).setEmoji('✨').setState('치지직 방송중!');
  const nope = new Discord.CustomStatus(client).setEmoji('🎲').setState('뒹굴거리는 중!');
  const r1 = new Discord.RichPresence(client)
    .setApplicationId("1212531074417303573")
    .setType("STREAMING") // PLAYING, STREAMING
    .setURL(`https://chzzk.naver.com/live/6d395c84c99777272f872171b4dfc122`)
    .setState(liveTitle)
    .setName(config.Name)
    .setDetails('치지직에서 방송중입니다!')
    .setAssetsLargeImage(image[0].external_asset_path)
    .setAssetsLargeText(`${category} 하는 중`)
    .setAssetsSmallImage(config.SmallImage)
    .setAssetsSmallText(`${user_count_2}명 시청중...`)
    .addButton(config.FirstButtonName, config.FirstButtonUrl)
    .addButton(config.SecondButtonName, config.SecondButtonUrl);

  const r2 = new Discord.RichPresence(client)
    .setApplicationId("1212531074417303573")
    .setType("PLAYING") // PLAYING, STREAMING
    .setURL("https://chzzk.naver.com/6d395c84c99777272f872171b4dfc122")
    .setState(config.State)
    .setName(config.Name2)
    .setDetails(config.Details2)
    .setAssetsLargeImage(config.LargeImage2)
    .setAssetsLargeText(config.LargeText2)
    .setAssetsSmallImage(config.SmallImage2)
    .setAssetsSmallText(config.SmallText2)
    .addButton(config.FirstButtonName2, config.FirstButtonUrl2)
    .addButton(config.SecondButtonName2, config.SecondButtonUrl2);

  if (await checkNaverStatus().data.content.status == 'OPEN') {
    client.user.setPresence({ activities: [r1, broadcasting] });
  } else {
    client.user.setPresence({ activities: [r2, nope] });
  }
}, 15000); // Update every 15 seconds

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
