const fs = require('fs');
const discord = require('discord.js');
const conf = require("./config/bot");
const request = require("request");

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');
const bot = require('./config/bot.js');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();
client.akanekoimage = new discord.Collection();
client.helpanel = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

fs.readdirSync('./akanekoimage').forEach(dirs => {
  const akanekoimage = fs.readdirSync(`./akanekoimage/${dirs}`).filter(files => files.endsWith('.js'));

  for (const file of akanekoimage) {
      const akanekoimage = require(`./akanekoimage/${dirs}/${file}`);
      console.log(`Loading command ${file}`);
      client.akanekoimage.set(akanekoimage.name.toLowerCase(), akanekoimage);
  };
});

fs.readdirSync('./helpanel').forEach(dirs => {
  const helpanel = fs.readdirSync(`./helpanel/`).filter(files => files.endsWith('.js'));

  for (const file of helpanel) {
      const helpanel = require(`./helpanel/${file}`);
      console.log(`Loading command ${file}`);
      client.helpanel.set(helpanel.name.toLowerCase(), helpanel);
  };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

//login with token
client.login(client.config.discord.token);
//bot status
client.on("ready", () => {
    client.user.setActivity(`Scarlaid updating`, { type: "WATCHING" });
  });
//say deletion after execute
client.on('message', message => {
    if (message.content.startsWith(`${client.config.discord.prefix}say `)) {
       message.delete({ timeout: 50 });;
    }
 });
//Welcome on startup
client.on("ready", () => {
    var channel1 = client.channels.cache.get("612244287601770498");
    channel1.send("Bot is up, have fun using it. [-!help] for commands")
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
});

//triggers on messages
client.on("message", message => {
    //if its a message from a bot, quit
    if (message.author.bot) return;
    //if it doesnt have the prefix, quit
    if (message.content.indexOf(client.config.discord.prefix) !== 0) return;
    //splits the message into the command and arguements
    const args = message.content.slice(client.config.discord.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    //Pulls Suisei post from Danbooru
    if (command === 'suisei') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Hoshimachi_Suisei+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }

    //Pulls Sora post from Danbooru
    if (command === 'sora') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Tokino_Sora+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Roboco post from Danbooru
    if (command === 'roboco') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Roboco-san+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }

    //Pulls Miko post from Danbooru
    if (command === 'Miko') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Sakura_Miko+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }

    //Pulls AZKi post from Danbooru
    if (command === 'azki') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=AZKi+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }

    //Pulls Mel post from Danbooru
    if (command === 'mel') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Yozora_Mel+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Fubuki post from Danbooru
    if (command === 'fubuki') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Shirakami_Fubuki+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Matsuri post from Danbooru
    if (command === 'matsuri') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Natsuiro_Matsuri+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Rosenthal post from Danbooru
    if (command === 'rosenthal') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Aki_Rosenthal+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Haato post from Danbooru
    if (command === 'haato') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Akai_Haato+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Chris post from Danbooru
    if (command === 'chris') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Hitomi_Chris+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Aqua post from Danbooru
    if (command === 'aqua') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Minato_Aqua+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Shion post from Danbooru
    if (command === 'shion') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Murasaki_Shion+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Ayame post from Danbooru
    if (command === 'ayame') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Nakiri_Ayame+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Choco post from Danbooru
    if (command === 'choco') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Yuzuki_Choco+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Subaru post from Danbooru
    if (command === 'subaru') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Oozora_Subaru+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Mio post from Danbooru
    if (command === 'mio') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Ookami_Mio+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Okayu post from Danbooru
    if (command === 'okayu') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Nekomata_Okayu+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Korone post from Danbooru
    if (command === 'korone') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Inugami_Korone+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Pekora post from Danbooru
    if (command === 'pekora') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Usada_Pekora+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Rushia post from Danbooru
    if (command === 'rushia') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Uruha_Rushia+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Flare post from Danbooru
    if (command === 'flare') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Shiranui_Flare+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Noel post from Danbooru
    if (command === 'noel') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Shirogane_Noel+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Marine post from Danbooru
    if (command === 'marine') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Houshou_Marine+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Kanata post from Danbooru
    if (command === 'kanata') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Amane_Kanata+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Watame post from Danbooru
    if (command === 'watame') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Tsunomaki_Watame+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Towa post from Danbooru
    if (command === 'towa') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Tokoyami_Towa+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Luna post from Danbooru
    if (command === 'luna') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Himemori_Luna+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Coco post from Danbooru
    if (command === 'coco') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Kiryu_Coco+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Lamy post from Danbooru
    if (command === 'lamy') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Yukihana_Lamy+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Nene post from Danbooru
    if (command === 'nene') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Momosuzu_Nene+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Botan post from Danbooru
    if (command === 'botan') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Shishiro_Botan+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Polka post from Danbooru
    if (command === 'polka') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Omaru_Polka+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Aloe post from Danbooru
    if (command === 'aloe') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Mano_Aloe+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Risu post from Danbooru
    if (command === 'risu') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Ayunda_Risu+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Moona post from Danbooru
    if (command === 'moona') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Moona_Hoshinova+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Airani post from Danbooru
    if (command === 'airani') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Airani_lofifteen+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Ollie post from Danbooru
    if (command === 'ollie') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Kureiji_Ollie+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Anya post from Danbooru
    if (command === 'anya') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Anya_Melfissa+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Reine post from Danbooru
    if (command === 'reine') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Pavolia_Reine+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Calliope post from Danbooru
    if (command === 'calliope') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Mori_Calliope+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Kiara post from Danbooru
    if (command === 'kiara') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Takanashi_Kiara+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Ina post from Danbooru
    if (command === 'ina') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=ninomae_ina%27nis+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Gura post from Danbooru
    if (command === 'gura') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Gawr_Gura+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Amelia post from Danbooru
    if (command === 'amelia') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Watson_Amelia+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls IRyS post from Danbooru
    if (command === 'irys') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=IRyS+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Sana post from Danbooru
    if (command === 'sana') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Ceres_Fauna+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Kronii post from Danbooru
    if (command === 'kronii') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Ouro_Kronii+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Mumei post from Danbooru
    if (command === 'mumei') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Nanashi_Mumei+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Baelz post from Danbooru
    if (command === 'baelz') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Hakos_Baelz+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Yogiri post from Danbooru
    if (command === 'yogiri') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=yogiri_%28hololive%29+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Civia post from Danbooru
    if (command === 'civia') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=civia+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Spade post from Danbooru
    if (command === 'spade') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Spade_Echo+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Doris post from Danbooru
    if (command === 'doris') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Doris_%28hololive%29+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Rosalyn post from Danbooru
    if (command === 'rosalyn') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=Rosalyn_%28hololive%29+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    //Pulls Artia post from Danbooru
    if (command === 'artia') {
      switch (message.channel.nsfw) {
        //auto nsfw
        case true:
          var rating = "e";
          break;
        case false:
          var rating = "s";
          break;
      }
      //changes aruments into a string
      let strargs = args.toString();
      //replaces every comma into a plus in the string
      let newargs = strargs.replace(/,/g, '+');
      //pulls post from api and sends it
      require("request")("https://danbooru.donmai.us/posts.json?limit=1&tags=artia+order%3Arandom" + "+" + newargs,
        function(err, res, body) {
          let data = JSON.parse(body);
          if (data['0'] !== undefined) {
            message.channel.send(data['0'].file_url)
            .then(msg => {msg.delete({ timeout: 50000 })
            });
          } else {
            // danbooru restrics its api to two tags
            message.channel.send(`:x: - No post were found`)
            .then(msg => {msg.delete({ timeout: 15000 })
            });
          }
        });
    }
    if (message.content.startsWith(client.config.discord.prefix + "eval")) {
      if (message.author.id !== client.config.discord.ownerID) return;
      try {
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        message.channel.send(clean(evaled), {
          code: "xl"
        });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  });
