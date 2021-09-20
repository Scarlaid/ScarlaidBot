module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}filter [filter name]',

    execute(client, message, args) {
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

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Hãy chọn một filter phù hợp để `)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`${client.emotes.error} - Filter không tồn tại, hãy thử lại với filter phù hợp. Ví dụ: 8D, vibrato, pulsator...`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${client.emotes.music} - I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
        else message.channel.send(`${client.emotes.music} - I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};