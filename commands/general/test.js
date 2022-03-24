module.exports = {
  name: "sum",
  alias: ["test"],
  execute(message, client, args) {
    const suma = args.map(Number).reduce((a, b) => a + b);
    //message.reply(`Test command with: [${args.join(", ")}] arguments`);
    message.reply(`La suma total es: ${suma}`)
    message.react("😀");
  },
};
