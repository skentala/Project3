import "./styles.css";
//import Phaser from "phaser";

//Global variables:
let game;
let numflowers = 0;
let numBlocks = 0;
let level = 1;
let x, y;
let isMouseClicked = false;
let score = 0;
let numMen;
let scores = [{ name: "Bob", score: -1000}];

const gameOptions = {
  maxlevel: 3,
  maxScores: 3,
  manGravity: 0,
  manSpeed: 150,
  blocksize: 60,
  maxMen: 1,
  numBlueFlowers: 10,
  numRedFlowers: 8,
  redFlowerScore: 20,
  blueFlowerScore: 10,
  stingScore: -80,
  levelScore: 100,
  shootWaspScore: 30,
  shootButterflyScore: 10,
  shootBlockScore: -50,
  xblocks: 14,
  yblocks: 14,
  butterflySpeed: [100, 115, 130],
  waspSpeed: [100, 120, 140],
  bulletSpeed: 800,
  enemyInterval: [7000, 5500, 3500],
  moveBlockInterval: [5000, 3500, 2000],
  butterflyRateOfEnemies: [0.1, 0.6, 0.5],
  overlapDistance: 30,
  maps: [
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
    scene: [PlayGame, ScoreBoard, InputPanel]
  };
  
  game = new Phaser.Game(gameConfig);
  window.focus();
}


class InputPanel extends Phaser.Scene {
  constructor(data) {
    super("InputPanel");

    this.chars = [
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
      ["U", "V", "W", "X", "Y", "Z", ".", "-", "<", ">"]
    ];

    this.charLimit = 8;
  }

  create(data) {
    this.padding = data.padding;
    this.letterSpacing = 20;
    this.charWidth = 40;
    this.charHeight = 40;
    this.lineHeight = 2;
    this.name = "";

    let text;
    for (let i = 0; i < this.chars.length; i++) {
      for (let j = 0; j < this.chars[i].length; j++) {
        let xx = this.padding + j * (this.charWidth + this.letterSpacing);
        let yy = 50 + i * (this.charHeight + this.lineHeight);
        text = this.add.text(xx, yy, this.chars[i][j], {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
      }
    }
  }

  update(time, delta) {
    if(!this.input.activePointer.isDown && isMouseClicked == true){
      let mouseX = this.input.activePointer.x;
      let mouseY = this.input.activePointer.y;
      let xx = (mouseX - this.padding - this.charWidth/4) / (this.charWidth + this.letterSpacing);
      let yy = (mouseY - 50 - this.charHeight/2) / (this.charHeight + this.lineHeight);
      xx = Math.abs(Math.round(xx));
      yy = Math.abs(Math.round(yy));
      isMouseClicked= false;
      if(xx < 0 || xx > this.chars[0].length || yy < 0 || yy > this.chars.length) {
        return;
      }
      if(this.chars[yy][xx] == "<") {
        this.name = this.name.substring(0, this.name.length - 1);
        this.events.emit("updateName", this.name);
      }
      else if(this.chars[yy][xx] == ">") {
        this.events.emit("submitName", this.name);
      }
      else if(this.name.length < this.charLimit) {
        this.name = this.name.concat(this.chars[yy][xx]);
        this.events.emit("updateName", this.name);
      }
    }
    else if(this.input.activePointer.isDown && isMouseClicked == false) {
      isMouseClicked = true;
    }
  }
}



class ScoreBoard extends Phaser.Scene {
  constructor() {
    super("ScoreBoard");
  }

  create() {
    this.index = 0;
    this.scene.bringToTop();

    this.add.text(100, 300, "Score   Name", {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
    let isOnScoreBoard = false;
    for(let i = 0; i < scores.length; i++) {
      if(score > scores[i].score && !isOnScoreBoard){
        this.add.text(100, 300 + (i+1) * 50, score, {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
        this.playerText = this.add.text(300, 300 + (i+1) * 50, "", {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
        isOnScoreBoard = true;
        if(scores.length >= gameOptions.maxScores) {
          scores.pop();
        }
        scores.splice(i, 0, {name: "", score: score});
        this.index = i;
      }
      else {
        this.add.text(100, 300 + (i+1) * 50, scores[i].score, {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
        this.add.text(300, 300 + (i+1) * 50, scores[i].name, {fontSize: "40px", fill: "#000000", fontStyle: "bold"});
      }
    }

    if (isOnScoreBoard) {
      this.nameText = this.add.text(100, 200, "", {fontSize: "40px", fill: "#cccccc", fontStyle: "bold"})
      this.input.keyboard.enabled = false;
      this.scene.launch("InputPanel", { padding: 100 });
      this.panel = this.scene.get("InputPanel");
      this.panel.events.on("updateName", this.updateName, this);
      this.panel.events.on("submitName", this.submitName, this);
    }
    else {
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

  submitName() {
    this.scene.stop("InputPanel");
    this.playerText.setText(this.nameText.text);
    scores[this.index].name = this.nameText.text;
    this.nameText.setText("");
    this.time.addEvent({
      delay: 3000,
      callback: ()=>{
        this.panel.events.removeListener("updateName");
        this.panel.events.removeListener("submitName");
        this.scene.stop();
        level = 1;
        score = 0;
        numMen = gameOptions.maxMen;
        this.scene.start("PlayGame");
      },
      loop: false
    })
  }

  updateName(name) {
    this.nameText.setText(name);
  }
}



class PlayGame extends Phaser.Scene {

  constructor() {
      super("PlayGame");
      numMen = gameOptions.maxMen;
  }

  preload() {
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

  create() {
    let flowers = [];
    let blocks = [];
    this.scene.stop("ScoreBoard");

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

    // set the wall blocks
    x = 0;
    y = 0;
    numBlocks = 0;
    gameOptions.maps[level-1].forEach((square) => {
      if(square == 0) {
        this.blockGroup.create(x*gameOptions.blocksize + gameOptions.blocksize/2, y*gameOptions.blocksize + gameOptions.blocksize/2, "block");
        blocks[numBlocks] = {x: x*gameOptions.blocksize + gameOptions.blocksize/2, y: y*gameOptions.blocksize + gameOptions.blocksize/2};
        numBlocks ++;
      }
      if (x >= gameOptions.xblocks-1) {
        x = -1;
        y += 1;
      }
      x++;
    });

    numflowers = 0;
    for(let i = 0; i < gameOptions.numBlueFlowers; i++) {
      x = Phaser.Math.Between(1, gameOptions.xblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      y = Phaser.Math.Between(1, gameOptions.yblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      let allowed = true;
      for (let j = 0; j < numBlocks; j++) {
        if (x == blocks[j].x && y == blocks[j].y) { 
          allowed = false;
          i--;
          break;
        }
      }
      for (let j = 0; j < numflowers; j++) {
        if (x == flowers[j].x && y == flowers[j].y) {
          allowed = false;
          i--;
          break;
        }
      }
      if (allowed == true){
        this.blueFlowerGroup.create(x, y, "flowerBlue");
        flowers[numflowers] = {x: x, y: y};
        numflowers ++;
      }
    }

    for(let i = 0; i < gameOptions.numRedFlowers; i++) {
      x = Phaser.Math.Between(1, gameOptions.xblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      y = Phaser.Math.Between(1, gameOptions.yblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      let allowed = true;
      for (let j = 0; j < numflowers; j++) {
        if (x == flowers[j].x && y == flowers[j].y) {
          allowed = false;
          i--;
          break;
        }
      }
      for (let j = 0; j < numBlocks; j++) {
        if (x == blocks[j].x && y == blocks[j].y) {
          allowed = false;
          i--;
          break;
        }
      }
      if (allowed == true) {
        this.redFlowerGroup.create(x, y, "flowerRed");
        flowers[numflowers] = {x: x, y: y};
        numflowers ++;
      }
    }

    this.man = this.physics.add.sprite(gameOptions.blocksize*1.5, gameOptions.blocksize*1.5, "man");

    this.butterflyGroup = this.physics.add.group({});
    this.waspGroup = this.physics.add.group({});

    this.stingSound = this.sound.add("sting", {loop: false});
    this.suckingSound = this.sound.add("suck", {loop: false});
    this.shotSound = this.sound.add("shot", {loop: false});
    this.collectSound = this.sound.add("collect", {loop: false});

// perhosen lento:
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


// ampiaisen lento:
    this.anims.create({
      key: "waspleft",
      frames: this.anims.generateFrameNumbers("wasp", {frames: [0]}),
      repeat: 0
    });
    this.anims.create({
      key: "waspright",
      frames: this.anims.generateFrameNumbers("wasp", {frames: [1]}),
      repeat: 0
    });

    this.triggerTimer = this.time.addEvent({
      callback: this.addEnemies,
      callbackScope: this,
      delay: gameOptions.enemyInterval[level-1],
      loop: true
    });

    this.triggerTimer = this.time.addEvent({
      callback: this.moveOneBlock,
      callbackScope: this,
      delay: gameOptions.moveBlockInterval[level-1],
      loop: true
    });

    this.physics.add.collider(this.man, this.blockGroup);
    this.physics.add.overlap(this.man, this.redFlowerGroup, this.collectFlower, this.isCloseEnoughll, this);
    this.physics.add.overlap(this.man, this.blueFlowerGroup, this.collectFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.butterflyGroup, this.blueFlowerGroup, this.butterflySucksFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.butterflyGroup, this.redFlowerGroup, this.butterflySucksFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.man, this.waspGroup, this.waspStings, this.isCloseEnough, this);

    this.gameText = this.add.text(0, 0, `Level ${level}/${gameOptions.maxlevel}`, {fontSize: "36px", fill: "#000000", fontStyle: "bold"})
    this.scoreText = this.add.text(game.config.width - 1.75*gameOptions.blocksize, gameOptions.blocksize/2, score, {fontSize: "36px", fill: "#000000", fontStyle: "bold"});
    for (let i = 1; i <= numMen; i++) {
      const img = this.add.image(game.config.width - i*gameOptions.blocksize/2, gameOptions.blocksize/4, "man");
      img.setScale(0.5);
    }
    this.add.text(0, gameOptions.yblocks*gameOptions.blocksize, "Pick all flowers, but watch out for wasps and ", {fontSize: "28px", fill: "#000000", fontStyle: "bold"});
    this.add.text(0, gameOptions.yblocks*gameOptions.blocksize + 28, "moving walls. Butterflies will suck flowers...", {fontSize: "28px", fill: "#000000", fontStyle: "bold"});
    this.add.text(0, gameOptions.yblocks*gameOptions.blocksize + 28*2, "You can shoot the insects with the mouse and gain ", {fontSize: "28px", fill: "#000000", fontStyle: "bold"});
    this.add.text(0, gameOptions.yblocks*gameOptions.blocksize + 28*3, "more points.", {fontSize: "28px", fill: "#000000", fontStyle: "bold"});

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  isCloseEnough(body1, body2) {
    if (Math.abs(body1.body.center.x - body2.body.center.x) < gameOptions.overlapDistance && Math.abs(body1.body.center.y - body2.body.center.y) < gameOptions.overlapDistance) {
      return true;
    }
    return false;
  }

  collectFlower(man, flower) {
    flower.disableBody(true, true);
    this.collectSound.play();
    if (flower.body.gameObject.texture.key == "flowerBlue") score += gameOptions.blueFlowerScore;
    else score += gameOptions.redFlowerScore;
    this.scoreText.setText(score);
    numflowers --;
    if(numflowers == 0) { 
      this.time.removeAllEvents();
      this.butterflyGroup.getChildren().forEach(element => {
        element.disableBody(true, true);
      });
      this.waspGroup.getChildren().forEach(element => {
        element.disableBody(true, true);
      });
      score += gameOptions.levelScore;
      this.scoreText.setText(score);
      if (level == gameOptions.maxlevel) { 
        this.gameText.setText(`Level ${level}/${gameOptions.maxlevel} completed, game finished`);
        this.time.addEvent({
          delay: 4000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = 0;
            this.scene.start("ScoreBoard");
          },
          loop: false
        });
      }
      else {
        this.gameText.setText(`Level ${level}/${gameOptions.maxlevel} completed`);
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = [];
        // seuraava level:
            level ++;
            this.scene.start("PlayGame");
          },
          loop: false
        })
      }
    }
  }



  butterflySucksFlower(butterfly, flower) {
    this.suckingSound.play();
    flower.disableBody(true, true);
    if (flower.body.gameObject.texture.key == "flowerBlue") score -= gameOptions.blueFlowerScore/2;
    else score -= gameOptions.redFlowerScore/2;
    this.scoreText.setText(score);
    numflowers --;
    if(numflowers == 0) {
      this.time.removeAllEvents();
      score += gameOptions.levelScore;
      this.scoreText.setText(score);
      this.butterflyGroup.getChildren().forEach(element => {
        element.disableBody(true, true);
      });
      this.waspGroup.getChildren().forEach(element => {
        element.disableBody(true, true);
      });
      if (level == gameOptions.maxlevel) { 
        this.gameText.setText(`Level ${level}/${gameOptions.maxlevel} completed, game finished`);
        this.time.addEvent({
          delay: 4000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = [];
            this.scene.start("ScoreBoard");
          },
          loop: false
        });
      }
      else { 
        this.gameText.setText(`Level ${level}/${gameOptions.maxlevel} completed`);
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = [];
        // seuraava level:
            level ++;
            this.scene.start("PlayGame");
          },
          loop: false
        })
      }
    }
  }

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
      this.gameText.setText(`Game over`);
    }
    this.time.addEvent({
      delay: 4000,
      callback: ()=>{
        numflowers = 0;
        numBlocks = 0;
        this.flowers = [];
        this.blocks = [];
        if(numMen == 0) { 
          this.scene.start("ScoreBoard");
        }
        else {
          this.scene.start("PlayGame");
        }
      },
      loop: false
    })
  }

  addEnemies() {
    if(Phaser.Math.FloatBetween(0, 1) <= gameOptions.butterflyRateOfEnemies[level-1]) {
      let bf = this.butterflyGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "butterfly");
      bf.setVelocityY(-gameOptions.butterflySpeed[level-1]);
      if(bf.body.x < gameOptions.blocksize*gameOptions.xblocks/2) {
        bf.setVelocityX(gameOptions.butterflySpeed[level-1]/1.7);
        bf.anims.play("bfright", true);
      }
      else {
        bf.setVelocityX(-gameOptions.butterflySpeed[level-1]/1.7);
        bf.anims.play("bfleft", true);
      }
    }
    else {
      let w = this.waspGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "wasp");
      w.setVelocityY(-gameOptions.waspSpeed[level-1]);
      if(w.body.x < gameOptions.blocksize*gameOptions.xblocks/2) {
        w.setVelocityX(gameOptions.waspSpeed[level-1]/1.7);
        w.anims.play("waspright", true);
      }
      else {
        w.setVelocityX(-gameOptions.waspSpeed[level-1]/1.7);
        w.anims.play("waspleft", true);
      }
    }
  }

  moveOneBlock() {
    let elements = this.blockGroup.getChildren();
    let flBlue = this.blueFlowerGroup.getChildren();
    let flRed = this.redFlowerGroup.getChildren();
    let index = 0;
    while(true) {
      index = Phaser.Math.Between(gameOptions.xblocks, numBlocks-gameOptions.xblocks);
      let x = elements[index].body.position.x;
      if(x == 0 || x / gameOptions.blocksize == gameOptions.xblocks-1) {
        continue;
      }
      else break;
    }
    let new_x = Phaser.Math.Between(1, gameOptions.xblocks-2)*gameOptions.blocksize;
    let new_y = Phaser.Math.Between(1, gameOptions.yblocks-2)*gameOptions.blocksize;
    let i = 0;
    let allowed = true;
    elements.forEach(element => {
      if(i != index && element.body.position.x == new_x && element.body.position.y == new_y) {
        allowed = false;
      };
      i++;
    });
    flBlue.forEach(fl => {
      if(Math.abs(fl.body.position.x - new_x) < gameOptions.blocksize && Math.abs(fl.body.position.y - new_y) < gameOptions.blocksize) {
        allowed = false;
      };
    });
    flRed.forEach(fl => {
      if(Math.abs(fl.body.position.x - new_x) < gameOptions.blocksize && Math.abs(fl.body.position.y - new_y) < gameOptions.blocksize) {
        allowed = false;
      };
    });
    if(Math.abs(this.man.body.position.x - new_x) < gameOptions.blocksize && Math.abs(this.man.body.position.y - new_y) < gameOptions.blocksize) {
      allowed = false;
    };
    if(allowed){
      elements[index].body.reset(new_x + gameOptions.blocksize/2, new_y + gameOptions.blocksize/2);
    }
  }

  shoot(bullet, target) {
    this.collectSound.play();
    target.disableBody(true, true);
    bullet.disableBody(true, true);
    if(target.texture.key == "wasp") score += gameOptions.shootWaspScore;
    else if(target.texture.key == "butterfly") score += gameOptions.shootButterflyScore;
    this.scoreText.setText(score);
  }

  update() {
    if(!this.input.activePointer.isDown && isMouseClicked == true){
      this.shotSound.play();
      this.bullet = this.physics.add.sprite(this.man.body.center.x, this.man.body.center.y, 'bullet');
      this.physics.add.overlap(this.bullet, this.butterflyGroup, this.shoot, this.isCloseEnough, this);
      this.physics.add.overlap(this.bullet, this.waspGroup, this.shoot, this.isCloseEnough, this);
      let mouseX = this.input.activePointer.x;
      let mouseY = this.input.activePointer.y;
      let distX = mouseX - this.man.body.center.x;
      let distY = mouseY - this.man.body.center.y;
      this.bullet.setVelocityX(gameOptions.bulletSpeed * distX/(Math.abs(distX)+Math.abs(distY)));
      this.bullet.setVelocityY(gameOptions.bulletSpeed * distY/(Math.abs(distX)+Math.abs(distY)));
      isMouseClicked= false;
    }
    else if(this.input.activePointer.isDown && isMouseClicked == false) {
      isMouseClicked = true;
    }
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
    else{
      this.man.body.velocity.x = 0;
      this.man.body.velocity.y = 0;
    }
  }
}



