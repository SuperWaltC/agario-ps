const http = require('http');
var express = require('express');
var app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 300000);

const botsettings = require("./botsetting.json");
const Discord = require("discord.js");
const prefix = botsettings.prefix
const forever = require("forever");



const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', () => {
    bot.user.setStatus('unavailable')
    bot.user.setPresence({
        game: {
            name: 'to %help.',
            type: "Listening",
        }
    });
});



bot.on("message", async message => {
		if(message.author.bot) return;
		if(message.channel.type === "dm") return;
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/);
      

		let messageArray = message.content.split(" ");
		let command = messageArray[0];
		

		if(!command.startsWith(prefix)) return;
  
  if(command == prefix+"serverinvite") {
message.reply("The server invite is, https://discord.gg/eKY9cFV. Happy to help. :smiley: ")
}
  
    if(command == prefix+"serverinfo") {
      let embed = new Discord.RichEmbed()
      .setTitle("Server info")
      .addField("Server name", message.guild.name)
      .addField("Server id", message.guild.id)
      .setFooter("Bot by SuperWaltC29#2932")
      .setColor("#00FFF7")
      .addField("mebercount", message.guild.members.size)
      .addField("created at", message.guild.createdAt)
message.channel.send(embed)
}
  
      //command start 
  if(command === `!warn`){ 
    //checks for mentioned user.
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    //If user is not in server.
    if (!dUser) return message.channel.send("Can't find user!")
    if(!message.member.roles.some(r=>["MR"].includes(r.name)) ) return message.reply("Please wait to become a high enough rank. Thanks.")
    //getting message.
    let dMessage = args.join(" ").slice(22);
    //error: no message.
    if(dMessage.length < 1) return message.reply('You must supply a message!')
    //sends DM to mentioned user.
    dUser.send(`${dUser} A moderator from Crisp warned you because: ${dMessage}`)
    //sends DM to user who ran the command.
    message.author.send(`${message.author} You have successfully warned ${dUser}`)
    //command finish
}
  
 if (command === `${prefix}ping`) {
        const m = await message.channel.send("Pong");
        return message.reply("LOL XD got you. The latency is `${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(Discord.Client.ping)}ms`");
    }
  
  
  
  
  
  if(command === `%help`){ 
    //checks for mentioned user.
  
    
    
    let embed = new Discord.RichEmbed() 
      .setTitle("Commands") 
      .addField("!help", "Shows the help menu.") 
      .addField("!ping", "check to see if the bot is responsive.")  
      .addField("!userinfo", "Shows userinfo.")
      .setColor("#FFAA00")
      .setFooter("Bot by SuperWaltC29#2932")
      .addField("!mute", "W.I.P. /Work in progress.")
      .addField("!unmute", "W.I.P. /Work in progress.")
      .addField("!dm", "Used to DM users. HRs ONLY!")
      .addField("!warn", "Used to warn people. MRs+ ONLY!")
      .addField("!serverinfo","shows the server info.")
      .addField("!kick", "Kick the person who you pingged.")
      .addField("!ban", "Ban the person who you pingged.")
    message.author.send(embed)
    message.reply("A list of commands has been sent to you.")
                
    //command finish
  }
    if(command === `${prefix}ban`) {
      if(!message.member.roles.some(r=>["HR"].includes(r.name)) ) return message.reply("Please wait to become a high enough rank. Thanks.")
        // Easy way to get member object though mentions.
        var member = message.mentions.members.first();

        // Check if a member was actually tagged
        if (!member) {
            return message.reply("Please tag a user!");
            return;
        }

        // Kick
        member.ban().then((member) => {
            // Successmessage
            return message.reply("You have banned " + member.displayName + ", keep a :zipper_mouth: and tell no one.");
        }).catch(() => {
            // Failmessage
            return message.reply("Access Denied");
        });
    }
  
      if(command === `${prefix}kick`) {
      if(!message.member.roles.some(r=>["MR"].includes(r.name)) ) return message.reply("Please wait to become a high enough rank. Thanks.")
        // Easy way to get member object though mentions.
        var member = message.mentions.members.first();

        // Check if a member was actually tagged
        if (!member) {
            return message.reply("Please tag a user!");
            return;
        }

        // Kick
        member.kick().then((member) => {
            // Successmessage
            return message.reply("You have kicked " + member.displayName + ", keep a :zipper_mouth: and tell no one.");
        }).catch(() => {
            // Failmessage
            return message.reply("Access Denied");
        });
    }

    //command start 
  if(command === `!dm`){ 
    //checks for mentioned user.
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    //If user is not in server.
    if (!dUser) return message.channel.send("Can't find user!")
    //If user is in the server, looks if user has the role. If not, cancell the command.
    if(!message.member.roles.some(r=>["HR"].includes(r.name)) ) return message.reply("Please wait to become a high enough rank. Thanks.")
    //getting message.
    let dMessage = args.join(" ").slice(22);
    //error: no message.
    if(dMessage.length < 1) return message.reply('You must supply a message!')
    //sends DM to mentioned user.
    dUser.send(`${dUser} A moderator from Crisp sent you: ${dMessage}`)
    //sends DM to user who ran the command.
    message.author.send(`${message.author} You have sent your message to ${dUser}`)
    //command finish
}

    //command start
		if(command === `${prefix}userinfo`) {
      //checks the command being ran
			let embed = new Discord.RichEmbed()
      //makes a new embed
			.setAuthor(message.author.username)
      //gets the username of the person/user who ran the command
			.setDescription("This is the user's info!")
      //The title
			.setColor("#00FFF7")
      //color of the side
			.addField("Full username", `${message.author.username}#${message.author.discriminator}`)
			//username of the person who ran the command
      .addField("ID", message.author.id)
      //So nobody takes the bot and it is branded.
      .setFooter("Bot by SuperWaltC29#2932")
      //id of the user
			.addField("Created At", message.author.createdAt);
      //when the account was created
      //sends the embed
			message.channel.send(embed);

			return;
      //command finished
		}
  
  
  

  
		
  
  
  
  
	});


bot.login(process.env.TOKEN);
  
