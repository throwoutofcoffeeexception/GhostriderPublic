class Player{
    constructor(){
        this.className = "player";
        this.positionX = 45;
        this.positionY = 0;
        this.leftLimit = 40;
        this.rightLimit = 55;
        this.topLimit = 130;
        this.bottomLimit = 0;
        this.width = 6;
        this.height = 20;
        this.domElement = null;

    }
    moveLeft(){
        console.log("moving left.... current position: " + this.positionX);
        this.positionX -= ((this.leftLimit < this.positionX) ? 2 : 0);
    }
    moveRight(){
        console.log("moving right.... current position: " + this.positionX);
        this.positionX += ((this.positionX < this.rightLimit) ? 2 : 0);
    }

    moveUp(){
        console.log("moving up.... current position: " + this.positionY);
        this.positionY += ((this.topLimit > this.positionY) ? 2 : 0);
    }
    moveDown(){
        console.log("moving down.... current position: " + this.positionY);
        this.positionY -= ((this.positionY > this.bottomLimit) ? 2 : 0);
    }

    Bump(leftRight)
    {
        let bump = document.getElementById("bump");
        console.log("bump left: "+ bump.style.left + " pos left" + this.positionX);
        bump.style.left =(leftRight ? this.positionX + 2: this.positionX - 2) + "vw";
        bump.style.bottom = (this.positionY + 15) + "vh";
        bump.style.visibility = 'visible';
    }

    RemoveBump()
    {
        bump.style.visibility = 'hidden';
    }
}

export default Player;
