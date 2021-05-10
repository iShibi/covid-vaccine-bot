import fs from 'fs';
import { Client, Intents } from 'discord.js';
import { VA_BOT_TOKEN } from './utils/config.js';

const client = new Client({
  intents: Intents.ALL,
});

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

eventFiles.forEach(async file => {
  const event = await import(`./events/${file}`);
  if (event.once) {
    client.once(event.EventData.name, (...args) => event.EventData.execute(...args, client));
  } else {
    client.on(event.EventData.name, (...args) => event.EventData.execute(...args, client));
  }
});

client.login(VA_BOT_TOKEN);
