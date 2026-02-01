const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Testar o bot'),
  async execute(interaction) {
    await interaction.reply('🏓 Pong!');
  }
};
