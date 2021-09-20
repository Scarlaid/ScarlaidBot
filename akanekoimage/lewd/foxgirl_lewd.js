const { Client, Message, MessageEmbed } = require("discord.js");
const akaneko = require('akaneko')

module.exports = {
    name: "hfoxgirl",
    aliases: ['hfg', 'fgh'],
    category: 'lewd',
    utilisation: '{prefix}hfoxgirl',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute: async (client, message, args) => {
      let random = new MessageEmbed()
    .setTitle('Some lewd foxgirl for yall UwU')
    .setImage(await akaneko.nsfw.foxgirl())
    .setColor("RANDOM")
    .setFooter(`Requested by: ${message.author.tag}`)
    .setTimestamp()

     message.channel.send(random)
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    });
  },
};