function computerPlay() {
    const array_of_choices = ['Rock', 'Paper', 'Scissors'];
    let random_choice = Math.floor(Math.random()*3);
    //console.log(array_of_choices[random_choice]);
    return array_of_choices[random_choice];
}

function playRound(playerSelection, computerSelection) {
    const array_of_choices = ['Rock', 'Paper', 'Scissors'];
    player.changeGuessCount = 10;
    let convertedPlayerSelection;
    try {
        convertedPlayerSelection = playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase(); 
        if (!array_of_choices.includes(convertedPlayerSelection)) {
            player.changeGuessCount = player.guessCount - 1;
            alert(`You typed a wrong word. You can try ${player.guessCount} times`);
            playerSelection = prompt("Please type either rock, paper or scissors:");
            while (player.guessCount > 0) {
                if (playerSelection === "" || playerSelection === null || playerSelection === undefined) {
                    while (playerSelection === "" || playerSelection === null) {
                        alert("You should enter some text");
                        playerSelection = prompt("Please type either rock, paper or scissors:");
                    } 
                }
                else {
                    convertedPlayerSelection = playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase();
                    if (array_of_choices.includes(convertedPlayerSelection)) { 
                        if (convertedPlayerSelection === 'Rock') {
                            if (computerSelection === 'Paper') {
                                computer.score++;
                                return `You lose! ${computerSelection} beats ${convertedPlayerSelection}`;
                            }
                            else if (computerSelection === 'Scissors') {
                                player.score++;
                                return `You win! ${convertedPlayerSelection} beats ${computerSelection}`;
                            }
                            else if (computerSelection === 'Rock') {
                                return "Draw!";
                            }
                        }
                        else if (convertedPlayerSelection === 'Paper') {
                            if (computerSelection === 'Scissors') {
                                computer.score++;
                                return `You lose! ${computerSelection} beats ${convertedPlayerSelection}`;
                            }
                            else if (computerSelection === 'Rock') {
                                player.score++;
                                return `You win! ${convertedPlayerSelection} beats ${computerSelection}`;
                            }
                            else if (computerSelection === 'Paper') {
                                return "Draw!";
                            }
                        }
                        else if (convertedPlayerSelection === 'Scissors') {
                            if (computerSelection === 'Rock') {
                                computer.score++;
                                return `You lose! ${computerSelection} beats ${convertedPlayerSelection}`;
                            }
                            else if (computerSelection === 'Paper') {
                                player.score++;
                                return `You win! ${convertedPlayerSelection} beats ${computerSelection}`;
                            }
                            else if (computerSelection === 'Scissors') {
                                return "Draw!";
                            }
                        }
                    }
                    else {
                        if (player.guessCount === 1) {
                            alert(`You lose. This round is over`);
                            player.changeGuessCount = player.guessCount - 1;
                        }
                        else if (player.guessCount === 2) {
                            player.changeGuessCount = player.guessCount - 1;
                            alert(`You typed a wrong word. You can try the last time`);
                            playerSelection = prompt("Please type either rock, paper or scissors:");
                        }
                        else {
                            player.changeGuessCount = player.guessCount - 1;
                            alert(`You typed a wrong word. You can try ${player.guessCount} times`);
                            playerSelection = prompt("Please type either rock, paper or scissors:");
                        }
                    }
                }
            }
            if(player.guessCount === 0){
                computer.score++;
                return "You lose!";
            }
        }
        else {
            if (convertedPlayerSelection === 'Rock') {
                if (computerSelection === 'Paper') {
                    computer.score++;
                    return `You lose! ${computerSelection} beats ${convertedPlayerSelection}`;
                }
                else if (computerSelection === 'Scissors') {
                    player.score++;
                    return `You win! ${convertedPlayerSelection} beats ${computerSelection}`;
                }
                else if (computerSelection === 'Rock') {
                    return "Draw!";
                }
            }
            else if (convertedPlayerSelection === 'Paper') {
                if (computerSelection === 'Scissors') {
                    computer.score++;
                    return `You lose! ${computerSelection} beats ${convertedPlayerSelection}`;
                }
                else if (computerSelection === 'Rock') {
                    player.score++;
                    return `You win! ${convertedPlayerSelection} beats ${computerSelection}`;
                }
                else if (computerSelection === 'Paper') {
                    return "Draw!";
                }
            }
            else if (convertedPlayerSelection === 'Scissors') {
                if (computerSelection === 'Rock') {
                    computer.score++;
                    return `You lose! ${computerSelection} beats ${convertedPlayerSelection}`;
                }
                else if (computerSelection === 'Paper') {
                    player.score++;
                    return `You win! ${convertedPlayerSelection} beats ${computerSelection}`;
                }
                else if (computerSelection === 'Scissors') {
                    return "Draw!";
                }
            }
        }     
    }
    catch (err) {
        console.log(err);
    }
    
}

function setRoundName(roundNumber) {
    let roundName;
    switch(roundNumber){
        case 1:
            roundName = "first";
            break;
        case 2:
            roundName = "second";
            break;
        case 3:
            roundName = "third";
            break;
        case 4:
            roundName = "forth";
            break;
        case 5:
            roundName = "fifth"; 
            break;
        default:
            roundName = "";           
    }

    return roundName;
}

function game() {
    let title = "Instructions ";
    let instructionMessage = title.toUpperCase() + '\u{1F447}' + `\n\n    The game consists of 5 rounds.
    In each round, you will be given 10 chances to write your
    answer correctly.
    You need to guess the selection of computer in order to win.
    In fact, computer randomly selects one of the following 3 options:
    1. Rock         2. Paper        3. Scissors
    Please check your spelling after entering your input.
    If you are ready, please press \"OK\" to start the game
    or \"Cancel\" to exit.` 
    if (confirm(instructionMessage) === true) {
        for (let i = 0; i < 5; i++) {
            let roundName = setRoundName(i+1);
            if(roundName !== ""){
                alert(`The ${roundName} round started`);
            }
            let playerSelection = prompt("Please type either rock, paper or scissors:");
            const computerSelection = computerPlay();
            if (playerSelection === "" || playerSelection === null || playerSelection === undefined) {
                while(playerSelection === "" || playerSelection === null) {
                    alert("You should enter some text");
                    playerSelection = prompt("Please type either rock, paper or scissors:");
                } 
            }
            let msg = playRound(playerSelection, computerSelection);
            let scores = `\n \u{1F464} Your score is ${player.score}
                        \u{1F4BB} Computer score is ${computer.score}`;
            console.log(`${scores}`);
            console.log(msg);
            if(i < 4) {
                alert("Now press OK to turn to the next round."); 
            }
        }
        if (player.score > computer.score){
            alert("You win");
        }
        else if (computer.score > player.score) {
            alert("You lose");
        }
        else {
            alert("Draw");
        }
        alert("The game is over. Press OK to exit");
        return;
    }
    else {
        alert("You exited");
        return;
    }
}

const player = {
    score:0,
    number_of_guesses: 10,

    set changeGuessCount(newCount) {
        this.number_of_guesses = newCount;
    },

    get guessCount() {
        return this.number_of_guesses;
    }
};

const computer = {score:0};
game();