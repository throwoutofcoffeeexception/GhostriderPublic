

class Obstacle{
    constructor(){
        this.className = "obstacle";
        this.positionX = 50;
        this.positionY = 100;
        this.leftLimit = 50;
        this.rightLimit = 50;
        this.width = 6;
        this.height = 20;
        this.domElement = null;
        this.deleteMe = false;
    }
    moveDown(){
        this.positionY -= 1;
        //console.log("moving down.... current poistion: " + this.positionX);
    }

    removeObstacle() 
    {
        if (this.positionY < 0)
        {
            this.deleteMe = true;
        }
        this.domElement.remove();
    }
}

class car extends Obstacle
{

}

export default Obstacle;