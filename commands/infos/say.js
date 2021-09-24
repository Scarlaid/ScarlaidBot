const discord = require('discord.js'); 

module.exports = {
    name: "say",
    aliases: ['copy'],
    category: 'Infos',
    utilisation: '{prefix}say',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   execute(client, message, args) {
    //Help panned if execute blank    
      if (message.content === `${client.config.discord.prefix}say`) { 
        const sayembed = new discord.MessageEmbed()
        sayembed.setColor('94e044')    
        sayembed.setTitle('Hỗ trợ')
        sayembed.setDescription('-say [tin nhắn của bạn ở đây]. \nExample: `-say Hotomeshiki is gei`\n⠀\nKèm ảnh bạn không nên để trống tin nhắn, hãy thêm "."')
        sayembed.setThumbnail(`${client.user.displayAvatarURL({ size: 1024, dynamic: true})}`);
        sayembed.setTimestamp()
        sayembed.setFooter(`Requested by: ${message.author.tag}`)
        message.channel.send(sayembed)
        .then(msg => {msg.delete({ timeout: 12000 })
      });
    }
    //Send message with attachment
    else {
        var uMsg = message.content.replace(`${client.config.discord.prefix}say `, '');

        // Get channel //
        var channelS = client.channels.cache.get(message.channel.id)

        // Detect message content //
        var uMsg = message.content.replace(`${client.config.discord.prefix}say `, '');
        
        //Define message embed //
        const msg=new discord.MessageEmbed();
        // Setting up the embed //
        let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null

        msg.setAuthor(`${message.author.tag}`, message.client.guilds.resolve(message.guild.id).members.resolve(message.author.id).user.avatarURL({ format : 'jpg', dynamic: true }));
        msg.setDescription(`${uMsg}`);
        msg.setTimestamp();
        msg.setColor(`${message.member.displayHexColor}`);
        msg.setFooter(`Requested by: ${message.author.tag}`)
        if (messageAttachment) msg.setImage(messageAttachment);
        channelS.send(msg)
        .then(msg => {msg.delete({ timeout: 300000 })
      });
       }
    }
};