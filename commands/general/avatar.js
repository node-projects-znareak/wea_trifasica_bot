const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  alias: ["avatar"],
  async execute(message, client, args) {
    const member = message.mentions.members.first();
    if (!member) {
      message.reply("El usuario no existe en el servidor :(");
      return;
    }
    const avatar = member.displayAvatarURL({ size: 1024 });
    const avatarEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Mostrando avatar de ${member.user.username}`)
      .setImage(avatar)
      .setTimestamp();

    message.channel.send({ embeds: [avatarEmbed] });
  },
};
