//  créé par AmByOp
const Discord = require("discord.js");
const bot = new Discord.Client();
const { prefix, VIPprefix, token } = require('./config.json');
const { version } = require('./package');
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
    let resultat;
    let multiplechoix = [Math.floor(Math.random() * nombre+1),Math.floor(Math.random() * nombre+1),Math.floor(Math.random() * nombre+1),Math.floor(Math.random() * nombre+1)];
    let choix = Math.floor(Math.random() * multiplechoix.length);
    let valeur =multiplechoix[choix];
    let randomizer = Math.floor(Math.random() * 2);
    if (randomizer === 1 || valeur === nombre) resultat = valeur;
    else resultat = nombre - valeur;
    return resultat;
}
console.log("Démarrage du bot..." );
bot.on("ready", () => {
    console.log("Connexion à Discord établie !");
    bot.guilds.get("420530737738153984").channels.get("530693686665674763").send(`Connexion à Discord établie !`);
    bot.user.setStatus('online');// online, idle, dnd, invisible
    bot.user.setActivity(`${prefix}help | vient de se connecter`, { type: 'Playing' });
    let compteur = 0;
    setInterval(function () {
        let u = convertMS(bot.uptime);
        let uptime = u.d + " j " + u.h + " h " + u.m + " mins";
        let activites = [`${prefix}help | Créé par AmBiO`,`${prefix}help | v${version}`,`${prefix}invite ,Ajoute moi sur ton serveur 😉`,`${prefix}help | Ping API : ${Math.floor(bot.ping)}ms`,`${prefix}help | fontionne depuis ${uptime}`,`${prefix}help | ${bot.users.size} Utilisateurs`,`${prefix}help | Version : ${version}`,`${prefix}help | ${bot.guilds.size} serveurs`,`Debout depuis ${uptime}`,`${prefix}help`,`${prefix}help | ${bot.channels.size} channels`];
        bot.user.setActivity(activites[compteur], {type: "watching"}); //Playing , Streaming, Watching, Listening
        compteur++;
        if (compteur === activites.length)compteur = 0;
        let date = new Date();
        if (date.getHours() === 0 && date.getMinutes() === 0){// 0h0min
            let rappel = JSON.parse(fs.readFileSync("./rappel.json", "utf8")); //{"nombre":0}
            for (let i in rappel){
                let dateRappel = new Date(rappel[i][3]);
                if ( date.getDate() === dateRappel.getDate() && date.getMonth() === dateRappel.getMonth() && date.getFullYear() === dateRappel.getFullYear()) {
                    bot.guilds.get(rappel[i][1]).channels.get(rappel[i][2]).send(`<&${rappel[i][0]}>,${rappel[i][4]}`);
                    rappel[i] = undefined;
                    console.log('rappel dit');
                    fs.writeFile("./rappel.json", JSON.stringify(rappel), (err) => {
                        if (err) console.log(err)
                    });
                    for (let a in rappel) bot.guilds.get("420530737738153984").channels.get("577408421507366925").send(`&&rappelreponse ${a}:[${rappel[a]}]`).then(msg => msg.delete(60000));
                }
            }
        }
    },60000)//60000
});

bot.on('message', message=>{
    if (message.author.bot && message.content.startsWith(prefix) && message.author.id !== "555377779663831061" ) return message.channel.send(":x: Je ne parle pas aux machines! :x:");
    // le code commence ici
    const args = message.content.toLocaleLowerCase().slice().trim().split(/ +/g);
    const argsAffichage = message.content.slice().trim().split(/ +/g);
    argsAffichage.shift();
    const command = args.shift().toLowerCase();

    //clear
    if (command === `${prefix}clear` || command === `${prefix}purge`) {
        if (message.channel.type === "dm") return  message.channel.send(`**La commande ${command} ne peut pas être utilisée en MP.**`);
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(`Désolé, ${message.author}, vous n'avez pas la permission **Gérer les messages** sur le serveur !!!\nSi vous pensez qu'il s'agit d'une erreur, contactez un administrateur.`)
        } else if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(`Désolé, **${message.author}**, vous n'avez pas la permission **Gérer les messages** sur ce channel !!!\nSi vous pensez qu'il s'agit d'une erreur, contactez un administrateur.`)
        } else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(`Désolé, **${message.author}**, mais je n'ai pas la permission **Gérer les messages** sur ce channel.`)
        } else if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(`Désolé, **${message.author}**, mais je n'ai pas la permission **Gérer les messages** sur ce serveur.`);
        } else if (args[0] === undefined) {
            message.reply(`Vous devez spécifier un nombre de messages à supprimer...\n \`${prefix}clear [Nombre]\``);
        } else if (args[0] < 1) {
            message.reply('Vous devez mettre un nombre supérieur à 0.');
        } else if (args[0] >= 100) {
            message.reply('Discord ne me permet pas de supprimer plus de 100 messages à la fois');
        } else if (isNaN(args[0])) {
            message.reply('Ce n\'est pas un nombre...');
        } else {
            let nombre = Number(args[0]) + 1;
            message.channel.bulkDelete(nombre).then(() => {
                message.channel.send(`:pencil2: **${args[0]} messages** ont été supprimés par **${message.author}**.`).then(msg => msg.delete(3000));
            });
        }
    }
    //quote
    if (command === `${prefix}quote`) {
        if (args.length === 0) {
            message.reply(`vous n\'avez pas mit d\'arguments ...\n \`${prefix}quote [arguments]\``)
        } else {

            setTimeout(function () {
                message.delete();
            }, 5000);
            let texte = argsAffichage.slice(0).join(" ");
            message.channel.send(`**${message.author.username}** annonce :  \`\`\`  ${texte}  \`\`\``);
        }
    }
    //sondage
    if (command === `${prefix}sondage` || command === `${prefix}poll`) {
        console.log("création d'un sondage par "+ message.author.username+"#" + message.author.discriminator +"  (ID:"+ message.author.id+").");
        let question = argsAffichage.slice(0).join(" ");
        if (args.length === 0)
            return message.reply(`Vous avez oublié d'introduire la question .\n \`${prefix}poll [Question]\``);
        const embed = new Discord.RichEmbed()
            .setTitle("Sondage :")
            .setColor("#6dffcf")
            .setDescription(`${question}`)
            .setFooter(`Sondage par: ${message.author.username}`, `${message.author.avatarURL}`);
        setTimeout(function () {
            message.delete();
        }, 4000);
        message.channel.send({embed})
            .then(async function (msg) {
                await msg.react('👍');
                await msg.react('🤷');
                await msg.react('👎');
            })
            .catch(() => console.error('Erreur au chargement des emojis.'));
    }
    //QCM
    if (command === `${prefix}multipoll`|| command === `${prefix}mpoll`) {
        setTimeout(function () {
            message.delete();
        }, 4000);
        console.log("création d'un QCM par "+ message.author.username+"#" + + message.author.discriminator +"  (ID:"+ message.author.id+").");
        let content = argsAffichage.slice(0).join(" ");
        content += "/";
        if (args.length === 0)
            return message.reply(`Vous avez oublié d'introduire la question .\n \`${prefix}qcm <question> / <choix 1> / <choix 2> /...\``);
        let question = "";
        let choix = [];
        let choixCache ='';
        let questionFinie = false;
        let temoinChoix = 0;
        for (let lettreQuestion of content){
            if (!questionFinie) {
                if (lettreQuestion === "/") questionFinie = true ;
                else question += lettreQuestion;
            }
            else{
                if (lettreQuestion === "/" ) {
                    choix.push(choixCache);
                    choixCache ='';
                    temoinChoix++;
                }
                else  choixCache+= lettreQuestion;
            }
        }
        let indicator = ["one","two","three","four","five","six","seven","eight","nine","keycap_ten"];
        let reactIndicator = ["\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3","🔟"];
        if (choix.length > 10)return message.reply("Vous ne pouvez pas avoir plus de 10 choix. *(pour l'instant)*");
        if (choix.length === 0)return message.reply("vous devez mettre différents choix");
        if (choix.length < 2)return message.reply("Un sondage se fait avoir plusieurs choix.");
        for (let a in choix){
            question+= "\n:"+ indicator[a]+":  "+ choix[a];
        }
        const embed = new Discord.RichEmbed()
            .setTitle("Sondage :")
            .setColor("#6dffcf")
            .setDescription(`${question}`)
            .setFooter(`Sondage par: ${message.author.username}`, `${message.author.avatarURL}`);
        message.channel.send({embed})
            .then(async function (message) {
                for (let a in choix) {
                    await message.react(reactIndicator[a])
                }
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
        // défini le membre du serveur
        let member;
        let role = "Vous n'êtes actuellement pas sur un serveur.";
        let surnom = "Vous n'êtes actuellement pas sur un serveur.";
        if (message.channel.type !== "dm"){
            member = message.guild.member(user);
            role = member.roles.map(roles => `${roles}`).join(', ');
            surnom = `${member.nickname !== null ? `${member.nickname}` : 'Aucun'}`
        }
        //liste de mois
        let mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
        // creation utilisateur
        let creationDate = user.createdAt;
        // a rejoint le serveur
        let arriveeDate;
        let arrivee = "Vous n'êtes actuellement pas sur un serveur.";
        if (message.channel.type !== "dm"){
            arriveeDate = member.joinedAt;
            arrivee = arriveeDate.getDate()+' , '+ mois[arriveeDate.getMonth()]+" , "+ arriveeDate.getFullYear();
        }
        // status utilisateur
        let userStatus = user.presence.status;
        let status;
        if (userStatus === "dnd") status = "Ne pas déranger";
        if (userStatus === "idle") status = "Inactif";
        if (userStatus === "online") status = "En ligne";
        if (userStatus === "offline") status = "Déconnecté";
        //Discord rich embed
        const embed = new Discord.RichEmbed()
            .setColor('#daff92')
            .setThumbnail(user.avatarURL)
            .setAuthor(`${user.tag}`)
            .addField("• ID:", `${user.id}`, true)
            .addField('• Pseudo', user.username, true)
            .addField('• Discriminateur', '#' + user.discriminator, true)
            .addField("• Surnom", surnom, true)
            .addField("• a rejoint discord", creationDate.getDate() + ' , ' + mois[creationDate.getMonth()] + " , " + creationDate.getFullYear(), true)
            .addField("• a rejoint le serveur",arrivee,  true)
            .addField("• Bot", `${user.bot}`, true)
            .addField("• Status", status, true)
            .addField("• Activité", `${user.presence.game ? user.presence.game.name : 'Aucune'}`, true)
            .addField("• Rôle(s)", role , true)
            .addField('• Photo de Profil', user.avatarURL, true)
            .setTimestamp(new Date())
            .setFooter(`Réponse à ${message.author.tag}`, `${message.author.avatarURL}`);
        message.channel.send({embed});
    }
// bot
    if (command === `${prefix}botinfo` || command === `${prefix}bot`|| command === `${prefix}info`) {
        // creation bot
        let creationDate = bot.user.createdAt;
        //liste de mois
        let mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
        let msgping1 = new Date();
        let botping = new Date() - message.createdAt;
        let msgping2 = new Date() - msgping1;
        let u = convertMS(bot.uptime);
        let uptime = u.d + " jours : " + u.h + " heures : " + u.m + " minutes : " + u.s + " secondes.";
        let serveurs = bot.guilds.size; // Server Count
        let users = bot.users.size; // User count
        let channels = bot.channels.size; // Channel Count

        let pingembed = new Discord.RichEmbed()
            .setColor("#daff92")
            .setThumbnail(bot.user.displayAvatarURL)
            .setAuthor('• Stats du Bot')
            .addField('• Bot créé par AmByOp', ' https://twitter.com/Ambyop')
            .addField("• Bot créé le", creationDate.getDate() + ' ' + mois[creationDate.getMonth()] + " " + creationDate.getFullYear(), true)
            .addField(`• Version`,version, true)
            .addField(`• Fonctionne depuis`, uptime)
            .addField('• Serveurs', serveurs, true)
            .addField('• Utilisateurs', users, true)
            .addField('• Channels', channels, true)
            .addField('• Message Ping', '~' + Math.round(msgping2) + ' ms', true)
            .addField('• API Ping', Math.floor(bot.ping) + ' ms', true)
            .addField('• Bot Ping', Math.floor(botping) + ' ms', true)
            .setTimestamp(new Date())
            .setFooter(`Réponse à ${message.author.tag}`, `${message.author.avatarURL}`);
        return message.channel.send(pingembed);
    }
    // nbre serveur
    if (command === `${VIPprefix}serveurs`) {
        if (message.author.id !== ownerID) return message.reply(`Seulement un de mes développeurs peut faire cette commande.`);
        let string = '';
        bot.guilds.forEach(guild => {
            string += '***Nom:***  ' + guild.name + '\n' + '*** ID:***  ` ' + guild.id + ' ` ' + '\n\n';
        });
        let botembed = new Discord.RichEmbed()
            .setColor("#cdffda")
            .addField("Listes des serveurs connectés", string)
            .setTimestamp()
            .setFooter("Exécuté par: " + message.author.username, message.author.avatarURL);
        message.channel.send(botembed);
    }
    // serveur info
    if (command === `${prefix}serveurinfo` || command === `${prefix}serveur`) {
        if (message.channel.type === "dm") return  message.channel.send(`**La commande ${command} ne peut pas être utilisée en MP.**`);
        let creation = message.guild.createdAt;
        let mois = ["Janvier","Février","Mars","Avril","mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
        let sicon = message.guild.iconURL;
        //status membres
        let affichageStatusMembre="";
        let online = message.guild.members.filter(o => o.presence.status === 'online').size;
        if(online>0) affichageStatusMembre += `**${online}** En ligne, `;
        let dnd = message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size;
        if(dnd>0) affichageStatusMembre += `**${dnd}** Ne pas déranger, `;
        let idle = message.guild.members.filter(i => i.presence.status === 'idle').size;
        if(idle===1) affichageStatusMembre += `**${idle}** Absent, `;
        if(idle>1) affichageStatusMembre += `**${idle}** Absents, `;
        let offline = message.guild.members.filter(off => off.presence.status === 'offline').size;
        if(online===0) affichageStatusMembre +=`**${offline}** Déconnecté`;
        if(online>1) affichageStatusMembre +=`**${offline}** Déconnectés`;
        let streaming = message.guild.members.filter(s => s.presence.status === 'streaming').size;
        if(streaming>0)affichageStatusMembre += `**${streaming} en stream`;
        // status Emoji
        let serverEmojis = message.guild.emojis.map(e => e).join(', ');
        if(message.channel.guild.emojis.size === 0)serverEmojis = 'Ce serveur n\'a pas d\'émojis personnalisé';
        // status Rôles
        let serverRoles = message.guild.roles.array().map(g => g).join(', ');
        if(message.channel.guild.roles.size === 0) serverRoles = `Ce serveur n'a pas de rôles défini`;

        let serverembed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, sicon)
            .setColor("#ff4871")
            .setThumbnail(sicon)
            .addField("• Nom", message.guild.name, true)
            .addField("• ID", message.guild.id, true)
            .addField("• Propriétaire", message.guild.owner.user, true)
            .addField(`• Créé le`, creation.getDate() + ' , ' + mois[creation.getMonth()] + " , " + creation.getFullYear(),true)
            .addField("• Région", message.guild.region, true)
            .addField("• Salons",`${message.guild.channels.filter(channel => channel.type === 'text').size} Textuels, ${message.guild.channels.filter(channel => channel.type === 'voice').size} Vocaux`,true)
            .addField("• Membres",`${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size} Humains, ${message.guild.members.filter(m => m.user.bot).size} Bots.`, true)
            .addField(" •Status Membres",affichageStatusMembre,false)
            .addField("• Dernier membre",Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).splice(0, 1),true)
            .addField(`• Rôles - **${message.channel.guild.roles.size}**:`, serverRoles, true)
            .addField(`• Emojis - **${message.channel.guild.emojis.size}**:`,serverEmojis, true)
            .setTimestamp(new Date())
            .setFooter(`Réponse à ${message.author.tag}`, `${message.author.avatarURL}`);
        message.channel.send(serverembed);
    }
    //uptime
    if (command === `${prefix}uptime`) {
        let u = convertMS(bot.uptime);
        let uptime = u.d + " jours : " + u.h + " heures : " + u.m + " minutes : " + u.s + " secondes.";
        setTimeout(function () {
            message.reply(`:alarm_clock: ` + `**Je fonctionne depuis :**  ${uptime}`);
        }, 100);
    }
    //pile face
    if (command === `${prefix}pf` || command === `${prefix}pileface`) {
        let valeur = nombreAleatoire(2);
        let piece;
        if (valeur === 1) {
            piece = `Face`
        } else {
            piece = `Pile`
        }
        let msg = (`${message.author}, la pièce indique **${piece}** !`);
        message.channel.send("Je lance la pièce ...").then(sentMessage => setTimeout(function () {
            sentMessage.edit(msg);
        }, 1500));
    }
    //roll
    if (command === `${prefix}roll` || command === `${prefix}de` || command === `${prefix}dice`) {
        if (args[0] === undefined) return message.reply(`vous n'avez pas mit la valeur maximale\n \`${prefix}de [valeur]\``);
        if (isNaN(args[0])) return message.reply('la valeur **'+ argsAffichage +'** n\'est pas un nombre...');
        if (args[0] < 2)return message.reply('la valeur mise doit être supérieure à 2 ...');

        args[0] = Math.round(args[0]);
        let aleatoire = nombreAleatoire(args[0]);
        if (aleatoire === Infinity )return message.reply(`Il y a une infinité de somme possible dans la valeur donnée.`);
        let msg = `${message.author}, tu obtiens **${aleatoire}**. *(dé de ${args[0]}).*`;
        message.channel.send("Je lance le dé de **" + args[0] +"** ...").then(sentMessage => setTimeout(function () {
            sentMessage.edit(msg);
        }, 1500));
    }
    // shifumi
    if (command === `${prefix}ppc` || command === `${prefix}shifumi`) {
        let member = message.guild.member(message.author).nickname;
        if (member === null)  member = message.author.username;
        let robot = message.guild.member(bot.user.id).nickname;
        if (robot === null)  robot = bot.user.username;
        if (args[0] === undefined || args[0] ==="help") {
            if (args[0] === "help") message.reply("Voici les valeurs disponibles : `Pierre , Papier , Ciseaux` ");
            else message.reply(`Vous n'avez pas mit de valeur \n Valeurs disponibles : \`Pierre , Papier , Ciseaux\``);
        } else {
            let affichage = "";
            let valeurJoueur;
            let ordinateur;
            let joueur = args[0];
            let joueurAffichage = argsAffichage[0];
            if (joueur !== "pierre"&& joueur!=="pierres" && joueur !== "papier" && joueur !== "ciseaux" && joueur !== "ciseau" && joueur !== "feuilles" && joueur !== "feuille" && joueur !== "puit" && joueur !== "puits") {
                message.reply("Cette valeur n'existe pas **"+ joueurAffichage +"**\n Valeurs disponibles : `pierre , papier , ciseaux`");
            }
            if (joueur === "pierre" || joueur === "pierres") {
                valeurJoueur = 1;
            } else if (joueur === "papier"|| joueur === "feuille") {
                valeurJoueur = 2;
            } else if (joueur === "ciseaux"|| joueur === "ciseau") {
                valeurJoueur = 3;
            }else if (joueur === "puits" || joueur === "puit"){
                valeurJoueur = 0;
                message.reply("**"+joueur + "** c'est pour les lâches 😛 \n");
            }
            let valeurOrdinateur = Math.floor((3) * Math.random()) + 1;
            if (valeurOrdinateur === 3) {
                ordinateur = "Ciseaux";
            } else if (valeurOrdinateur === 2) {
                ordinateur = "Papier";
            } else if (valeurOrdinateur === 1) {
                ordinateur = "Pierre";
            }
            if (valeurJoueur === 1 && valeurOrdinateur === 3) {
                affichage = new Discord.RichEmbed()
                    .setColor("GREEN")
                    .setDescription(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + `\n**${message.author} a gagné !** 😉 `);
            } else if (valeurOrdinateur === 1 && valeurJoueur === 3) {
                affichage = new Discord.RichEmbed()
                    .setColor("DARK_RED")
                    .setDescription(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + "\n**J'ai gagné !** 😛");
            } else if (valeurJoueur === valeurOrdinateur) {
                affichage = new Discord.RichEmbed()
                    .setColor("BLUE")
                    .setDescription(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + "\n**Egalité** 😗");
            } else if (valeurJoueur > valeurOrdinateur) {
                affichage = new Discord.RichEmbed()
                    .setColor("GREEN")
                    .setDescription(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + `\n**${message.author} a gagné !** 😉 `);
            } else if (valeurOrdinateur > valeurJoueur) {
                affichage = new Discord.RichEmbed()
                    .setColor("DARK_RED")
                    .setDescription(`__${member} :__ ` + joueurAffichage + `\n__${robot} :__ ` + ordinateur + "\n**J'ai gagné !** 😛");
            }
            message.channel.send(affichage);
        }
    }
    //gifs
    let gifs = JSON.parse(fs.readFileSync("./gifs.json", "utf8"));
    if (command === `${prefix}gif` || command === `${prefix}gifs`) {
        setTimeout(function () {
            message.delete();
        }, 2500);
        if (args[0] === undefined) {
            let genreMax = (Object.keys(gifs).length);
            let genreChoix = nombreAleatoire(genreMax);
            let genre = Object.keys(gifs)[genreChoix - 1];
            let random = nombreAleatoire(gifs[genre].length);
            let affichageGifs = gifs[genre][random - 1];
            const embed = new Discord.RichEmbed()
                .setImage(`${affichageGifs}`)
                .setFooter(`GIF envoyé par ${message.author.username}`,`${message.author.avatarURL}`);
            console.log("commande gifs " + genre + " " + (random - 1));
            setTimeout(function () {
                message.channel.send(embed)
            }, 100);
        } else {
            if (args[0] === "coco") args[0] = "communiste";
            if (args[0] === "corn" || args[0] === "pop" || args[0] === "pc") args[0] = "popcorn";
            if (args[0] === "darklos") args[0] = "singe";
            if (args[0] === "clap" || args[0] === 'clapclap') args[0] = "bravo";
            if (args[0] === "john") args[0] = "johnny";
            if (args[0] === "palerm") args[0] = "poule";
            if (args[0] === "spy" || args[0] === "ned" || args[0] === "nedert") args[0] = "espion";
            if (args[0] === "giffle" || args[0] === "giffles" || args[0] === "gifles") args[0] = "gifle";
            if (args[0] === "limorus" || args[0] === "guerre") args[0]= "war";
            if (args[0] === "sel" || args[0] === "salty") args[0]="rage";
            if (args[0] === "dieu" || args[0] === "jesus") args[0] = "god";
            if (args[0] === "ambio") args[0] = "donald";
            if (args[0] === "help"){
                let affichageHelp = "";
                let genreMax = (Object.keys(gifs).length);
                for (let nom in gifs){
                    affichageHelp += '`'+nom+'`';
                    if ((Object.keys(gifs))[genreMax-1] !== nom) affichageHelp += ' , '
                }
                return message.channel.send("__Commandes Gif :__ `"+command+" ((thème) (numero))`\n__Thèmes disponibles :__ "+ affichageHelp +".")
            }
            let genre = args[0];
            if (gifs[genre] === undefined){
                let affichageHelp = "";
                let genreMax = (Object.keys(gifs).length);
                for (let nom in gifs){
                    affichageHelp += '`'+nom+'`';
                    if ((Object.keys(gifs))[genreMax-1] !== nom) affichageHelp += ' , '
                }
                return message.reply("Il n'y a pas de gif de thème **" + argsAffichage[0] +"**\nThèmes disponibles : "+ affichageHelp +".")
            }
            if (args[1] === undefined || isNaN(args[1])) {
                let random = nombreAleatoire(gifs[genre].length);
                let affichageGifs = gifs[genre][random - 1];
                const embed = new Discord.RichEmbed()
                    .setTitle("GIF "+args[0])
                    .setImage(`${affichageGifs}`)
                    .setFooter(`GIF envoyé par ${message.author.username}`,`${message.author.avatarURL}`);
                console.log("commande gifs genre " + argsAffichage[0] + " " + (random - 1));
                setTimeout(function () {
                    message.channel.send(embed)
                }, 100);
            } else {
                if (args[1] > gifs[genre].length) return message.reply("Il n'y a que " + gifs[genre].length + " de genre : **" + genre+"**");
                if (args[1] < 1) return message.reply("Il n'y a pas de gifs avant le premier ! :joy:");
                let choix = args[1];
                let titre = "*Gif du thème *" + argsAffichage[0] + "* numéro : " + args[1] + " sur " + gifs[genre].length + " gifs.";
                let affichageGifs = gifs[genre][choix - 1];
                const embed = new Discord.RichEmbed()
                    .setTitle("GIF "+args[0]+", "+ args[1]+" / "+ gifs[genre].length)
                    .setImage(`${affichageGifs}`)
                    .setFooter(`GIF envoyé par ${message.author.username}`,`${message.author.avatarURL}`);
                console.log("commande gifs genre num " + genre + " " + (titre - 1));
                setTimeout(function () {
                    message.channel.send(embed)
                }, 100);
            }
        }
    }
    // invite
    if (command === `${prefix}invite`) {
        setTimeout(function () {
            message.reply("https://discordapp.com/api/oauth2/authorize?client_id=506184450405826562&permissions=257088&scope=bot");
        }, 100);
    }
    // slots machine a sous
    if (command === `${prefix}slot` || command === `${prefix}slots`) {
        if(args[0] === 'help') return message.reply(`Difficultés disponibles : \`${command}\`, \`${command} hard\`, \`${command} hard+\`, \`${command} darklos\``);
        let slots = ["🍎","🍒","🍌","🍇","🍓","🍀","🍏","🍑","🌹",":seven:"];
        if (args[0] === 'hard' || args[0] === 'dur'){
            let slotsAdd = ["🍿","🎲","⚔","🔑","🎁","🍠","🍟","🍔",":flag_be:",":flag_fr: "];
            for (let icone in slotsAdd){
                slots.push(slotsAdd[icone]);
            }
        }
        if (args[0] === 'hard+' || args[0] === 'dur+'){
            let slotsAdd = ["🍿","🎲","⚔","🔑","🎁","🍠","🍟","🍔",":flag_be:",":flag_fr:","✌","🌜","💡","☘","🥕","💛","💜","🚗","🍰","🖖"];
            for (let icone in slotsAdd){
                slots.push(slotsAdd[icone]);
            }
        }
        if (args[0] === 'darklos') slots = ["🥜","🐵","🐒","🙊","🙉","🙈","🍌"];
        let result1 = nombreAleatoire(slots.length-1);
        let result2 = nombreAleatoire(slots.length-1);
        let result3 = nombreAleatoire(slots.length-1);
        let name = message.author.username;

        if ((slots[result1] === slots[result2])&&( slots[result1] === slots[result3])) {
            let Embed = new Discord.RichEmbed()
                .setAuthor('Machine à sous')
                .addField(`:slot_machine:**Résultats**:slot_machine:`,`${slots[result1] + slots[result2] + slots[result3]} \n\n**${name}**, **JACKPOT !**`)
                .setFooter(`(Jackpot : 1 /${slots.length*slots.length*slots.length})`)
                .setColor("GREEN");
            message.channel.send(Embed)
        }
        else if (slots[result1] === slots[result2] && slots[result3]) {
            let Embed = new Discord.RichEmbed()
                .setAuthor('Machine à sous')
                .addField(`:slot_machine:**Résultats**:slot_machine:`,`${slots[result1] + slots[result2] + slots[result3]} \n\n**${name}**, Tu as gagné !`)
                .setFooter(`(Jackpot : 1 /${slots.length*slots.length*slots.length})`)
                .setColor("BLUE");
            message.channel.send(Embed);
        } else {
            let embed = new Discord.RichEmbed()
                .setAuthor('Machine à sous')
                .addField(`:slot_machine:**Résultats**:slot_machine:`,`${slots[result1] + slots[result2] + slots[result3]} \n\n**${name}**, Tu as perdu !`)
                .setFooter(`(Jackpot : 1 /${slots.length*slots.length*slots.length})`)
                .setColor("DARK_RED");
            message.channel.send(embed);
        }
    }
    //arrêt du bot
    if(message.content === `${VIPprefix}stop`) {
        if (message.author.id === ownerID) {
            message.react("🛑");
            message.reply(`:x: Arrêt du bot jusqu'au prochain redémarrage automatique. :x:`);
            bot.destroy();
            bot.destroy();
        } else {
            message.channel.send("Seulement un de mes développeurs peut faire cette commande !")
        }
    }
    //article anonymes
    if (command === `${prefix}an`|| command === `${prefix}articleanonyme`) {
        if(message.channel.type !== "dm") {
            if (message.guild.id !== '448152530065817602' && message.guild.id !== '455748758798336050' && message.guild.id !== '420530737738153984') return message.reply('Cette commande n\'est pas disponible sur ce serveur');
        }
        const auteur = message.author;
        console.log(`création d'un article anonyme par ${auteur.username}#${auteur.discriminator}`);
        let article = argsAffichage.slice(0).join(" ");
        if (args.length === 0){
            message.delete();
            message.channel.send(`Vous avez oublié d'introduire l'article .\n \`${prefix}an [Article]\``).then(msg => msg.delete(100));
            return message.author.send(`Vous avez oublié d'introduire l'article .\n \`${prefix}an [Article]\``).then(msg => msg.delete(70000));
        }
        let id = "AR" + Date.now();
        const embed = new Discord.RichEmbed()
            .setTitle(`Article Anonyme :`)
            .setColor("RANDOM")
            .setDescription(`${article}`)
            .setTimestamp(new Date())
            .setFooter(`Id de l'article: ${id}`);
        message.delete();
        //bot.guilds.get("420530737738153984").channels.get("532100632484511776").send(`Article **${id}** envoyé par @${auteur.username}#${auteur.discriminator}  ID: ${message.author.id}`);//channel serveur test
        bot.guilds.get("450360893931388938").channels.get("572844442382499840").send(`Article **${id}** envoyé par @${auteur.username}#${auteur.discriminator}  ID: ${message.author.id}`);//channel communauté RP
        message.channel.send(embed)
            .then(msg => {
                msg.react('📰')
            })
            .catch(() => console.error('Erreur au chargement des emojis.'));
        setTimeout(function () {
            message.channel.send(`((__Si vous avez vu qui est l'auteur de ce message, sachez que l'accusation sera non-recevable sans preuve RP.))__\n(ce message sera supprimé dans 2minutes)`).then(msg => msg.delete(120000));
        },5)
    }
    //image anonyme
    if (command === `${prefix}imageanonyme` || command === `${prefix}ia`) {
        if(message.channel.type !== "dm") {
            if (message.guild.id !== '448152530065817602' && message.guild.id !== '455748758798336050' && message.guild.id !== '420530737738153984') return message.reply('Cette commande n\'est pas disponible sur ce serveur');
        }
        const auteur = message.author;
        console.log(`création d'une anonyme par ${auteur.username}#${auteur.discriminator}`);
        let image = argsAffichage.slice(0).join(" ");
        if (args.length === 0){
            message.delete();
            message.channel.send(`Vous avez oublié d'introduire l'image .\n \`${prefix}ia [URL de l'image]\``).then(msg => msg.delete(100));
            return message.author.send(`Vous avez oublié d'introduire l'image .\n \`${prefix}ia [URL de l'image]\``).then(msg => msg.delete(70000));
        }
        let id = "IM" + Date.now();
        const embed = new Discord.RichEmbed()
            .setTitle(`Image Anonyme :`)
            .setColor("RANDOM")
            .setImage(`${image}`)
            .setTimestamp(new Date())
            .setFooter(`Id de l'image: ${id}`);
        message.delete();
        //bot.guilds.get("420530737738153984").channels.get("532100632484511776").send(`Image **${id}** envoyée par @${auteur.username}#${auteur.discriminator}  ID: ${message.author.id}`);//channel serveur test
        bot.guilds.get("450360893931388938").channels.get("572844442382499840").send(`Image **${id}** envoyé par @${auteur.username}#${auteur.discriminator}  ID: ${message.author.id}`);//channel communauté RP
        message.channel.send(embed)
            .then(msg => {
                msg.react('🖼')
            })
            .catch(() => {bot.guilds.get("450360893931388938").channels.get("572844442382499840").send(`L'image de @${auteur.username}#${auteur.discriminator} n'est pas valide'`);
                message.channel.send(`L'URL de l'image n'est pas valide... \n \`${prefix}ia [URL de l'image]\` `).then(msg => msg.delete(100));
                message.author.send(`L'URL de l'image n'est pas valide... \n \`${prefix}ia [URL de l'image]\``).then(msg => msg.delete(70000));
            });
        setTimeout(function () {
            message.channel.send(`((__Si vous avez vu qui est l'auteur de ce message, sachez que l'accusation sera non-reçevable sans preuve RP.))__\n(ce message sera supprimé dans 2 minutes)`).then(msg => msg.delete(120000));
        },5)
    }
    //bonjour
    if (!message.content.startsWith(prefix)) {
        if (message.author.bot) return;
        let auteurListe = [message.author,message.author.username];
        if(message.channel.type !== "dm") {
            if (message.guild.member(message.author).nickname != null) auteurListe.push(message.guild.member(message.author).nickname);
        }
        const auteur = auteurListe[nombreAleatoire(auteurListe.length)-1];
        let mention = false;
        let oui = false;
        if (message.isMentioned(bot.user)) mention = true;
        if (args[0] && mention === false)return false;
        if (oui || command === `bonjour` || command === `bjr` || command === `salut` || command === `hey` || command === `yop` || command === `bonsoir` || command === `bsr` || command === 'yo' || command === 'wesh' || command === 'coucou' || command === 'cc' ||
            command === 'slt' || command === 'bjour' || command === 'hola' || command === 'holà' || command === "salutation"|| command === 'plop'|| command === 'hello' || command ==="chalut" || command ==="hellow" || command ===`salutation` || command === "Aloha" ||
            command === `salutations` || command === 'aloa'|| command === 'bijour'|| command === 'weshwesh' || command === 'wesh wesh' || command === 'kikou' || command === 'kikoo') {
            let autorise = nombreAleatoire(100);
            if (autorise > 0 && autorise < 36 || mention) {
                message.channel.startTyping();
                let bonjour = [`Bien le bonjour ${auteur}`,`Bijour Bijour, ${auteur}`,`Salut à toi mon brave ${auteur}`,`Bijour monsieur ${auteur}`,`Yolo ! 😁`,`Bonjour 😁`,`Yolo !`,`Salut comment-va ? ${auteur}`,"Salutations aventurier!",
                    "Salutations Voyageur !","Bonjour voyageur","Holà aventurier!","Hello, stranger.","Salutation, Etranger.","Bienvenue voyageur","PTDR T KI?",
                    'Hello it\'s me...','https://www.unrulystowaway.com/wp-content/uploads/2018/07/Hello-Darkness-Affleck.jpg','hello darkness my old friend','Hello How are you ?',`Hello, ${auteur} how are you ?`,'Salut , ça boum ?  :bomb:',
                    "Belle journée, pas vrai ?","Pour la horde !",`Et.... Vous êtes ?`,`Salut ${auteur}`,`Salut ! Comment vas-tu ?`,`Salut ${auteur} ! Comment vas-tu ?`,`Hello there`,`Hey !..`,`Salut mon pote 😊`,`Wesh Wesh !!`,`Yo !`,`Yop !`,
                    `Arthour Couillère !!!!\n https://thumbs.gfycat.com/FineOilyGrebe-small.gif`,`Yo ${auteur} !`,`Yop ${auteur} !`,`Holà ${auteur} !`,`Hola, cómo estás ?`,`Hola quetal ?`,`Buenos dias`,`hallo hoe gaat het met jouw ?`,`Dag !`,
                    `Hallo ${auteur}`,`Au revoir...:rolling_eyes:`, `Longue vie et prospérité ${auteur} 🖖`,`Flop :wink:`,`Hi`,`plop ${auteur}`,`Plop !`,`Hello ${auteur}`,`Hello there ! https://tenor.com/NMDa.gif`,`-Hello There !\n-General Kenobi !`,
                    `Hi How are you?`,`Hi, ${auteur}, how are you?`,`Yo ${auteur} !`,"Chalut","Chalut cha va?",`chalut ${auteur}, cha va?`,"Chalut comment allez-vouche ?","Chalut comment vas-tuche ?","Coucou :wave:",":wave:",":wave::wave:",
                    `:wave: ${auteur}`,`:wave: ${auteur}`,`${auteur} :wave:`,"bonjour bonjour","Bonjour toi :O","Salutations distinguées !",`-Hello There !\n-General ${message.username} !`,"Bonjour les enfants","Aloha",`Aloha ${auteur}`,
                    `Salutations vénérable ${auteur}`,"Hellooow",`Hellooow ${auteur}`,`Hello, How are you?`,`Hello ${auteur}, how are you?`,`Salut ${auteur}, comment vas-tu?`,`I turned myself into a pickle. I'm Pickle Booooot`,`I turned myself into a Human. I'm HumanBooooot`,
                    `Kikou !`,`Kikou 😁`,`Kikoo`,`Kikou ${auteur} 😄`,`Ami du jour, Bonjour !`,`Ami du soir, Bonsoir !`,`Ami du jour, Bonjour 🌞`,`Ami du soir, Bonsoir 🌜`];
                let action = nombreAleatoire(bonjour.length)-1;
                console.log(`Bonjour commande,autorisé ${autorise}, numero ${action}`);
                setTimeout(function () {
                    message.channel.send(bonjour[action]);
                    message.channel.stopTyping();
                }, 500);
            }
        }
    }
    //salons
    if (command === `${prefix}channel` || command === `${prefix}salon`){
        if (message.channel.type === "dm") return  message.channel.send(`**La commande ${command} ne peut pas être utilisée en MP.**`);
        let chan = JSON.parse(fs.readFileSync("./channel.json", "utf8"));
        if (message.guild.id !== '448152530065817602' && message.guild.id !== '455748758798336050' && message.guild.id !== '420530737738153984') return message.reply('Cette commande n\'est pas disponible sur ce serveur');
        if (!message.guild.member(bot.user).hasPermission("MANAGE_CHANNELS"))return message.reply("Je n'ai pas la permission de faire des channels, demande à un modo de mieux configurer mes permissions.");
        let utilisateur = message.author.username;
        if(chan[utilisateur]=== undefined) chan[utilisateur] = 1;
        console.log(chan);
        setTimeout(function () {
            message.delete();
        }, 1);
        let server = message.guild;
        let nom = 'salon de '+ utilisateur + " "+ chan[utilisateur];
        server.createChannel(nom , 'text').then( // Create the actual voice channel.
            (nouveauChannel) => {
                nouveauChannel.send(`${message.author}, Ton channel est ici.`);
                nouveauChannel.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
                    'READ_MESSAGES' : false,'CREATE_INSTANT_INVITE' : false,
                    'SEND_TTS_MESSAGES': false,'MANAGE_MESSAGES': false,
                    'EXTERNAL_EMOJIS': false }); // Give the channel some standard permissions.
                nouveauChannel.overwritePermissions(message.author.id, {
                    'CREATE_INSTANT_INVITE' : false,        'ADD_REACTIONS': true,
                    'READ_MESSAGES': true,                  'SEND_MESSAGES': true,
                    'SEND_TTS_MESSAGES': false,              'MANAGE_MESSAGES': false,
                    'EMBED_LINKS': true,                    'ATTACH_FILES': true,
                    'READ_MESSAGE_HISTORY': true,           'MENTION_EVERYONE': true,
                    'EXTERNAL_EMOJIS': false,                'MANAGE_CHANNELS': true,
                    'MANAGE_ROLES': true
                });
            }
        ).catch(console.error);
        chan[utilisateur]+=1;
        fs.writeFile("./channel.json", JSON.stringify(chan), (err) => {
            if (err) console.log(err)
        });
    }
    //vocal
    if (command === `${prefix}vocal` ){
        if (message.channel.type === "dm") return  message.channel.send(`**La commande ${command} ne peut pas être utilisée en MP.**`);
        let chan = JSON.parse(fs.readFileSync("./channel.json", "utf8"));
        if (message.guild.id !== '448152530065817602' && message.guild.id !== '455748758798336050' && message.guild.id !== '420530737738153984') return message.reply('Cette commande n\'est pas disponible sur ce serveur');
        if (!message.guild.member(bot.user).hasPermission("MANAGE_CHANNELS"))return message.reply("Je n'ai pas la permission de faire des channels, demande à un modo de mieux configurer mes permissions.");
        let utilisateur = message.author.username;
        if(chan[utilisateur]=== undefined) chan[utilisateur] = 1;
        console.log(chan);
        setTimeout(function () {
            message.delete();
        }, 1);
        let server = message.guild;
        let nom = 'Vocal de '+ utilisateur + " - "+ chan[utilisateur];
        server.createChannel(nom , 'voice').then( // Create the actual voice channel.
            (nouveauChannel) => {
                nouveauChannel.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
                    'CREATE_INSTANT_INVITE' : false, 'CONNECT': false, 'SPEAK': false,'READ_MESSAGES': true,
                }); // Give the channel some standard permissions.
                nouveauChannel.overwritePermissions(message.author.id, {
                    'CREATE_INSTANT_INVITE' : false,        'ADD_REACTIONS': true,
                    'READ_MESSAGES': true,                  'SEND_MESSAGES': true,
                    'SEND_TTS_MESSAGES': false,              'MANAGE_MESSAGES': false,
                    'EMBED_LINKS': true,                    'ATTACH_FILES': true,
                    'READ_MESSAGE_HISTORY': true,           'MENTION_EVERYONE': true,
                    'EXTERNAL_EMOJIS': false,                'MANAGE_CHANNELS': true,
                    'MANAGE_ROLES': true, 'CONNECT': true, 'SPEAK': true
                });
            }
        ).catch(console.error);
        message.reply('ton channel vocal a été créé');
        chan[utilisateur]+=1;
        fs.writeFile("./channel.json", JSON.stringify(chan), (err) => {
            if (err) console.log(err)
        });
    }
    //même
    let meme = JSON.parse(fs.readFileSync("./memes.json", "utf8"));
    //mêmes
    if (command === `${prefix}bananestar`|| command === `${prefix}bs` || command === `${prefix}meme`){
        setTimeout(function () {
            message.delete();
        }, 4000);
        let genre= 'bananestar';
        if (args[0] === undefined || isNaN(args[0])) {
            let random = nombreAleatoire(meme[genre].length);
            let affichageMemes = meme[genre][random - 1];
            const embed = new Discord.RichEmbed()
                .setTitle("Même")
                .setImage(`${affichageMemes}`)
                .setFooter(`Même envoyé par ${message.author.username}`,`${message.author.avatarURL}`);
            console.log("Commande même genre " + " " + (random - 1));
            setTimeout(function () {
                message.channel.send(embed)
            }, 100);
        } else {
            if (args[0] > meme[genre].length) return message.reply("Il n'y a que " + meme[genre].length + "mêmes. ");
            if (args[0] < 1) return message.reply("Il n'y a pas de même avant le premier ! :joy:");
            let choix = args[0];
            let titre = "*Même numéro : " + args[0] + " sur " + meme[genre].length + " mêmes.";
            let affichageMemes = meme[genre][choix - 1];
            const embed = new Discord.RichEmbed()
                .setTitle("Même, " + args[0] + " / " + meme[genre].length)
                .setImage(`${affichageMemes}`)
                .setFooter(`Même envoyé par ${message.author.username}`, `${message.author.avatarURL}`);
            console.log("commande même genre num " + genre + " " + (titre - 1));
            setTimeout(function () {
                message.channel.send(embed)
            }, 100);
        }
    }
    //bananestarVid
    if (command === `${prefix}bananestarvid`|| command === `${prefix}bsv`){
        if (message.channel.type === "dm") return  message.channel.send(`**La commande ${command} ne peut pas être utilisée en MP.**`);
        if (message.guild.id !== '420530737738153984' && message.guild.id !== '224273127549566978') return message.reply('Cette commande n\'est pas disponible sur ce serveur');
        setTimeout(function () {
            message.delete();
        }, 4000);
        let genre= 'bananestarVid';
        if (args[0] === undefined || isNaN(args[0])) {
            let random = nombreAleatoire(meme[genre].length);
            let affichageVid = meme[genre][random - 1];
            console.log("Commande même genre " + " " + (random - 1));
            setTimeout(function () {
                message.channel.send(`Vidéo envoyée par ${message.author.username}\n ${affichageVid}`)
            }, 100);
        } else {
            if (args[0] > meme[genre].length) return message.reply("Il n'y a que " + meme[genre].length + "même de genre : **" + genre + "**");
            if (args[0] < 1) return message.reply("Il n'y a pas de même avant le premier ! :joy:");
            let choix = args[0];
            let titre = "*Vidéo du thème *"  + "* numéro : " + args[0] + " sur " + meme[genre].length + " même.";
            let affichageVid = meme[genre][choix - 1];
            console.log("commande même genre num " + genre + " " + (titre - 1));
            setTimeout(function () {
                message.channel.send(`Vidéo numéro ${args[0]} sur ${meme[genre].length} vidéos. Envoyé par ${message.author.username}\n ${affichageVid}`)
            }, 100);
        }
    }
    //têtes atomcorp
    let atomCorp = JSON.parse(fs.readFileSync("./atomcorp.json", "utf8"));
    if (command === `${prefix}ac`|| command === `${prefix}atomcorp`){
        if (message.channel.type === "dm") return  message.channel.send(`**La commande ${command} ne peut pas être utilisée en MP.**`);
        if (message.guild.id !== '420530737738153984' && message.guild.id !== '224273127549566978') return message.reply('Cette commande n\'est pas disponible sur ce serveur');
        setTimeout(function () {
            message.delete();
        }, 2500);
        if (args[0] === undefined) {
            let genreMax = (Object.keys(atomCorp).length);
            let genreChoix = nombreAleatoire(genreMax);
            let genre = Object.keys(atomCorp)[genreChoix - 1];
            let random = nombreAleatoire(atomCorp[genre].length);
            let affichageTetes = atomCorp[genre][random - 1];
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setImage(`${affichageTetes}`)
                .setFooter(`tête envoyée par ${message.author.username}`,`${message.author.avatarURL}`);
            console.log("commande atomcorp " + genre + " " + (random - 1));
            setTimeout(function () {
                message.channel.send(embed)
            }, 100);
        } else {
            if (args[0] === "simon") args[0] = "banane";
            if (args[0] === "william" || args[0] === "wil" || args[0] === "willy") args[0] = "ambio";
            if (args[0] === "aymeric") args[0] = "hexost";
            if (args[0] === "kevin" || args[0] === 'nevo067' || args[0]=== 'keke') args[0] = "nevo";
            if (args[0] === "ryu") args[0] = "ryubii";
            if (args[0] === "thomas") args[0] = "thomastark";
            if (args[0] === "arthur") args[0] = "unicorn";
            if (args[0] === "help"){
                let affichageHelp = "";
                let genreMax = (Object.keys(atomCorp).length);
                for (let nom in atomCorp){
                    affichageHelp += '`'+nom+'`';
                    if ((Object.keys(atomCorp))[genreMax-1] !== nom) affichageHelp += ' , '
                }
                return message.reply("__Commandes atomcorp :__ `"+command+" ((thème) (numero))`\n__Thèmes disponibles :__ "+ affichageHelp +".")
            }
            let genre = args[0];
            if (atomCorp[genre] === undefined){
                let affichageHelp = "";
                let genreMax = (Object.keys(atomCorp).length);
                for (let nom in atomCorp){
                    affichageHelp += '`'+nom+'`';
                    if ((Object.keys(atomCorp))[genreMax-1] !== nom) affichageHelp += ' , '
                }
                return message.reply("Je n'ai pas la tête de **" + argsAffichage[0] +"**\nTêtes disponibles : "+ affichageHelp +".")
            }
            if (args[1] === undefined || isNaN(args[1])) {
                let random = nombreAleatoire(atomCorp[genre].length);
                let affichageTetes = atomCorp[genre][random - 1];
                const embed = new Discord.RichEmbed()
                    .setTitle("Tête de "+args[0])
                    .setColor("RANDOM")
                    .setImage(`${affichageTetes}`)
                    .setFooter(`Tête envoyée par ${message.author.username}`,`${message.author.avatarURL}`);
                console.log("commande bs genre " + argsAffichage[0] + " " + (random - 1));
                setTimeout(function () {
                    message.channel.send(embed)
                }, 100);
            } else {
                if (args[1] > atomCorp[genre].length) return message.reply("Il n'y a que " + atomCorp[genre].length + "tête(s) de **" + genre+"**");
                if (args[1] < 1) return message.reply("Il n'y a pas de tête avant la première ! :joy:");
                let choix = args[1];
                let titre = "*Tête de *" + argsAffichage[0] + "* numéro : " + args[1] + " sur " + atomCorp[genre].length + " têtes.";
                let affichageTetes = atomCorp[genre][choix - 1];
                const embed = new Discord.RichEmbed()
                    .setTitle("tête "+args[0]+", "+ args[1]+" / "+ atomCorp[genre].length)
                    .setColor("RANDOM")
                    .setImage(`${affichageTetes}`)
                    .setFooter(`Têtes envoyée par ${message.author.username}`,`${message.author.avatarURL}`);
                console.log("commande bs genre num " + genre + " " + (titre - 1));
                setTimeout(function () {
                    message.channel.send(embed)
                }, 100);
            }
        }
    }
    //date supremacy
    if(command === `${VIPprefix}demsup`){
        let dateSupremacy = JSON.parse(fs.readFileSync("./supremacyDate.json", "utf8"));
        console.log(dateSupremacy);
        for(let serveurID in dateSupremacy){
            message.channel.send(`&&repsup ${serveurID}  ${dateSupremacy[serveurID][0]} ${dateSupremacy[serveurID][1]}`)
        }
    }
    if(command===`${VIPprefix}datesuprep`){
        let dateSupremacy = JSON.parse(fs.readFileSync("./supremacyDate.json", "utf8"));
        if (!args[1]) return message.reply(`date non valide`);
        dateSupremacy[args[0]] = [args[1],args[2]];
        fs.writeFile("./supremacyDate.json", JSON.stringify(dateSupremacy), (err) => {
            if (err) console.log(err)
        });
        message.channel.send(`Informations reçues par ${message.author}`);
        console.log(dateSupremacy);
    }
    //demineur
    const numberEmoji = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];
    function demineur(largeurDemineur, hauteurDemineur, nbrMines, message) {

        // vérif taille de la grille
        if (isNaN(largeurDemineur)) {
            largeurDemineur = 8;
        }
        else if (largeurDemineur <= 0 || hauteurDemineur <= 0) {
            return "Oh, Désolé je ne suis pas capable de générer une grille avec des côtés négatifs . Je ne sais utiliser que des nombres positifs... Désolé :cry:;"
        }
        if (isNaN(hauteurDemineur)) {
            hauteurDemineur = 8;
        }
        else if (largeurDemineur > 40 || hauteurDemineur > 20) {
            return "La grille est beaucoup trop grande ! Pense aux personnes sur mobiles qui ne seront pas la lire !";
        }
        // vérif nombres de mines
        if (isNaN(nbrMines)) {
            nbrMines = Math.round(largeurDemineur * hauteurDemineur / 5);
        }
        else {
            if (nbrMines <= 0) {
                return "T'as vraiment cru que j'allais te laisser jouer une partie sans aucune mine? :joy:";
            }
            else if (nbrMines > largeurDemineur * hauteurDemineur) {
                return "Je ne peux pas mettre plus de bombes qu'il n'y a de cases disponibles dans le jeu";
            }
        }
        // génère la matrice (2D) , -1 = mine , autres nombre = mines dans les environs.
        var game = [];

        for (let y = 0; y < hauteurDemineur; y++) {
            game.push([]);
            for (let x = 0; x < largeurDemineur; x++) {
                game[y].push(0);
            }
        }
        // PLacement des mines
        for (var mine = 0; mine < nbrMines; mine++) {
            var x = Math.floor(Math.random()*largeurDemineur),
                y = Math.floor(Math.random()*hauteurDemineur);

            // Recommencer si il y a déjà une mine
            if (game[y][x] === -1) {
                mine--;
                continue;
            }

            game[y][x] = -1;

            // incremente de 1 les cases voisines
            if (x > 0                && y > 0             && game[y-1][x-1] !== -1) { game[y-1][x-1]++; }
            if (                        y > 0             && game[y-1][x  ] !== -1) { game[y-1][x  ]++; }
            if (x < game[y].length-1 && y > 0             && game[y-1][x+1] !== -1) { game[y-1][x+1]++; }
            if (x < game[y].length-1                      && game[y  ][x+1] !== -1) { game[y  ][x+1]++; }
            if (x < game[y].length-1 && y < game.length-1 && game[y+1][x+1] !== -1) { game[y+1][x+1]++; }
            if (                        y < game.length-1 && game[y+1][x  ] !== -1) { game[y+1][x  ]++; }
            if (x > 0                && y < game.length-1 && game[y+1][x-1] !== -1) { game[y+1][x-1]++; }
            if (x > 0                                     && game[y  ][x-1] !== -1) { game[y  ][x-1]++; }
        }

        // Creation du message
        let returnTxt;
        if (nbrMines === 1) { returnTxt = "Voici une grille de " + largeurDemineur + " sur " + hauteurDemineur + " avec une seule mine:"; }
        else                { returnTxt = "Voici une grille de " + largeurDemineur + " sur " + hauteurDemineur + " avec " + nbrMines + " mines:"; }

        for (let y = 0; y < game.length; y++) {
            returnTxt += "\n";
            for (let x = 0; x < game[y].length; x++) {
                if (game[y][x] === -1) {
                    returnTxt += "||:bomb:||";
                }
                else {
                    returnTxt += "||" + numberEmoji[game[y][x]] + "||";
                }
            }
        }

        // Envoie le message si pas trop long <2000 caractères
        if (returnTxt.length <= 2000) {
            return returnTxt;
        }

        // Sinon diviser le message
        let splitReturns = [];
        do {
            let splitIndex = returnTxt.substring(0, 1900).lastIndexOf("\n");
            if (splitIndex === -1) {
                console.log("Un message trop long a été envoyé après avoir créé le démineur");
                return "Désolé, mais votre message semble trop long a envoyé, essayer un plus court la prochaine fois.";
            }
            splitReturns.push(returnTxt.substring(0, splitIndex));
            returnTxt = returnTxt.substring(splitIndex+1);
        } while (returnTxt.length > 1900);

        splitReturns.push(returnTxt);

        // Envoyer les messages un par un
        let i = 0;
        function sendNextMessage() {
            if (i < splitReturns.length) { message.channel.send(splitReturns[i++]).then(sendNextMessage, console.log()); }
        }
        sendNextMessage();
    }
    if(command === `${prefix}demineur`){
        if(args[0] === "help")return message.reply(`Fonctionnement du jeu : \`${prefix}demineur [largeur] [hauteur] [nombre de mines]\``);
        let largeur = args[0];
        let hauteur = args[1];
        let mines = args[2];
        /*const embed = new Discord.RichEmbed()
            .setDescription(demineur(largeur,hauteur,mines,message))
            .setTitle("Demineur")
            .setColor('RANDOM')
            .setFooter("test");
        message.channel.send(embed);*/
        message.channel.send(demineur(largeur,hauteur,mines,message))
    }
    if(command === `${prefix}suggestion` || command === `${prefix}idee`|| command === `${prefix}bug`){
        console.log("création d'une suggestion par "+ message.author.username+"#" + message.author.discriminator +"  (ID:"+ message.author.id+").");
        let question = argsAffichage.slice(0).join(" ");
        if (question.length === 0)return message.reply(`Vous devez mettre un argument. \`${command} [argument]\``);
        const embed = new Discord.RichEmbed()
            .setTitle(`Suggestions par : ${message.author.username}#${message.author.discriminator}`)
            .setDescription(question)
            .setFooter(message.author);
        bot.guilds.get("420530737738153984").channels.get("565950742763012097").send(embed);
        const embedReponse = new Discord.RichEmbed()
            .setTitle(`**Message envoyé**`)
            .setDescription(question)
            .setFooter(message.author.username,message.author.avatarURL);
        setTimeout(function () {
            message.delete();
        }, 4000);
        message.reply(embedReponse)
    }
    //webhook
    if (command===`${prefix}hook`) {
        if (message.channel.type === "dm") return  message.channel.send(`**La commande ${command} ne peut pas être utilisée en MP.**`);
        if (!message.member.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send(`Désolé, ${message.author}, vous n'avez pas la permission **Gérer les Webhooks** sur le serveur !!!\nSi vous pensez qu'il s'agit d'une erreur, contactez un administrateur.`);
        if (!message.guild.member(bot.user).hasPermission("MANAGE_WEBHOOKS")) return message.channel.send(`Désolé, **${message.author}**, mais je n'ai pas la permission **Gérer les Webhooks** sur ce serveur.`);
        if (argsAffichage[0] === undefined)argsAffichage[0] = bot.user.username;
        if (argsAffichage[1] === undefined)argsAffichage[1] = bot.user.avatarURL;
        // This will create the webhook with the name "Example Webhook" and an example avatar.
        message.channel.createWebhook(argsAffichage[0], argsAffichage[1])
        // This will actually set the webhooks avatar, as mentioned at the start of the guide.
        //.then(webhook => webhook.edit("Example Webhook", "https://i.imgur.com/p2qNFag.png")
        // This will get the bot to DM you the webhook, if you use this in a selfbot,
        // change it to a console.log as you cannot DM yourself
            .then(wb => message.author.send(`Here is your webhook https://discordapp.com/api/webhooks/${wb.id}/${wb.token}`)).catch(console.error)
    }
    //annonce webhook
    if(command ===`${prefix}annonce` || command === `${prefix}news`){
        if (message.channel.type === "dm") return  message.channel.send(`**La commande ${command} ne peut pas être utilisée en MP.**`);
        if (message.guild.id !== '450360893931388938' && message.guild.id !== '420530737738153984') return message.reply('Cette commande n\'est pas disponible sur ce serveur');
        if (!message.member.roles.find("name","Modérateur")) return message.channel.send(`Désolé, **${message.author.username}**, mais vous devez être modérateur sur le serveur !!\n Si vous pensez qu'il s'agit d'une erreur, contactez un administrateur.`);
        const hook = new Discord.WebhookClient('617683908091314178', 'ev66Fih7jv_iK1nP-eTJFnR9QIOKKzx1GTi3rISf9hnPl3ROMjFFETOB8eHpiqBoVy96');
        let texte = argsAffichage.slice(0).join(" ");
        hook.send(texte);
    }
    //rappel
    if(command ===`${prefix}rappel`){
        return message.reply('WIP');
        let rappel = JSON.parse(fs.readFileSync("./rappel.json", "utf8")); //{"nombre":0}
        let nbrRappel = rappel["nombre"];
        console.log(nbrRappel);
        let increment = true;
        let msg = "\`";
        let dateActuelle = new Date();
        if (Number(args[2]) < dateActuelle.getFullYear()) return message.reply("Merci de faire un rappel a une date ultérieure à aujourd'hui.");
        if (Number(args[2]) >= dateActuelle.getFullYear()+2) return message.reply("Merci de ne pas mettre une date trop avancée dans le temps");
        if (Number(args[1]) < dateActuelle.getMonth()+1 && Number(args[2]) === dateActuelle.getFullYear()) return message.reply("Merci de faire un rappel a une date ultérieure à aujourd'hui.");
        if (Number(args[0]) <= dateActuelle.getDate() && Number(args[1]) === dateActuelle.getMonth()+1 && Number(args[2]) === dateActuelle.getFullYear()) return message.reply("Merci de faire un rappel a une date ultérieure à aujourd'hui.");
        let date = args[2]+"-"+args[1]+"-"+args[0];
        for (let i=3 ; i<argsAffichage.length;i++){
            msg+= argsAffichage[i] + " ";
        }
        for (let a=0; a<nbrRappel;a++){
            if(rappel[a] === undefined){
                console.log("non");
                nbrRappel = a;
                increment = false;
            }
        }
        msg += "\`";
        message.reply(msg);
        rappel[nbrRappel] = [message.author.id,message.guild.id,message.channel.id,date,msg];
        if (increment) rappel["nombre"]++;
        fs.writeFile("./rappel.json", JSON.stringify(rappel), (err) => {
            if (err) console.log(err)
        });
        for (let a in rappel) bot.guilds.get("420530737738153984").channels.get("577408421507366925").send(`&&rappelreponse ${a}:[${rappel[a]}]`).then(msg => msg.delete(60000));
    }
    // rappel des données de rappel
    if (command=== `${VIPprefix}demanderappel`){
        let rappel = JSON.parse(fs.readFileSync("./rappel.json", "utf8"));
        for (let a in rappel) bot.guilds.get("420530737738153984").channels.get("577408421507366925").send(`&&rappelreponse ${a}:[${rappel[a]}]`).then(msg => msg.delete(60000));
    }
    if (command === `${VIPprefix}reponserappel`){
        let donnees = JSON.parse(fs.readFileSync("./rappel.json", "utf8"));
        donnees[args[0]] = argsAffichage;
        fs.writeFile("./rappel.json", JSON.stringify(donnees), (err) => {
            if (err) console.log(err)
        });
        message.channel.send(`Informations reçues par ${message.author}`);
        console.log(donnees);
    }
    //live nedert
    if(command ===`${prefix}live`){
        if (message.channel.type !== "dm") {
            if (message.guild.id !== '337194376281194498' && message.guild.id !== '420530737738153984') return message.reply('Cette commande n\'est pas disponible sur ce serveur');
        }
        if (message.author.id !== `279335122761678858` && message.author.id !== '181820882514214913') return message.channel.send(`Désolé, **${message.author.username}**, mais vous n'êtes pas autorisé à executer cette commande`);
        console.log('hey');
        const hook = new Discord.WebhookClient('594977670194790421', 'RC5rreiGGbkVtEp49FavBXGGZaw070STWvwbVw2rZ5_GbNsaidTcImvvgVGE-Jd1wZc1');
        let texte = argsAffichage.slice(0).join(" ") + "\n https://www.twitch.tv/nedertval";
        if (argsAffichage[0] === undefined) texte = `Hey @everyone, Nedert passe en live sur https://www.twitch.tv/nedertval ! Allez vite voir ça!`;
        const embed = new Discord.RichEmbed()
            .setColor('PURPLE')
            .setTitle('Annonce de Live')
            .setDescription(texte);
        hook.send(embed);
        message.reply('Message envoyé')
    }
    // 8ball
    if(command===`${prefix}8ball` || command===`${prefix}ball8` || command===`${prefix}b8` || command===`${prefix}bm8`){
        if (!args[0]) return message.reply(`Fonctionnement : ${prefix}8ball questions`);
        let question = argsAffichage.slice(0).join(" ");
        let color = "";
        let replies = ['Oui', 'Non', 'Redemande le moi plus tard','Tu veux vraiment le savoir ?','Même pas en rêve.','Il y a 90 % de chance pour que ce soit possible.','Oui','Non','Tu préférerais ne pas connaître la réponse…','Oui ou non, ça dépend.'];
        let result = Math.floor((Math.random() * replies.length));

        if (replies[result] === 'Oui') color = "#00FF00";
        else if (replies[result] === 'Non') color = "#FF0000";
        else if (replies[result] === 'Redemande le moi plus tard') color = "#0000FF";
        else color = 'RANDOM';

        let newembed = new Discord.RichEmbed()
            .setDescription(`**${question}**\n\n Resultat: ${replies[result]}`)
            .setColor(color)
            .setFooter(`Demandé par: ${message.author.username}`);

        setInterval(function () {
            message.delete().catch(O_o => {});
        },4000);
        message.channel.send({
            embed: newembed
        })
    }
    //help
    if (command === `${prefix}help`) {
        const embed1 = new Discord.RichEmbed()
            .setColor('#ffc2a8')
            .setAuthor(`Commandes disponibles :`)
            .addField(`• **${prefix}quote**`, `Met les arguments en quote .`)
            .addField(`• **${prefix}clear**`, `Supprime le nombre de messages mis en paramètre.`)
            .addField(`• **${prefix}poll**`, `Pour organiser un vote.\nAussi disponibles: **${prefix}sondage**`)
            .addField(`• **${prefix}mpoll**`, `Pour organiser un vote à choix multiples.\nAussi disponibles: **${prefix}multipoll**`)
            .addField(`• **${prefix}user**`, `Donne les informations sur le joueur mentionner en  paramètre.\n Aussi disponible : **${prefix}userinfo**`)
            .addField(`• **${prefix}info**`, `Donne les informations sur le bot.\nAussi disponible : **${prefix}bot** ,**${prefix}botinfo**`)
            .addField(`• **${prefix}serveur**`, `Donne les informations sur le bot.\nAussi disponible : **${prefix}serveurinfo**`)
            .addField(`• **${prefix}uptime**`, "Indique le temps écoulé depuis le démarrage du bot.")
            .addField(`• **${prefix}pf**`, `Pile ou face ? la pièce sera lancée...\nAussi disponible : **${prefix}pileface**`)
            .addField(`• **${prefix}roll**`, `Lance un dé avec la valeur indiquée.\nAussi disponible : **${prefix}de**, **${prefix}dice**`)
            .addField(`• **${prefix}slot**`, `Lance la machine à sous. (1 chance sur 1000 d'avoir le Jackpot)\nPour avoir les difficultés **${prefix}slot help**`)
            .addField(`• **${command} mp**`,`Envoie ce message en MP`)
            .setTimestamp(new Date());
        const embed2 = new Discord.RichEmbed()
            .setColor('#ffc2a8')
            .setAuthor(`Commandes disponibles :`)
            .addField(`• **${prefix}ppc**`, `Pour jouer à Shifumi||Pierre-Papier-Ciseaux.\nAussi disponible : **${prefix}shifumi**.`)
            .addField(`• **${prefix}demineur**`, `Pour jouer au démineur,\nFormat : **${prefix}demineur [largeur] [hauteur] [nbreMines]**`)
            .addField(`• **${prefix}gif**`, `Affiche un GIF de manière aléatoire.\nPour avoir les thèmes **${prefix}gif help**`)
            .addField(`• **${prefix}meme**`,`Envoie un même de manière aléatoire.\nAussi disponible : **${prefix}bs** `)
            .addField(`• **${prefix}8ball**`,`La boule magique 8 Posez vos questions.\nAussi disponible : **${prefix}bm8** , **${prefix}b8** , **${prefix}ball8**`)
            .addField(`• **${prefix}bsv**`,`*[Restreint]* Envoie une vidéo de manière aléatoire.\nAussi disponible : **${prefix}bananestarvid** `)
            .addField(`• **${prefix}invite**`, "Pour m'inviter sur ton serveur.")
            .addField(`• **${prefix}an**`, `*[Restreint]* Poster un article de manière anonyme.\nAussi disponible: **${prefix}articleanonyme**`)
            .addField(`• **${prefix}ia**`, `*[Restreint]* Poster une image de manière anonyme.\nAussi disponible: **${prefix}imageanonyme**`)
            .addField(`• **${prefix}channel**`,`*[Restreint]* Creer un channel privé pour soi.\nAussi dispnible: **${prefix}salon**`)
            .addField(`• **${prefix}vocal**`,`*[Restreint]* Creer un channel vocal privé pour soi.`)
            .addField(`• **${command} mp**`,`Envoie ce message en MP`)
            .setTimestamp(new Date());
        const embed3 = new Discord.RichEmbed()
            .setColor('#ffc2a8')
            .setAuthor(`Commandes disponibles :`)
            .addField(`• **${prefix}ac :**`,`*[Restreint]* Envoie la tête d'un joueur de manière aléatoire.\nAussi disponible : **${prefix}atomcorp**`)
            .addField(`• **${prefix}rappel**`,`[WIP] Fait un rappel a une date précisée. ***[Ne vous en server pas comme agenda ce système n'est pas sôr]***`)
            .addField(`• **${prefix}news**`,`*[Restreint]* Annonce pour la Communauté.\nAussi disponible: **${prefix}annonce**`)
            .addField(`• **${prefix}hook**`,`Permet de créer un webhook sur le serveur facilement.`)
            .addField(`• **${prefix}live**`, `*[Réservé]* Permet d'annoncer son live `)
            .addField(`• **${prefix}idee**`,`Proposer une idée de fonctionnalité/jeux/report de bug pour le bot.\nAussi disponible: **${prefix}suggestion**, **${prefix}bug**`)
            .addField(`• **${command} mp**`,`Envoie ce message en MP`)
            .setTimestamp(new Date());
        let pages = [embed1,embed2,embed3];
        let page = 1;
        pages[0].setFooter(`Page ${page} sur ${pages.length}`);

        if(args[0] === "mp"){
            setTimeout(function () {
                message.react('🇲')
            }, 100);
            setTimeout(function () {
                message.react('🇵')
            }, 400);
            setTimeout(function () {
                message.react('📧')
            }, 200);
            message.author.send(pages[0]).then(msg => {

                msg.react('⬅').then( r => {
                    msg.react('➡')

                    // Filters
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id !== bot.user.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id !== bot.user.id;

                    const backwards = msg.createReactionCollector(backwardsFilter, {timer: 1000});
                    const forwards = msg.createReactionCollector(forwardsFilter, {timer: 1000});

                    backwards.on('collect', r => {
                        if (page === 1) return;
                        page--;
                        pages[page-1].setFooter(`Page ${page} sur ${pages.length}`);
                        msg.edit(pages[page-1]);
                        //r.remove(r.users.filter(u => !u.bot).first());
                    });

                    forwards.on('collect', r => {
                        if (page === pages.length) return;
                        page++;
                        pages[page-1].setFooter(`Page ${page} sur ${pages.length}`);
                        msg.edit(pages[page-1])
                        //r.remove(r.users.filter(u => !u.bot).first());
                    })
                })
            })
        }
        else
        {
            message.channel.send(pages[0]).then(msg => {

                msg.react('⬅').then(r => {
                    msg.react('➡')

                    // Filters
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id !== bot.user.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id !== bot.user.id;

                    const backwards = msg.createReactionCollector(backwardsFilter, {timer: 1000});
                    const forwards = msg.createReactionCollector(forwardsFilter, {timer: 1000});

                    backwards.on('collect', r => {
                        if (page === 1) return;
                        page--;
                        pages[page - 1].setFooter(`Page ${page} of ${pages.length}`);
                        msg.edit(pages[page - 1]);
                        r.remove(r.users.filter(u => !u.bot).first());
                    });

                    forwards.on('collect', r => {
                        if (page === pages.length) return;
                        page++;
                        pages[page - 1].setFooter(`Page ${page} of ${pages.length}`);
                        msg.edit(pages[page - 1])
                        r.remove(r.users.filter(u => !u.bot).first());
                    })
                })
            })
        }
    }
});
//rappel date supremacy
bot.on("ready", () => {
    console.log("Demande dates sup14");
    bot.guilds.get("420530737738153984").channels.get("557928672846151681").send("&&datesupdem");
    console.log("demande rappel");
    bot.guilds.get("420530737738153984").channels.get("577408421507366925").send("&&rappeldemande");
});
// nouveau membre commu supremacy1914
bot.on('guildMemberAdd', member => { //annonce tout le monde
    if ( member.guild.id !== "450360893931388938") return false;//test serveur
    var nouveauMembreEmbed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setAuthor(member.user.tag + ' a rejoint le serveur', member.user.displayAvatarURL)
        .addField(`:inbox_tray: Bienvenue sur le serveur ${member.user.tag}`,'.')
        .setFooter(`Nouveau Membre`)
        .setTimestamp();
    // Create a new webhook
    const hook = new Discord.WebhookClient('575261302021160960', 'ySf2tPv9uvOCNPa_08_jLX9XKsGSyi6j_xZ8UILgQ63qHJNmIg1hBScofqme9bGFIlAo');
    // Send a message using the webhook
    hook.send(nouveauMembreEmbed);

    var bienvenue = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor("Bienvenue sur le serveur de la communauté RP supremacy1914")
        .setDescription(`${member.user}, Bienvenue dans notre communauté, avant toute chose nous te demandons de lire <#545880645264605185> et d'ensuite répondre au questionnaire suivant : <#519871774444355584>\nMerci d'inclure les questions du questionnaire dans ta candidature et de la reposter dans <#512301323777998896>`)
        .setFooter(`Nouveau Membre`)
        .setTimestamp();
    // Create a new webhook
    const hook2 = new Discord.WebhookClient('575264364542820373', 'CZfyoeRFbgh0fJgeWSr82x4pX33uSahZgu4hdJ6ADy6H7RMPEXlpv6Mx1ECLMXpXTceD');
    // Send a message using the webhook
    hook2.send(bienvenue);
});
bot.login(process.env.TOKEN);
bot.on("error", console.error);
