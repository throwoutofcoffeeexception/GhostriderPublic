import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import Tools from "./Tools.js";
import Decorations from "./Decorations.js";

console.log("starting game...");

class Game {
    constructor(){
        this.obstaclesArr = [];
        this.timer = 0;
        this.tools = new Tools();
        this.refreshRate = 1000 / 60;
        this.obstacleFrequency = 0;
        this.maxObstacles = 100
        this.currentObstacles = 0;
        this.initalScore = 100;
        this.currentScore = this.initalScore;
        this.updateScore(this.currentScore);
        this.collision = 0;
        this.collisionCounter = 100;
        this.timer1 = 0;
        this.timer2 = 0;
        this.HighscoreAjax = 0;
        this.Ajax = new XMLHttpRequest();
        this.text = "";
        this.gameover = false;
        this.time = 0;
    }

    start(){

        // create player
        this.player = new Player(); //create an instance of the Player
        this.player.domElement = this.createDomElm(this.player); //create DOM element for the player
        this.drawDomElm(this.player);

        document.getElementById('WhatsYourName').style.visibility = 'hidden';

        //animation ready set go

        document.getElementById('HighscoreList').innerHTML = "";

        this.addEventListeners();

        this.timer1 = setInterval(() => {
            this.timer++;

            if (this.currentObstacles < this.maxObstacles)
            {
                // create obstacle
                const newObstacle = new Obstacle();
                newObstacle.domElement = this.createDomElm(newObstacle);
                newObstacle.positionX = this.tools.randomPosition(this.player.width);
                this.obstaclesArr.push(newObstacle);
                this.drawDomElm(newObstacle);
                this.currentObstacles++;
                this.time += 3;
            }
        }, 3000);

        this.timer2 = setInterval(() => {
            this.timer++;

            this.obstaclesArr.forEach(element => {
                element.moveDown();

                //element.removeObstacle();
                this.drawDomElm(element)
                if (this.collision <= 0)
                {
                    if (this.tools.collisionDetection(this.player, element))
                    {
                        document.getElementById('score').style.backgroundColor = "#FF3333";
                        this.currentScore -= 300;
                        this.updateScore(this.currentScore);
                        console.log("crash!!..");
                        let leftright = true;
                        if (this.player.positionX < element.positionX) 
                        {
                            leftright = true;
                            element.positionX +=3;
                        }
                        else
                        {
                            leftright = false;
                            element.positionX -=3;
                        }

                        this.player.Bump(leftright);
                        this.collision = 30;
                    }
                    else
                    {
                        document.getElementById('score').style.backgroundColor = "#000000";
                        this.currentScore += 1;
                        this.updateScore(this.currentScore);

                        this.player.RemoveBump();
                    }
                }
                else
                {
                    this.collision--;
                }

                if (this.currentScore < 0)
                {
                    this.stop();
                    this.GameOver();
                }
            });
        }, 100);
    }

    stop()
    {
      clearInterval(this.timer1);
      clearInterval(this.timer2);
    }

    GameOver()
    { 
      if (this.gameover == false)
      {
          this.gameover = true;
          this.SendHighscores();
          document.getElementById('Highscores').style.visibility = 'visible';
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let lines = this.responseText.split('\n');
                let name = "";
                let score = "";
                for(let i = 0;i < lines.length;i++){
                    name = lines[i].split(';')[0];
                    score = lines[i].split(';')[1];

                    if (score == undefined)
                        continue;
                   document.getElementById('HighscoreList').innerHTML += "<li> " + name + " ["+ score +"]</li>";
                   this.gameover = false;
                }
            }
          };
          xhttp.open("GET", "http://ghostrider.outofcoffeeexception.com/ghostrider2/server/index.php?action=read", true);
          xhttp.send();
      }
    }

    SendHighscores()
    {

        await this.Sleep(500);

        let shttp = new XMLHttpRequest();
        let name = document.getElementById('WhatsYourNameInput').value;
        let score = this.time;
        let sendString = "http://ghostrider.outofcoffeeexception.com/ghostrider2/server/index.php?action=newHighscore&name=" + name + "&score=" + score + "&version=0.1";
        shttp.open("GET", sendString, true);
        shttp.send();
    }

    Sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
       }

    HighscoreCallback()
    {
        document.getElementById('HighscoreList').innerHTML = this.text;
    }

    updateScore(score)
    {
        
        document.getElementById('score').innerHTML = score ;
    
    }

    addEventListeners(){
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft"){
                this.player.moveLeft();
            } else if (event.key === "ArrowRight"){
                this.player.moveRight();
            }
            else if (event.key === "ArrowUp") {
                this.player.moveUp();
            }
            else if (event.key === "ArrowDown") {
                this.player.moveDown();
            }
            this.drawDomElm(this.player);
        });
    }
    createDomElm(instance){
        const htmlTag = document.createElement("div"); // create html element (not added to the dom yet)
        htmlTag.className = instance.className; // add class (so that we can reuse this function to create different types of elements in the dom, eg. player, obstacles....)
        htmlTag.style.width = instance.width + "vw";
        htmlTag.style.height = instance.height + "vh";
        const board = document.getElementById("board"); // get a reference to the parent container
        board.appendChild(htmlTag); // append the element to the dom
        return htmlTag;
    }
    drawDomElm(instance){
        instance.domElement.style.left = instance.positionX + "vw";
        instance.domElement.style.bottom = instance.positionY + "vh";
    }
}

export default Game;