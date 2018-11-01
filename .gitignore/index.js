//  créé par William Wats
const Discord = require("discord.js");
const bot = new Discord.Client();
const { prefix, token } = require('./config.json');

bot.on("ready",function() {
    bot.user.setGame(`${prefix}help [commande]`);
    console.log("Bot connecté");
    bot.user.setStatus('idle') // online, idle, dnd, invisible
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
        message.channel.send(`${prefix}help [commande]\n **commande disponible:** ~~(${prefix}date)~~ , ${prefix}ping , ${prefix}blah ,${prefix}coco , ${prefix}nazi , ${prefix}Trump , ${prefix}singe`+
        ` , ${prefix}popcorn , ${prefix}vent , ${prefix}roll , ${prefix}pileface , ${prefix}quote`)
    }
    if (command ===`${prefix}help date`){
        message.channel.send(`**Commande Désactivée**\nVoici le format de la commande:\n ${prefix}date [dd] [mm] [yyyy] \n Pour l\'arrêter il suffit de taper ${prefix}datestop `);
    }
    if (command ===`${prefix}coco`){
        let valeur =  nombreAleatoire(7);
        let gif=['https://i.imgur.com/0TWyD8S.gif','https://giphy.com/gifs/lenin-communism-vladimir-yidUzl7xT4zV1VJ1C0 ','https://www.tenor.co/vLxU.gif ','https://www.tenor.co/vLye.gif ',
            'https://www.tenor.co/J5Qb.gif ','https://www.tenor.co/RhZE.gif ','https://giphy.com/gifs/animated-dancing-shittyreactiongifs-9vc3xK2OyMwzC '];
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
    if (command ===`${prefix}help trump`){
        message.channel.send('Envoie un Gif aléatoire de Trump')
    }
    if (command === `${prefix}help singe` || command === `${prefix}help darklos`){
        message.channel.send('Envoie un Gif de singe, de manière aléatoire.')
    }
    if (command === `${prefix}help vent`){
        message.channel.send('A faire quand quelqu\'un te fait un vent :grinning: ');
    }
    if (command === `${prefix}help popcorn` || command === `${prefix}help darklos`){
        message.channel.send(`Envoie un Gif de popcorn, de manière aléatoire.\n aussi disponible : ${prefix}pop , ${prefix}corn , ${prefix}popcorn .`)
    }
    if (command === `${prefix}help pileface` || command === `${prefix}help pf` || command ===`${prefix}help pile-face`){
        message.channel.send('Pile ou face ? la pièce sera lancée...')
    }
    if (command === `${prefix}help quote`){
        message.channel.send(`Remet les arguments en quote entre \\\`\\\`\\\` [arguments]\\\`\\\`\\\` \n ${prefix}quote [arguments]`)
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
            args[0] = Math.round(args[0]);
            let aleatoire = nombreAleatoire(args[0]);
            setTimeout(function(){ message.delete(); }, 2000);
            message.reply('dé de ' + args[0] + " lancé ... \n Résultat: " + aleatoire + " .")
        }
    }
    if (command === `${prefix}pf` || command === `${prefix}pile-face` || command === `${prefix}pileface`) {
        var modulo = nombreAleatoire(100)%2;
        if (modulo === 0){
            message.reply('Pile !')
        }
        else{
            message.reply('Face !')
        }
    }
    if (command === `${prefix}serveur`) {
        message.channel.send(`__**Nom du serveur:**__ ${message.guild.name}\n__**Nombre de membres:**__ ${message.guild.memberCount}`);
    }
    if (command ===`${prefix}nazi`){
        let valeur =  nombreAleatoire(6);
        let gif=['https://tenor.com/view/power-rangers-pose-squad-goals-salute-nazi-salute-gif-3535967','https://tenor.com/view/hitler-nazi-gif-7618295','https://tenor.com/view/hitler-dance-gif-4821571','https://media.giphy.com/media/wSpM9vIYEvGV2/giphy.gif','https://i.pinimg.com/originals/35/98/fb/3598fb2eb8a799cbcd970788b69f87f6.gif',
        'https://i.imgur.com/qLBFR.gif'];
        message.channel.send(gif[valeur-1])
    }
    if (command ===`${prefix}trump`){
        let valeur =  nombreAleatoire(5);
        let gif=["https://www.tenor.co/PgFD.gif","https://www.tenor.co/yiQN.gif","https://www.tenor.co/HdtG.gif","https://giphy.com/gifs/someone-run-shooter-iBcLqvp8FMwy3AiPGY ","https://www.tenor.co/GnfE.gif "];
        message.channel.send(gif[valeur-1])
    }
    if (command ===`${prefix}singe` || command ===`${prefix}darklos`){
        let valeur = nombreAleatoire(9);
        let gif=['https://giphy.com/gifs/next-pFwRzOLfuGHok','https://www.tenor.co/PXLU.gif','https://www.tenor.co/V2dm.gif','https://www.tenor.co/HLUY.gif',
        'https://giphy.com/gifs/funny-cute-lol-26gsspfbt1HfVQ9va','https://giphy.com/gifs/monkey-12uB4fsiMsC8V2','https://www.tenor.co/xkQv.gif','https://www.tenor.co/JM5S.gif','https://www.tenor.co/x19S.gif'];
        message.channel.send(gif[valeur-1]);
    }
    if (command ===`${prefix}popcorn` || command === `${prefix}pop`|| command === `${prefix}corn`){
        let valeur = nombreAleatoire(9);
        let gif=['https://i.pinimg.com/originals/6d/2f/19/6d2f1933311596e0ad7d349b7e7c2b6f.gif','https://media.giphy.com/media/tFK8urY6XHj2w/giphy.gif','https://media.giphy.com/media/128UMaujdjX7Pi/giphy.gif','https://media.giphy.com/media/12aW6JtfvUdcdO/giphy.gif','https://media.giphy.com/media/TrDxCdtmdluP6/giphy.gif','https://media.giphy.com/media/1pw5Hn77ylYxW/giphy.gif',
        'https://giphy.com/gifs/reactiongifs-tyqcJoNjNv0Fq','https://giphy.com/gifs/chill-chihuahua-4XSc0NkhKJQhW','https://tenor.com/view/nom-eat-eating-snack-popcorn-gif-5369618'];
        message.channel.send(gif[valeur-1]);
    }
    if (command ===`${prefix}vent`){
        let valeur = nombreAleatoire(6);
        let gif=["https://media.giphy.com/media/UUkxgx7vd7rna/giphy.gif","https://www.tenor.co/v2d4.gif","https://www.tenor.co/uf0w.gif","https://giphy.com/gifs/wind-weather-miami-HmTLatwLWpTQk","https://giphy.com/gifs/silly-storm-edition-G5n8sqIOxBqow","https://giphy.com/gifs/weatherunderground-storm-weather-d1E1pZ1cdgWmY0hy"];
        message.channel.send(gif[valeur-1]);
    }
    if (command === `${prefix}quote`){
        if (args.length === 0){
            message.reply(`Vous n\'avez pas mit d\'arguments ... ${prefix}quote [arguments]`)
        }
        else {
            var chaine = "";
            for (let a = 0; a < args.length; a++) {
                chaine += args[a] + " ";
            }
            setTimeout(function(){ message.delete(); }, 2000);
            //message.delete();
            message.reply("```" + chaine + "```");
        }

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
