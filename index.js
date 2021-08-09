const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const express = require("express");
const app = express();
const { TOKEN , prefix } = require('./properties.json');

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

client.on('message', message => {
  if (message.content.startsWith(`${prefix}d`)) {
    const msg = message.content;
    const arg = msg.substring(3);
    const argnbr = parseInt(arg);
    if (arg === "") {
      message.channel.send(":x: **Tu n'as pas spécifié le nombre de faces du dé !**")
      return;
    }
    else if (arg === "π") {
      message.channel.send("**Ta vraiment cru que j'avais que ça à faire de calculer ton Pi là !**")
      return;
    }
    else if (isNaN(argnbr)) {
      message.channel.send(":x: **Tu dois indiquer un nombre comme argument !**")
      return;
    }
    else if (argnbr <= 0) {
      message.channel.send(":x: **Le nombre de face doit être suppérieur ou égale à 1 !**")
      return;
    }
    else {
      const result = Math.floor(Math.random()*argnbr+1);
      message.channel.send(`:game_die: **Le dé ${arg} est tombé sur la face portant le numéro \`${result}\` !**`)
    }
  }
});

client.on('ready', function () {
    client.user.setActivity('!d pour lancer un dé', { type: 'WATCHING' });
});

client.login(TOKEN);
