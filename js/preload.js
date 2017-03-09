class Preload extends Phaser.State {
    preload() {
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        
        this.load.image('creature', 'img/creatureTemplate.png');
        this.load.image('pointer', 'img/pointer.png');
        this.load.image('backTiles', 'img/backTiles.png');
        this.load.image('tileset', 'img/tileset.png');
        this.load.image('overlay', 'img/overlay.png');
        this.load.script('Creature', 'js/entity/creature.js');
        this.load.script('narrator', 'js/entity/narrator.js');
        this.load.script('TankTwo', 'js/map/TankTwo.js');
        this.load.script('TankOne', 'js/map/TankOne.js');
        this.load.tilemap('mainMap', 'json/mainMap.json', null, Phaser.Tilemap.TILED_JSON); 
        
        
        //Narrator Related
        this.load.image('lift', 'img/lift.png');
        this.game.load.spritesheet('rowan', 'img/tilesheets/rowan.png', 30, 110, 8);
        
        //Ui Related
        this.game.load.spritesheet('feedButton', 'img/Ui/feedButton.png', 28, 28, 3);
        this.game.load.spritesheet('openButton', 'img/Ui/openButton.png', 28, 28, 3);
        this.game.load.spritesheet('infoButton', 'img/Ui/infoButton.png', 28, 28, 3);
        this.game.load.spritesheet('upArrow', 'img/Ui/upArrow.png', 32, 22, 3);
        this.game.load.spritesheet('downArrow', 'img/Ui/downArrow.png', 32, 22, 3);
        
        
    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('TankTwo', TankTwo);
        this.game.state.start('TankTwo');
        
//         this.game.state.add('TankOne', TankOne);
//        this.game.state.start('TankOne');
        
        
    }

}