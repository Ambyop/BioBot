//  créé par William Wats
const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready",function() {
    bot.user.setGame("!help [commande]");
    console.log("Bot connecté");
});

bot.on('message', message =>{
    if (message.content ==='!help'){
        message.channel.send('!help [commande]\n **commande disponible:** !date !ping !blah !coco')
    }
});


bot.on('message', message=>{
    if (message.author.bot) return;
    // This is where we'll put our code.

    const args = message.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === '!ping') {
        message.reply('Pong!');
    } else
    if (command === '!blah') {
        message.channel.send('Meh.');
    }
    var dateStop = false;
    if (command === "!date") {
        let jour = args[0]; // jour
        let mois = args[1]; //date
        let annee = args[2]; // mois

        message.reply('La commande a été désactivée pour le moment \n https://www.tenor.co/t20G.gif ');
        /*var intervalle = function () {
            if (dateStop === false) {
                date.setDate(date.getDate() + 2);// ajout de 2jours
                message.channel.send("On passe au jour : " + date);
                setTimeout(intervalle, 3 * 1000);
            }
            else{
                clearTimeout(intervalle);
                interval = undefined;
            }
        };


        if ((jour === undefined || mois === undefined || annee === undefined )&& message.content !=='!date stop') {
            message.reply('Vous avez oublié d\'encoder l\'année de départ :wink: \n !date [dd] [mm] [yyyy)');
        }
        /*else if(message.content ==='!date stop'){
            message.channel.send('La boucle a été arrêtée :wink:');
            //clearInterval(intervalle);
            dateStop = true;
        }
        else {
                var date = new Date(annee, mois - 1, jour);
                message.channel.send(`${message.author.username}, lancement de la boucle à la date du ${jour} / ${mois} /${annee} `);
                setTimeout(intervalle, 3 * 1000); // 1heure = 3600 secondes

        }*/

    }
    if (message.content ==='!datestop'){
        message.channel.send('La boucle a été arrêtée :wink:');
        dateStop = true;
    }
    if (message.content ==='!help date'){
        message.channel.send('Voici le format de la commande:\n !date [dd] [mm] [yyyy] \n Pour l\'arrêter il suffit de taper !datestop');
    }
    if (message.content ==='!coco'){
        message.reply('https://i.imgur.com/0TWyD8S.gif')
    }
    if (message.content ==='!help coco'){
        message.channel.send('Envoie un Gif de Staline')
    }

    
});

bot.login(process.env.TOKEN);
