// Code obtained from CMPM 120 'Rocket Patrol Tutorial'

class Play extends Phaser.Scene
{
    constructor()
    {
        super('playScene')
    }

    create()
    {   
        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        //this.p1Rocket = this.physics.add.sprite(x, y, 'rocket')

        this.physics.add.collider(this.p1Rocket, this.ship03, this.handleCollision, null, this)
        

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    
        this.direction = Math.floor(Math.random()* 10)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)

        if(this.direction %2==0)
        {
            this.ship01.setFlipX(false)
            this.ship02.setFlipX(true)
            this.ship03.setFlipX(false)
        }
        else
        {
            this.ship01.setFlipX(true)
            this.ship02.setFlipX(false)
            this.ship03.setFlipX(true)
        }

        this.p1Score = 0
        // display score
        let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        this.highUI = this.add.text(game.config.width/2- 40, borderUISize + borderPadding *2, highScore, scoreConfig)
        
        
        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        
        scoreConfig.fixedWidth = 0
        this.themeSong = this.sound.add('theme')
        
        this.themeSong.play()
        //this.sound.play('theme', {volume: 0.5})
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
        //this.elapsed = this.clock.getRemainingSeconds()
        //this.timeBar = this.add.text(game.config.width/2+100, borderUISize + borderPadding*2, this.elapsed, scoreConfig)
        
    }

    update() 
    {
        let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 100
        }
        this.elapsed = this.clock.getRemainingSeconds()
        
        this.timeBar = this.add.text(game.config.width/2+180, borderUISize + borderPadding*2, Math.floor(this.elapsed), scoreConfig)
        //console.log(this.elapsed)

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) 
        {
          this.themeSong.pause()
          this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) 
        {
          this.themeSong.pause()
          this.scene.start("menuScene")
        }
        
        
        this.starfield.tilePositionX -= 4

        if(!this.gameOver) 
        {               
          this.p1Rocket.update()         // update rocket sprite
          this.ship01.play('spaceship', true)
          this.ship01.update(this.direction)           // update spaceships (x3)
          this.ship02.play('spaceship', true)
          this.ship02.update(this.direction+1)
          this.ship03.play('spaceship', true)
          this.ship03.update(this.direction)      
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }


    }

    handleCollision(rocket, ship)
    {
      rocket.reset()
      this.shipExplode(ship)
    }

    checkCollision(rocket, ship) {
      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
      }
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
            this.increment = this.clock.getRemaining()+ 5000    
            //console.log(this.increment)
            
            this.clock = this.time.delayedCall(this.increment, () => {
              this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
              this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
              this.gameOver = true
          }, null, this)
          return true
        } else {


          return false
        }
      }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })    
        
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        if(highScore < this.p1Score)
        {
          highScore = this.p1Score
        }
        this.highUI.text = highScore
        

        this.sound.play('sfx-explosion')
      }
}