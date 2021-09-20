const { Client, Message, MessageEmbed } = require("discord.js");
const akaneko = require('akaneko')

module.exports = {
    name: "zettaiRyouiki",
    aliases: ['zt', 'ztR', 'ztr'],
    category: 'lewd',
    utilisation: '{prefix}zettai',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute: async (client, message, args) => {
      let random = new MessageEmbed()
    .setTitle('Can say you are horny(ly) sanwiched~')
    .setImage(await akaneko.nsfw.zettaiRyouiki())
    .setColor("RANDOM")
    .setFooter(`Requested by: ${message.author.tag}`)
    .setTimestamp()

     message.channel.send(random)
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    });
  },
};