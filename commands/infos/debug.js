module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}debug',

    execute(client, message) {
        message.channel.send(`${client.user.username} kết nối đến **${client.voice.connections.size}** kênh`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};