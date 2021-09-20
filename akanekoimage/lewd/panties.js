const { Client, Message, MessageEmbed } = require("discord.js");
const akaneko = require('akaneko')

module.exports = {
    name: "pantsu",
    aliases: ['pantsu' , 'psu' , 'ptsu'],
    category: 'lewd',
    utilisation: '{prefix}psu',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute: async (client, message, args) => {
      let random = new MessageEmbed()
    .setTitle('Nooo, stop looking at my panties uwaaa~')
    .setImage(await akaneko.nsfw.panties())
    .setColor("RANDOM")
    .setFooter(`Requested by: ${message.author.tag}`)
    .setTimestamp()

     message.channel.send(random)
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    });
  },
};