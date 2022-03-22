const { getAnimesTop } = require("../helpers/http");
const { MessageEmbed, Formatters } = require("discord.js");

module.exports = {
  name: "topanimes",
  alias: ["topanimes"],
  async execute(message, client, args) {
    const animes = await getAnimesTop();
    const tpl = animes.map((anime, index) => {
      const link = Formatters.hyperlink(anime.title, anime.url, anime.title);
      return `${index + 1}- ${anime.title}`;
    });

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Top animes de temporada`)
      .setDescription(tpl.join("\n"))
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
