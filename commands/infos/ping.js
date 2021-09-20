module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`Ping: **${client.ws.ping}ms**`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};