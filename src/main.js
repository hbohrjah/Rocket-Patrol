// Code obtained from CMPM 120 'Rocket Patrol Tutorial'

let config= 
{
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play]
}

let game = new Phaser.Game(config);
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;