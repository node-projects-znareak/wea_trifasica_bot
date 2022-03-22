const { getRandomCat } = require("../helpers/http");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "cat",
  alias: ["cat"],
  async execute(message, client, args) {
    const cat = await getRandomCat();
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Gatito :3`)
      .setImage(cat)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
