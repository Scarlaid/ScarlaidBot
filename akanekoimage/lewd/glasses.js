const { Client, Message, MessageEmbed } = require("discord.js");
const akaneko = require('akaneko')

module.exports = {
    name: "glasses",
    aliases: ['glg', 'glass'],
    category: 'lewd',
    utilisation: '{prefix}glassesgirl',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute: async (client, message, args) => {
      let random = new MessageEmbed()
    .setTitle('Hows my glasses?~')
    .setImage(await akaneko.nsfw.glasses())
    .setColor("RANDOM")
    .setFooter(`Requested by: ${message.author.tag}`)
    .setTimestamp()

     message.channel.send(random)
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    });
  },
};