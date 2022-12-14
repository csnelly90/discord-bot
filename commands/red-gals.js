const {SlashCommandBuilder} = require('discord.js');
const {AttachmentBuilder, EmbedBuilder} = require('discord.js');
const {redDressPath, redDressImageFiles, redHeadPath, redHeadImageFiles} = require('../common.js');
const path = require("node:path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('red')
        .setDescription('Sends your daily dose of red. ^_^')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The image category you wish to get a random image from.')
                .setRequired(true)
                .addChoices(
                    {name: 'red head', value: 'red-head'},
                    {name: 'red dress', value: 'red-dress'},
                )
        ),
    async execute(interaction) {
        const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const userName = interaction.member.nickname || interaction.user.username;
        const category = interaction.options.getString('category');
        let randomImage = '';
        let imagePath = '';
        let file = null;

        // Utility class for construction and manipulation of embeds
        const embed = new EmbedBuilder()
            .setTitle('Your daily dose of red')
            .setDescription(`Just to make things clear, this RED CONTENT was requested by ${userName}.\n( ͡° ͜ʖ ͡°)`)
            .setTimestamp(Date.now())
            .setURL('https://github.com/csnelly90')
            .setFooter({iconURL: interaction.user.displayAvatarURL(), text: interaction.user.tag});

        if (category === 'red-head') {
            randomImage = randomChoice(redHeadImageFiles);
            imagePath = path.join(redHeadPath, randomImage);
            embed.addFields({name: 'A redhead a day...', value: '...keeps the doctor away.', inline: false});
        } else if (category === 'red-dress') {
            randomImage = randomChoice(redDressImageFiles);
            imagePath = path.join(redDressPath, randomImage);
            embed.addFields({name: 'A red dress a day...', value: '...keeps the doctor away.', inline: false});
        }

        file = new AttachmentBuilder(imagePath);
        embed.setImage(`attachment://${randomImage}`);

        await interaction.reply({embeds: [embed], files: [file]});
    },
};