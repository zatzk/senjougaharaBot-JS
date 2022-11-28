const { ApplicationCommandType, EmbedBuilder } = require("discord.js")
const { fetch, request } = require('undici')


module.exports = {
  name: "gatinho",
  description: "Gera um gatinho aleatório",
  type: ApplicationCommandType.ChatInput,

  run: async(client, interaction) => {
    const index = (Math.floor(Math.random() * 84+1)) -1;
    const url = 'https://geradordegatinhosapi.herokuapp.com/gatinhos?_page=1'
    
    const res = await fetch(`https://geradordegatinhosapi.herokuapp.com/gatinhos/${index}`)
    const data = await res.json();
    console.log(data)

    const embed = new EmbedBuilder()
      .setTitle(`**Parabéns, você recebeu o: \n ${data.name}**`)	
      .setThumbnail(data.image)
      .setColor(0x7289DA)


    await interaction.reply({embeds: [embed]});
  }
}