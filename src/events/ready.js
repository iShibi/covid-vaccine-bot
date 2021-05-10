import fs from 'fs';
import { VA_GUILD_ID } from '../utils/config.js';

export const Event = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    const interactionData = [];
    const interactionCommandFiles = fs.readdirSync('./src/commands/interaction').filter(file => file.endsWith('.js'));
    for (const file of interactionCommandFiles) {
      const command = (await import(`../commands/interaction/${file}`)).Command;
      interactionData.push(command.data);
      client.interactionMethods.set(command.data.name, command.methods);
    }
    await client.guilds.cache.get(VA_GUILD_ID)?.commands.set(interactionData);
  },
};
