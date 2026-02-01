const { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {

    // SLASH COMMAND
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(interaction);
    }

    // BOTÃO
    if (interaction.isButton()) {

      // ABRIR TICKET
      if (interaction.customId === 'abrir_ticket') {
        const guild = interaction.guild;
        const user = interaction.user;

        const channel = await guild.channels.create({
          name: `ticket-${user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: guild.id,
              deny: [PermissionFlagsBits.ViewChannel]
            },
            {
              id: user.id,
              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            }
          ]
        });

        const closeButton = new ButtonBuilder()
          .setCustomId('fechar_ticket')
          .setLabel('🔒 Fechar Ticket')
          .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(closeButton);

        await channel.send({
          content: `Olá ${user}, descreva seu problema.`,
          components: [row]
        });

        await interaction.reply({ content: '✅ Ticket criado!', ephemeral: true });
      }

      // FECHAR TICKET
      if (interaction.customId === 'fechar_ticket') {
        await interaction.reply('⏳ Fechando ticket em 5 segundos...');
        setTimeout(() => {
          interaction.channel.delete();
        }, 5000);
      }
    }
  }
};
