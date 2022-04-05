const { Client, Intents, version } = require("discord.js");

const BOT_SETTINGS = {
  prefix: "!",
  VERSION: version,
  token:
    process.env.TOKEN ,
  SERVER: {
    ID: "776996997621350411",
  },
  ROLES: {
    ADMIN_ID: "777339605795864606",
    VERIFIED_ID: "870510016732487700",

    // role flags
    PROGRAMMER_ID: "799408228768808990",
    HORYNE_ID: "803346225247289415",
    ESLAVE_ID: "853408299815010344",

    // roles que se asignan despues de verificarse
    AFTER_VERIFICATION() {
      return [];
    },
  },

  CHANNELS: {
    HORNY_ID: "777365877086879764",
    DEVELOPER_MODE_ID: "870449565915037707",
  },

  MESSAGES: {
    BOT_PROGRAMMER_ID: "954487913226321990",
  },

  EMOJIS: {
    DEVELOPER_EMOJI_NAME: "8325lolz",

    DEVELOPER_EMOJI_ID: "<:8325lolz:870695353337380875>",
  },

  IS_NEW_BOT: false,
};

const API = {
  api_dolartoday: "https://s3.amazonaws.com/dolartoday/data.json",
  api_bitcoint: "http://api.coindesk.com/v1/bpi/currentprice.json",
  api_cat: "https://api.thecatapi.com/v1/images/search?mime_types=gif",
  anime_api: "https://jikan1.p.rapidapi.com/top/anime/1/",
  sexy_anime_api: "https://api.waifu.im/random/?selected_tags=",
};

const client = new Client({
  intents: [
    "GUILD_MEMBERS",
    "GUILD_PRESENCES",
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
});

module.exports = { ...BOT_SETTINGS, client, ...API };
