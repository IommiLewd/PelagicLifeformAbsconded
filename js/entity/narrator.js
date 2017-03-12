class Narrator extends Phaser.Sprite {
    constructor(game, x, y, key, map) {
        super(game, x, y, key, map);
        game.add.existing(this);
        this.anchor.setTo(0.5);
        this.idleAnimation = this.animations.add('idle', [0, 1, 2, 3]);
        this.talkAnimation = this.animations.add('talk', [4, 5, 6, 7]);
        this.animations.play('idle', 2, true);
        this.endPos = y;
        this.currentMap = map;
        if (elevatorGoingDown === true) {
            this.y = -100;
        } else {
            this.y = 500;
        }
        this._elevatorIn();
        this.lift = this.game.add.image(0, 48, 'lift');
        this.lift.anchor.setTo(0.5);
        this.addChild(this.lift);
        this.UiEnabled = false;
        //this._initUi();
        if (map === 1) {
            this.scientistSays = [
                "This is the Laboratory",
                "undoubtedly great things will be dicovered here."
        ]
        }

        if (map === 2) {
            this.scientistSays = [
                "This is tank one.",
                "In here we breed the Grubs.",
                "They're pretty much food for all predators - ",
                " - in the Chasm."
        ]
        }
        if (map === 3) {
            this.scientistSays = [
            "Greetings Director, to tank Two.",
            "In here we keep the Tricephallus Sanctipauli.",
            "Probably the main attraction, really.",
            "This is the Pyronasal RNA -",
            "- In its most potent form, yet.",
            " ... ",
            "We've regulated temperature, -",
            "- And gently decresed Atmospheric Pressure.",
            "That combined with the fungi, -",
            "- has lead to a mass gain of 30% so far.",
            "You have Access to the dossiers, -",
            "- Upper left corner."
        ]
        }
        if (map === 4) {
            this.scientistSays = [
                "This is tank Three.",
                "We've debated poisoning the tank.",
                "But we're worried it'd be capable of rupturing it -",
                "- If agitated.",
                "It seems to have understood our predicament.",
                "This thing is kind of the king down here now.",
                "So we've named it that."
            ]
        }
        this.dialogueProgress = 0;
    }


    _dialogue() {


        if (this.dialogueProgress === 0) {

            this.textBox = this.game.add.sprite(0, 120 + 10, 'dialogBox');
            this.textBox.anchor.setTo(0.5);
            this.addChild(this.textBox);

            this.stuffSaid = this.game.add.text(0, 80 + 10, this.scientistSays[this.dialogueProgress]);
            this.stuffSaid.bringToTop();

            this.stuffSaid.font = 'Press Start 2P';
            this.stuffSaid.fontSize = 12;
            this.stuffSaid.addColor("#96eccf", 0); //red
            //this.stuffSaid.setTextBounds(0, 0,300,300);


            this.stuffSaid.align = 'center';
            this.stuffSaid.anchor.setTo(0.5, 0.0);
            this.addChild(this.stuffSaid);
            this.stuffSaid.wordWrap = true;
            this.stuffSaid.wordWrapWidth = 200;
            this.game.time.events.add(Phaser.Timer.SECOND * 8, this._dialogue, this);
        } else if (this.dialogueProgress === this.scientistSays.length) {

            this.stuffSaid.destroy();
            this.textBox.destroy();
            this.animations.play('idle', 2, true);
        } else {
            this.stuffSaid.setText(this.scientistSays[this.dialogueProgress]);
            this.game.time.events.add(Phaser.Timer.SECOND * 8, this._dialogue, this);
        }
        this.dialogueProgress++;
        //console.log('Dialogue just ran. DialogueProgress is: ' + this.dialogueProgress + ' scientistSays.length is' + this.scientistSays.length);
    }



    _elevatorIn() {
        this.movementHandler = this.game.add.tween(this).to({
            y: this.endPos
        }, 4000, Phaser.Easing.Linear.Out, true);
        this.movementHandler.onComplete.add(function () {
            this.animations.play('talk', 6, true);
            this._initUi();
            this._dialogue();

        }, this);

    }

    _elevatorUp() {
        this.upArrow.alpha = 0.0;
        if (this.currentMap != 4) {
            this.downArrow.alpha = 0.0;
        }
        this.animations.play('idle', 2, true);
        this.movementHandler = this.game.add.tween(this).to({
            y: -100
        }, 4000, Phaser.Easing.Linear.Out, true);
        this.dialogueProgress = this.scientistSays.length;
        this.stuffSaid.alpha = 0.0;
        this.floorCount.alpha = 0.0;
        this.floorCounter.alpha = 0.0;
        this.textBox.alpha = 0.0;
        this.movementHandler.onComplete.add(function () {


            if (this.currentMap === 2) {
                this.game.state.start('Laboratory');
            }
            if (this.currentMap === 3) {
                this.game.state.start('TankOne');
            }
            if (this.currentMap === 4) {
                this.game.state.start('TankTwo');
            }


        }, this);
        elevatorGoingDown = false;
    }

    _elevatorDown() {
        if (this.currentMap != 1) {
            this.upArrow.alpha = 0.0;
        }
        this.downArrow.alpha = 0.0;
        this.animations.play('idle', 2, true);
        this.movementHandler = this.game.add.tween(this).to({
            y: 500
        }, 4000, Phaser.Easing.Linear.Out, true);
        this.dialogueProgress = this.scientistSays.length;
        this.stuffSaid.alpha = 0.0;
        this.floorCount.alpha = 0.0;
        this.floorCounter.alpha = 0.0;
        this.textBox.alpha = 0.0;
        this.movementHandler.onComplete.add(function () {
            if (this.currentMap === 1) {
                this.game.state.start('TankOne');
            }
            if (this.currentMap === 2) {
                this.game.state.start('TankTwo');
            }
            if (this.currentMap === 3) {
                this.game.state.start('TankThree');
            }
        }, this);
        elevatorGoingDown = true;
    }


    _initUi() {
        this.floorCounter = this.game.add.sprite(0, -98 - 4, 'floorCounter');
        this.floorCounter.anchor.setTo(0.5);
        this.addChild(this.floorCounter);
        this.floorCount = this.game.add.text(-6, -108, this.currentMap);


        this.floorCount.font = 'Press Start 2P';
        this.floorCount.fontSize = 12;
        this.floorCount.addColor("#96eccf", 0); //red
        this.addChild(this.floorCount);
        //this.floorCount = this.game.add.text()
        /*   this.feedButton = this.game.add.sprite(60, 26, 'feedButton');
           this.feedButton.anchor.setTo(0.5);
           this.feedButton.inputEnabled = true;
           this.feedButton.events.onInputDown.add(this.testLog, this);

           this.infoButton = this.game.add.sprite(26, 26, 'infoButton');
           this.infoButton.anchor.setTo(0.5);
           this.infoButton.inputEnabled = true;

           this.openButton = this.game.add.sprite(608, 26, 'openButton');
           this.openButton.anchor.setTo(0.5);
           this.openButton.inputEnabled = true;  */
        if (this.currentMap != 1) {
            this.upArrow = this.game.add.sprite(this.x, this.y - 128 - 4, 'upArrow');
            this.upArrow.anchor.setTo(0.5);
            this.upArrow.inputEnabled = true;
            this.upArrow.events.onInputDown.add(this._elevatorUp, this);
        }
        if (this.currentMap != 4) {
            this.downArrow = this.game.add.sprite(this.x, this.y - 68 - 4, 'downArrow');
            this.downArrow.anchor.setTo(0.5);
            this.downArrow.inputEnabled = true;
            this.downArrow.events.onInputDown.add(this._elevatorDown, this);
        }
        //        
        //         this.openButton = this.game.add.sprite(608, 26, 'openButton');
        //        this.openButton.anchor.setTo(0.5);
        //        this.openButton.inputEnabled = true;
        this.UiEnabled = true;
    }
    testLog() {
        console.log('Ass!');
    }







    _pointerUpdate() {
        /*   if (this.feedButton.input.pointerOver()) {
            this.feedButton.frame = 1;
        } else {
            this.feedButton.frame = 0;
        }


        if (this.infoButton.input.pointerOver()) {
            this.infoButton.frame = 1;
        } else {
            this.infoButton.frame = 0;
        }


        if (this.openButton.input.pointerOver()) {
            this.openButton.frame = 1;
        } else {
            this.openButton.frame = 0;
        }
*/
        if (this.currentMap != 1) {
            if (this.upArrow.input.pointerOver()) {
                this.upArrow.frame = 1;
            } else {
                this.upArrow.frame = 0;
            }
        }
        if (this.currentMap != 4) {
            if (this.downArrow.input.pointerOver()) {
                this.downArrow.frame = 1;
            } else {
                this.downArrow.frame = 0;
            }

        }
    }





    update() {
        if (this.UiEnabled) {
            this._pointerUpdate();
        }
    }
}