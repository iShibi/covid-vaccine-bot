import { MessageEmbed } from 'discord.js';
import { fetchSingleDateAppointementByPin } from '../../utils/api.js';

export const Command = {
  data: {
    name: 'slots-info-one-day',
    description: 'Sends info about available vaccine slots for a specific date',
    options: [
      {
        name: 'pincode',
        type: 'INTEGER',
        description: 'The pincode of the place you want to search vaccine centers in',
        required: true,
      },
      {
        name: 'date',
        type: 'STRING',
        description: 'The date you want info for',
        required: true,
      },
    ],
  },
  methods: {
    async execute(interaction) {
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
    },
  },
};
