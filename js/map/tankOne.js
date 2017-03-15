class TankOne extends Phaser.State {
    constructor() {
        super();

    }

    _loadLevel() {
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this._backgroundImage = this.game.add.image(0, 0, 'backTiles');
        this._map = this.add.tilemap('tankOne');
        this._map.addTilesetImage('tilesetOne', 'tilesetOne');
        this._background_layer = this._map.createLayer('BackgroundLayer');
        this._collision_layer = this._map.createLayer('CollisionLayer');
        this._map.setCollisionBetween(0, 160, true, this._collision_layer);
        this._front_layer = this._map.createLayer('ForegroundLayer');

    }
    _loadCreature() {
        this.creature = new RazorFish(this.game, 80, 120, 'SlaughterFish' /*, this.map*/ );
        this.razorGroup.add(this.creature);
        this.creature = new RazorFish(this.game, 120, 120, 'SlaughterFish' /*, this.map*/ );
        this.razorGroup.add(this.creature);
        this.creature = new RazorFish(this.game, 160, 120, 'SlaughterFish' /*, this.map*/ );
        this.razorGroup.add(this.creature);
        this.game.world.bringToTop(this._front_layer);
    }




    _spawnEmitter() {
        this.emitter = this.game.add.emitter(268, 30, 0);
        this.emitter.width = 0;
        this.emitter.makeParticles('food');
        this.emitter.minParticleSpeed.set(-10, 10);
        this.emitter.maxParticleSpeed.set(20, 20);
        this.emitter.minParticleScale = 0.5;
        this.emitter.maxParticleScale = 0.9;
        this.emitter.setRotation(0, 50);
        this.emitter.setAlpha(0.1, 0.6);
        this.emitter.forEach(function (particle) {
            particle.body.allowGravity = false;
        }, this);
        this.emitter.start(false, 10000, 600);


    }
    _addNarrator() {
        this.narrator = new Narrator(this.game, 768, 206, 'rowan', 2);
    }
    _checkCollision() {
        this.game.physics.arcade.collide(this.razorGroup, this._collision_layer);
        //       this.game.physics.arcade.collide(this.creature.target, this._collision_layer);
    }

    _addButtons() {
        this.feedButton = this.game.add.sprite(60, 26, 'feedButton');
        this.feedButton.anchor.setTo(0.5);
        this.feedButton.inputEnabled = true;
        this.feedButton.events.onInputDown.add(this._enableFeed, this);

        this.infoButton = this.game.add.sprite(26, 26, 'infoButton');
        this.infoButton.anchor.setTo(0.5);
        this.infoButton.inputEnabled = true;

        this.openButton = this.game.add.sprite(94, 26, 'openButton');
        this.openButton.anchor.setTo(0.5);
        this.openButton.inputEnabled = true;
    }
    _enableFeed() {
        this.razorGroup.forEach(function (creature) {
            creature._placeNavigator();
        }, this);
    }
    preload() {

    }
    create() {
        console.log('Tank one fired!!!');
        this._loadLevel();
        this.razorGroup = this.game.add.group();
        this._loadCreature();
        this._addNarrator();
        this._spawnEmitter();
        this._addButtons();
    }
    update() {
        this._checkCollision();

    }
}


//
//
///make the player explodevar emitter = this.game.add.emitter(this.player.x, this.player.y, 100);emitter.makeParticles('playerParticle');emitter.minParticleSpeed.setTo(-200, -200);emitter.maxParticleSpeed.setTo(200, 200);emitter.gravity = 0;emitter.start(true, 1000, null, 100);this.player.kill(); Tilde likes this




/*
  _addEnemies() {
        //Create Group enemies to handle collisions
        this.enemies = this.add.group();
        //Create Array to store all objects with the type 'enemy'
        var enemyArr = this._findObjectsByType('enemy', this._map, 'ObjectLayer');
        //For Each element in array create Enemy Instance
        enemyArr.forEach(function (element) {
            this.enemy = new Enemy(this.game, element.x, element.y, 'monster', undefined, this.map, 80);
            //add enemy to enemies array
            this.amountOfEnemies++;
            this.enemies.add(this.enemy);

        }, this);

    }

    _enemy_hit(bullet, enemy) {
        enemy.animations.play('FastMovement');
        bullet.kill();
        enemy._health -= this._damage;

        enemy._enemy_MovementReset();
        enemy.body.velocity.y = 0;
        enemy._player_spotted = true;
        enemy._damage_animation();
        if (enemy._health < 1) {
            enemy.kill();
            this.player._activeEnemies--;
            this.player._enemyProgressUpdate();
            if (this.player._activeEnemies === 0) {
                console.log('arghblargh');
                this.amountOfEnemies = 0;

                this._monster_Spawner();
                this.player._activeEnemies = this.amountOfEnemies;
                this.player._enemiesInRound = this.amountOfEnemies;
                this.player._enemyProgressUpdate();
                console.log()

            }
        }


    }
    
    
    
        _enemy_hit(bullet, enemy) {

        bullet.kill();
        enemy._health -= this._damage;
        enemy._enemy_MovementReset();
        if (enemy._health < 1) {
            enemy.kill();
                console.log('enemyHit!);

            }
        }


    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        _player_damage(player, enemy) {
        if (this.player._health < 1) {
            this.player._health = 0;
        } else if (this.time.now > this.biteTimer && this.player._health > 1) {
            this.game.camera.shake(0.06, 40);
            this.player._health -= 30;
            this.biteTimer = this.time.now + 450;
            enemy._enemy_MovementReset();
        }

        this.game.time.events.add(Phaser.Timer.SECOND * 1, enemy._enemy_MovementReset, enemy);
    }
*/




/*

    //  this.game.physics.arcade.overlap(this.bullet, this._collision_layer, this._kill_bullet, null, this);
           // this.game.physics.arcade.collide(this.player, this.enemies, this._player_damage, null, this);

            //this.game.physics.arcade.collide(this.enemies, this._collision_layer);
           // this.game.physics.arcade.collide(this.bullet, this.enemies, this._enemy_hit, null, this);











  _monster_Spawner() {
            this._current_wave++;
            this._waveModifier += 2;
            this.player._currentWave.setText(this._current_wave);
            console.log('MonsterSpawner Fired! Current Wave Count ' + this._current_wave);
            var spawnArr = this._findObjectsByType('MonsterSpawner', this._map, 'ObjectLayer');
            //For Each element in array create Enemy Instance
            for (this.r = 0; this.r < 4 + this._waveModifier; this.r++) {
                spawnArr.forEach(function (element) {
                    for (this.i = 0; this.i < 1; this.i++) {
                        this.enemy = new Enemy(this.game, element.x, element.y, 'monster', undefined, this.map, 80);
                        console.log('Enemy Added');
                    }
                       this.amountOfEnemies++;
                    //add enemy to enemies array
                    this.enemies.add(this.enemy);
                }, this);
            }
        }*/






/*


create() { // bullet group    APP.bullets = game.add.group();    APP.bullets.createMultiple(10, 'bullet');    APP.bullets.setAll('anchor.x', 0.5);    APP.bullets.setAll('anchor.y', 1);    // ensure that all bullets have physics, rather than setting individually    APP.bullets.enableBody = true;    APP.bullets.physicsBodyType = Phaser.Physics.ARCADE;}update(){if (APP.fireButton.isDown)        {            fireBullet();        }// Changed the overlap to check the layer against the whole group instead of// an individual global bullet reference which will keep changing.game.physics.arcade.overlap(APP.layer, APP.bullets, function(bullet, layer) {        bullet.kill();    }, null, this);}}function fireBullet() {    if (game.time.now > APP.bulletTime) {        //game.sound.play('fire');        APP.bulletTime = game.time.now + APP.bulletRate;        // Grab the first bullet we can from the pool that's dead (to ensure        // you don't accidentally grab bullets which are mid-flight)        var currentBullet = APP.bullets.getFirstDead();        if (currentBullet)        {            currentBullet.lifespan = 2000; // kill after 2000ms            if (APP.facing === "right") {                //  And fire it                currentBullet.reset(APP.player.x + 15, APP.player.y + 15);                currentBullet.body.velocity.x = APP.bulletvelocity;            }            else if (APP.facing === "left") {                currentBullet.reset(APP.player.x, APP.player.y + 15);                currentBullet.body.velocity.x = -APP.bulletvelocity;            }        }    }}*/