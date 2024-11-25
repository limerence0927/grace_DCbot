// index.js
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const path = require('path');
const fs = require('fs');

// 創建一個新的 Client 實例
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ] 
});

// 當機器人啟動時執行
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// 載入並設置所有的 "cog" 模組
function loadCog(cogName) {
    try {
        const cogPath = path.join(__dirname, 'cogs', `${cogName}.js`);
        if (fs.existsSync(cogPath)) {
            const cog = require(cogPath);
            cog.setup(client);  // 調用每個模組的 setup 方法
            console.log(`Cog ${cogName} loaded.`);
        } else {
            console.error(`Cog file for "${cogName}" not found at path ${cogPath}`);
        }
    } catch (error) {
        console.error(`Error loading cog "${cogName}":`, error);
    }
}

// 加載所有的 cogs
const cogs = ['autoReplies', 'guessNumber', 'choiceSelector', 'deleteMess'];  
cogs.forEach(loadCog);

// 登入 Discord
client.login(token);
