const { Client, Message, MessageEmbed } = require("discord.js");
const akaneko = require('akaneko')

module.exports = {
    name: "foxgirl",
    aliases: ['fg'],
    category: 'sfw',
    utilisation: '{prefix}foxgirl',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute: async (client, message, args) => {
      let random = new MessageEmbed()
    .setTitle('Some foxgirl for yal UwU')
    .setImage(await akaneko.foxgirl())
    .setColor("RANDOM")
    .setFooter(`Requested by: ${message.author.tag}`)
    .setTimestamp()

     message.channel.send(random)
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    });
  },
};