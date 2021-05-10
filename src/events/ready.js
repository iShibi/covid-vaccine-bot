import fs from 'fs';
import { VA_GUILD_ID } from '../utils/config.js';

export const EventData = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    const interactionCommandDataArray = [];
    const interactionCommandFiles = fs.readdirSync('./src/commands/interaction').filter(file => file.endsWith('.js'));
    for (const file of interactionCommandFiles) {
      const interactionCommand = await import(`../commands/interaction/${file}`);
      interactionCommandDataArray.push(interactionCommand.CommandData);
    }
    await client.guilds.cache.get(VA_GUILD_ID)?.commands.set(interactionCommandDataArray);
  },
};
