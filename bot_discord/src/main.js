require('dotenv').config({path: __dirname + '/../.env'});
const axios = require('axios');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.content === '!cesi') {
        const response = await axios.get(`http://localhost:3000`);
        console.log(response.data[0][0]);
        msg.reply(JSON.stringify(response.data[0][0]));
    }
});
console.log(process.env);
client.login(process.env.BOT_TOKEN);
