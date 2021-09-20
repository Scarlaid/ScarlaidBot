const { Client, Message, MessageEmbed } = require("discord.js");
const akaneko = require('akaneko')

module.exports = {
    name: "yuri",
    aliases: ['yr'],
    category: 'lewd',
    utilisation: '{prefix}yuri',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute: async (client, message, args) => {
      let random = new MessageEmbed()
    .setTitle('We all love girls, eh~')
    .setImage(await akaneko.nsfw.yuri())
    .setColor("RANDOM")
    .setFooter(`Requested by: ${message.author.tag}`)
    .setTimestamp()

     message.channel.send(random)
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    });
  },
};