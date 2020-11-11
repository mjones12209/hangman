//Requires
const json = require('./word-bank.json');
const prompt = require('readline-sync')

//Global variables
let totalRounds=0;
let wonRounds=0;
let lostRounds=0;
let previousGuesses = [];

//Functions

const wordSelector = (json) => {
   return json[Math.floor(Math.random() * json.length)];
}

const displayResults = (displayArray,rightGuesses,wrongGuesses,guessesLeft) => {
    console.log(displayArray,'\n',"Right Guesses: ",rightGuesses,'\n',"Wrong Guesses: ", wrongGuesses);
    console.log(`Guesses Remaining:  ${guessesLeft}`);
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

const displayTotals = (rightGuesses,wrongGuesses,randomWord,won) => {
    if(won === 0){
        console.log("You lost this round!");
    } else if (won === 1){
        console.log("You won this round!");
    }
    console.log("****Round Totals****",'\n',"Right Guesses: ",rightGuesses,'\n',"Wrong Guesses: ", wrongGuesses,'\n',"The answer was:  ", randomWord);
}



const displayFinalResults = (wonRounds,lostRounds,totalRounds) => {
    console.log(`You won ${wonRounds} out of ${totalRounds} and lost ${lostRounds} of ${totalRounds}`)
}

const playGame = () => {
    console.clear();
    console.log(`***Round ${totalRounds+1}***`)
    const randomWord = wordSelector(json);
    let guesses = 0;
    let guessesLeft = 6;
    let wordAsArray = randomWord.split('');
    let rightGuesses = [];
    let wrongGuesses= [];
    let displayArray = [];
    let won = 0;
    
    wordAsArray.forEach(element=>displayArray.push("_"));

    displayHangman(wrongGuesses.length - 1)
    displayResults(displayArray,rightGuesses,wrongGuesses,guessesLeft);
    

    while(guesses <= 6){
        let guess = prompt.question("Please enter a guess.  ",{ limit: /^[A-Za-z]/, limitMessage: "Please enter one letter a-z"}).toLowerCase();
        guess = guess[0];
        while(previousGuesses.indexOf(guess) > -1){
            guess = prompt.question(`You have already guess "${guess}" please try again!`,{ limit: /^[A-Za-z]/, limitMessage: "Please enter one letter a-z"}).toLowerCase();
            guess = guess[0]
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
            guessesLeft--;
            guesses++; 
        }      
        
        if(displayArray.join('') === randomWord){
            wonRounds++;
            won=1;
            break;
        } else if (wrongGuesses.length === 6){
            lostRounds++;
            break;
        }       
        displayHangman(wrongGuesses.length);    
        displayResults(displayArray,rightGuesses,wrongGuesses,guessesLeft);
        
     }
    totalRounds++;  
    displayTotals(rightGuesses,wrongGuesses,randomWord,won);
    displayHangman(wrongGuesses.length);
    displayFinalResults(wonRounds,lostRounds,totalRounds);
    while(true){    
        const nextRound = prompt.question("Enter 'c' to being next round.",{ limit: /^[cC]/, limitMessage: "Please enter c to continue to next round."});
        if(nextRound === 'c'){
            break;
        }
    }
    playGame();
}

//Main program

playGame();





