import fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import { VA_BOT_TOKEN } from './utils/config.js';

const client = new Client({
  intents: Intents.ALL,
});

client.interactionMethods = new Collection();

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

eventFiles.forEach(async file => {
  const event = (await import(`./events/${file}`)).Event;
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

client.login(VA_BOT_TOKEN);
