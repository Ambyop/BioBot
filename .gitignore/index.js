//  créé par William Wats
const Discord = require("discord.js");
const bot = new Discord.Client();
const { prefix, token } = require('./config.json');

bot.on("ready",function() {
    bot.user.setGame(`${prefix}help [commande]`);
    console.log("Bot connecté");
});


// date
bot.on('message', message=>{
    if (message.author.bot) return;
    // This is where we'll put our code.

    const args = message.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === `${prefix}ping`) {
        message.reply('Pong!');
    } else
    if (command === `${prefix}blah`) {
        message.channel.send('Meh.');
    }
    var dateStop = false;
    if (command === `${prefix}date`) {
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
    if (command ==='!datestop'){
        message.channel.send('La boucle a été arrêtée :wink:');
        dateStop = true;
    }

    
});

bot.on('message', message=> {
    if (message.author.bot) return;

    const command = message.content.toLowerCase();
    if (command ===`${prefix}help`){
        message.channel.send(`${prefix}help [commande]\n **commande disponible:** ~~(${prefix}date)~~ ${prefix}ping ${prefix}blah ${prefix}coco ${prefix}nazi !roll`)
    }
    if (command ===`${prefix}help date`){
        message.channel.send(`**Commande Désactivée**\nVoici le format de la commande:\n ${prefix}date [dd] [mm] [yyyy] \n Pour l\'arrêter il suffit de taper ${prefix}datestop `);
    }
    if (command ===`${prefix}coco`){
        var valeur =  nombreAleatoire(6);
        var gif=['https://i.imgur.com/0TWyD8S.gif','https://giphy.com/gifs/lenin-communism-vladimir-yidUzl7xT4zV1VJ1C0 ','https://giphy.com/gifs/party-threadless-communist-l378z1NPLzCEAVCVy ','https://www.tenor.co/vLye.gif ',
            'https://www.tenor.co/J5Qb.gif ','https://www.tenor.co/RhZE.gif '];
        message.channel.send(gif[valeur-1])
    }
    if (command ===`${prefix}help coco`){
        message.channel.send('Envoie un Gif aléatoire de communiste')
    }
    if (command ===`${prefix}help roll`){
        message.channel.send(`Lance un dé avec la valeur indiquée\n ${prefix}roll [valeur]`)
    }
    if (command ===`${prefix}help nazi`){
        message.channel.send('Envoie un Gif aléatoire de nazi')
    }

});

// roll
bot.on('message', message=> {
    if (message.author.bot) return;
    // This is where we'll put our code.

    const args = message.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === `${prefix}roll`) {
        if (args[0] === undefined || args[0] < 0 ){
            if (args[0] === undefined) {
                message.reply(`Vous avez oublié de mettre la valeur maximale\n ${prefix}roll [valeur]`)
            }
            else{
                    message.reply('La valeur doit être strictement supérieure a 0 ...')
            }
        }
        else {
            args[0] = Math.round(args[0])
            let aleatoire = nombreAleatoire(args[0]);
            message.reply('dé de ' + args[0] + " lancé ... \n Résultat: " + aleatoire + " .")
        }
    }
    if (command === `${prefix}serveur`) {
        message.channel.send(`__**Nom du serveur:**__ ${message.guild.name}\n__**Nombre de membres:**__ ${message.guild.memberCount}`);
    }
    if (command ===`${prefix}nazi`){
        var valeur =  nombreAleatoire(5);
        var gif=['https://tenor.com/view/power-rangers-pose-squad-goals-salute-nazi-salute-gif-3535967','https://tenor.com/view/hitler-nazi-gif-7618295','https://tenor.com/view/hitler-dance-gif-4821571','https://media.giphy.com/media/wSpM9vIYEvGV2/giphy.gif','https://i.pinimg.com/originals/35/98/fb/3598fb2eb8a799cbcd970788b69f87f6.gif'];
        message.channel.send(gif[valeur-1])
    }
});

bot.on('message', message=> {
    if (message.author.bot) return;
    // This is where we'll put our code.

    const args = message.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let arretBoucle=false
    if (command === `${prefix}bouclep`) {
        let jour = args[0]; // jour
        let mois = args[1]; //date
        let annee = args[2]; // mois

        var intervalle = function () {
            if (!arretBoucle) {
                date.setDate(date.getDate() + 1);// ajout de 1 jours
                message.channel.send("On passe au jour : " + date);
            }
            else {
                clearInterval(intervalle);
                interval = undefined;
            }
        };

        if ((jour === undefined || mois === undefined || annee === undefined) && message.content !== '!bouclep stop') {
            message.reply('Vous avez oublié d\'encoder l\'année de départ :wink: \n !bouclep [dd] [mm] [yyyy)');
        }
        else {
            var date = new Date(annee, mois - 1, jour);
            message.channel.send(`${message.author.username}, lancement de la boucle à la date du ${jour} / ${mois} /${annee} `);
            setInterval(intervalle, 4* 3600 * 1000); // 1heure = 3600 secondes

        }
    }
});

bot.login(process.env.TOKEN);

function nombreAleatoire(nombre) {
    let nb = Math.floor(Math.random() * nombre+1);
    return nb;
}
