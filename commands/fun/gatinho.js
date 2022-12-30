const { ApplicationCommandType, EmbedBuilder } = require("discord.js")
const { fetch, request } = require('undici')


module.exports = {
  name: "gatinho",
  description: "Gera um gatinho aleatório",
  type: ApplicationCommandType.ChatInput,

  run: async(client, interaction) => {
    const index = (Math.floor(Math.random() * 84+1)) -1;
    
    const res = await (await fetch(`https://geradordegatinhos.netlify.app/db.json`)).json()
    const data = []
    data.push(res.gatinhos[index].name, res.gatinhos[index].image)

    const embed = new EmbedBuilder()
      .setTitle(`**Parabéns, você recebeu o: \n ${data[0]}**`)	
      .setThumbnail(data[1])
      .setColor('Random')


    await interaction.reply({embeds: [embed]});
  }
}