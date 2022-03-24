module.exports = {
  name: "emojis",
  alias: ["emojis"],
  async execute(message, client, args) {
    const emojis = client.emojis.cache;
    const emojisInfo = emojis.map((emoji) => {
      const text = `<:${emoji.name}:${emoji.id}> ${emoji.name} | ${emoji.id}>`;
      return text;
    });

    const middle = emojisInfo.length / 2;
    const groupEmojis = [
      emojisInfo.slice(0, middle),
      emojisInfo.slice(middle + 1, emojisInfo.length),
    ];

    for (const groupEmoji of groupEmojis) {
      await message.reply(`Información de todos los emojis
        ${groupEmoji.join("\n")}
    `);
    }
  },
};
