const { MESSAGES, EMOJIS, ROLES, CHANNELS } = require("../config");
const { error } = require("../helpers/logger");
const { toggleRoleMember } = require("../helpers/utils");

const messageReaction = async (reaction, user) => {
  if (!user.bot) {
    try {
      const channelId = reaction.message.channelId;
      const messageId = reaction.message.id;
      const emojiName = reaction.emoji.name;

      if (
        channelId === CHANNELS.DEVELOPER_MODE_ID &&
        messageId === MESSAGES.BOT_PROGRAMMER_ID &&
        emojiName === EMOJIS.DEVELOPER_EMOJI_NAME
      ) {
        toggleRoleMember(user.id, ROLES.PROGRAMMER_ID);
      }
    } catch (err) {
      error(err.message, err);
    }
  }
};

module.exports = messageReaction;
