// start bot with node .

const { error } = require('console');
var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');
var profanities = 'profanities';
var ytdl = require('ytdl-core');

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');

function userInfo(user) {
    
    var finalString = '';

    finalString += 'Username: **' + user.username + '**, id: **' + user.id + '**';

    var userCreated = user.createdAt.toString().split(' ');
    finalString += ', was created at **' + userCreated[2] + ' ' + userCreated[1] + ' ' + userCreated[3] + '**';

    finalString += ' and has sent **' + userData[user.id].messagesSend + '** messages';

    return finalString;

}

bot.once('ready', () => {

    console.log('bot is online!')

    /* bot.user.setStatus('Online') // status can be: 'Online', 'idle', 'invisible' & 'dnd' (do not disturb)

    bot.user.setGame('hello') */

});

bot.on('message', message => {
    
    var sender = message.author;
    var msg = message.content.toUpperCase();
    var prefix = '>';
    var cont = message.content.slice(prefix.length).split(" ");
    var args = cont.slice(1);

    for (x = 0; x < profanities.length; x++) {

        if (message.content.toUpperCase == profanities[x].toUpperCase()) {
            message.channel.send('Hey! Don\'t say that');
            message.delete();
            return;
        }

    }


    // help command
    if (msg === prefix + 'HELP' || msg === prefix + 'COMMANDS') {
        message.channel.send(commandsList);
    }

    // ping pong command
    if (msg === prefix + 'PING') {
        message.channel.send('pong!');
    } 

    // joe mama command
    if (msg === prefix + 'JOE') {
        message.channel.send('mama');
    }

    // messages command
    if (msg === prefix + 'MESSAGES') {
        message.channel.send('You have sent **' + userData[sender.id].messagesSend + '** messages!')
    }

    // info command
    if (msg.startsWith(prefix + 'INFO')) {

        if (msg === prefix + 'INFO') {
            message.channel.send(userInfo(sender));
        }
    }

    // purge command
    if (msg.startsWith(prefix + 'PURGE') || (msg.startsWith(prefix + 'CLEAR'))) {

            if (isNaN(args[0])) {
                return message.channel.send('Please supply a valid amount of messages you want to purge! \n Usage: **' + prefix + 'purge <amount>**');
            }

            if (args[0] > 100) {
                return message.channel.send('please use a number less than 100!');
            }

            message.delete();
            
            message.channel.bulkDelete(args[0]) 
            
                .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages!**`).then(msg => msg.delete({timeout: 10000})))
                .catch(error => message.channel.send(`**Error:** ${error.message}`));
    }

    // ghostping
    /*if (mgs.startsWith(prefix + 'BAP')) {
        
        message.delete();

        var saymsg1 = message.content;
        message.channel.send(saymsg1.replace(prefix + 'bap', ''))

    }

    // say command
    if (msg.startsWith(prefix + 'SAY')) {

        message.delete();
        var saymsg = message.content;
        message.channel.send(saymsg.replace(prefix + 'say', ''))
    
    }*/

    // numbers only
    if (message.channel.id === '794975127334027264') {

        if(isNaN(message.content)) {
            message.delete();
            message.author.send('Only numbers please!')

        }
    }
 
    // bad word filter
    if (msg.includes('BADWORD') || (msg.includes('NEIGHBOUR'))) {
        message.delete();
        message.author.send('That word is banned!');
    }

    // text adventures
    if (msg === prefix + 'TEXTADVENTURE'){
        message.channel.send('Please choose an adventure \n 1: Dead family\'s revival.');
    }

    // choose 1
    if (msg === prefix + 'TEXTADVENTURE 1') {
        (async () => {
        let m = await message.channel.send('**You wake up from a nightmare, covered in sweat you realise it was all just a dream and your family is still alive.** \n what do you want to do? try to sleep\[1\] or go downstairs\[2\]?')
        await m.react('1️⃣');
        await m.react('2️⃣');
        })();

        /*if (reaction.emoji.name === '1️⃣') {
            return message.channel.send('1');
        }*/
    }
    
    // adventure 2
    if (msg === prefix + 'TEXTADVENTURE 2') {
        message.channel.send('adventure 2 loading...');
    }

    // say command
    if (msg.startsWith(prefix + 'SAY')) {

        message.delete();
        var saymsg = message.content;
        message.channel.send(saymsg.replace(prefix + 'say', ''))

    }

    // messages send
    if (!userData[sender.id]) userData[sender.id] = {
        messagesSend: 0
    }

    userData[sender.id].messagesSend++;

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {

        if (err) {
            console.error(err);
        }

    });

});

bot.on('guildMemberadd', member => {

    console.log('User ' + member.user.username + ' has joined the server!');

    // var role = member.guild.roles.find('name', 'User');
    // member.addRole(role);

    member.guild.channels.get('795003300214865950').send('**' + member.user.username + '**, has joined the server!');

});

bot.on('guildMemberRemove', member => {

    member.guild.channels.get('795003300214865950').send('**' + member.user.username + '**, has left the server!');

});

bot.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.name === "1️⃣") {
        console.log(reaction.users);
    }
    if (reaction.emoji.name === "2️⃣") {
        console.log(reaction.user);
    }
});

bot.login('Nzc1ODMyNjcwNDk2MjI3MzQw.X6sEeg.hazlWKzd-AaMq4Ig717ew3BAzC0');