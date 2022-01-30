class Tools{
    constructor() {
    }

    collisionDetection(player, object)
    {
        if (player.positionX < object.positionX + object.width &&
            player.positionX + player.width > object.positionX &&
            player.positionY < object.positionY + object.height &&
            player.height + player.positionY > object.positionY) 
            {
                return true;
            }
            else
            { 
                return false;
            }
    }

    randomPosition(width)
    {
        return Math.floor((Math.random() * 12 - width)) + 50;
    }
}

export default Tools;