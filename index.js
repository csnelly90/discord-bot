const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const {commandsPath, commandFiles} = require('./common.js');
require('dotenv').config();
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// extends native Map class, used to store and efficiently retrieve commands for execution
client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// When the client is ready, run this code (only once)
// 'c' as the event parameter stands for the 'client'
client.once(Events.ClientReady, c => {
        console.log(`DadABot on board! Logged in as ${c.user.tag}`);
    }
);

client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
);

// has to be last line in the file
client.login(token);