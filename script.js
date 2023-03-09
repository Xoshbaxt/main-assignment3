function computerPlay() {
    let array_of_choices = ['Rock', 'Paper', 'Scissors'];
    let random_choice = Math.floor(Math.random()*3);
    //console.log(array_of_choices[random_choice]);
    return array_of_choices[random_choice];
}

function playRound(playerSelection, computerSelection) {
    player.changeGuessCount = 10;
    let convertedPlayerSelection;
    try {
        convertedPlayerSelection = playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase();
        if (convertedPlayerSelection === computerSelection) {
            player.score++;
            alert("You found it!");
        }  
        else {
            player.changeGuessCount = player.guessCount - 1;
            alert(`You are wrong. You can try ${player.guessCount} times`);
            playerSelection = prompt("Please guess the computer selection:");
            while (player.guessCount > 0) {
                if (playerSelection === "" || playerSelection === null || playerSelection === undefined) {
                    while (playerSelection === "" || playerSelection === null) {
                        alert("You should enter some text");
                        playerSelection = prompt("Please guess the computer selection:");
                    } 
                }
                else {
                    convertedPlayerSelection = playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase();
                    if (convertedPlayerSelection === computerSelection) {   
                        player.score++;
                        alert("You found it!");
                        break;
                    }
                    else {
                        if (player.guessCount === 1) {
                            alert(`You lose. This round is over`);
                            player.changeGuessCount = player.guessCount - 1;
                        }
                        else if (player.guessCount === 2) {
                            player.changeGuessCount = player.guessCount - 1;
                            alert(`You are wrong. You can try the last time`);
                            playerSelection = prompt("Please guess the computer selection:");
                        }
                        else {
                            player.changeGuessCount = player.guessCount - 1;
                            alert(`You are wrong. You can try ${player.guessCount} times`);
                            playerSelection = prompt("Please guess the computer selection:");
                        }
                    }
                }
            }
            if(player.guessCount === 0){
                computer.score++;
            }
        }     
    }
    catch (err) {
        console.log(err);
    }
    if (player.score > computer.score){
        return "You win!";
    }
    else if (computer.score > player.score) {
        return `You lose! ${computerSelection} beats ${convertedPlayerSelection}`;
    }
    else {
        return "Draw!";
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
    In each round, you will be given 10 chances to find the correct
    answer.
    You need to guess the selection of computer.
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
            let playerSelection = prompt("Please guess the computer selection:");
            const computerSelection = computerPlay();
            if (playerSelection === "" || playerSelection === null || playerSelection === undefined) {
                while(playerSelection === "" || playerSelection === null) {
                    alert("You should enter some text");
                    playerSelection = prompt("Please guess the computer selection:");
                } 
            }
            let msg = playRound(playerSelection, computerSelection);
            //console.log(playRound(playerSelection, computerSelection));
            let scores = `\n \u{1F464} Your score is ${player.score}
                        \u{1F4BB} Computer score is ${computer.score}`;
            console.log(`${scores}`);
            if(i < 4) {
                alert("Now press OK to turn to the next round."); 
            }
            else if(i === 4) {
                alert(msg);
                console.log(msg);
            }
        }
    }
    else {
        alert("You exited");
        return;
    }
    alert("The game is over. Press OK to exit");
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