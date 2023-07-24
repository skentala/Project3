import "./styles.css";

//Global variables:
let game;                   //
let numflowers = 0;         // number of flowers still in the game
let numBlocks = 0;          // number of wall blocks added to the game area
let level = 1;              // current game level
let isMouseClicked = false; // was a mouse button clicked
let score = 0;              // current score
let numMen;                 // curremt number of lives left
let scores = [{             // score table
  name: "Bob", score: -1000
}];

const gameOptions = {
  maxlevel: 3,                            // max levelScore
  maxScores: 3,                           // how many players can get on the score board
  manGravity: 0,                          // the player is not falling, but the view is from above
  manSpeed: 150,                          // the speed of the player
  blocksize: 60,                          // the size of a wall block
  maxMen: 3,                              // max lives
  numBlueFlowers: 10,                     // number of blue flowers in the game
  numRedFlowers: 8,                       // number of red flowers in the game
  redFlowerScore: 20,                     // score for collecting one red flower
  blueFlowerScore: 10,                    // score for collecting one blue flower
  stingScore: -80,                        // score forgetting stinged by as wasp
  levelScore: 100,                        // score for completing a level
  shootWaspScore: 30,                     // score for shooting a wasp
  shootButterflyScore: 10,                // score for shooting a butterfly
  xblocks: 14,                            // number of blocks in x direction
  yblocks: 14,                            // number of blocks in y direction
  butterflySpeed: [100, 115, 130],        // the speed of a butterfly in each level
  waspSpeed: [100, 120, 140],             // the speed of a wasp in each level
  bulletSpeed: 800,                       // the speed of a bullet
  enemyInterval: [7000, 5500, 3500],      // the time interval of new enemies in each level
  moveBlockInterval: [5000, 3500, 2000],  // the time interval of moving blocks in each level
  butterflyRateOfEnemies: [0.7, 0.6, 0.5],// the rate of butterflies out of enemies in each level
  overlapDistance: 30,                    // how close the game objects should be to each other to create a hit
  maps: [                                 // block maps for each level: 0 = block, -1 = no block
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0,-1, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1, 0, 0, 0, 0,-1,-1, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0,-1, 0,
      0,-1,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1, 0, 0, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1,-1,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0,-1,-1,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0, 0, 0,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0, 0, 0,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1, 0,
      0,-1, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1, 0, 0, 0, 0,-1,-1, 0,-1, 0,
      0,-1,-1,-1,-1,-1, 0,-1, 0,-1, 0, 0,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1, 0,-1,-1,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1, 0, 0, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1,-1,-1, 0,-1,-1, 0,
      0, 0, 0, 0,-1, 0, 0,-1,-1,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0, 0, 0,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0, 0, 0,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,-1,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,
      0,-1, 0, 0,-1, 0,-1,-1,-1,-1, 0, 0,-1 ,0,
      0,-1, 0,-1,-1, 0, 0, 0, 0,-1,-1, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0,-1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1, 0,
      0,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0,-1, 0, 0,
      0,-1, 0, 0,-1,-1, 0,-1, 0,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1,-1,-1, 0, 0,-1, 0,
      0, 0,-1, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1,-1,-1,-1,-1, 0,-1,-1, 0,
      0,-1, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
  ]
}

/***************************************/
window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x22b14c,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameOptions.blocksize * gameOptions.xblocks,
        height: gameOptions.blocksize * gameOptions.yblocks + 120
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: [PlayGame, ScoreBoard]
  };
  
  game = new Phaser.Game(gameConfig);
  window.focus();
}


/*******************************************/
/* scene for showing/modifying score board */
/*******************************************/
class ScoreBoard extends Phaser.Scene {
  /*******************************************/
  constructor() {
    super("ScoreBoard");
  }

  /*******************************************/
  create() {
    // letters to choose for the score board name
    this.chars = [
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
      ["U", "V", "W", "X", "Y", "Z", ".", "-", "<", "#"]
    ];
    this.charLimit = 8;
    this.padding = 100;
    this.letterSpacing = 20;
    this.charWidth = 40;
    this.charHeight = 40;
    this.lineHeight = 2;
    this.name = "";
    this.isOnScoreBoard = false;  // was the score of the player good enough for the score board
    this.index = 0;
    this.isReadyToReceiveMouseClicks = false; // Should mouse clicks be taken into account or not

    this.scene.bringToTop();

    // set the texts on the score board
    this.add.text(100, 300, "Score   Name", {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
    for(let i = 0; i < scores.length; i++) {
      // should the player go on the score board?
      if(score > scores[i].score && !this.isOnScoreBoard){
        // the row for this player: score is known and we are waiting for the name to be input
        this.add.text(100, 300 + (i+1) * 50, score, {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
        this.playerText = this.add.text(300, 300 + (i+1) * 50, "", {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
        this.isOnScoreBoard = true;
        if(scores.length >= gameOptions.maxScores) {
          scores.pop();   // drop the last one, if the board is full
        }
        scores.splice(i, 0, {name: "", score: score});  // add the new player to the array
        this.index = i;
      }
      else {
        this.add.text(100, 300 + (i+1) * 50, scores[i].score, {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
        this.add.text(300, 300 + (i+1) * 50, scores[i].name, {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
      }
    }

    if (this.isOnScoreBoard) {
      // show the character table so that the player can select letters for their name
      let text;
      for (let i = 0; i < this.chars.length; i++) {
        for (let j = 0; j < this.chars[i].length; j++) {
          let xx = this.padding + j * (this.charWidth + this.letterSpacing);
          let yy = 50 + i * (this.charHeight + this.lineHeight);
          text = this.add.text(xx, yy, this.chars[i][j], {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
        }
      }
      this.nameText = this.add.text(100, 200, "", {fontSize: "40px", fill: "#cccccc", fontStyle: "bold"})
      this.input.keyboard.enabled = false;
      this.isReadyToReceiveMouseClicks = true;
    }
    else {
      // we only show the score board and then a new game can start
      this.time.addEvent({
        delay: 3000,
        callback: ()=>{
          level = 1;
          score = 0;
          numMen = gameOptions.maxMen;
          this.scene.stop();
          this.scene.start("PlayGame");
        },
        loop: false
      })
    }
  }

  /*******************************************/
  /* The player has written their name and   */
  /* wants to submit it on the score board   */
  /*******************************************/
  submitName() {
    this.isReadyToReceiveMouseClicks = false;
    this.scene.stop("InputPanel");
    this.playerText.setText(this.nameText.text);
    scores[this.index].name = this.nameText.text;
    this.nameText.setText("");
    this.time.addEvent({
      delay: 3000,
      callback: ()=>{
        this.scene.stop();
        level = 1;
        score = 0;
        numMen = gameOptions.maxMen;
        this.scene.start("PlayGame");
      },
      loop: false
    })
  }

  /*******************************************/
  /* The player has clicked a character and  */
  /* it should be updated on the screen      */
  /*******************************************/
  updateName(name) {
    this.nameText.setText(name);
  }

  /*******************************************/
  /* Catching the mouse clicks on the screen */
  /* while the player is selecting letters   */
  /*******************************************/
  update() {
    if(!this.isReadyToReceiveMouseClicks) {
      // the status of the scene is not ready for selecting letters
      return;
    }

    if(!this.input.activePointer.isDown && isMouseClicked == true){
      // mouse clicked (down + up)
      let mouseX = this.input.activePointer.x;
      let mouseY = this.input.activePointer.y;

      // calculating which character was clicked
      let xx = (mouseX - this.padding - this.charWidth/4) / (this.charWidth + this.letterSpacing);
      let yy = (mouseY - 50 - this.charHeight/2) / (this.charHeight + this.lineHeight);
      xx = Math.abs(Math.round(xx));
      yy = Math.abs(Math.round(yy));
      isMouseClicked= false;
      if(xx < 0 || xx >= this.chars[0].length || yy < 0 || yy >= this.chars.length) {
        // this click was outside of the character set area
        return;
      }
      if(this.chars[yy][xx] == "<") {
        // "backspace" removes the last character
        this.name = this.name.substring(0, this.name.length - 1);
        this.updateName(this.name);
      }
      else if(this.chars[yy][xx] == "#") {
        // "enter" submits the name
        this.submitName();
      }
      else if(this.name.length < this.charLimit) {
        this.name = this.name.concat(this.chars[yy][xx]);
        this.updateName(this.name);
      }
    }

    else if(this.input.activePointer.isDown && isMouseClicked == false) {
      // mouse clicked (down, not yet up)
      isMouseClicked = true;
    }
  }
}



/*******************************************/
/* scene for playing the game              */
/*******************************************/
class PlayGame extends Phaser.Scene {

  /*******************************************/
  constructor() {
      super("PlayGame");
      numMen = gameOptions.maxMen;
  }

  /*******************************************/
  preload() {
    //load the images and sounds
    this.load.image("block", require("../assets/block_grey.png"));
    this.load.image("flowerBlue", require("../assets/flower_blue.png"));
    this.load.image("flowerRed", require("../assets/flower_red.png"));
    this.load.spritesheet("man", require("../assets/man.png"), { frameWidth: 46, frameHeight: 46 });
    this.load.spritesheet("butterfly", require("../assets/Butterfly.png"), { frameWidth: 75, frameHeight: 75 });
    this.load.spritesheet("wasp", require("../assets/wasp.png"), { frameWidth: 75, frameHeight: 75 });
    this.load.audio("sting", [require("../assets/bzzz.mp3")]);
    this.load.audio("suck", [require("../assets/suck.mp3")]);
    this.load.audio("collect", [require("../assets/collect.mp3")]);
    this.load.audio("shot", [require("../assets/shot.mp3")]);
    this.load.image("bullet", require("../assets/bullet.png"));
  }

  /*******************************************/
  create() {
    let flowers = []; // positions of all redFlowerScore
    let blocks = [];  // positions of all wall blocksize
    this.scene.stop("ScoreBoard");  // stop the possible other scene
    this.x;
    this.y;

    // add groups for wall blocks and flowers
    this.blockGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })
    this.blueFlowerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })
    this.redFlowerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })

    // set the wall blocks according to the predefined map per level
    this.x = 0;
    this.y = 0;
    numBlocks = 0;
    gameOptions.maps[level - 1].forEach((square) => {
      // go through the map for this level
      // wall blocks are marked with 0, empty spaces with -1 on the map
      if(square == 0) { 
        this.blockGroup.create(
          this.x * gameOptions.blocksize + gameOptions.blocksize / 2, 
          this.y * gameOptions.blocksize + gameOptions.blocksize / 2, 
          "block"
        );
        // write down the position to an array
        blocks[numBlocks] = {
          x: this.x * gameOptions.blocksize + gameOptions.blocksize / 2, 
          y: this.y * gameOptions.blocksize + gameOptions.blocksize / 2
        };
        numBlocks ++;
      }
      if(this.x >= gameOptions.xblocks - 1) {
        // next row
        this.x = -1;
        this.y += 1;
      }
      this.x++;
    });

    // set the blue flowers randomly to empty squares
    numflowers = 0;
    for(let i = 0; i < gameOptions.numBlueFlowers; i++) {
      this.x = Phaser.Math.Between(1, gameOptions.xblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
      this.y = Phaser.Math.Between(1, gameOptions.yblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
      let allowed = true;
      for (let j = 0; j < numBlocks; j++) {
        if (this.x == blocks[j].x && this.y == blocks[j].y) { 
          // not allowed to positions of wall blocks
          allowed = false;
          i--;
          break;
        }
      }
      for (let j = 0; j < numflowers; j++) {
        if (this.x == flowers[j].x && this.y == flowers[j].y) {
          // not allowed to positions of other blue flowers
          allowed = false;
          i--;
          break;
        }
      }
      if (allowed == true){
        this.blueFlowerGroup.create(this.x, this.y, "flowerBlue");
        flowers[numflowers] = {x: this.x, y: this.y};
        numflowers ++;
      }
    }

    // set the red flowers randomly to empty squares
    for(let i = 0; i < gameOptions.numRedFlowers; i++) {
      this.x = Phaser.Math.Between(1, gameOptions.xblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
      this.y = Phaser.Math.Between(1, gameOptions.yblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
      let allowed = true;
      for (let j = 0; j < numflowers; j++) {
        if (this.x == flowers[j].x && this.y == flowers[j].y) {
          // not allowed to positions of other blue or red flowers
          allowed = false;
          i--;
          break;
        }
      }
      for (let j = 0; j < numBlocks; j++) {
        if (this.x == blocks[j].x && this.y == blocks[j].y) {
          // not allowed to positions of wall blocks
          allowed = false;
          i--;
          break;
        }
      }
      if (allowed == true) {
        this.redFlowerGroup.create(this.x, this.y, "flowerRed");
        flowers[numflowers] = {x: this.x, y: this.y};
        numflowers ++;
      }
    }

    // the player
    this.man = this.physics.add.sprite(gameOptions.blocksize * 1.5, gameOptions.blocksize * 1.5, "man");

    // enemies
    this.butterflyGroup = this.physics.add.group({});
    this.waspGroup = this.physics.add.group({});

    // sounds
    this.stingSound = this.sound.add("sting", {loop: false});
    this.suckingSound = this.sound.add("suck", {loop: false});
    this.shotSound = this.sound.add("shot", {loop: false});
    this.collectSound = this.sound.add("collect", {loop: false});

    // butterfly flying left or right
    this.anims.create({
      key: "bfleft",
      frames: this.anims.generateFrameNumbers("butterfly", {start: 2, end: 3}),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "bfright",
      frames: this.anims.generateFrameNumbers("butterfly", {start: 0, end: 1}),
      frameRate: 5,
      repeat: -1
    });

    // wasp flying left or right
    this.anims.create({
      key: "waspleft",
      frames: this.anims.generateFrameNumbers("wasp", {start: 0, end: 1}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "waspright",
      frames: this.anims.generateFrameNumbers("wasp", {start: 2, end: 3}),
      frameRate: 20,
      repeat: -1
    });

    // timer for adding new enemies
    this.triggerTimer = this.time.addEvent({
      callback: this.addEnemies,
      callbackScope: this,
      delay: gameOptions.enemyInterval[level-1],
      loop: true
    });

    // timer for moving wall blocks
    this.triggerTimer = this.time.addEvent({
      callback: this.moveOneBlock,
      callbackScope: this,
      delay: gameOptions.moveBlockInterval[level-1],
      loop: true
    });

    // player can not go through walls
    this.physics.add.collider(this.man, this.blockGroup);
    // what to do when game objects touch each others
    this.physics.add.overlap(this.man, this.redFlowerGroup, this.collectFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.man, this.blueFlowerGroup, this.collectFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.butterflyGroup, this.blueFlowerGroup, this.butterflySucksFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.butterflyGroup, this.redFlowerGroup, this.butterflySucksFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.man, this.waspGroup, this.waspStings, this.isCloseEnough, this);

    // texts on the screen
    this.gameText = this.add.text(0, 0, `Level ${level}/${gameOptions.maxlevel}`, 
                                  {fontSize: "36px", fill: "#000000", fontStyle: "bold"})
    this.scoreText = this.add.text(game.config.width - 1.75 * gameOptions.blocksize, gameOptions.blocksize / 2, score, 
                                   {fontSize: "36px", fill: "#000000", fontStyle: "bold"});
    for (let i = 1; i <= numMen; i++) {
      // number of lives left
      const img = this.add.image(game.config.width - i*gameOptions.blocksize/2, gameOptions.blocksize/4, "man");
      img.setScale(0.5);
    }
    this.add.text(0, gameOptions.yblocks*gameOptions.blocksize, "Pick all flowers with arrow keys. Wasps will sting", 
                  {fontSize: "28px", fill: "#000000", fontStyle: "bold"});
    this.add.text(0, gameOptions.yblocks*gameOptions.blocksize + 28, "you and butterflies will suck the flowers...", 
                  {fontSize: "28px", fill: "#000000", fontStyle: "bold"});
    this.add.text(0, gameOptions.yblocks*gameOptions.blocksize + 28 * 2, "The walls are moving. You can shoot the insects", 
                  {fontSize: "28px", fill: "#000000", fontStyle: "bold"});
    this.add.text(0, gameOptions.yblocks*gameOptions.blocksize + 28 * 3, "with the mouse and gain more points. ", 
                  {fontSize: "28px", fill: "#000000", fontStyle: "bold"});

    // using arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  /*******************************************/
  /* are the objects close enough to be      */
  /* considered as hitting each other        */
  /*******************************************/
  isCloseEnough(body1, body2) {
    if (Math.abs(body1.body.center.x - body2.body.center.x) < gameOptions.overlapDistance && 
        Math.abs(body1.body.center.y - body2.body.center.y) < gameOptions.overlapDistance) {
      return true;
    }
    return false;
  }

  /*******************************************/
  /* player collects a flower                */
  /*******************************************/
  collectFlower(man, flower) {
    flower.disableBody(true, true);
    this.collectSound.play();
    if (flower.body.gameObject.texture.key == "flowerBlue") score += gameOptions.blueFlowerScore; //blue flower score
    else score += gameOptions.redFlowerScore; // red flower score
    this.scoreText.setText(score);
    numflowers --;

    if(numflowers == 0) { 
      // all flowers collected (or sucked by butterflies)
      this.time.removeAllEvents();  // stop timers

      // remove all enemies
      this.butterflyGroup.getChildren().forEach(element => {
        element.disableBody(true, true);
      });
      this.waspGroup.getChildren().forEach(element => {
        element.disableBody(true, true);
      });

      score += gameOptions.levelScore;  // score for completing a level
      this.scoreText.setText(score);
      if (level == gameOptions.maxlevel) { 
        // all levels completed
        this.gameText.setText(`Level ${level}/${gameOptions.maxlevel} completed, game finished`);
        // show texts before starting next scene
        this.time.addEvent({
          delay: 4000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = 0;
            this.scene.start("ScoreBoard"); // show the score board
          },
          loop: false
        });
      }
      else {
        // next level
        this.gameText.setText(`Level ${level}/${gameOptions.maxlevel} completed`);
        // show texts before starting next scene
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = [];
            level ++;
            this.scene.start("PlayGame");
          },
          loop: false
        })
      }
    }
  }


  /*******************************************/
  /* butterfly gets a flower                 */
  /*******************************************/
  butterflySucksFlower(butterfly, flower) {
    this.suckingSound.play();
    flower.disableBody(true, true);
    // scores for losing the flower to the butterfly
    if (flower.body.gameObject.texture.key == "flowerBlue") score -= gameOptions.blueFlowerScore / 2;
    else score -= gameOptions.redFlowerScore / 2;
    this.scoreText.setText(score);
    numflowers --;

    if(numflowers == 0) {
      // all flowers collected or sucked
      this.time.removeAllEvents();  // stop timers
      score += gameOptions.levelScore;  // score for completing a level
      this.scoreText.setText(score);
      // remove all enemies
      this.butterflyGroup.getChildren().forEach(element => {
        element.disableBody(true, true);
      });
      this.waspGroup.getChildren().forEach(element => {
        element.disableBody(true, true);
      });
      if (level == gameOptions.maxlevel) { 
        // all levels completed
        this.gameText.setText(`Level ${level}/${gameOptions.maxlevel} completed, game finished`);
        // show texts before starting next scene
        this.time.addEvent({
          delay: 4000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = [];
            this.scene.start("ScoreBoard"); // show the score board
          },
          loop: false
        });
      }
      else { 
        // next level
        this.gameText.setText(`Level ${level}/${gameOptions.maxlevel} completed`);
        // show texts before starting next scene
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = [];
            level ++;
            this.scene.start("PlayGame");
          },
          loop: false
        })
      }
    }
  }

  /*******************************************/
  /* wasp stings the player                  */
  /*******************************************/
  waspStings(man, wasp) {
    this.stingSound.play();
    man.disableBody(true, true);
    this.time.removeAllEvents();
    numMen--;
    score += gameOptions.stingScore;
    this.scoreText.setText(score)
    this.butterflyGroup.getChildren().forEach(element => {
      element.disableBody(true, true);
    });
    this.waspGroup.getChildren().forEach(element => {
      element.disableBody(true, true);
    });
    if(numMen == 0) { 
      // all lives used, game over
      this.gameText.setText(`Game over`);
    }
    // show texts before starting next scene
    this.time.addEvent({
      delay: 4000,
      callback: ()=>{
        numflowers = 0;
        numBlocks = 0;
        this.flowers = [];
        this.blocks = [];
        if(numMen == 0) { 
          this.scene.start("ScoreBoard"); // show the score board
        }
        else {
          this.scene.start("PlayGame"); // start this level again
        }
      },
      loop: false
    })
  }

  /*******************************************/
  /* add butterflies or wasps to the game    */
  /*******************************************/
  addEnemies() {
    // choose the enemy randomly but according to the predefined rate for this level
    if(Phaser.Math.FloatBetween(0, 1) <= gameOptions.butterflyRateOfEnemies[level - 1]) {
      // add a butterfly to a random position
      let bf = this.butterflyGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "butterfly");
      bf.setVelocityY(-gameOptions.butterflySpeed[level - 1]);
      // choose the direction according to the start position
      if(bf.body.x < gameOptions.blocksize*gameOptions.xblocks / 2) {
        bf.setVelocityX(gameOptions.butterflySpeed[level - 1] / 1.7);
        bf.anims.play("bfright", true);
      }
      else {
        bf.setVelocityX(-gameOptions.butterflySpeed[level - 1] / 1.7);
        bf.anims.play("bfleft", true);
      }
    }
    else {
      // add a wasp to a random position
      let w = this.waspGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "wasp");
      w.setVelocityY(-gameOptions.waspSpeed[level - 1]);
      // choose the direction according to the start position
      if(w.body.x < gameOptions.blocksize*gameOptions.xblocks / 2) {
        w.setVelocityX(gameOptions.waspSpeed[level - 1] / 1.7);
        w.anims.play("waspright", true);
      }
      else {
        w.setVelocityX(-gameOptions.waspSpeed[level - 1] / 1.7);
        w.anims.play("waspleft", true);
      }
    }
  }


  /*******************************************/
  /* move one wall block randomly            */
  /*******************************************/
  moveOneBlock() {
    let elements = this.blockGroup.getChildren();
    let flBlue = this.blueFlowerGroup.getChildren();
    let flRed = this.redFlowerGroup.getChildren();
    let index = 0;

    // select the block to move randomly, but it must be a block inside the surrounding walls
    while(true) {
      index = Phaser.Math.Between(gameOptions.xblocks, numBlocks-gameOptions.xblocks);
      let x = elements[index].body.position.x;
      if(x == 0 || x / gameOptions.blocksize == gameOptions.xblocks-1) {
        continue;
      }
      else break;
    }

    // select the new position randomly, but it must be a somewhere inside the surrounding walls
    let new_x = Phaser.Math.Between(1, gameOptions.xblocks-2)*gameOptions.blocksize;
    let new_y = Phaser.Math.Between(1, gameOptions.yblocks-2)*gameOptions.blocksize;
    let i = 0;
    let allowed = true;
    elements.forEach(element => {
      // the new position cannot be occupied by another block
      if(i != index && element.body.position.x == new_x && element.body.position.y == new_y) {
        allowed = false;
      };
      i++;
    });
    flBlue.forEach(fl => {
      // the new position cannot be occupied by blue flowers
      if(Math.abs(fl.body.position.x - new_x) < gameOptions.blocksize && Math.abs(fl.body.position.y - new_y) < gameOptions.blocksize) {
        allowed = false;
      };
    });
    flRed.forEach(fl => {
      // the new position cannot be occupied by red flowers
      if(Math.abs(fl.body.position.x - new_x) < gameOptions.blocksize && Math.abs(fl.body.position.y - new_y) < gameOptions.blocksize) {
        allowed = false;
      };
    });
    // the new position cannot be the position of the player
    if(Math.abs(this.man.body.position.x - new_x) < gameOptions.blocksize && Math.abs(this.man.body.position.y - new_y) < gameOptions.blocksize) {
      allowed = false;
    };
    if(allowed){
      // move the block
      elements[index].body.reset(new_x + gameOptions.blocksize/2, new_y + gameOptions.blocksize/2);
    }
  }


  /*******************************************/
  /* the player has shot a bullet and it has */
  /* hit one of the enemies                  */
  /*******************************************/
  shoot(bullet, target) {
    this.collectSound.play();
    target.disableBody(true, true);
    bullet.disableBody(true, true);
    if(target.texture.key == "wasp") score += gameOptions.shootWaspScore;
    else if(target.texture.key == "butterfly") score += gameOptions.shootButterflyScore;
    this.scoreText.setText(score);
  }


  /*******************************************/
  /* Catching the mouse clicks on the screen */
  /* and arrow key presses                   */
  /*******************************************/
  update() {
    if(!this.input.activePointer.isDown && isMouseClicked == true){
      // mouse clicked (down + up)
      // shoot a bullet
      this.shotSound.play();
      this.bullet = this.physics.add.sprite(this.man.body.center.x, this.man.body.center.y, 'bullet');
      this.physics.add.overlap(this.bullet, this.butterflyGroup, this.shoot, this.isCloseEnough, this);
      this.physics.add.overlap(this.bullet, this.waspGroup, this.shoot, this.isCloseEnough, this);
      let mouseX = this.input.activePointer.x;
      let mouseY = this.input.activePointer.y;
      let distX = mouseX - this.man.body.center.x;
      let distY = mouseY - this.man.body.center.y;
      this.bullet.setVelocityX(gameOptions.bulletSpeed * distX / (Math.abs(distX)+Math.abs(distY)));
      this.bullet.setVelocityY(gameOptions.bulletSpeed * distY / (Math.abs(distX)+Math.abs(distY)));
      isMouseClicked= false;
    }
    else if(this.input.activePointer.isDown && isMouseClicked == false) {
      // mouse clicked down but not yet up
      isMouseClicked = true;
    }

    // arrow key presses move the player
    if(this.cursors.left.isDown) {
      this.man.body.velocity.x = -gameOptions.manSpeed;
      this.man.body.velocity.y = 0;
    }
    else if(this.cursors.right.isDown) {
      this.man.body.velocity.x = gameOptions.manSpeed;
      this.man.body.velocity.y = 0;
    }
    else if(this.cursors.up.isDown) {
      this.man.body.velocity.y = -gameOptions.manSpeed;
      this.man.body.velocity.x = 0;
    }
    else if(this.cursors.down.isDown) {
      this.man.body.velocity.y = gameOptions.manSpeed;
      this.man.body.velocity.x = 0;
    }
    else{ // stop the player
      this.man.body.velocity.x = 0;
      this.man.body.velocity.y = 0;
    }
  }
}
