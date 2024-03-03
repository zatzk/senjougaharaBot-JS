const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

let conversationHistory = []; // Variable to store conversation history

module.exports = {
  name: "ask",
  description: "Pergunte qualquer coisa",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "question",
      description: "O que deseja perguntar?",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const question = interaction.options.getString("question");

    const embed1 = new EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`Pensando resposta para: "${question}"`)
      .setColor("Random");

    await interaction.reply({ embeds: [embed1] });

    // Create a GoogleGenerativeAI instance with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    // Get the "gemini-pro" model for text-only input
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Choose between starting a new chat or including history
    let chat;
    if (conversationHistory.length === 0) {
      // Start a new chat without history
      chat = model.startChat();
    } else {
      // Start a chat with the last question and answer
      const lastInteraction = conversationHistory[conversationHistory.length - 1];
      chat = model.startChat({
        history: [
          { role: "user", parts: lastInteraction.question },
          { role: "model", parts: lastInteraction.answer },
        ],
      });
    }

    // Send the user's question and receive the response
    const result = await chat.sendMessage(question);
    const response = await result.response;
    const text = response.text();

    // Update conversation history
    conversationHistory.push({
      question,
      answer: text,
    });

    // Create the final embed with the answer
    const embed2 = new EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`**${question} \n ** ${text}`)
      .setColor("Random");

    interaction.editReply({ embeds: [embed2] });
  },
};
