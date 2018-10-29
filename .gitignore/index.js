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
    if (command === "!date") {
        let jour = args[0]; // jour
        let mois = args[1]; //date
        let annee = args[2]; // mois
        var date = new Date(annee,mois-1,jour);
        message.channel.send(`${message.author.username}, lancement de la boucle à la date du ${jour} / ${mois} /${annee} `);
        var interval = setInterval (function () {
            date.setDate(date.getDate()+2);// ajout de 2jours
            message.channel.send("On passe au jour" +date);
        }, 3600 * 1000); // 1heure = 3600 secondes


    }
    if (message.content ==='!help date'){
        message.channel.send('Voici le format de la commande:\n !date [dd] [mm] [yyyy]')
    }
    if (message.content ==='!coco'){
        message.reply('https://i.imgur.com/0TWyD8S.gif')
    }
    if (message.content ==='!help coco'){
        message.channel.send('Envoie un Gif de Staline')
    }
    
});

bot.login(process.env.TOKEN);
