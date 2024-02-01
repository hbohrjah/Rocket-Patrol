// Handrei Bohrjah
// Revenge of the Rocket Patrol
// 4-6 hours
// - High Score Mod (1) - Shows a persistent high score per session
// - Background Music (1)
// - Randomize Spaceship Movement (1)
// - Control Rocket After it's fired (1)
// - Time Remaining in Seconds (3)
// - Spaceship Animation SpriteSheet (3)
// - Random explosion sound (5) - Added an 4 explosion sound effects. Cannot play random sound
// - Timing mechanism (5) - increases time for successful hit, could not implement a way to reduce timer

// Code obtained from CMPM 120 'Rocket Patrol Tutorial'

let config= 
{
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play],
    physics :
    {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }

}


let game = new Phaser.Game(config);

let highScore = 0
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;