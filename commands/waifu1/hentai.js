const { getAnimeImageType } = require("../../helpers/http");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "hentai",
  alias: ["hentai"],
  async execute(message, client, args) {
    const img = await getAnimeImageType("hentai");
    const embed = new MessageEmbed()
      .setColor(img.dominant_color)
      .setURL(img.source)
      .setImage(img.url)
      .setFooter({ text: img.source })
    message.channel.send({ embeds: [embed] });
  },
};
