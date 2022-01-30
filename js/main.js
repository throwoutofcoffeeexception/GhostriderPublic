import Game from "./Game.js"

const game = new Game();


// show name
document.getElementById('WhatsYourName').style.visibility = 'visible';

document.getElementById('WhatsYourNameButton').addEventListener("click", startGame);

function startGame()
{
    game.start();
}
// show: ready set go!

//document.getElementById('ReadySetGo').style.visibility = 'visible';


//document.getElementById('ReadySetGo').style.visibility = 'hidden';


