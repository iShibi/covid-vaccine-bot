import { MessageEmbed } from 'discord.js';
import { fetchMultipleDateAppointementByPin } from '../../utils/api.js';

export const Command = {
  data: {
    name: 'slots-info-one-week',
    description: 'Sends info about available vaccine slots for next seven days starting from a specific date',
    options: [
      {
        name: 'pincode',
        type: 'INTEGER',
        description: 'The pincode of the place you want to search vaccine centers in',
        required: true,
      },
      {
        name: 'start_date',
        type: 'STRING',
        description: 'The date you want the info to start from',
        required: true,
      },
    ],
  },
  methods: {
    async execute(interaction) {
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
    },
  },
};
