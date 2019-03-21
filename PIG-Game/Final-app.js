
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, **if either of the dice shows 1 or both the dice shows 6**, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach input winning points or default-100 points on GLOBAL score wins the game
*/
var scores, roundScores, activePlayer, gamePlaying, lastDice,winningScore;

// call intialised function
init();
// on click of btn roll
document.querySelector('.btn-roll').addEventListener('click', function() {
  // if game playing is true
  if (gamePlaying) {

    // 1. random number
   var dice = Math.floor(Math.random() * 6 + 1);
   var dice2 = Math.floor(Math.random() * 6 + 1);
   //var dice=1;
   //var dice2=3;

    //2. Display the dice img based on random number
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice2');
    
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';

    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

//3. call next player IF either of the dice shows 1 or both the dice shows 6
  if((dice == 1 || dice2 == 1) || (dice == 6 && dice2 == 6))
  {
    nextPlayer();  //call next player
  }
  else{
    roundScore += dice + dice2;
    // update the current players score with round score, based on active player
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }
  // set last dice roll to dice roll
  lastDice = dice;
}
});
// hold button on click
document.querySelector('.btn-hold').addEventListener('click', function() {
  // only if game playing is true
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the active player score 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // get winning score
    var input = document.querySelector('.winningScore').value;
    // if there is an input
    if(input>=0 && input<=150) {
       winningScore = input;
    } else {
      // without input default score
      winningScore = 100;
    }

    // Check if player won the game based on target score
    if (scores[activePlayer] >= winningScore) {
      // add text winner to active player
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      // hide dice 1
      document.querySelector('.dice').style.display = 'none';
      // hide dice 2
      document.querySelector('.dice2').style.display = 'none';
      // adding winner class to active player panel
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      // remove the active class from active player panel
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }

});

function nextPlayer() {
  // player change 
  // if active player = 0, change to player 1, else active player = 0
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // reset 
  roundScore = 0;

  // reset currents to 0 
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // toggle active on panels
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  document.querySelector('.winningScore').textContent = '';

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // hide the dice
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  // reset all scores and current
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // change player names back
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // remove winner class to active player panel
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // remove active class to active player panel
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

