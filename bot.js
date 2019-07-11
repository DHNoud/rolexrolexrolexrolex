const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '$'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`Rolex .`,"http://twitch.tv/S-F")
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});


client.on('message', message => {
    var prefix = "$";
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " +prefix+ "move [USER]``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك✅ `)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("``لا تستطيع سحب "+ message.mentions.members.first() +" `يجب ان يكون هذه العضو في روم صوتي`")
}
} else {
 message.channel.send("**``يجب ان يكون العضو في روم صوتي ``**")
}
} else {
message.react("❌")
 }}});



client.on('message', message => {
    if (message.content.startsWith("$banlist")) {
        message.guild.fetchBans()
        .then(bans => message.channel.send(`${bans.size} عدد المحظورين في السيرفر `))
  .catch(console.error);
}
});

client.on('message',async message => {
	let prefix = '$';
  if(message.content.startsWith(prefix + "setvoice")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel(`Voice Online :  ${message.guild.members.filter(m => m.voiceChannel).size} ` , 'voice').then(c => {
    console.log(`Voice online channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`Voice Online :  ${message.guild.members.filter(m => m.voiceChannel).size} `)
    },1000);
  });
  }
}); 


	
client.on('message', message => {
        var prefix = '$'; // هنا تقدر تغير البرفكس
	var command = message.content.split(" ")[0];
	if(command == prefix + 'bc') { // الكوماند !bc
		var args = message.content.split(' ').slice(1).join(' ');
		if(message.author.bot) return;
		if(!args) return message.channel.send(`**➥ Useage:** ${prefix}bc كلامك`);
		
		let bcSure = new Discord.RichEmbed()
		.setTitle(`:mailbox_with_mail: **هل انت متأكد انك تريد ارسال رسالتك الى** ${message.guild.memberCount} **عضو**`)
		.setThumbnail(client.user.avatarURL)
		.setColor('RANDOM')
		.setDescription(`**\n:envelope: ➥ رسالتك**\n\n${args}`)
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)
		
		message.channel.send(bcSure).then(msg => {
			msg.react('✅').then(() => msg.react('❎'));
			message.delete();
			
			
			let yesEmoji = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
			let noEmoji = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
			
			let sendBC = msg.createReactionCollector(yesEmoji);
			let dontSendBC = msg.createReactionCollector(noEmoji);
			
			sendBC.on('collect', r => {
				message.guild.members.forEach(member => {
					member.send(args.replace(`[user]`, member)).catch();
					if(message.attachments.first()){
						member.sendFile(message.attachments.first().url).catch();
					}
				})
				message.channel.send(`:timer: **يتم الان الارسال الى** \`\`${message.guild.memberCount}\`\` **عضو**`).then(msg => msg.delete(5000));
				msg.delete();
			})
			dontSendBC.on('collect', r => {
				msg.delete();
				message.reply(':white_check_mark: **تم الغاء ارسال رسالتك بنجاح**').then(msg => msg.delete(5000));
			});
		})
	}
});

client.on('message', message => {
 let prefix = "$";
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "say") {
   message.channel.sendMessage(args.join("  "))
   message.delete()
  }
 });




client.on('message', message => { //invite
   let prefix = "$";
    if (message.content.startsWith(prefix + "رابط")) {
     if(!message.channel.guild) return;
if (message.author.bot) return;
        message.channel.createInvite({
        thing: true,
        maxUses: 10,
        maxAge: 10800
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const Embed11 = new Discord.RichEmbed()
        .setColor("#5016f3")
        .setDescription("مدة الرابط : 3 ساعات , عدد الأستخدامات : 10")
   .setFooter("Rolex ") 
                   .setTimestamp()
                message.channel.send('** تم أرسال الرابط في الخاص **').then(msg => msg.delete(3000));


      message.channel.sendEmbed(Embed11).then(message => {message.delete(3000)})
      message.author.sendEmbed(Embed11)
    }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
         client.on('message', message => {
            if (message.content === 'تشتغل ؟') {
              message.channel.send('**آيه افا عليك :thumbsup::skin-tone-2: **').then(msg => msg.delete(5000));
              message.channel.sendFile("./photoshop.PNG");
               

            }
});

	
client.on('message', message => {
    if(!message.channel.guild) return;
if (message.content.startsWith('$ping')) {
if(!message.channel.guild) return;
var msg = `${Date.now() - message.createdTimestamp}`
var api = `${Math.round(client.ping)}`
if (message.author.bot) return;
let embed = new Discord.RichEmbed()
.setAuthor(message.author.username,message.author.avatarURL)
.setColor('RANDOM')
.addField('**Time Taken:**',msg + " ms 📶 ")
.addField('**WebSocket:**',api + " ms 📶 ")
message.channel.send({embed:embed});
}
});


client.on('message' , najzx => {
          var prefix = "$";
          if(najzx.author.bot) return;
         
          if(najzx.content.startsWith(prefix + "rolebc")) {
            if (!najzx.member.hasPermission("ADMINISTRATOR"))  return;
            let args = najzx.content.split(" ").slice(1);
         
            if(!args[0]) {
              najzx.channel.send("قم بمنشنة الرتبة | +rolebc @everyone الرساله")
                return;
            }
            if(!args[1]) {
              najzx.channel.send("قم بكتابة الرسالة | +rolebc @everyone الرساله")
                return;
            }
         
              if(args[0] == "@everyone") {
                najzx.channel.send(`لقد تم ارسال هذه الرسالة الى ${najzx.guild.memberCount} اعضاء`)
                najzx.guild.members.forEach(m => {
                  m.send(
                  "**" + "السيرفر :" + "\n" +
                  `${najzx.guild.name}` + "\n" +
                  "المرسل :" + "\n" +
                  `${najzx.author.tag}` + "\n" +
                  "الرسالة :" + "\n" +
                  `${args[1]}` + "**"
                  )
                })
                return;
              }
         
                  var role = najzx.mentions.roles.first();
                    if(!role) {
                      najzx.reply("لا توجد رتبة بهذا الاسم")
                        return;
                    }
                najzx.guild.members.filter(m => m.roles.get(role.id)).forEach(n => {
                  n.send(
                  "**" + "السيرفر :" + "\n" +
                  `${najzx.guild.name}` + "\n" +
                  "المرسل :" + "\n" +
                  `${najzx.author.tag}` + "\n" +
                  "الرسالة :" + "\n" +
                  `${args[1]}` + "**"
                  )
                })
                najzx.channel.send(`لقد تم ارسال هذه الرسالة الى ${najzx.guild.members.filter(m => m.roles.get(role.id)).size} عضو`)
            }
 });

     
      client.on("roleDelete", role => {
  client.setTimeout(() => {
    role.guild.fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username)
        try {

          let log = role.guild.channels.find('name', 'ourlog');
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setColor('#36393e')          
            .setTitle('-  مــســح رتــبــه ')
            .addField(' اســم الــرتــبــه  ', role.name, true)
            .addField(' هــويــة الــرتــبــه ', role.id, true)
            .addField(' لــون الــرتــبــه ', role.hexColor, true)
            .addField(' بــواســطــه ', exec, true)
            .setColor('#36393e') 
            .setTimestamp()
            
          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      })
  }, 1000)
})


client.on('roleCreate', role => {
  client.setTimeout(() => {
    role.guild.fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username)
        try {

          let log = role.guild.channels.find('name', 'ourlog');
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setTitle('+  انــشــاء رتــبــه ')
            .addField(' اســم الــرتــبــه  ', role.name, true)
            .addField(' هــويــة الــرتــبــه ', role.id, true)
            .addField(' لــون الــرتــبــه ', role.hexColor, true)
            .addField(' بــواســطــه ', exec, true)
            .setColor('#36393e') 
            .setTimestamp()
            
          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      })
  }, 1000)
})


 client.on('message', message => {
 if (message.content.toLowerCase() === prefix + "moveall") {
     message.delete(4000)
 if(!message.channel.guild) return;
 if (!message.member.hasPermission("MOVE_MEMBERS")) return;
 if(!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return;
if (message.member.voiceChannel == null) return;
 var author = message.member.voiceChannelID;
 var m = message.guild.members.filter(m=>m.voiceChannel)
 message.guild.members.filter(m=>m.voiceChannel).forEach(m => {
 m.setVoiceChannel(author)
 })
 message.channel.send('\`تم سحب جميع الأعضاء\`').then(m => m.delete(4000))
 }
   });


client.on('message', message=> {
    if (message.author.bot) return;
    if (message.isMentioned(client.user))
    {
    message.reply(" يَ عيوني ؟");
    }
});



client.login(process.env.BOT_TOKEN);
