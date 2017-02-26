class Creature extends Phaser.Sprite {
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
        this._map = game.add.tilemap('mainMap');
        this._initCursor();
        this._creatureModeSelector();


    }
    _creatureModeSelector() {
        if (this.navigatorAlive === false) {
            this._creatureRandomMovement();
        } else {
            this._moveTo();
        }
    }

    _creatureRandomMovement() {
        console.log('RandomMovementFired!!!');
        this.seededTimer = Math.random() * (8 - 1) + 1;
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


    _behaviourGenerator(){
        //if this.body.x < 128 spawn arrow on right side ov screen
        // 
    }
    
    
    
    
    
    

    _moveTo() {
        console.log('MoveTo Fired');
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





    _initCursor() {
        this.cursor = this.game.add.group();
        this.cursor.enableBody = true;
        this.cursor.physicsBodyType = Phaser.Physics.ARCADE;
        this.cursor.setAll('body.collideWorldBounds', true);
    }

    _addNavigator(x,y) {
        this.target = this.cursor.create(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 'pointer');
        this.target.body.bounce.set(0.2);
        this.navigatorAlive = true;
        this.target.anchor.setTo(0.5);
        this.target.body.collideWorldBounds = true;
    }

    _cursorReset() {
        this.seededMovement = Math.random() * (20 - 5) + 5;
        this.target.destroy();
        this.navigatorAlive = false;
        this.body.velocity.x = this.seededMovement;
        this._creatureModeSelector();
    }

    update() {
        if (this.navigatorAlive === true) {
            if (this.x < this.target.x + 15 && this.x > this.target.x - 15 && this.y && this.y < this.target.y + 15 && this.y && this.y > this.target.y - 15) {
                this._cursorReset();
            }
        }
        if (this.game.input.activePointer.leftButton.isDown && this.game.time.now > this.inputTimer) {
            this.inputTimer = this.game.time.now + 200;
            this.testcoordinate = this._map.getTileWorldXY(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 64, 64, 'CollisionLayer');
            if (!this.testcoordinate && this.navigatorAlive === false) {
                this._addNavigator();
            } else if (!this.testcoordinate) {
                this._cursorReset();
                this._addNavigator();
            }
        }

        if (this.navigatorAlive === true) {

            if (this.x < this.target.x) {
                this.body.velocity.x = 70;
                if (this.body.blocked.right && this.y > this.target.y - 10) {
                    this.body.velocity.y = -40;
                }
            }
            if (this.x > this.target.x && this.y > this.target.y - 10) {
                this.body.velocity.x = -70;
                if (this.body.blocked.left) {
                    this.body.velocity.y = -40;
                }
            }


            if (this.y < this.target.y) {
                this.body.allowGravity = true;
            } else {
                this.body.allowGravity = false;
            }


        }

        var direction;
        if (this.body.velocity.x > 0) {
            this.scale.setTo(-1, 1);
            direction = 1;
        } else {
            this.scale.setTo(1, 1);
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









/*


 _movementTimer() {
        this.seededTimer = Math.random() * (8 - 1) + 1;
        this.chanceOfFeeding = Math.random() * (99 - 0) + 0;
        if(this.lifeSpan < 350){
        this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, function () {
            if (this.chanceOfFeeding > this.hunger && this.hasEaten === false && this.foodPosition.length > 0) {
                this._moveTo();
                console.log('feeding');
            } else {
                this._randomMovement();
                console.log('movement');
            }
        }, this);
        var bubbleChance = Math.random() * (5 - 1) + 1;
        bubbleChance = Math.floor(bubbleChance);
        if (bubbleChance === 4) {
            this._spawnBubble();
        }}
    }

    _randomMovement() {
        this.randMovement = Math.random() * (3 - 1) + 1;
        this.randMovement = Math.floor(this.randMovement);
        this.randSpeed = Math.random() * (50 - 15) + 15;
        if (this.randMovement === 2) {
            this.body.velocity.x = this.randSpeed;
        } else {
            this.body.velocity.x = -this.randSpeed;
        }
        this.randHeight = Math.random() * (3 - 1) + 1;
        this.randHeight = Math.floor(this.randMovement);
        this.randY = Math.random() * (15 - 3) + 3;
        if (this.randMovement === 1) {
            this.body.velocity.y = this.randY;
        } else if (this.randMovement === 2) {
            this.body.velocity.y = -this.randY;
        } else {}
        this._movementTimer();
    }






*/









/*

            _initCursor() {
            this.cursor = this.game.add.group();
            this.cursor.enableBody = true;
            this.cursor.physicsBodyType = Phaser.Physics.ARCADE;
            this.cursor.setAll('body.collideWorldBounds', true);
        }

        _addNavigator() {
            this.target = this.cursor.create(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 'pointer');;
            this.target.body.bounce.set(0.2);
            this.navigatorAlive = true;
            this.target.anchor.setTo(0.5);
        }

        _cursorReset() {
            this.target.destroy();
            this.navigatorAlive = false;
        }

    update() {

    
        
                    if (this.navigatorAlive === true) {
                if (this.x < this.target.x + 15 && this.x > this.target.x - 15 && this.y && this.y < this.target.y + 15 && this.y && this.y > this.target.y - 15) {
                    this._cursorReset();
                }
            }
            if (this.game.input.activePointer.leftButton.isDown && this.game.time.now > this.inputTimer) {
                this.inputTimer = this.game.time.now + 200;
                this.testcoordinate = this._map.getTileWorldXY(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 64, 64, 'CollisionLayer');
                if (!this.testcoordinate && this.navigatorAlive === false) {
                    this._addNavigator();
                } else if (!this.testcoordinate) {
                    this._cursorReset();
                    this._addNavigator();
                }
            }
        
        
        
        

        if (this.navigatorAlive) {
            if (this.x < this.target.x) {
                this.body.velocity.x = 70;
                this.scale.setTo(-1, 1);
                if (this.body.blocked.right) {
                    this.body.velocity.y = -60;
                    //                        this.animations.play('climbing');
                } else {
                    //                        this.animations.play('walking');
                }
            }
            if (this.x > this.target.x) {
                this.body.velocity.x = -70;
                this.scale.setTo(1, 1);
                if (this.body.blocked.left) {
                    this.body.velocity.y = -60;
                    //                        this.animations.play('climbing');
                } else {
                    //                        this.animations.play('walking');
                }
            }
        }

    }
}

*/









/*

        update() {

            if (this.navigatorAlive === true) {
                if (this.x < this.target.x + 15 && this.x > this.target.x - 15) {
                    this._cursorReset();
                }
            }
            if (this.game.input.activePointer.leftButton.isDown && this.game.time.now > this.inputTimer) {
                this.inputTimer = this.game.time.now + 200;
                this.testcoordinate = this._map.getTileWorldXY(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 64, 64, 'CollisionLayer');
                if (!this.testcoordinate && this.navigatorAlive === false) {
                    this._addNavigator();
                } else if (!this.testcoordinate) {
                    this._cursorReset();
                    this._addNavigator();
                }
            }

            if (this.navigatorAlive) {
                if (this.x < this.target.x) {
                    this.body.velocity.x = 70;
                    this.scale.setTo(-1, 1);
                    if (this.body.blocked.right) {
                        this.body.velocity.y = -60;
                        this.animations.play('climbing');
                    } else {
                        this.animations.play('walking');
                    }
                }
                if (this.x > this.target.x) {
                    this.body.velocity.x = -70;
                    this.scale.setTo(1, 1);
                    if (this.body.blocked.left) {
                        this.body.velocity.y = -60;
                        this.animations.play('climbing');
                    } else {
                        this.animations.play('walking');
                    }
                }
            } else if (this.spellFiring){
                 this.body.velocity.x = 0;
          this.animations.play('firing');
            } else {
                      this.body.velocity.x = 0;
                this.animations.play('standing');
            }
        }
    }


*/