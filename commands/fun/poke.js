const Discord = require("discord.js")
const { fetch, request } = require('undici')


module.exports = {
  name: "poke",
  description: "Cutuca alguém",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "membro",
      description: "Mencione um membro.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async(client, interaction) => {

    let user = interaction.options.getUser("membro")
    
    const data1 = await (await fetch(`http://api.nekos.fun:8080/api/poke`)).json()
    const data2 = await (await fetch(`http://api.nekos.fun:8080/api/poke`)).json()

    
    const embed = new Discord.EmbedBuilder()
      .setDescription(`**${interaction.user} cutucou ${user}**`)	
      .setImage(data1.image)
      .setColor('Random')

    const button = new Discord.ActionRowBuilder()
      .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('1')
            .setLabel('Retribuir')
            .setStyle(Discord.ButtonStyle.Primary)
            .setDisabled(false)
      )

    const embed1 = new Discord.EmbedBuilder()
      .setDescription(`**${user} retribuiu as cutucadas de ${interaction.user}**`)	
      .setImage(data2.image)
      .setColor('Random')

    interaction.reply({embeds: [embed], components: [button] }).then(() => {
      const filter = i => i.customId === '1' && i.user.id === user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1});

      collector.on('collect', async i => {
        if(i.customId ==='1') {
          i.reply({ embeds: [embed1] })
        }
      });

      collector.on ("end", () => {
        interaction.editReply({
          components: [
            new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
              .setCustomId('1')
              .setLabel('Retribuir')
              .setStyle(Discord.ButtonStyle.Primary)
              .setDisabled(true)
            )
          ]
        })
      })
    });

  }
}