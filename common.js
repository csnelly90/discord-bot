const fs = require('node:fs');
const path = require('node:path');

// helps to construct a path to the 'commands' directory
const commandsPath = path.join(__dirname, 'commands');

module.exports = {
    commandsPath: commandsPath,
    // reads the path to the directory and returns an array of all the file names it contains
    commandFiles: fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')),
};