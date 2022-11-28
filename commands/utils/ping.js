const { ApplicationCommandType, EmbedBuilder } = require("discord.js")

module.exports = {
  name: "ping",
  description: "Veja o ping do bot",
  type: ApplicationCommandType.ChatInput,
  run: async(client, interaction) => {
    let ping = client.ws.ping
    let embed1 = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true})})
    .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor("Random")
    let embed2 = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true})})
    .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}\`.`)
    .setColor("Random")

    interaction.reply({embeds: [embed1]}).then(() => {
      setTimeout( () => {
        interaction.editReply({embeds: [embed2]})
      }, 2000)
    })
  }
}