//Requires
const json = require('./word-bank.json');
const prompt = require('readline-sync')

//Global variables
let totalRounds=0;
let wonRounds=0;
let lostRounds=0;
let previousGuesses = [];

//Functions


//select random word
const wordSelector = (json) => {
   return json[Math.floor(Math.random() * json.length)];
}

//display live results to the user during the round
const displayResults = (displayArray,rightGuesses,wrongGuesses,guessesLeft) => {
    console.log(displayArray,'\n',"Right Guesses: ",rightGuesses,'\n',"Wrong Guesses: ", wrongGuesses);
    console.log(`Guesses Remaining:  ${guessesLeft}`);
}

//display hangmang 
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

//function that displays the totals of the rounds
const displayTotals = (rightGuesses,wrongGuesses,randomWord,won) => {
    if(won === 0){
        console.log("You lost this round!");
    } else if (won === 1){
        console.log("You won this round!");
    }
    console.log("****Round Totals****",'\n',"Right Guesses: ",rightGuesses,'\n',"Wrong Guesses: ", wrongGuesses,'\n',"The answer was:  ", randomWord);
}


//function that displays the results of the end of the round and give user a chance to see them before continuing to next round
const displayFinalResults = (wonRounds,lostRounds,totalRounds) => {
    console.log(`You won ${wonRounds} out of ${totalRounds} and lost ${lostRounds} of ${totalRounds}`);
    while(true){    
        const nextRound = prompt.question("Enter 'c' to being next round.",{ limit: /^[cC]/, limitMessage: "Please enter c to continue to next round."});
        if(nextRound === 'c'){
            break;
        }
    }
}

const playGame = () => {

    //clear console 
    console.clear();

    //display round number
    console.log(`***Round ${totalRounds+1}***`)

    //select random word
    const randomWord = wordSelector(json);

    //set variables for the round
    let guesses = 0;
    let guessesLeft = 6;
    let wordAsArray = randomWord.split('');
    let rightGuesses = [];
    let wrongGuesses= [];
    let displayArray = [];
    let won = 0;
    
    //create array for display array based on the randomWord as an array
    wordAsArray.forEach(element=>displayArray.push("_"));

    //display hangman and also 
    displayHangman(wrongGuesses.length - 1)
    displayResults(displayArray,rightGuesses,wrongGuesses,guessesLeft);
    
    //while loop for the game
    while(guesses <= 6){

        //get guess from user and make sure to only use the first character
        let guess = prompt.question("Please enter a guess.  ",{ limit: /^[A-Za-z]/, limitMessage: "Please enter one letter a-z"}).toLowerCase();
        guess = guess[0];

        //check to see if the guess is already been guess, if it has complain
        while(previousGuesses.indexOf(guess) > -1){
            guess = prompt.question(`You have already guess "${guess}" please try again!`,{ limit: /^[A-Za-z]/, limitMessage: "Please enter one letter a-z"}).toLowerCase();
            guess = guess[0]
        }
        previousGuesses.push(guess);        
        let search = wordAsArray.find((element) => element == guess);
        console.clear();
        
        //find out if the guess was in random word and if so pursh to the appropriate array
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
        
        //check to see if correct guesses equal random word selected

        if(displayArray.join('') === randomWord){
            wonRounds++;
            won=1;
            break;
        } else if (wrongGuesses.length === 6){
            lostRounds++;
            break;
        }       

        //display hangmang and also display arrays and guesses left
        displayHangman(wrongGuesses.length);    
        displayResults(displayArray,rightGuesses,wrongGuesses,guessesLeft);
        
     }

    //increment total rounds
    totalRounds++;  
   
    //display totals
    displayTotals(rightGuesses,wrongGuesses,randomWord,won);
    displayHangman(wrongGuesses.length);
    displayFinalResults(wonRounds,lostRounds,totalRounds);

    //start next round
    playGame();
}

//Main program

playGame();





