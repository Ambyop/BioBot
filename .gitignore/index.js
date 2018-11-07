//  créé par @ambyop
const Discord = require("discord.js");
const bot = new Discord.Client();
const { prefix, token } = require('./config.json');

bot.on("ready",function() {
    bot.user.setGame(`${prefix}help [commande]`);
    console.log("Bot connecté");
    bot.user.setStatus('dnd') // online, idle, dnd, invisible
});



// date
bot.on('message', message=>{
    if (message.author.bot) return;
    // This is where we'll put our code.

    const args = message.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === `${prefix}ping`) {
        message.reply('Pong!');
    }
    if (command === `${prefix}blah` || command === `${prefix}bla` || command === `${prefix}blàh` || command === `${prefix}blà`) {
        let texte = ["Meh.","Blèh","Blè !","Bleh !","Oui !","Bla !"];
        let numero = nombreAleatoire(texte.length);
        message.channel.send(texte[numero-1])
        //message.channel.send('Meh.');
    }

    
});

bot.on('message', message=> {
    if (message.author.bot) return;

    const command = message.content.toLowerCase();
    if (command ===`${prefix}help`){
        message.channel.send(`${prefix}help [commande]\n **commande disponible:** ${prefix}ping , ${prefix}blah ,${prefix}communiste , ${prefix}nazi , ${prefix}trump ; ${prefix}putin , ${prefix}singe`+
        ` , ${prefix}popcorn , ${prefix}vent , ${prefix}kim , ${prefix}shame , ${prefix}roll , ${prefix}pileface , ${prefix}quote`)
    }
    if (command ===`${prefix}help date`){
        message.channel.send(`**Commande Désactivée**\nVoici le format de la commande:\n ${prefix}date [dd] [mm] [yyyy] \n Pour l\'arrêter il suffit de taper ${prefix}datestop `);
    }
    if (command ===`${prefix}help coco` || command === `${prefix}help communiste`){
        message.channel.send(`Envoie un Gif aléatoire de communiste\n aussi disponible : ${prefix}communiste , ${prefix}coco .`)
    }
    if (command ===`${prefix}help roll`){
        message.channel.send(`Lance un dé avec la valeur indiquée\n ${prefix}roll [valeur] .`)
    }
    if (command ===`${prefix}help nazi`){
        message.channel.send('Envoie un Gif aléatoire de nazi .')
    }
    if (command ===`${prefix}help trump`){
        message.channel.send('Envoie un Gif aléatoire de Trump .')
    }
    if (command ===`${prefix}help poutine` || command === `${prefix}help putin`){
        message.channel.send(`Envoie un Gif sur poutine de manière aléatoire :)\n aussi disponible : ${prefix}putin , ${prefix}poutine`)
    }
    if (command === `${prefix}help singe` || command === `${prefix}help darklos`){
        message.channel.send('Envoie un Gif de singe, de manière aléatoire.')
    }
    if (command === `${prefix}help vent`){
        message.channel.send('A faire quand quelqu\'un te fait un vent :grinning: ');
    }
    if (command === `${prefix}help popcorn`){
        message.channel.send(`Envoie un Gif de popcorn, de manière aléatoire.\n aussi disponible : ${prefix}pop , ${prefix}corn , ${prefix}popcorn .`)
    }
    if (command === `${prefix}help pileface` || command === `${prefix}help pf` || command ===`${prefix}help pile-face`){
        message.channel.send('Pile ou face ? la pièce sera lancée...')
    }
    if (command === `${prefix}help quote`){
        message.channel.send(`Remet les arguments en quote entre \\\`\\\`\\\` [arguments]\\\`\\\`\\\` \n ${prefix}quote [arguments]`)
    }
    if (command === `${prefix}help shame`){
        message.channel.send(`Envoie un Gif Shame, de manière aléatoire.`)
    }
    if (command ===`${prefix}help kim`){
        message.channel.send(`Envoie un Gif sur Kim Jong Un de manière aléatoire .`)
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
    if (command ===`${prefix}coco` || command === `${prefix}communiste`){
        let gif=['https://i.imgur.com/0TWyD8S.gif','http://4.bp.blogspot.com/-FF3YYFzuWyc/WH5Q4bo6RII/AAAAAAAACMU/zf3NL5VmQXsj2daaSAGan98x9NG9vsp4gCK4B/s1600/8a6813e28358.gif','https://www.tenor.co/vLxU.gif ','https://www.tenor.co/vLye.gif ',
            'https://www.tenor.co/J5Qb.gif ','https://www.tenor.co/RhZE.gif ','https://giphy.com/gifs/animated-dancing-shittyreactiongifs-9vc3xK2OyMwzC ','https://media.giphy.com/media/axMy0g9z9khZC/giphy.gif','https://i.imgur.com/lVi8l2L.gif',
            'https://www.youtube.com/watch?v=U06jlgpMtQs'];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif communiste n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }
    if (command ===`${prefix}nazi`){
        let gif=['https://tenor.com/view/power-rangers-pose-squad-goals-salute-nazi-salute-gif-3535967','https://tenor.com/view/hitler-nazi-gif-7618295','https://tenor.com/view/hitler-dance-gif-4821571','https://media.giphy.com/media/wSpM9vIYEvGV2/giphy.gif','https://i.pinimg.com/originals/35/98/fb/3598fb2eb8a799cbcd970788b69f87f6.gif',
        'https://i.imgur.com/qLBFR.gif','https://risibank.fr/cache/stickers/d548/54802-full.gif','https://static.comicvine.com/uploads/original/11133/111330552/6006006-6211688823-giphy.gif','https://www.brain-magazine.fr/m/posts/19551/max/KKKnazi2.gif'];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif nazi n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }
    if (command ===`${prefix}trump`){
        let gif=["https://www.tenor.co/PgFD.gif","https://www.tenor.co/yiQN.gif","https://www.tenor.co/HdtG.gif","https://giphy.com/gifs/someone-run-shooter-iBcLqvp8FMwy3AiPGY ","https://www.tenor.co/GnfE.gif ",
        "https://orig00.deviantart.net/715a/f/2015/318/9/7/_gif__donald_trump_blasts_off_by_jaders75-d9gqh7w.gif","https://media.giphy.com/media/3o7TKwiaIuMib5WVXO/giphy.gif","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtSA1rCkgEVgNNazRh60NB9SIjweByni-f1K2bp8t1ROm5kxg",
        "http://wanna-joke.com/wp-content/uploads/2016/06/trump-gif-belgium-city.gif","https://cdn.fbsbx.com/v/t59.2708-21/36082833_474759779634569_1676559523583623168_n.gif?_nc_cat=101&_nc_ht=cdn.fbsbx.com&oh=4dbbd9ab01a6239b26da33dc13c913f7&oe=5BE4DB7E",
        'https://1.bp.blogspot.com/-JD7_vfnxFjY/WYIZTlr8IoI/AAAAAAAA9nY/7sGP6-OvcCofIwTHPt1gxzCz3qJ1xFZugCLcBGAs/s1600/rkM5X.gif','https://i.imgur.com/LAyeUCl.gif?noredirect','https://static1.squarespace.com/static/56a16fd5d82d5ee027b1b53f/t/5931b8a815cf7da7c1cb767b/1496430802427/?format=500w'];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif sur Trump n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }
    if (command ===`${prefix}poutine` || command === `${prefix}putin`){
        let gif=['https://media1.tenor.com/images/fcfbacf6b056ccadf1dd3727ec93bd7e/tenor.gif?itemid=4716826','https://www.tenor.co/ZlwS.gif','https://thumbs.gfycat.com/LeanUnawareCirriped-size_restricted.gif','https://www.tenor.co/MLix.gif',
        'https://www.tenor.co/Eoft.gif','https://giphy.com/gifs/isP4TLqhjm3zq','https://giphy.com/gifs/putin-handshake-demonstrate-pCytDP27ewPde'];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif sur Putin n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }
    if (command ===`${prefix}singe` || command ===`${prefix}darklos`){
        let gif=['https://giphy.com/gifs/next-pFwRzOLfuGHok','https://www.tenor.co/PXLU.gif','https://www.tenor.co/V2dm.gif','https://www.tenor.co/HLUY.gif',
        'https://giphy.com/gifs/funny-cute-lol-26gsspfbt1HfVQ9va','https://giphy.com/gifs/monkey-12uB4fsiMsC8V2','https://www.tenor.co/xkQv.gif','https://www.tenor.co/JM5S.gif','https://www.tenor.co/x19S.gif',
        'http://humourtop.com/gifs-animes-droles-de-singes/Bebe_Chimpanze.gif','http://humourtop.com/gifs-animes-droles-de-singes/Humour_Gorille.gif','https://thumbs.gfycat.com/ReflectingTangibleBlueandgoldmackaw-small.gif',
        'https://media.giphy.com/media/IKv6damwRCkFy/giphy.gif','https://s.yimg.com/ny/api/res/1.2/1Y839XJpE2V77BmClZa2wg--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NDgwO2g9Mjcw/http://media.zenfs.com/fr_FR/News/Francetvinfo.fr/6292545.gif',
        'http://gifdrole.com/singes/gorille_rock.gif'];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif sur les singes n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }
    if (command ===`${prefix}popcorn` || command === `${prefix}pop`|| command === `${prefix}corn`){
        let gif=['https://i.pinimg.com/originals/6d/2f/19/6d2f1933311596e0ad7d349b7e7c2b6f.gif','https://media.giphy.com/media/tFK8urY6XHj2w/giphy.gif','https://media.giphy.com/media/128UMaujdjX7Pi/giphy.gif','https://media.giphy.com/media/12aW6JtfvUdcdO/giphy.gif','https://media.giphy.com/media/TrDxCdtmdluP6/giphy.gif','https://media.giphy.com/media/1pw5Hn77ylYxW/giphy.gif',
        'https://giphy.com/gifs/reactiongifs-tyqcJoNjNv0Fq','https://giphy.com/gifs/chill-chihuahua-4XSc0NkhKJQhW','https://tenor.com/view/nom-eat-eating-snack-popcorn-gif-5369618','https://giphy.com/gifs/corn-Znj9tJamHmLoQ ',
        'https://media.giphy.com/media/pUeXcg80cO8I8/giphy.gif','https://media.giphy.com/media/l3q2FbmLvAockl43u/giphy.gif','https://media.giphy.com/media/UlqLDtI8Qc0j6/source.gif','https://media.giphy.com/media/2ALbeBfUZME4aCdyZg/giphy.gif',
        'https://www.reactiongifs.us/wp-content/uploads/2017/12/popcorn.gif'];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif sur le popcorn n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }
    if (command ===`${prefix}vent`){
        let gif=["https://media.giphy.com/media/UUkxgx7vd7rna/giphy.gif","https://www.tenor.co/v2d4.gif","https://www.tenor.co/uf0w.gif","https://giphy.com/gifs/wind-weather-miami-HmTLatwLWpTQk","https://giphy.com/gifs/silly-storm-edition-G5n8sqIOxBqow","https://giphy.com/gifs/weatherunderground-storm-weather-d1E1pZ1cdgWmY0hy"];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif vent n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }
    if (command === `${prefix}quote`) {
        if (command === `${prefix}quote`) {
            if (args.length === 0) {
                message.reply(`Vous n\'avez pas mit d\'arguments ... ${prefix}quote [arguments]`)
            }
            else {
                var chaine = "";
                for (let a = 0; a < args.length; a++) {
                    chaine += args[a] + " ";
                }
                setTimeout(function () {
                    message.delete();
                }, 1500);
                //message.delete();
                message.channel.send(`${message.author.username} a dit : \`\`\` ` + chaine + ` \`\`\``);
            }

        }
    }
    if (command ===`${prefix}kim`){
        let gif=["https://media.giphy.com/media/2cmCUDzzxscnK/giphy.gif","https://media1.tenor.com/images/a02f0ac5e22ecba79aa36a9564b5d7ec/tenor.gif?itemid=9924807","https://66.media.tumblr.com/a7d6ec418cfca8c9b60b2c47e667f6e5/tumblr_nr6fptQVIA1s4bl2qo1_r5_400.gif","http://i.imgur.com/n2AIQ5y.gif",
        'https://media.giphy.com/media/26xBOVNvTYppStULC/giphy.gif','https://i3.kym-cdn.com/photos/images/newsfeed/000/853/445/64b.gif'];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif sur Kim Jong Un n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }
    if (command ===`${prefix}shame`){
        let gif=["https://media.giphy.com/media/eP1fobjusSbu/giphy.gif","https://media0.giphy.com/media/PJeKg31621Wgw/giphy.gif?cid=3640f6095bcc2638632e496d6b11dc38","https://media.giphy.com/media/vX9WcCiWwUF7G/source.gif",
        "https://media.giphy.com/media/EIUtqBs5nJCXS/giphy.gif","https://media.giphy.com/media/pDsCoECKh1Pa/giphy.gif","https://media.giphy.com/media/NGV4vAghFiUOA/giphy.gif","https://media.giphy.com/media/trOcgJrhsUZEY/giphy.gif",
         "https://media.giphy.com/media/ptXhuH4OrPNok/giphy.gif","https://media.giphy.com/media/sC4j83D78rdrW/giphy.gif","https://media.giphy.com/media/Db3OfoegpwajK/giphy.gif","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrO5PvNxjwjQujku_vNje9rBDLo3YVEAABNhtgtgusBtH0XqQyug",
        "https://media.giphy.com/media/InhPEgAQym00g/giphy.gif","https://data.whicdn.com/images/206500793/original.gif","https://vignette.wikia.nocookie.net/glee/images/8/81/Shame.gif/revision/latest?cb=20150113225520"];
        if (args[0] === undefined) {
            let valeur = nombreAleatoire(gif.length);
            message.channel.send(gif[valeur - 1])
        }
        else {
            message.channel.send(`**${message.author.username}** a sélectionné le gif Shame n° `+ args[0]+ ".");
            if (gif[args[0]-1] === undefined){
                setTimeout(function(){ message.channel.send('__Il n\'y a pas de gif avec ce numéro .__\n Il n\'y a actuellement que '+ gif.length +' gifs disponibles .'); }, 1000);
            }
            else
            {
                setTimeout(function () {
                    message.channel.send(gif[args[0] - 1]);
                }, 1000);
            }
        }
    }

});

bot.on('message', message=> {
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) {
        const command = message.content.toLocaleLowerCase();
        const auteur = message.author;

        if (command === `bonjour` || command === `salut` || command === `yop` || command === `bonsoir` || command === 'yo' || command ==='wesh' || command ==='coucou' || command === 'slt') {
            let valeur =nombreAleatoire(110);
            setTimeout(function () {
                if (valeur >= 10 && valeur < 50) {
                    if (valeur >= 10 && valeur < 15) {
                        message.channel.send("Bien le Bonjour " + auteur);
                    }
                    if (valeur >= 15 && valeur < 20) {
                        message.channel.send("Bonsoir " + auteur);
                    }
                    if (valeur >= 20 && valeur < 25) {
                        message.channel.send("Yolo !");
                    }
                    if (valeur >= 25 && valeur < 30) {
                        message.channel.send("Salut à toi mon cher " + auteur);
                    }
                    if (valeur >= 30 && valeur < 35) {
                        message.channel.send("Salut mon ami :wink:")
                    }
                    if (valeur >= 35 && valeur < 40) {
                        message.channel.send("Wesh wesh !")
                    }
                    if (valeur >= 40 && valeur < 45) {
                        message.channel.send("Yo !")
                    }
                    if (valeur >= 45 && valeur < 50){
                        message.channel.send("Yop !");
                    }
                    if( valeur >= 50 && valeur < 55){
                        message.channel.send("Holà"+ auteur + "! ")
                    }
                }
            },500);
        }
    }
});

//boucle jour
bot.on('message', message=> {
    if (message.author.bot) return;
    // This is where we'll put our code.

    const args = message.content.slice().trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === `${prefix}jour`) {
        let jour = args[0]; // jour
        let mois = args[1]; //date
        let annee = args[2]; // mois
        var date = new Date(annee, mois - 1, jour);
        var compteur = "v2";
        if(args[0] ==="stop" || args[0]==="fin"){
            count=5;
            compteur = "stop";
            message.reply('fin')
        }
        else {
            message.channel.send(`**${message.author.username}** lancement de la boucle journée à partir du `+ args[0] +"/"+args[1]+"/"+args[2]);
            var count = 0;
            let temoin = 0;
            var interval = setInterval(function () {
                date.setDate(date.getDate() + 1);// ajout de 1 jours
                message.channel.send("Nous passons au jour : " + date);
                temoin++;
                console.log(temoin + " " + count+ " "+ compteur);
                if (count === 5) {
                    console.log('exiting');
                    clearInterval(interval);
                }
            }, 4* 3600 * 1000);
        }
    }


    });


bot.login(process.env.TOKEN);
bot.on('error', console.error);

function nombreAleatoire(nombre) {
    let nb = Math.floor(Math.random() * nombre+1);
    return nb;
}
