const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "join",
  alias: ["join"],
  async execute(message, client, args) {


   let guild = client.guilds.cache.get(args[0]);

   client.guilds.cache.forEach((guild) => {
    
   let channel = guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT");
  //  channel
     console.log(guild.channels.cache)
    //  .createInvite({ maxUsers: 1, maxAge: 0, unique: true })
    //  .then((invite) => console.log(`https://discord.gg/${invite.code}`));
   });


  },
};
