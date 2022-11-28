const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });

module.exports = client

client.on('interactionCreate', (interaction) => {
  if(interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if(!cmd) return interaction.reply('Error');
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
    cmd.run(client, interaction)
  }
})

client.once('ready', () => {
  console.log('bot online!!')
})


client.slashCommands = new Discord.Collection()
require('./handler')(client)

client.login(process.env.BOT_TOKEN);