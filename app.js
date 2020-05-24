/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a double 1 and double 6, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore,activePlayer, gameState,maxScored;
var diceHistories = [];

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gameState){
        var diceOneNumber = Math.floor(Math.random()*6)+1;
        var diceTwoNumber = Math.floor(Math.random()*6)+1;
        var diceTotal = diceOneNumber+diceTwoNumber;

        var diceOne = document.querySelector('.dice-1');
        var diceTwo = document.querySelector('.dice-2');

        diceOne.classList.remove('hide');
        diceTwo.classList.remove('hide');

        diceOne.src = 'images-pig-game/dice-' + diceOneNumber + '.png';
        diceTwo.src = 'images-pig-game/dice-' + diceTwoNumber + '.png';

        if(diceTotal !== 2){
            roundScore += diceTotal;

            lastDice = diceHistories[diceHistories.length - 1];
            diceHistories.push(diceTotal);
            
            if (diceTotal >= 8  && lastDice >= 8){
                diceHistories = [];
                nextPlayer();
            }
            
            var current = document.querySelector('#current-' + activePlayer);
            current.innerHTML = '<b>'+ roundScore +' </b>';
        }
        else {
            diceHistories = [];
            nextPlayer();
        }   
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if (gameState){
        scores[activePlayer] += roundScore;

        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer] >= maxScored){
            playerWinner();
        }
        else {
            nextPlayer();    
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-again').addEventListener('click', function () {  
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    playAgain();
});

function nextPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
        diceOne = document.querySelector('.dice-1').style.left = '70%';
        diceTwo = document.querySelector('.dice-2').style.left = '80%';
        hideDice();
    }
    else {
        activePlayer = 0;
        diceOne = document.querySelector('.dice-1').style.left = '20%';
        diceTwo = document.querySelector('.dice-2').style.left = '30%';
        hideDice();
    }

    roundScore = 0;

    currentScorePlayer();

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
    playAgain();

    document.querySelector('.btn-roll').classList.toggle('hide');
    document.querySelector('.btn-hold').classList.toggle('hide');
    
    var maxScore = document.querySelector('.input-max-score');
    maxScored = parseInt(maxScore.value);
    maxScore.setAttribute('disabled','true');
    maxScore.classList.add('inactive');
}

function playAgain(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameState = true;

    currentScorePlayer();
    document.getElementById('score-0').textContent= '0';
    document.getElementById('score-1').textContent= '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.btn-again').classList.add('hide');
}

function hideDice(){
    document.querySelector('.dice-1').classList.toggle('hide');
    document.querySelector('.dice-2').classList.toggle('hide');
}

function playerPanelInActive(){
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function currentScorePlayer(){
    document.getElementById('current-0').textContent= 0;
    document.getElementById('current-1').textContent= 0;
}

function playerWinner(){
    hideDice();
    playerPanelInActive();
    currentScorePlayer();
    document.getElementById('name-'+activePlayer).innerHTML = '<b> Winner </b>';
    document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
    document.querySelector('.btn-again').classList.remove('hide');
    gameState= false;
}