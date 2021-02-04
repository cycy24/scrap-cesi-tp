require('dotenv').config({path: __dirname + '/../.env'});

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});
console.log(process.env);
client.login(process.env.BOT_TOKEN);
