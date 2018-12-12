//  créé par @ambyop
const Discord = require("discord.js");
const bot = new Discord.Client();
const { prefix, adminPrefix, token } = require('./config.json');
const ownerID = process.env.owner;
const fs = require('fs');

function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d
        , h: h
        , m: m
        , s: s
    };
}
function nombreAleatoire(nombre) {
    return Math.floor(Math.random() * nombre+1);
}

bot.on("ready", () => {
    console.log( "bot connecté"/*Whatever you want to say*/ );
    bot.user.setStatus('dnd');// online, idle, dnd, invisible
    bot.user.setActivity(`${prefix}help | créé par @AmByop`, { type: 'WATCHING' })
});

bot.on('message', message=>{
        if (message.channel.type === "dm") { //if the channel is a DM channel
            if (message.content.startsWith(prefix)) return message.channel.send(":x: Merci d'utiliser les commandes dans un vrai serveur; :x:")
        }//if the message is a command
        if (message.author.bot && message.content.startsWith(prefix)) return message.channel.send(":x: Je ne parle pas aux Bots! :x:");
        // This is where we'll put our code.
        const args = message.content.toLocaleLowerCase().slice().trim().split(/ +/g);
        const argsAffichage = message.content.slice().trim().split(/ +/g);
        argsAffichage.shift();
        const command = args.shift().toLowerCase();

        //blah
        if (command === `${prefix}blah` || command === `${prefix}bla` || command === `${prefix}blàh` || command === `${prefix}blà`) {
            let texte = ["Meh.", "Blèh", "Blè !", "Bleh !", "Oui !", "Bla !"];
            let numero = nombreAleatoire(texte.length);
            setTimeout(function () {
                message.channel.send(texte[numero - 1])
            }, 500);

        }
        //quote
        if (command === `${prefix}quote`) {
            if (command === `${prefix}quote`) {
                if (args.length === 0) {
                    message.reply(`vous n\'avez pas mit d\'arguments ...\n \`${prefix}quote [arguments]\``)
                } else {

                    setTimeout(function () {
                        message.delete();
                    }, 4000);
                    //message.delete();
                    message.channel.send(`**${message.author.username}** annonce :  \`\`\`  ${argsAffichage[0]}  \`\`\``);
                }


            }
        }
        //purge
        if (command === `${prefix}purge`) {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                message.channel.send(`Désolé, **${message.author.username}**, mais vous n'avez pas la permission **Gérer les messages** sur le serveur !!\n Si vous pensez qu'il s'agit d'une erreur, contactez un administrateur.`)
            } else if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
                message.channel.send(`Désolé, **${message.author.username}**, mais vous n'avez pas la permission **Gérer les messages** sur ce channel !!\n Si vous pensez qu'il s'agit d'une erreur, contactez un administrateur.`)
            } else if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
                message.channel.send(`Désolé, **${message.author.username}**, mais Je n'ai pas la permission **Gérer les messages** sur ce serveur.`);
            } else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_MESSAGES")) {
                message.channel.send(`Désolé, **${message.author.username}**, mais Je n'ai pas la permission **Gérer les messages** sur ce channel.`)
            } else if (args[0] === undefined) {
                message.channel.send(`Vous devez spécifier un nombre de messages à supprimer...\n \`${prefix}purge [argument]\``);
            } else if (args[0] < 1) {
                message.channel.send('Vous devez mettre un nombre supérieur à 1.');
            } else if (args[0] > 100) {
                message.channel.send('Vous devez mettre un nombre inférieur à 100');
            } else if (isNaN(args[0])) {
                message.channel.send('Vous avez mit un nombre incorrect');
            } else {
                let nombre = Number(args[0]) + 1;
                message.channel.bulkDelete(nombre).then(() => {
                    message.channel.send(`:pencil: ${args[0]} messages ont été supprimés par **${message.author.username}**.`).then(msg => msg.delete(6000));
                });
            }
        }
        //sondage
        if (command === `${prefix}sondage` || command === `${prefix}poll` || command === `${prefix}question`) {
            let question = argsAffichage.slice(0).join(" ");

            if (args.length === 0)
                return message.reply(`Vous avez oublié d'introduire la question .\n \`${prefix}poll [Question]\``);

            const embed = new Discord.RichEmbed()
                .setTitle("Sondage :")
                .setColor("GREEN")
                .setDescription(`${question}`)
                .setFooter(`Sondage par: ${message.author.username}`, `${message.author.avatarURL}`);
            setTimeout(function () {
                message.delete();
            }, 4000);

            message.channel.send({embed})
                .then(msg => {
                    setTimeout(function () {
                        msg.react('👍')
                    }, 100);
                    setTimeout(function () {
                        //msg.react('✍')
                        msg.react('🤔')
                    }, 400);
                    setTimeout(function () {
                        msg.react('👎')
                    }, 200);
                })
                .catch(() => console.error('Erreur au chargement des emojis.'));
        }
        //user info
        if (command === `${prefix}userinfo` || command === `${prefix}user`) {
            let user;
            if (message.mentions.users.first()) {
                user = message.mentions.users.first();
            } else {
                user = message.author;
            }
            // creation utilisateur
            let userCreated = user.createdAt.toString().split(' ');
            // a rejoint le serveur
            //let userJoined = user.joinedAt;
            // status utilisateur
            let userStatus = user.presence.status;
            let status;
            if (userStatus === "dnd") {
                status = "Ne pas déranger"
            }
            if (userStatus === "idle") {
                status = "Inactif"
            }
            if (userStatus === "online") {
                status = "En ligne"
            }
            if (userStatus === "offline") {
                status = "Déconnecté"
            }
            // Define the member of a guild.
            const member = message.guild.member(user);

            //Discord rich embed
            const embed = new Discord.RichEmbed()
                .setColor('#4bb895')
                .setThumbnail(user.avatarURL)
                .setAuthor(`${user.username}#${user.discriminator}`)
                .addField("ID:", `${user.id}`, true)
                .addField('Pseudo', user.username, false)
                .addField('Discriminateur', '#' + user.discriminator, true)
                .addField("Surnom:", `${member.nickname !== null ? `${member.nickname}` : 'Aucun'}`, true)
                .addField("Créé :", userCreated[2] + ' , ' + userCreated[1] + " , " + userCreated[3], true)
                //.addField("a rejoint le serveur:", userJoined, true)
                .addField("Bot:", `${user.bot}`, true)
                .addField("Status:", status, true)
                .addField("Jeu:", `${user.presence.game ? user.presence.game.name : 'Aucun'}`, true)
                .addField("Rôles:", member.roles.map(roles => `${roles.name}`).join(', '), true)
                .addField('Photo de Profil:', user.avatarURL, true)
                .setTimestamp(new Date())
                .setFooter(`Réponse à ${message.author.tag}`, `${message.author.avatarURL}`);
            message.channel.send({embed});
        }
        ;
// bot
        if (command === `${prefix}botinfo` || command === `${prefix}bot`) {
            let msgping1 = new Date();
            let botping = new Date() - message.createdAt;
            let msgping2 = new Date() - msgping1;
            let u = convertMS(bot.uptime);
            let uptime = u.d + " jours : " + u.h + " heures : " + u.m + " minutes : " + u.s + " secondes.";
            let servers = bot.guilds.size; // Server Count
            let users = bot.users.size; // User count
            let channels = bot.channels.size; // Channel Count
            //bot.guilds.map(g => users += g.memberCount);

            let pingembed = new Discord.RichEmbed()
                .setColor("#b34c12")
                .setThumbnail(bot.user.displayAvatarURL)
                .setAuthor('Stats du Bot:')
                .addField('Bot créé par @AmByOp', ' https://twitter.com/Ambyop')
                .addField(`Fonctionne depuis :`, uptime)
                .addField('Serveurs', servers, true)
                .addField('Utilisateurs', users, true)
                .addField('Channels', channels, true)
                .addField('Message Ping : ', '~' + Math.round(msgping2) + ' ms', true)
                .addField('API Ping : ', Math.floor(bot.ping) + ' ms', true)
                .addField('Bot Ping : ', Math.floor(botping) + ' ms', true)
                .setTimestamp(new Date())
                .setFooter(`Réponse à ${message.author.tag}`, `${message.author.avatarURL}`);


            return message.channel.send(pingembed);
        }
        // nbre serveur
        if (command === `${adminPrefix}serveurs`) {
            if (message.author.id !== ownerID) return message.reply(`Seul mon créateur peut faire cette commande.`);
            let string = '';
            bot.guilds.forEach(guild => {
                string += '***Nom:*** ' + guild.name + '\n' + '*** ID:***` ' + guild.id + ' ` ' + '\n\n';

            });
            let botembed = new Discord.RichEmbed()
                .setColor("#000FF")
                .addField("Connecté à : ", string)
                .setTimestamp()
                .setFooter("Exécuté par: " + message.author.username, message.author.avatarURL);
            message.channel.send(botembed);
        }
        // serveur info
        if (command === `${prefix}serveurinfo` || command === `${prefix}serveur`) {
            let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
            let day = message.guild.createdAt.getDate();
            let month = 1 + message.guild.createdAt.getMonth();
            let year = message.guild.createdAt.getFullYear();
            let sicon = message.guild.iconURL;
            let serverembed = new Discord.RichEmbed()
                .setAuthor(message.guild.name, sicon)
                .setColor("#90bdea")
                .setThumbnail(sicon)
                //.addField("ID", message.guild.id, true)
                .addField("Nom", message.guild.name, true)
                .addField("Propriétaire", message.guild.owner.user.tag, true)
                .addField(`Création`, `${day}.${month}.${year}`)
                .addField("Région", message.guild.region, true)
                .addField("Channels", message.guild.channels.size, true)
                .addField("Membres", message.guild.memberCount, true)
                .addField("Humains", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
                .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
                .addField("Online", online.size, true)
                .addField("Roles", message.guild.roles.size, true)
                .setTimestamp(new Date())
                .setFooter(`Réponse à ${message.author.tag}`, `${message.author.avatarURL}`);
            message.channel.send(serverembed);
        }
        //uptime
        if (command === `${prefix}uptime`) {
            let u = convertMS(bot.uptime);
            let uptime = u.d + " jours : " + u.h + " heures : " + u.m + " minutes : " + u.s + " secondes.";
            // const duration = bot.uptime;
            setTimeout(function () {
                message.reply(`:alarm_clock: ` + `**Je fonctionne depuis :**  ${uptime}`);
            }, 500);
        }
        //pile face
        if (command === `${prefix}pf` || command === `${prefix}pileface`) {
            let valeur = nombreAleatoire(2);
            setTimeout(function () {
                message.delete();
            }, 4000);
            let msg;
            if (valeur === 1) {
                msg = message.author + ', la pièce indique  **Pile** !'
            } else {
                msg = message.author + ', la pièce indique  **Face** !'
            }
            message.reply("Je lance la pièce ...").then(sentMessage => setTimeout(function () {
                sentMessage.edit(msg)
            }, 900));
        }
        //roll
        if (command === `${prefix}roll` || command === `${prefix}dice`) {
            if (args[0] === undefined) return message.reply(`Vous n'avez pas mit la valeur maximale\n \`${prefix}roll [valeur]\``)
            if (isNaN(args[0])) return message.reply('La valeur **'+ argsAffichage +'** n\'est pas un nombre...')
            if (args[0] <= 1)return message.reply('La valeur mise être strictement supérieure à 1 ...')

            args[0] = Math.round(args[0]);
            let aleatoire = nombreAleatoire(args[0]);
            setTimeout(function () {
                message.delete();
                }, 4000);
            let msg = (message.author + ', dé de ' + args[0] + " lancé ... \n Résultat: " + aleatoire + " .");
            message.reply("Je lance le dé de " + args[0] + " ...").then(sentMessage => setTimeout(function () {
                sentMessage.edit(msg)
            }, 900));
        }
        // shifumi
        if (command === `${prefix}ppc` || command === `${prefix}shifumi`) {
            let member = message.guild.member(message.author).nickname;
            if (member === null)  member = message.author.username;
            let robot = message.guild.member(bot.user.id).nickname;
            if (robot === null)  robot = bot.user.username;
            if (args[0] === undefined) {
                message.reply(`Vous n'avez pas mit de valeur \n Valeurs disponibles : \`pierre , papier , ciseaux\``);
            } else {
                let valeurJoueur;
                let ordinateur;
                let joueur = args[0];
                let joueurAffichage = argsAffichage[0];
                if (joueur !== "pierre"&& joueur!=="pierres" && joueur !== "papier" && joueur !== "ciseaux" && joueur !== "ciseau" && joueur !== "feuilles" && joueur !== "feuille") {
                    message.reply("Je ne connais pas la valeur **"+ joueurAffichage +"**\n Valeurs disponibles : `pierre , papier , ciseaux`");
                }
                if (joueur === "pierre" || joueur === "pierres") {
                    valeurJoueur = 3;
                } else if (joueur === "papier"|| joueur === "feuille") {
                    valeurJoueur = 2;
                } else if (joueur === "ciseaux"|| joueur === "ciseau") {
                    valeurJoueur = 1;
                }
                let valeurOrdinateur = Math.floor((3) * Math.random()) + 1;
                if (valeurOrdinateur === 1) {
                    ordinateur = "Ciseaux";
                } else if (valeurOrdinateur === 2) {
                    ordinateur = "Papier";
                } else if (valeurOrdinateur === 3) {
                    ordinateur = "Pierre";
                }
                if (valeurJoueur === 3 && valeurOrdinateur === 1) {
                    message.channel.send(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + `\n**${message.author} a gagné !** 😉 `);
                } else if (valeurOrdinateur === 3 && valeurJoueur === 1) {
                    message.channel.send(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + "\n**J'ai gagné !** 😛");
                } else if (valeurJoueur === valeurOrdinateur) {
                    message.channel.send(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + "\n**égalité** :sweat_smile: ")
                } else if (valeurJoueur < valeurOrdinateur) {
                    message.channel.send(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + `\n**${message.author} a gagné !** 😉 `);
                } else if (valeurOrdinateur < valeurJoueur) {
                    message.channel.send(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + "\n**J'ai gagné !** 😛");
                }
            }
        }
        //gifs
        let gifs = {
            trump: ["http://wanna-joke.com/wp-content/uploads/2016/06/trump-gif-belgium-city.gif","https://media.giphy.com/media/hPPx8yk3Bmqys/giphy.gif","https://media.giphy.com/media/xTiTnHXbRoaZ1B1Mo8/giphy.gif","https://www.tenor.co/GnfE.gif ",
                "https://www.tenor.co/PgFD.gif", "https://www.tenor.co/yiQN.gif","https://media.giphy.com/media/3o7TKwiaIuMib5WVXO/giphy.gif","https://media1.tenor.com/images/19042a1d74a71a7694c0b9914e3aa29e/tenor.gif?itemid=8557097",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtSA1rCkgEVgNNazRh60NB9SIjweByni-f1K2bp8t1ROm5kxg","https://giphy.com/gifs/someone-run-shooter-iBcLqvp8FMwy3AiPGY","https://www.tenor.co/HdtG.gif",
                "https://orig00.deviantart.net/715a/f/2015/318/9/7/_gif__donald_trump_blasts_off_by_jaders75-d9gqh7w.gif","https://media.giphy.com/media/l41YfnhA7QNddFD0Y/giphy.gif",'https://i.imgur.com/LAyeUCl.gif?noredirect',
                'https://1.bp.blogspot.com/-JD7_vfnxFjY/WYIZTlr8IoI/AAAAAAAA9nY/7sGP6-OvcCofIwTHPt1gxzCz3qJ1xFZugCLcBGAs/s1600/rkM5X.gif','https://static1.squarespace.com/static/56a16fd5d82d5ee027b1b53f/t/5931b8a815cf7da7c1cb767b/1496430802427/?format=500w'],
            nazi: ['https://tenor.com/view/hitler-nazi-gif-7618295','https://tenor.com/view/hitler-dance-gif-4821571','https://i.pinimg.com/originals/35/98/fb/3598fb2eb8a799cbcd970788b69f87f6.gif','https://media.giphy.com/media/wSpM9vIYEvGV2/giphy.gif',
                'https://risibank.fr/cache/stickers/d548/54802-full.gif','https://static.comicvine.com/uploads/original/11133/111330552/6006006-6211688823-giphy.gif',"http://i.imgur.com/09dzfz1.gif",
                'https://tenor.com/view/power-rangers-pose-squad-goals-salute-nazi-salute-gif-3535967',"https://media1.tenor.com/images/811d3eb25249a299b782885d9d7032aa/tenor.gif?itemid=8136511",
                "https://media1.tenor.com/images/1704e632d8535559d69f2f544fdecdda/tenor.gif?itemid=7618295"],
            coco: ["https://media1.tenor.com/images/02625df2d0c38e6e9f8c7a693534d866/tenor.gif?itemid=10179717","https://media0.giphy.com/media/dwLw9DlqI2p1K/200w.gif",'https://i.imgur.com/0TWyD8S.gif','https://www.tenor.co/vLxU.gif',
                'http://4.bp.blogspot.com/-FF3YYFzuWyc/WH5Q4bo6RII/AAAAAAAACMU/zf3NL5VmQXsj2daaSAGan98x9NG9vsp4gCK4B/s1600/8a6813e28358.gif','https://www.tenor.co/vLye.gif','https://www.tenor.co/J5Qb.gif','https://www.tenor.co/RhZE.gif',
                "https://ci.memecdn.com/9957820.gif",'https://media.giphy.com/media/axMy0g9z9khZC/giphy.gif','https://i.imgur.com/lVi8l2L.gif','https://www.youtube.com/watch?v=U06jlgpMtQs'],
            putin: ['https://media.giphy.com/media/Keazl4T0rZ5e0/giphy.gif','https://media1.tenor.com/images/fcfbacf6b056ccadf1dd3727ec93bd7e/tenor.gif?itemid=4716826','https://www.tenor.co/ZlwS.gif','https://www.tenor.co/Eoft.gif',"https://i.gifer.com/9bXA.gif",
                "https://giffiles.alphacoders.com/911/91118.gif",'https://thumbs.gfycat.com/LeanUnawareCirriped-size_restricted.gif',"https://media.giphy.com/media/28w8LiytMv6x2/giphy.gif",'https://www.tenor.co/MLix.gif','https://giphy.com/gifs/isP4TLqhjm3zq'],
            singe: ['https://giphy.com/gifs/next-pFwRzOLfuGHok', 'https://www.tenor.co/PXLU.gif', 'https://www.tenor.co/V2dm.gif', 'https://www.tenor.co/HLUY.gif',
                'https://giphy.com/gifs/funny-cute-lol-26gsspfbt1HfVQ9va', 'https://giphy.com/gifs/monkey-12uB4fsiMsC8V2', 'https://www.tenor.co/xkQv.gif', 'https://www.tenor.co/JM5S.gif', 'https://www.tenor.co/x19S.gif',
                'http://humourtop.com/gifs-animes-droles-de-singes/Bebe_Chimpanze.gif', 'http://humourtop.com/gifs-animes-droles-de-singes/Humour_Gorille.gif', 'https://thumbs.gfycat.com/ReflectingTangibleBlueandgoldmackaw-small.gif',
                'https://media.giphy.com/media/IKv6damwRCkFy/giphy.gif', 'http://gifdrole.com/singes/gorille_rock.gif', "http://media.zenfs.com/fr_FR/News/Francetvinfo.fr/6292545.gif"],
            popcorn: ['https://i.pinimg.com/originals/6d/2f/19/6d2f1933311596e0ad7d349b7e7c2b6f.gif', 'https://media.giphy.com/media/tFK8urY6XHj2w/giphy.gif', 'https://media.giphy.com/media/128UMaujdjX7Pi/giphy.gif',
                'https://media.giphy.com/media/12aW6JtfvUdcdO/giphy.gif', 'https://media.giphy.com/media/TrDxCdtmdluP6/giphy.gif', 'https://media.giphy.com/media/1pw5Hn77ylYxW/giphy.gif',
                'https://giphy.com/gifs/reactiongifs-tyqcJoNjNv0Fq', 'https://giphy.com/gifs/chill-chihuahua-4XSc0NkhKJQhW', 'https://tenor.com/view/nom-eat-eating-snack-popcorn-gif-5369618', 'https://giphy.com/gifs/corn-Znj9tJamHmLoQ ',
                'https://media.giphy.com/media/pUeXcg80cO8I8/giphy.gif', 'https://media.giphy.com/media/l3q2FbmLvAockl43u/giphy.gif', 'https://media.giphy.com/media/UlqLDtI8Qc0j6/source.gif',
                'https://media.giphy.com/media/2ALbeBfUZME4aCdyZg/giphy.gif', 'https://www.reactiongifs.us/wp-content/uploads/2017/12/popcorn.gif'],
            vent: ["https://media.giphy.com/media/UUkxgx7vd7rna/giphy.gif", "https://www.tenor.co/v2d4.gif", "https://www.tenor.co/uf0w.gif", "https://giphy.com/gifs/wind-weather-miami-HmTLatwLWpTQk",
                "https://giphy.com/gifs/silly-storm-edition-G5n8sqIOxBqow", "https://giphy.com/gifs/weatherunderground-storm-weather-d1E1pZ1cdgWmY0hy"],
            shame: ["https://media.giphy.com/media/eP1fobjusSbu/giphy.gif", "https://media0.giphy.com/media/PJeKg31621Wgw/giphy.gif?cid=3640f6095bcc2638632e496d6b11dc38", "https://media.giphy.com/media/vX9WcCiWwUF7G/source.gif",
                "https://media.giphy.com/media/EIUtqBs5nJCXS/giphy.gif", "https://media.giphy.com/media/pDsCoECKh1Pa/giphy.gif", "https://media.giphy.com/media/sC4j83D78rdrW/giphy.gif", "https://www.tenor.co/sraa.gif ",
                "https://media.giphy.com/media/trOcgJrhsUZEY/giphy.gif", "https://media.giphy.com/media/NGV4vAghFiUOA/giphy.gif", "https://media.giphy.com/media/ptXhuH4OrPNok/giphy.gif",
                "https://media.giphy.com/media/Db3OfoegpwajK/giphy.gif", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrO5PvNxjwjQujku_vNje9rBDLo3YVEAABNhtgtgusBtH0XqQyug",
                "https://media.giphy.com/media/InhPEgAQym00g/giphy.gif", "https://data.whicdn.com/images/206500793/original.gif", "https://vignette.wikia.nocookie.net/glee/images/8/81/Shame.gif/revision/latest?cb=20150113225520"],
            chinois: ["https://i.pinimg.com/originals/dc/da/cd/dcdacd4933a604daf37c2e4ca0dae8ad.gif", "https://thumbs.gfycat.com/BestAmpleBinturong-size_restricted.gif", "https://thumbs.gfycat.com/SlimyPerfumedDugong-small.gif", "https://i.imgur.com/H71pvtV.gif",
                "https://www.askideas.com/media/20/Eat-The-Rice-Everyday-Funny-Asian-Gif.gif", "https://static.fjcdn.com/gifs/Chinese_b73fb7_2863548.gif", "https://thumbs.gfycat.com/GeneralTepidHairstreak-size_restricted.gif", "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/funny-geeky-china-swimmer-fu-yuanhui-rio-olympics-3.gif",
                "http://media.topito.com/wp-content/uploads/2014/03/leeb2.gif", "https://giphy.com/gifs/lmao-relatable-bruce-lee-112YQ5P8fp12o0 ", "https://www.tenor.co/wolF.gif "],
            ninja: ["https://giphy.com/gifs/cheezburger-baby-ninja-flip-ErdfMetILIMko", "https://giphy.com/gifs/snl-l1BgSChjSFz3opBAs", "https://giphy.com/gifs/hero-wut-hmxJUEB1xRYPK",
                "https://giphy.com/gifs/ninja-laminutecaprice-en-cas-de-caprice-26h0oZIGGOFZdZj4Q", "https://media.giphy.com/media/ISw0yRECghp1C/giphy.gif", "https://i.gifer.com/1QIm.gif",
                "https://media.giphy.com/media/6Na7w7yHshyvu/giphy.gif", "https://i.gifer.com/2iX9.gif", "https://media.giphy.com/media/epWt2dwVTXrDG/giphy.gif"],
            chat: ["https://media.giphy.com/media/F0eb5L2xJJJNC/giphy.gif", "http://mississippi.m.i.pic.centerblog.net/d80ef475.gif", "http://www.goldenmoustache.com/wp-content/uploads/2015/12/cce986e6a54d4bd578e5bc4c1e24b382.gif",
                "https://78.media.tumblr.com/8d436c65d48daf01fa3fdf0d7dc25686/tumblr_mtszvm8a8q1qbfm1po1_r1_250.gif", "http://aws-cf.imdoc.fr/prod/photos/3/3/2/4472332/21694574/img-21694574ff1.gif?v=11",
                "https://static.mmzstatic.com/wp-content/uploads/2013/08/gifchat18.gif", "https://i.pinimg.com/originals/a1/76/40/a17640a1e2f3971cfab9719d4a1d4a53.gif", "https://i.chzbgr.com/full/8481047040/hDC882EFD/",
                "https://78.media.tumblr.com/eeb645802420d560d808fdb1a9d1474c/tumblr_n06ucvPGX31rmwzkdo1_400.gif", "http://1.bp.blogspot.com/-D-kjWMKPypo/VUYYiu-IqGI/AAAAAAAAI-0/OzL1qlnDYK4/s1600/why-cats-need-9-lives.gif",
                "https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif", "https://media.giphy.com/media/a34HjLEsKchWM/giphy.gif", "https://media.giphy.com/media/Mp592a0PuVzbi/giphy.gif", "https://media.giphy.com/media/elbTBI76GNRp6/giphy.gif",
                "https://data.photofunky.net/output/image/e/b/c/c/ebcc2e/photofunky.gif"],
            fail: ["https://media.tenor.com/images/1b3aa48cfa63240adfef3a61a179bec0/tenor.gif","https://media.giphy.com/media/qV2SRgIGOOEBq/giphy.gif","https://media.giphy.com/media/IRMsZzQVk7Wnu/giphy.gif","https://i.chzbgr.com/full/4102161664/hBC1CB70A/",
                "https://media.giphy.com/media/SoO2i4lvuxEFW/giphy.gif","https://66.media.tumblr.com/770b63520681291d92921aec43b8e60c/tumblr_nh5bbtIEo91sowe88o2_500.gif","http://cdn.emgn.com/wp-content/uploads/2014/02/Hilarious-Fail-Gifs-13.gif",
                "https://list25.com/wp-content/uploads/2015/01/Failgif8.gif","http://www.best-gif.com/wp-content/uploads/2014/05/funny-gifs-The-master-of-Fail.gif","https://heavyeditorial.files.wordpress.com/2014/03/374.gif?w=625",
            "https://www.pbh2.com/wordpress/wp-content/uploads/2013/10/water-balloon-fail.gif","http://thumbpress.com/wp-content/uploads/2013/05/Funniest-Fail-GIFs-29.gif","https://i.gifer.com/6NO.gif"]
        };
        if (command === `${prefix}gif` || command === `${prefix}gifs`) {
            if (args[0] === undefined) {
                let genreMax = (Object.keys(gifs).length);
                let genreChoix = nombreAleatoire(genreMax);
                let genre = Object.keys(gifs)[genreChoix - 1];
                let random = nombreAleatoire(gifs[genre].length);
                let affichargeGifs = gifs[genre][random - 1];
                console.log("commande gifs " + genre + " " + (random - 1));
                setTimeout(function () {
                    message.channel.send(affichargeGifs);
                }, 500);
            } else {
                if (args[0] === "communiste") args[0] = "coco";
                if (args[0] === "corn" || args[0] === "pop") args[0] = "popcorn";
                if (args[0] === "darklos") args[0] = "singe";
                if (args[0] === "bananestar") args[0] = "singe";
                if (args[0] === "help"){
                    let affichageHelp = "";
                    let genreMax = (Object.keys(gifs).length);
                    for (let nom in gifs){
                        affichageHelp += '`'+nom+'`';
                        if ((Object.keys(gifs))[genreMax-1] !== nom) affichageHelp += ' , '
                    }
                    return message.reply("Thèmes disponibles : "+ affichageHelp +".")
                }
                let genre = args[0];
                if (gifs[genre] === undefined){
                    let affichageHelp = "";
                    let genreMax = (Object.keys(gifs).length);
                    for (let nom in gifs){
                        affichageHelp += '`'+nom+'`';
                        if ((Object.keys(gifs))[genreMax-1] !== nom) affichageHelp += ' , '
                    }
                    return message.reply("Il n'y a pas de gif avec le thème **" + argsAffichage[0] +"**\nThèmes disponibles : "+ affichageHelp +".")
                }
                if (args[1] === undefined || isNaN(args[1])) {
                    let random = nombreAleatoire(gifs[genre].length);
                    let affichargeGifs = gifs[genre][random - 1];
                    console.log("commande gifs genre " + argsAffichage[0] + " " + (random - 1));
                    setTimeout(function () {
                        message.channel.send(affichargeGifs);
                    }, 500);
                } else {
                    if (args[1] > gifs[genre].length) return message.reply("Il n'y a que " + gifs[genre].length + " de genre : " + genre);
                    let random = args[1];
                    let affichargeGifs = message.author + " a sélectionné le gif " + argsAffichage[0] + " numéro : " + args[1] + " sur " + gifs[genre].length + " gifs.   " + gifs[genre][random - 1];
                    console.log("commande gifs genre num " + genre + " " + (random - 1));
                    setTimeout(function () {
                        message.channel.send(affichargeGifs);
                    }, 500);
                }
            }
        }
        // invite
        if (command === `${prefix}invite`) {
            setTimeout(function () {
                message.reply("https://discordapp.com/api/oauth2/authorize?client_id=506184450405826562&permissions=0&scope=bot");
            }, 500);
        }
        // invite serveurtest
        if (command === `${prefix}serveurtest` || command === `${prefix}bottest`) {
            setTimeout(function () {
                message.reply("Réponse en MP :wink:");
                message.author.send("voici le lien du serveur Test : https://discord.gg/E3uhqMg");
            }, 500);
        }
        // slots machine a sous
        if (command === `${prefix}slot` || command === `${prefix}slots`) {
            let slots = ["🍎", "🍌", "🍒", "🍓", "🍈", "🍇"];
            let result1 = nombreAleatoire(slots.length-1);
            let result2 = nombreAleatoire(slots.length-1);
            let result3 = nombreAleatoire(slots.length-1);
            let name = message.author.username;
            let aicon = message.author.displayAvatarURL;

            if (slots[result1] === slots[result2] && slots[result3]) {
                let Embed = new Discord.RichEmbed()
                    .setFooter(name +" Tu a gagné !", aicon)
                    .setAuthor(':slot_machine:Slots:slot_machine:')
                    .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
                    .setColor("#c15366");
                message.channel.send(Embed);
            } else {
                let embed = new Discord.RichEmbed()
                    .setFooter(name +' Tu as perdu!', aicon)
                    .setAuthor('Machine à sous')
                    .addField(':slot_machine:Result:slot_machine:', slots[result1] + slots[result2] + slots[result3], true)
                    .setColor("#c15366");
                message.channel.send(embed);
            }

        }
        //bonjour
        if (!message.content.startsWith(prefix)) {
            if (message.author.bot) return;
            const command = message.content.toLocaleLowerCase();
            const auteur = message.author;

            if (command === `bonjour` || command === `salut` || command === `yop` || command === `bonsoir` || command === 'yo' || command === 'wesh' || command === 'coucou' || command === 'slt' || command === 'bjour' || command === 'hola' || command === 'holà' || command === "Salutation"|| command === 'plop') {
                let autorise = nombreAleatoire(10);
                let action = nombreAleatoire(14);
                console.log("bonjour commande " + autorise + " " + action);
                if (autorise >= 1 && autorise <= 3) {
                    console.log("bonjour commande Exécution");
                    setTimeout(function () {
                        if (action === 1) {
                            message.channel.send("Bien le Bonjour " + auteur);
                        }
                        if (action === 2) {
                            message.channel.send("Bijour Monsieur " + auteur)
                        }
                        if (action === 3) {
                            message.channel.send("Yolo !");
                        }
                        if (action === 4) {
                            message.channel.send("Bongour ");
                        }
                        if (action === 5) {
                            message.channel.send("Salut ! Comment vas-tu " + auteur + " ?");
                        }
                        if (action === 6) {
                            message.channel.send("Hey !..");
                        }
                        if (action === 7) {
                            message.channel.send("Salut mon ami :wink:")
                        }
                        if (action === 8) {
                            message.channel.send("Wesh wesh !")
                        }
                        if (action === 9) {
                            message.channel.send("Yo !")
                        }
                        if (action === 10) {
                            message.channel.send("Yop !");
                        }
                        if (action === 11) {
                            message.channel.send("Holà " + auteur + "! ")
                        }
                        if (action === 12) {
                            message.channel.send("Holà quetal ?")
                        }
                        if (action === 13) {
                            message.channel.send("Hello" + auteur)
                        }
                        if (action === 14) {
                            message.channel.send("Plop :wink:")
                        }
                    }, 900);
                }
            }
            if (command === 'fdp') {
                let autorise = nombreAleatoire(10);
                let action = nombreAleatoire(7);
                console.log("fdp commande " + autorise + " " + action);
                if (autorise >= 1 && autorise <= 4) {
                    console.log("fdp commande Exécution");
                    setTimeout(function () {
                        if (action === 1) {
                            message.react("😱");
                        }
                        if (action === 2) {
                            message.react("🙄");
                        }
                        if (action === 3) {
                            message.react("😅");
                        }
                        if (action === 4) {
                            message.react("😄");
                        }
                        if (action === 5) {
                            message.react("❤");
                        }
                        if (action === 6) {
                            message.react("😗");
                        }
                        if (action === 7) {
                            message.react("😮")
                        }
                    }, 900);
                }
            }
        }
        //modif date supremacy
        if (command ===`${prefix}supremacydate`){
            if (message.member.roles.has("&520277234829885455")) return message.reply(`Seul un modo peut faire cette commande.`);
            let dateSupremacy = JSON.parse(fs.readFileSync("./supremacyDate.json", "utf8"));
            let jour = args[0];
            let mois = args[1];
            let annee = args[2];
            dateSupremacy[message.guild.id] = {
                dateSupremacy: annee+"-"+mois+"-"+jour
            };
            fs.writeFile("./supremacyDate.json", JSON.stringify(dateSupremacy), (err) => {
                if (err) console.log(err)
            });
            message.reply("date modifiée");
        }


        //help
        if (command === `${prefix}help`) {
            message.react("🤖");
            message.channel.send(`**${message.author.username}** Je te l'ai envoyé en MP :wink:`);
            const embed = new Discord.RichEmbed()
                .setColor('#c8d83a')
                .setAuthor(`Commande disponible :`)
                .addField(`**${prefix}blah :**`, ` Répond quelque chose aléatoirement`)
                .addField(`**${prefix}quote :**`, `Met les arguments en quote .`)
                .addField(`**${prefix}purge :**`, `Supprime le nombre de messages mis en paramètres.`)
                .addField(`**${prefix}poll :**`, `Pour organiser un vote \n Aussi disponibles: **${prefix}sondage** , **${prefix}sondage**`)
                .addField(`**${prefix}user :**`, `donne les informations sur le joueur mentionner en  paramètre.\n Aussi disponible : **${prefix}userinfo**`)
                .addField(`**${prefix}bot :**`, `donne les informations sur le bot\n Aussi disponible : **${prefix}botinfo**`)
                .addField(`**${prefix}serveur :**`, `donne les informations sur le bot\n Aussi disponible : **${prefix}serveurinfo**`)
                .addField(`**${adminPrefix}serveurs :**`, '*[ seulement créateur]* Liste et identifie mes serveurs')
                .addField(`**${prefix}uptime :**`, "Indique le temps écoulé depuis le démarrage du bot.")
                .addField(`**${prefix}pf :**`, `Pile ou face ? la pièce sera lancée...\n Aussi disponible : **${prefix}pileface**`)
                .addField(`**${prefix}roll :**`, `Lance un dé avec la valeur indiquée .\\n Aussi disponible : **${prefix}dice**\``)
                .addField(`**${prefix}slot :**`, `Lance la machine à sous.`)
                .addField(`**${prefix}ppc :**`, `Pour jouer à Shifumi//pierre-papier-ciseaux \n Aussi disponible : **${prefix}shifumi** .`)
                .addField(`**${prefix}gif :**`, `Affiche un gif de manière aléatoire \n Pour avoir les thèmes **${prefix}gif help**`)
                .addField(`**${prefix}invite**`, "Invite moi sur ton serveur Discord  :wink:")
                .addField(`**${prefix}serveurtest**`, `Je t'invite sur mon serveur de développement :smiley: \nAussi disponible: **${prefix}serveurtest**`)

                .setTimestamp(new Date());
            message.author.send({embed});
        }
    });
bot.on("ready", () => {
    console.log("date supremacy1914 lancée");
    setInterval(function () {
        let dateSupremacy = JSON.parse(fs.readFileSync("./supremacyDate.json", "utf8"));
        let date = new Date;
        let dateJeu = new  Date(dateSupremacy[process.env.serveurID].dateSupremacy);
        let heure = date.getHours();
        let minutes = date.getMinutes();
        let jourJeu = dateJeu.getDate();
        let moisJeu = ["Janvier","Février","Mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","decembre"];
        let anneeJeu = dateJeu.getFullYear();
        if((heure === 0 || heure === 4 || heure === 8 || heure === 12 || heure === 16 || heure === 20 || heure === 24)/*&& minutes === 0*/) {
            bot.guilds.get(process.env.serveurID).channels.get(process.env.channelID).send("nous passons à la date du : " + jourJeu +" " + moisJeu[dateJeu.getMonth()]+" "+ anneeJeu);
            console.log("date supremacy " + dateJeu);
            dateJeu.setDate(dateJeu.getDate() + 1);
            let jour2 = dateJeu.getDate();
            let mois2 = dateJeu.getMonth()+1;
            let annee2 = dateJeu.getFullYear();
            dateSupremacy[process.env.serveurID] = {
                dateSupremacy: annee2+"-"+mois2+"-"+jour2
            };
            fs.writeFile("./supremacyDate.json", JSON.stringify(dateSupremacy), (err) => {
                if (err) console.log(err)
            });
        }
    },10000)
});
bot.login(process.env.TOKEN);
bot.on("error", console.error);
