// Code obtained from CMPM 120 'Rocket Patrol Tutorial'

class Menu extends Phaser.Scene
{
    constructor()
    {
        super('menuScene')
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/player.png')
        //this.load.image('spaceship', './assets/doritoShip.png')
        this.load.image('starfield', './assets/spaceScape.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.spritesheet('spaceship', './assets/doritoShipAnim.png',
        {
            frameWidth: 64,
            frameHeight: 32
        })

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', [
          './assets/sfx_explode1.wav',
          './assets/sfx_explode2.wav',
          './assets/sfx_explode3.wav',
          './assets/sfx_explode4.wav'
      ]);
        //this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('theme', './assets/theme.wav')
      }

    create()
    {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4, first: 0}),
            frameRate: 15
        })

        this.anims.create({
          key: 'spaceship',
          frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 3}),
          frameRate: 5,
          repeat : 1
      })
        
        let menuConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)

        this.add.text(game.config.width/2, game.config.height/2 , 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
    
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        //keyLEFT = this.input.on(Phaser.Input.Keyboard.KeyCodes.LEFT)
        //keyLEFT = this.input.pointer.movementX()
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    }

    update() 
    {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
    }
} 