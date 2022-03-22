const { allPrices } = require("../helpers/http");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "cryptos",
  alias: ["cryptos"],
  async execute(message, client, args) {
    const prices = await allPrices();
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Precios de criptomonedas y divisas`)
      .setDescription(prices)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
