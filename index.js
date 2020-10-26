//Requires
const json = require('./word-bank.json');
const prompt = require('readline-sync')


//Functions
const wordSelector = (json) => {
   return json[Math.floor(Math.random() * json.length)];
}









//Main program
const randomWord = wordSelector(json);

const name = prompt.question("May I have your name ?")

const guesses = 0

console.log(`Welcome to Hangman, ${name}`);

while(guesses < randomWord.length){
    prompt.question("Please enter a guess.");
};

