function computerPlay() {
    let random_choice = Math.floor(Math.random()*3);
    return array_of_choices[random_choice];
}

function checkForEmptyValue(playerInput) {
    if(playerInput !== null) playerInput = playerInput.trim(" ");
     // Checking for empty value
    while(playerInput === ""){
        alert("You should enter some text");
        playerInput = prompt("Please type either rock, paper or scissors:");
        if(playerInput !== null) playerInput = playerInput.trim(" ");
        else break;
    } 
    // Checking whether a player wants to exit the game or not
    if (playerInput === null) {
        if(exit()) game();
        else return;
    }
    return playerInput;
}

function collectPlayerData() {
    let playerSelection = prompt("Please type either rock, paper or scissors:");
    playerSelection = checkForEmptyValue(playerSelection);
    // Checking if a player canlceled the game
    if(playerSelection!== undefined && playerSelection !== null) {
        playerSelection = playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase(); 
        if (!array_of_choices.includes(playerSelection)) {
            while (!array_of_choices.includes(playerSelection) && playerSelection !== null) {
                alert(`You typed a wrong word. Try again`);
                playerSelection = prompt("Please type either rock, paper or scissors:");
                playerSelection = checkForEmptyValue(playerSelection);
                // Checking if a player canlceled the game  
                if(playerSelection !== undefined && playerSelection !== null) {
                    playerSelection = playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase();
                } 
            }
        }
        return playerSelection;
    }
    else return;
}


function playRound(playerSelection, computerSelection) {
    try {
        player.changeRoundCount = player.playedRounds + 1;
        if ((playerSelection === 'Rock' && computerSelection === 'Paper') 
         ||(playerSelection === 'Paper' && computerSelection === 'Scissors')
         ||(playerSelection === 'Scissors' && computerSelection === 'Rock')) { 
            computer.score++;
            return `You lose! ${computerSelection} beats ${playerSelection}`;
        }
        else if ((playerSelection === 'Rock' && computerSelection === 'Scissors')
             || (playerSelection === 'Scissors' && computerSelection === 'Paper')
             || (playerSelection === 'Paper' && computerSelection === 'Rock')) {
            player.score++;
            return `You win! ${playerSelection} beats ${computerSelection}`;
        }
        else if (playerSelection === computerSelection) {
            return "Draw!";
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

function exit() {
    let exit_msg = confirm("Do you want to exit?");
    if(exit_msg){
        exit_checking.change_exit_value = true;
        alert("You exited");
        return true;
    }
    else if (exit_msg === null){
        exit_checking.change_exit_value = false;
        return false;
    }
}

function finishGame() {
    if (player.playedRounds > 0) {
        console.log(`\nThe game is over...`);
        if (player.score > computer.score){
            alert(`\u{1F917} Congratulaions!!! You win!`);
            console.log(`\u{1F917} Congratulaions!!! You win!`);
        } 
        else if (computer.score > player.score) {
            alert(`\u{1F614} You lose!`);
            console.log(`\u{1F614} You lose!`);
        }
        else {
            alert(`\u{1F91D} Draw`);
            console.log(`\u{1F91D} Draw!`);
        }
        if (player.playedRounds === 4 ) alert("The game is over. Press OK to exit");
        return;
    }
    else return;
}

function game() {
    let title = "Instructions ";
    let instructionMessage = title.toUpperCase() + '\u{1F447}' + `\n\n    The game consists of 5 rounds.
    You should type either rock, paper or scissors.
    You also need to guess the selection of computer in order to win.
    In fact, computer randomly selects one of the following 3 options:
    1. Rock         2. Paper        3. Scissors
    Please check your spelling after entering your input.
    If you are ready, please press \"OK\" to start the game
    or \"Cancel\" to exit.` 
    if (exit_checking.exit_value) return;
    if (confirm(instructionMessage) === true) {
        for (let i = 0; i < 5; i++) {
            let roundName = setRoundName(i+1);
            if(roundName !== ""){
                alert(`The ${roundName} round started`);
            }
            const playerSelection = collectPlayerData();
            const computerSelection = computerPlay();
            // Checking if the game was canceled
            if(!exit_checking.exit_value){
                let msg = playRound(playerSelection, computerSelection);
                let scores = `\n \u{1F464} Your score is ${player.score}
                        \u{1F4BB} Computer score is ${computer.score}`;
                console.log(`${scores}`);
                console.log(msg);
                if(i < 4) alert("Now press OK to turn to the next round."); 
            }
            else break;
        }
        finishGame();
    }     
    else {
        if(exit()) return;
        else game();
    }
    return;
}

const player = {
    score:0,
    numberOfRounds: 0,

    set changeRoundCount(newValue) {
        this.numberOfRounds = newValue;
    },
    get playedRounds() {
        return this.numberOfRounds;
    }
};
const computer = {score:0};
const array_of_choices = ['Rock', 'Paper', 'Scissors'];
const exit_checking = {
    exit: false,
    set change_exit_value(value) {
        this.exit = value;
    },
    get exit_value() {
        return this.exit;
    }
};
game();