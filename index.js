require("dotenv").config();
const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});
require("dotenv").config();
const config = require("./config.js");



client.on('ready', async (c) => {
  console.log(`✅ ${c.user.tag} 디스코드 RPC 시작 `)
  
  const channel_id = '6d395c84c99777272f872171b4dfc122'
  const url = `https://api.chzzk.naver.com/service/v2/channels/${channel_id}/live-detail`

  activity(url, channel_id);

  setInterval(() => {
      activity(url, channel_id);
  }, 15000);
})

const keepAlive = require("./server.js");
keepAlive();
client.login(config.token);

async function activity(url, channel_id) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data && data.content) {
                const { status, liveTitle, liveCategoryValue, concurrentUserCount, channel } = data.content;
                if (status == 'OPEN') {
                    const category = liveCategoryValue || '기타';
                    const user_count = concurrentUserCount || 'None';
                    const channel_name = channel ? channel.channelName || 'None' : 'None';
                    const channel_image = channel ? (channel.channelImageUrl || "https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na") : "https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na";
                    const preview_image = (data.content.liveImageUrl || '').replace('{type}', '1080');
                    const user_count_2 = user_count.toLocaleString();
                    const state = new Discord.CustomStatus(client).setEmoji('✨').setState('치지직 방송중!');
                    const image = await Discord.RichPresence.getExternal(client,'1212531074417303573',preview_image,preview_image)
                    const rpc = new Discord.RichPresence(client)
                        .setApplicationId("1212531074417303573")
                        .setType("STREAMING") // PLAYING, STREAMING
                        .setURL(`https://chzzk.naver.com/live/${channel_id}`)
                        .setState(liveTitle)
                        .setName(config.Name)
                        .setDetails('치지직에서 방송중입니다!')
                        .setAssetsLargeImage(image[0].external_asset_path)
                        .setAssetsLargeText(`${category} 하는 중`)
                        .setAssetsSmallImage(config.SmallImage)
                        .setAssetsSmallText(`${user_count_2}명 시청중...`)
                        .addButton(config.FirstButtonName, config.FirstButtonUrl)
                        .addButton(config.SecondButtonName, config.SecondButtonUrl);
                    client.user.setPresence({ activities: [state,rpc]})
                }
                else{
                    const state = new Discord.CustomStatus(client).setEmoji('🎲').setState('뒹굴거리는 중!');
                    const rpc = new Discord.RichPresence(client)
                        .setApplicationId("1212531074417303573")
                        .setType("PLAYING") // PLAYING, STREAMING
                        .setURL(`https://chzzk.naver.com/${channel_id}`)
                        .setState(config.State)
                        .setName(config.Name2)
                        .setDetails(config.Details2)
                        .setAssetsLargeImage(config.LargeImage2)
                        .setAssetsLargeText(config.LargeText2)
                        .setAssetsSmallImage(config.SmallImage2)
                        .setAssetsSmallText(config.SmallText2)
                        .addButton(config.FirstButtonName2, config.FirstButtonUrl2)
                        .addButton(config.SecondButtonName2, config.SecondButtonUrl2);
                    client.user.setPresence({ activities: [state,rpc]})
                }
            }
        } else {
            console.error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await new Promise(resolve => setTimeout(resolve, 3000));
        activity(url, channel_id);
    }
}

