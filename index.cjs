const { Client, RichPresence, CustomStatus } = require('discord.js-selfbot-v13');
const client = new Client();
const axios = require('axios');
require("dotenv").config();
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
    }, 30000);
});

setInterval(async () => {
    const data = await checkNaverStatus().then(function (result) {
        return result;
    });
    const { liveTitle, liveCategoryValue, concurrentUserCount } = data.data.content;
    const category = liveCategoryValue || '기타';
    const user_count = concurrentUserCount || 'None';
    var preview_image = (data.data.content.liveImageUrl || '').replace('{type}', '1080');
    const user_count_2 = user_count.toLocaleString();
    var image = await RichPresence.getExternal(client, '902717949410955264', `${preview_image}?t=${Date.now()}`,)

    const broadcasting = new CustomStatus(client).setEmoji('✨').setState('치지직 방송중!');
    const broadcast = new RichPresence(client)
        .setApplicationId('902717949410955264')
        .setType('STREAMING')
        .setURL('https://chzzk.naver.com/live/6d395c84c99777272f872171b4dfc122') // If you set a URL, it will automatically change to STREAMING type
        .setState(liveTitle)
        .setName('치지직 스트리머 유아루입니다.')
        .setDetails('치지직 방송중!')
        .setStartTimestamp(Date.now())
        .setAssetsLargeImage(image[0].external_asset_path)
        .setAssetsLargeText(`${category} 하는 중`)
        .setAssetsSmallImage('1212529834027384942') // https://discord.com/api/v9/oauth2/applications/902717949410955264/assets
        .setAssetsSmallText(`${user_count_2}명 시청중...`)
        .setPlatform('desktop')
        .addButton('치지직', 'https://chzzk.naver.com/live/6d395c84c99777272f872171b4dfc122')
        .addButton('트위터', 'http://x.com/chzzk_YuAru/');

    const notbroadcasting = new CustomStatus(client).setEmoji('🎲').setState('뒹굴거리는 중!');
    const notbroadcast = new RichPresence(client)
        .setApplicationId('902717949410955264')
        .setType('PLAYING')
        .setURL('https://chzzk.naver.com/6d395c84c99777272f872171b4dfc122') // If you set a URL, it will automatically change to STREAMING type
        .setState('여러분의 많은 관심과 사랑 부탁드려요~')
        .setName('치지직 스트리머 유아루입니다.')
        .setDetails('놀아줄 사람을 구하고있어요!')
        .setStartTimestamp(Date.now())
        .setAssetsLargeImage('1212529946434609202')
        .setAssetsLargeText('놀아줄거지? 연락해줄거지??')
        .setAssetsSmallImage('1212529834027384942') // https://discord.com/api/v9/oauth2/applications/902717949410955264/assets
        .setAssetsSmallText('치지직')
        .setPlatform('desktop')
        .addButton('치지직', 'https://chzzk.naver.com/6d395c84c99777272f872171b4dfc122')
        .addButton('트위터', 'http://x.com/chzzk_YuAru/');

    if (data.data.content.status == 'OPEN') {
        client.user.setPresence({ afk: true, activities: [broadcasting, broadcast] });
    } else {
        client.user.setPresence({ afk: true, activities: [notbroadcasting, notbroadcast] });
    }
}, 30000);

setTimeout(() => {
    if (!client || !client.user) {
        console.log("Cient didn't logged in.. Killing the process..")
        process.kill(1);
    } else {
        console.log("Client has succesfully logged in!")
    }
}, 30000);

client.login(process.env.TOKEN);