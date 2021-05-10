export const Event = {
  name: 'interaction',
  once: false,
  async execute(interaction) {
    if (!interaction.isCommand()) return;
    interaction.defer(true);
    try {
      interaction.client.interactionMethods.get(interaction.commandName).execute(interaction);
    } catch (error) {
      console.error(error);
    }
  },
};
