// Code obtained from CMPM 120 'Rocket Patrol Tutorial'

class Spaceship extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
    }

    update(dir)
    {
        //this.anims.play('spaceship')
        
        if(dir %2==0)
        {
            this.x -= this.moveSpeed
            if(this.x <= 0 - this.width)
            {
                this.x = game.config.width
            }
        }
        else
        {
            this.x += this.moveSpeed
            if(this.x > game.config.width)
            {
                this.x = 0
            }
        }

        
    }

    reset()
    {
        this.x = game.config.width
    }
}