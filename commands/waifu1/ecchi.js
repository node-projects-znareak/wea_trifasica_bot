const { getAnimeImageType } = require("../../helpers/http");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ecchi",
  alias: ["ecchi"],
  async execute(message, client, args) {
    const img = await getAnimeImageType("ecchi");
    const embed = new MessageEmbed()
      .setColor(img.dominant_color)
      .setURL(img.source)
      .setImage(img.url)
      .setFooter({ text: img.source })
    message.channel.send({ embeds: [embed] });
  },
};
