const { MessageAttachment } = require("discord.js");
const help = require("../commands/core/help");

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.discord.prefix;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);

    const akanekoimage = client.akanekoimage.get(command) || client.akanekoimage.find(akanekoimage => akanekoimage.aliases && akanekoimage.aliases.includes(command));

    if (akanekoimage) akanekoimage.execute(client, message, args);

    const helpanel = client.helpanel.get(command) || client.helpanel.find(helpanel => helpanel.aliases && helpanel.aliases.includes(command));

    if (helpanel) helpanel.execute(client, message, args);

};