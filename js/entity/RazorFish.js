class RazorFish extends Phaser.Sprite {
    constructor(game, x, y, key, tilemap) {
        super(game, x, y, key, tilemap);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = true;
        this.game.physics.arcade.gravity.y = 110;
        this.body.bounce.set(1, 0);
        this.body.velocity.x = 20;
        this.targetX = 0;
        this.targetY = 0;
        this.navigatorAlive = false;
        this.inputEnabled = true;
        this.hunger = 100;
        this.inputTimer = 0;
        this._map = game.add.tilemap('tankOne');
        this._initCursor();
        this._creatureModeSelector();
        this._behaviourGenerator();
        this.idleAnimation = this.animations.add('idle', [10, 11, 12, 13]);
        this.idleAnimation = this.animations.add('feast', [6, 7, 8, 9]);
        this.runAnimation = this.animations.add('run', [6, 7, 8, 9]);
        //this.feastAnimation = this.animations.add('feast', [/*0, 1, 2, 3, 4, 5*/ 10]);
        this.animations.play('feast', 3 , true);
        this.creatureSize = 1.2; 
        console.log('Razorfish spawned at - X: ' + this.x + ' And Y : ' + this.y); 

    }
    _creatureModeSelector() {
        //  console.log('creaturemode fired  Navigator Alive is: ' + this.navigatorAlive);
        if (this.navigatorAlive === false) {
            this._creatureRandomMovement();
            this.animations.play('feast', 4, true);
        } else {

            this._moveTo();

        }
    }

    _creatureRandomMovement() {
        //  console.log('RandomMovementFired!!!');
        this.seededTimer = Math.random() * (7 - 1) + 1;
        this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, function () {
            this.randomMovement = Math.random() * (5 - 1) + 1;
            this.randomVelocity = Math.random() * (41 - 10) + 10;
            this.randomMovement = Math.floor(this.randomMovement);
            if (this.seededTimer < 3) {
                this.allowDrop === true;
            } else {
                this.allowDrop === false;
            }
            if (this.randomMovement === 1) {
                this.body.velocity.x = -this.randomVelocity;
            }
            if (this.randomMovement === 2) {
                this.body.velocity.x = this.randomVelocity;
            }
            if (this.randomMovement === 3) {
                this.body.velocity.x *= -1;
            }
            if (this.randomMovement === 4) {

                this.body.velocity.x = 0;
            }
            this._creatureModeSelector();
        }, this);
    }


    _behaviourGenerator() {
        //         console.log('behaviourGeneneratorFired!!! NavigatorAlive is: ' + this.navigatorAlive);
        var generator = Math.random() * (3 - 1) + 1;
        generator = Math.floor(generator);
        //console.log('generator is: ' + generator)
        if (this.navigatorAlive === false && generator === 2) {
            var leftSpawnArea = Math.random() * (250 - 10) + 10;
            var rightSpawnArea = Math.random() * (620 - 400) + 400;
            if (this.x > 318 && this.body.blocked.down && this.navigatorAlive === false) {
                var selector = Math.random() * (3 - 0) - 0;
                selector = Math.floor(selector);
                if (selector === 1 && this.navigatorAlive === false) {
                    this._generateNavigator(leftSpawnArea, 130);
                } else if (selector === 2 && this.navigatorAlive === false) {
                    this._generateNavigator(leftSpawnArea, 130);
                }
                //                          console.log('Generator Check Fired! target is in the middle space');
            } else if (this.navigatorAlive === false && this.x < 318 && this.body.blocked.down) {
                //                          console.log('Generator Check Fired! target is not in the middle space');
                this._generateNavigator(rightSpawnArea, 130);
            }
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  5 * generator , function () {
            this.animations.play('run', 12, true);
            this._behaviourGenerator();
        }, this);
    }

    _moveTo() {
        //        console.log('MoveTo Fired');
        if (this.x < this.target.x) {
            this.body.velocity.x = 70;
            if (this.body.blocked.right) {
                this.body.velocity.y = -60;
            }
        }
        if (this.x > this.target.x) {
            this.body.velocity.x = -70;
            if (this.body.blocked.left) {
                this.body.velocity.y = -60;
            }

        }
    }
    
    _placeNavigator(){
        
                if (this.navigatorAlive === false) {
                this._generateNavigator(400, 80);
            } else {
                this._cursorReset();
                this._generateNavigator(400, 80);
            }
    }

    _initCursor() {
        this.cursor = this.game.add.group();
        this.cursor.enableBody = true;
        this.cursor.physicsBodyType = Phaser.Physics.ARCADE;
        this.cursor.setAll('body.collideWorldBounds', true);
    }

    _generateNavigator(x, y) {
        this.target = this.cursor.create(x, y, 'pointer');
        //this.target = this.cursor.create(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 'pointer');
        this.target.body.bounce.set(0.2);
        this.navigatorAlive = true;
        this.target.anchor.setTo(0.5);
        this.target.body.collideWorldBounds = true;
    }

//    _addNavigator(x, y) {
//        //  this.target = this.cursor.create(x, y, 'pointer');
//        this.target = this.cursor.create(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 'pointer');
//        this.target.body.bounce.set(0.2);
//        this.navigatorAlive = true;
//        this.target.anchor.setTo(0.5);
//        this.target.body.collideWorldBounds = true;
//    }

    _cursorReset() {
        this.seededMovement = Math.random() * (20 - 5) + 5;
        this.target.destroy();
        this.navigatorAlive = false;
        this.body.velocity.x = this.seededMovement;
        this._creatureModeSelector();
    }

    update() {
        if (this.navigatorAlive === true) {
            if (this.x < this.target.x + 15 && this.x > this.target.x - 15) {
                this._cursorReset();
            }
        }
//        if (this.game.input.activePointer.leftButton.isDown && this.game.time.now > this.inputTimer) {
//            this.inputTimer = this.game.time.now + 200;
//            
//            this._placeNavigator();
////            this.testcoordinate = this._map.getTileWorldXY(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 64, 64, 'CollisionLayer');
////            if (!this.testcoordinate && this.navigatorAlive === false) {
////                this._addNavigator();
////            } else if (!this.testcoordinate) {
////                this._cursorReset();
////                this._addNavigator();
////            }
//        }

        if (this.navigatorAlive === true) {
            if (this.x < this.target.x) {
                this.animations.play('run', 1, true);
                this.body.velocity.x = 70;
                if (this.body.blocked.right) {
                    this.body.velocity.y = -40;
                    this.animations.play('idle', 6, true);
                }
            }
            if (this.x > this.target.x) {
                this.body.velocity.x = -70;
                this.animations.play('run', 1, true);
                if (this.body.blocked.left) {
                    this.body.velocity.y = -40;
                    this.animations.play('idle', 6, true);
                }
            }

        }

        var direction;
        if (this.body.velocity.x > 0) {
            this.scale.setTo(this.creatureSize, this.creatureSize);
            direction = 1;
        } else {
            this.scale.setTo(-this.creatureSize, this.creatureSize);
            direction = -1;
        }
        var nextX = this.x + direction * (Math.abs(this.width) / 2 + 1);
        var nextY = this.bottom + 1;
        var nextTile = this._map.getTileWorldXY(nextX, nextY, 64, 64, 'CollisionLayer');
        if (!nextTile && this.body.blocked.down && this.allowDrop === true && this.navigatorAlive === false) {
            this.body.velocity.x *= -1;

        }


    }
}

