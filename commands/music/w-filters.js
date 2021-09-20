module.exports = {
    name: 'w-filters',
    aliases: ['filters'],
    category: 'Music',
    utilisation: '{prefix}w-filters',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Bot đang được sử dụng ở một kênh khác!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Không có nhạc nào đang được phát!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        const filtersStatuses = [[], []];

        client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? client.emotes.success : client.emotes.off));
        });

        message.channel.send({
            embed: {
                color: 'ORANGE',
                footer: { text: 'Powered by Scarlaid' },
                fields: [
                    { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `List of all filters enabled or disabled.\nUse \`${client.config.discord.prefix}filter\` to add a filter to a song.`,
            },
        })
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};