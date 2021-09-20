module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            color: 'BLUE',
            author: { name: `Đã tìm thấy **${query}**` },
            footer: { text: 'Powered by Scarlaid' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    })
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};