import { MessageEmbed } from 'discord.js';
import { fetchMultipleDateAppointementByPin, fetchSingleDateAppointementByPin } from '../utils/api.js';

export const EventData = {
  name: 'interaction',
  once: false,
  async execute(interaction) {
    if (!interaction.isCommand()) return;
    interaction.defer(true);
    if (interaction.commandName === 'slots-info-one-day') {
      const pincode = interaction.options[0].value;
      const date = interaction.options[1].value;
      const data = await fetchSingleDateAppointementByPin(pincode, date);
      if (!data.sessions.length) return interaction.editReply('No data available, try again later.');
      const infoEmbed = new MessageEmbed().setTitle('Vaccine Slots Single Day').setColor('GREEN');
      let description = '';
      data.sessions.forEach(session => {
        description += `**${session.name}**, available: \`${session.available_capacity}\`, age: \`${session.min_age_limit}\`\n`;
      });
      infoEmbed.setDescription(description);
      return interaction.editReply(infoEmbed);
    } else if (interaction.commandName === 'slots-info-one-week') {
      const pincode = interaction.options[0].value;
      const startDate = interaction.options[1].value;
      const data = await fetchMultipleDateAppointementByPin(pincode, startDate);
      if (!data.centers.length) return interaction.editReply('No data available, try again later.');
      const infoEmbed = new MessageEmbed().setTitle('Vaccine Slots').setColor('GREEN');
      let description = '';
      data.centers.forEach(center => {
        description += `**${center.name}**, available: \`${center.sessions[0]?.available_capacity}\`, age: \`${center.sessions[0]?.min_age_limit}\`\n`;
      });
      infoEmbed.setDescription(description);
      return interaction.editReply(infoEmbed);
    }
  },
};
