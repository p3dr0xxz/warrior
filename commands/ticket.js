const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Cria o painel de tickets'),

  async execute(interaction) {
    const button = new ButtonBuilder()
      .setCustomId('abrir_ticket')
      .setLabel('🎫 Abrir Ticket')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      content: 'Clique no botão abaixo para abrir um ticket:',
      components: [row]
    });
  }
};
