class Narrator extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        this.anchor.setTo(0.5);
        this.idleAnimation = this.animations.add('idle', [0, 1, 2, 3]);
        this.talkAnimation = this.animations.add('talk', [4, 5, 6, 7]);
        this.animations.play('idle', 2, true);
        this.y = -100;
        this._elevatorIn();
        this.lift = this.game.add.image(0, 48, 'lift');
        this.lift.anchor.setTo(0.5);
        this.addChild(this.lift);
        this.UiEnabled = false;
        this._initUi();

        this.scientistSays = [
            "Greetings Director, to tank Two.",
            "In here we keep the Tricephallus Sanctipauli.",
            "Probably the main attraction, really.",
            "This is the Pyronasal RNA -",
            "- In its most potent form, yet.",
            " *cough* ",
            "We've regulated temperature, -",
            "- And gently decresed Atmospheric Pressure, -",
            " - Combined with the fungi, -",
            "- has lead to a mass gain of 30% so far.",
            "You have Access to the dossiers, -",
            "- Upper left corner."
        ]
        this.dialogueProgress = 0;
    }


    _dialogue() {
        if (this.dialogueProgress === 0) {
            this.stuffSaid = this.game.add.text(0, -55, this.scientistSays[this.dialogueProgress]);
            this.stuffSaid.font = 'Press Start 2P';
            this.stuffSaid.fontSize = 12;
            this.stuffSaid.addColor("#96eccf", 0); //red
            //this.stuffSaid.setTextBounds(0, 0, 800, 800);
            this.stuffSaid.wordWrap = true;
            this.stuffSaid.wordWrapwidth = 200;
            this.stuffSaid.align = 'center';
            this.stuffSaid.anchor.setTo(0.5, 1.0);
            this.addChild(this.stuffSaid);
            this.game.time.events.add(Phaser.Timer.SECOND * 8, this._dialogue, this);
        } else if (this.dialogueProgress === this.scientistSays.length) {

            this.stuffSaid.destroy();
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
            y: 206
        }, 4000, Phaser.Easing.Linear.Out, true);
        this.movementHandler.onComplete.add(function () {
            this.animations.play('talk', 6, true);
            //this._initUi();
            this._dialogue();
        }, this);
    }

    _elevatorUp() {
        this.animations.play('idle', 2, true);
        this.movementHandler = this.game.add.tween(this).to({
            y: -100
        }, 4000, Phaser.Easing.Linear.Out, true);
        this.dialogueProgress = this.scientistSays.length;
        this.stuffSaid.alpha = 0.0;
        this.movementHandler.onComplete.add(function () {
            this.game.state.start('SimpleLevel');
        }, this);
    }

    _elevatorDown() {
        this.animations.play('idle', 2, true);
        this.movementHandler = this.game.add.tween(this).to({
            y: 500
        }, 4000, Phaser.Easing.Linear.Out, true);
        this.dialogueProgress = this.scientistSays.length;
        this.stuffSaid.alpha = 0.0;
        this.movementHandler.onComplete.add(function () {
            this.game.state.start('SimpleLevel');
        }, this);
    }


    _initUi() {
        this.feedButton = this.game.add.sprite(60, 26, 'feedButton');
        this.feedButton.anchor.setTo(0.5);
        this.feedButton.inputEnabled = true;
        this.feedButton.events.onInputDown.add(this.testLog, this);

        this.infoButton = this.game.add.sprite(26, 26, 'infoButton');
        this.infoButton.anchor.setTo(0.5);
        this.infoButton.inputEnabled = true;

        this.openButton = this.game.add.sprite(608, 26, 'openButton');
        this.openButton.anchor.setTo(0.5);
        this.openButton.inputEnabled = true;

        this.upArrow = this.game.add.sprite(770, 26, 'upArrow');
        this.upArrow.anchor.setTo(0.5);
        this.upArrow.inputEnabled = true;
        this.upArrow.events.onInputDown.add(this._elevatorUp, this);

        this.downArrow = this.game.add.sprite(770, 364, 'downArrow');
        this.downArrow.anchor.setTo(0.5);
        this.downArrow.inputEnabled = true;
        this.downArrow.events.onInputDown.add(this._elevatorDown, this);

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
        if (this.feedButton.input.pointerOver()) {
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


        if (this.upArrow.input.pointerOver()) {
            this.upArrow.frame = 1;
        } else {
            this.upArrow.frame = 0;
        }

        if (this.downArrow.input.pointerOver()) {
            this.downArrow.frame = 1;
        } else {
            this.downArrow.frame = 0;
        }

    }





    update() {
        if (this.UiEnabled) {
            this._pointerUpdate();
        }
    }
}