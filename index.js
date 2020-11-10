//Requires
const json = require('./word-bank.json');
const prompt = require('readline-sync')


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
    console.clear();
    console.log(`You won ${wonRounds} out of ${totalRounds} and lost ${lostRounds} of ${totalRounds}`)
}

const playGame = (wonRounds=0,lostRounds=0,totalRounds=1) => {
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
    console.clear()
    displayTotals(rightGuesses,wrongGuesses,displayArray,randomWord,won);
    displayHangman(wrongGuesses.length);

    const shouldRestart = restart()

    if(shouldRestart == "y") {
        console.clear();
        playGame(wonRounds,lostRounds,rounds);
    } else if (shouldRestart == "n"){
        displayFinalResults(wonRounds,lostRounds,totalRounds);
        console.log("Goodbye");
    }
}

const restart = () => {
    return prompt.question("Would you like to play again y or n?  ",{ limit: /^[YyNn]$/, limitMessage: "Please enter only letters y or n"})
}


//Main program

const name = prompt.question("May I have your name ?  ")

console.log(`Welcome to Hangman, ${name}`);

playGame();



