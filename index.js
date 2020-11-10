//Requires
const json = require('./word-bank.json');
const prompt = require('readline-sync')

//Global variables
let totalRounds=1;
let wonRounds=0;
let lostRounds=0;
let previousGuesses = [];

//Functions
const wordSelector = (json) => {
   return json[Math.floor(Math.random() * json.length)];
}

const displayResults = (rightGuesses,wrongGuesses,displayArray,guessesLeft) => {
    console.log("Right Guesses: ",rightGuesses,'\n',"Wrong Guesses: ", wrongGuesses,'\n', displayArray);
    console.log(`Guesses Remaining:  ${guessesLeft}`)
}
const displayTotals = (rightGuesses,wrongGuesses,displayArray,randomWord,won) => {
    if(won === 0){
        console.log("You lost this round!");
    } else if (won === 1){
        console.log("You won this round!");
    }
    console.log("****Round Totals****",'\n',"Right Guesses: ",rightGuesses,'\n',"Wrong Guesses: ", wrongGuesses,'\n',"The answer was:  ", randomWord);
}

const displayHangman = (wrongGuesses)=> {
    switch (wrongGuesses){
        case 1: 
            console.log(" O")
            break;
        case 2: 
            console.log(" O",'\n',"|")
            break;
        case 3: ;
            console.log(" O",'\n',"|/")
            break;
        case 4: ;
            console.log("  O",'\n',"\\|/")
            break;
        case 5: 
            console.log("  O",'\n',"\\|/",'\n'," |")
            break;
        case 6: 
            console.log("__",'\n'," )",'\n'," |",'\n'," O",'\n',"\\|/",'\n'," |",'\n',"/ \\");
            break;
    }
}

const displayFinalResults = (wonRounds,lostRounds,totalRounds) => {
    // console.clear();
    console.log(`You won ${wonRounds} out of ${totalRounds} and lost ${lostRounds} of ${totalRounds}`)
}

const playGame = () => {
    console.clear()
    console.log(`***Round ${totalRounds}***`)
    const randomWord = wordSelector(json);
    let guesses = 0;
    let guessesLeft = 6;
    let wordAsArray = randomWord.split('');
    let rightGuesses = [];
    let wrongGuesses= [];
    let displayArray = [];
    let rounds = totalRounds;
    let won = 0;
    
    console.log(randomWord);

    wordAsArray.forEach(element=>displayArray.push("_"));

    displayResults(rightGuesses,wrongGuesses,displayArray,guessesLeft);
    displayHangman(wrongGuesses.length - 1)

    while(guesses <= 6){
        let guess = prompt.question("Please enter a guess.  ",{ limit: /^[A-Za-z]{1}/, limitMessage: "Please enter one letter a-z"}).toLowerCase();
        while(previousGuesses.indexOf(guess) > -1){
            guess = prompt.question("You have already guess that please try again!",{ limit: /^[A-Za-z]{1}/, limitMessage: "Please enter one letter a-z"}).toLowerCase();
        }
        previousGuesses.push(guess);
        let search = wordAsArray.find((element) => element == guess);
        console.clear();
        
     
        if(search === guess){
             rightGuesses.push(guess);
             wordAsArray.forEach((element,index)=>{
                 if(element == guess){
                     displayArray[index] = guess;
                 }
             });      
        } else if (search !== guess){
            wrongGuesses.push(guess);
        }      
        
        if(displayArray.join('') === randomWord){
            console.log("You won!!!");
            wonRounds++;
            won=1;
            break;
        } else if (wrongGuesses.length === 6){
            console.log("You lost!!!");
            lostRounds++;
            break;
        }
        guesses++;
        guessesLeft--;
        displayResults(rightGuesses,wrongGuesses,displayArray,guessesLeft);
        displayHangman(wrongGuesses.length)    
     }
    totalRounds++;  
    console.log(totalRounds)
    // console.clear()
    displayTotals(rightGuesses,wrongGuesses,displayArray,randomWord,won);
    displayHangman(wrongGuesses.length);
    displayFinalResults(wonRounds,lostRounds,totalRounds);
    // console.clear();
    setTimeout(playGame(wonRounds,lostRounds,rounds),7000);
}

//Main program

const name = prompt.question("May I have your name ?  ")

console.log(`Welcome to Hangman, ${name}`);

playGame();





