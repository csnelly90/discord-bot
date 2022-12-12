const {SlashCommandBuilder} = require('discord.js');

const greetings = [
    'Hello',
    'Hi',
    'Ahoy',
    'Ciao',
    'What\'s up',
];

const niceties = [
    'Puppies and kittens probably share photos of you with one another in their very own social network.',
    'I\'m so comfortable with you that I consider you the human form of sweatpants.',
    'You may not be perfect, but your weirdness matches mine, and that\'s close enough.',
    'You have a calming presence and a lot of people fall asleep near you.',
    'Let\'s say you were cloned. I bet you\'d still be one of a kind. And the better looking one!',
    'Your ability to consider a problem from multiple angles and perspectives is a gift and a curse.',
    'You know, you\'re almost as wonderful as cake. Almost.',
    'You\'re definitely not someone who I pretend not to see in public.',
    'Our time together is like a nap. It just doesn\'t last long enough.',
    'You\'re like a corner piece of a jigsaw puzzle. Without you, I would be lost.',
    'You are awkward, in a cute way. Like an elevator ride, but with puppies.',
    'I\'m always amazed by the things you don\'t find embarrassing about me.',
    'I tell everyone how amazing you are. Especially that one time you coughed and farted simultaneously.',
    'If you were a booger, I\'d pick you first.',
    'You\'re like a piece of furniture, you don\'t do much, but noticed when you\'re not there.',
    'You look like you were drawn by my dominant hand.',
    'If it was legal to marry food, I\'d still choose you over pizza.',
    'In a world full of bagels, you\'re a doughnut.',
    'Truth be told, you have really good taste in friends.',
    'If you were a dog, you\'d either be the leader of the pack or the laziest one in the world. Sometimes, I just can\'t tell with you.',
    'We all have those days where it\'s like, “Yeah, I\'m not getting anything done today.” And on those days, I know I can trust you to join me in accomplishing nothing.',
    'If you were a fruit, you would be a fine-apple.',
    'You\'re like a good bra to me. Fully supportive, never stabbing me in the back, and always lifting my burden no matter how heavy.',
    'When you say, “I meant to do that,” I totally believe you.',
    'If you were a vegetable, you\'d be a cute-cumber.',
    'You\'re more fun than a bubble wrap.',
    'I would love to spend every minute of every day with you, but some days I actually have to get stuff done.',
    'Your smile is proof that the best things in life are free.',
    'I don\'t know if sarcasm is a skill, but you\'ve certainly mastered it.',
    'Are you a beaver, because DAM!',
    'So you think you look ugly today, eh? Well, guess what? You don\'t look ugly to a blind person. Or to me.',
    'You are like mathematics. You difficult at times, but worth getting to know.',
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Greets the user with random niceties.'),
    async execute(interaction) {
        const userName = interaction.member.nickname || interaction.user.username;
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        const randomNicety = niceties[Math.floor(Math.random() * niceties.length)];

        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(
            `${randomGreeting}, ${userName}!\nLet me tell you something:\n${randomNicety}`
        );
    },
};