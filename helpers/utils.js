const { prefix, client, SERVER, CHANNELS } = require("../config");
const { warn, error } = require("./logger");

const isCommand = (message) => {
  return message.content.startsWith(prefix) && !message.author.bot;
};

const getCommand = (messaje) => {
  const args = messaje.content.slice(prefix.length).trim().split(/ +/g);
  const fullCommand = {
    command: args.shift().toLowerCase(),
    args,
  };
  return fullCommand;
};

const getServer = () => client.guilds.fetch(SERVER.ID);

const getAllMembers = async () => {
  const sv = await getServer();
  const members = await sv.members.fetch();
  return members;
};

const getMember = async (member_id) => {
  const sv = await getServer();
  const member = await sv.members.fetch(member_id);
  return member;
};

const getAllRoles = async () => {
  const sv = await getServer();
  const roles = await sv.roles.fetch();
  return roles;
};

const getUsersByRole = async (role_id) => {
  const sv = await getServer();
  const users = sv.roles.cache
    .get(role_id)
    .members.map((member) => member.user);
  return users;
};

const getUsersLengthByRole = async (role_id) => {
  const count = await getUsersByRole(role_id);
  return count.length;
};

const toggleRoleMember = async (user_id, role_id) => {
  const member = await getMember(user_id);
  if (member.roles.cache.has(role_id))
    return await member.roles.remove(role_id);
  return await member.roles.add(role_id);
};

// without cache
const getChannel = async (channel_id) => {
  try {
    const sv = await getServer();
    const channel = await sv.channels.fetch(channel_id);
    return channel;
  } catch (err) {
    error(err.message, err);
  }
};

const existsChannel = async (channel_id) => {
  const channel = await getChannel(channel_id);
  return !!channel;
};

const sendDebugMessage = async (content) => {
  const debugChannel = await getChannel(CHANNELS.BOT_DEBUG);
  await debugChannel.send(content);
};

// without cache
const getMessageFromChannel = async (channel_id, message_id) => {
  try {
    const channel = await getChannel(channel_id);
    const message = await channel.messages.fetch(message_id);
    return message;
  } catch (err) {
    error(err.message, err);
  }
};

const removeUserReactionFromMessage = async (
  channel_id,
  message_id,
  user_id
) => {
  if (!existsChannel(channel_id)) {
    warn(`The channel "${channel_id}" don't exist!`);
    return sendDebugMessage(`⚠️ The channel "${channel_id}" don't exist!`);
  }
  try {
    const message = await getMessageFromChannel(channel_id, message_id);
    message.reactions.cache.forEach((reaction) => {
      reaction.users.remove(user_id);
    });
  } catch (err) {
    error(err.message, err);
  }
};

const removeUserReactionsFromMessage = async (
  channel_id,
  message_id,
  user_id
) => {
  if (!existsChannel(channel_id)) {
    warn(`The channel "${channel_id}" don't exist!`);
    return sendDebugMessage(`⚠️ The channel "${channel_id}" don't exist!`);
  }
  try {
    const message = await getMessageFromChannel(channel_id, message_id);
    const reactions = message.reactions.cache;

    reactions.forEach(async (reaction) => {
      const usersReactions = await reaction.users.fetch();
      const userIsReacted = usersReactions.some((user) => user.id === user_id);
      if (userIsReacted) reaction.users.remove(user_id);
    });
  } catch (err) {
    error(err.message, err);
  }
};

function toBs(number) {
  return number + " bs";
}

function to$(number) {
  return "$" + number;
}

module.exports = {
  toBs,
  to$,
  isCommand,
  getCommand,
  getServer,
  getMember,
  getAllMembers,
  getAllRoles,
  getUsersByRole,
  toggleRoleMember,
  getUsersLengthByRole,
  removeUserReactionFromMessage,
  removeUserReactionsFromMessage,
  getChannel,
  existsChannel,
  sendDebugMessage,
  getMessageFromChannel,
};
