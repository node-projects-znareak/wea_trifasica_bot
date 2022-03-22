require("dotenv").config();

const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const commandAnimeFiles = fs
  .readdirSync("./commands/anime")
  .filter((file) => file.endsWith(".js"));

const Discord = require("discord.js");
const {
  client,
  token,
  VERSION,
  CHANNELS,
  MESSAGES,
  EMOJIS,
  SERVER,
  IS_NEW_BOT,
} = require("./config");
const { success, error, warn } = require("./helpers/logger");
const { getMessageFromChannel } = require("./helpers/utils");

const messageCreate = require("./handlers/messages");
const messageReaction = require("./handlers/messageReaction");
const { info } = require("console");

client.commands = new Discord.Collection();

// process.on("unhandledRejection", (err) => {
//   error(err.message, err);
// });

// process.on("uncaughtException", (err) => {
//   error(err.message, err);
// });

client.on("ready", async (bot) => {
  success(`Versión de node: ${process.version} y DiscordJS: v${VERSION}`);
  success(`${client.user.username} esta preparado!`);
  success(`Estado: ${bot.user.presence.status}`);
  success(`Actualmente serviendo ${client.guilds.cache.size} severs!`);
  client.user.setActivity("ser esclava de zNareak 😘");

  if (IS_NEW_BOT) {
    const channelDevelpoer = client.channels.cache.get(
      CHANNELS.DEVELOPER_MODE_ID
    );

    const message = await channelDevelpoer.send(
      "Reacciona este mensaje con <:8325lolz:870695353337380875> para tener el rol de programador!"
    );
    message.react(EMOJIS.DEVELOPER_EMOJI_ID);
  }
});

client.on("disconnect", () => {
  warn(`${client.user.username} se desconecto!`);
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of commandAnimeFiles) {
  const command = require(`./commands/anime/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", async (message) => {
  messageCreate(message);
});

client.on("guildMemberAdd", async (member) => {
  warn(`El usuario ${member.user.username} entro al servidor`);
});

client.on("guildMemberRemove", async (member) => {
  warn(`El usuario ${member.user.username} abandono el servidor`);

  const message = await getMessageFromChannel(
    CHANNELS.DEVELOPER_MODE_ID,
    MESSAGES.BOT_PROGRAMMER_ID
  );
  message.reactions.cache.forEach((reaction) => {
    reaction.users.remove(member.user.id);
  });
});

client.on("messageReactionAdd", async (reaction, user) => {
  info(`El usuario ${user.username} reacciono a un mensaje`);
  // const { emoji, users, count, message } = reaction;
  // console.log(emoji.name);

  // const usersReacted = await users.fetch();
  // console.log(usersReacted);

  messageReaction(reaction, user);
});

client.on("messageReactionRemove", async (reaction, user) => {
  info(`El usuario ${user.username} des-reacciono a un mensaje`);
  const userExists = client.guilds.cache
    .get(SERVER.ID)
    .members.cache.get(user.id);

  if (!!userExists) {
    messageReaction(reaction, user);
  } else {
    console.log("El usuario no existe");
  }
});

client.login(token);
