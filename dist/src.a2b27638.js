// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/block_grey.png":[function(require,module,exports) {
module.exports = "/block_grey.24e50b4a.png";
},{}],"assets/flower_blue.png":[function(require,module,exports) {
module.exports = "/flower_blue.f3c2aa35.png";
},{}],"assets/flower_red.png":[function(require,module,exports) {
module.exports = "/flower_red.525bdadf.png";
},{}],"assets/man.png":[function(require,module,exports) {
module.exports = "/man.d245246d.png";
},{}],"assets/Butterfly.png":[function(require,module,exports) {
module.exports = "/Butterfly.ef124cfb.png";
},{}],"assets/wasp.png":[function(require,module,exports) {
module.exports = "/wasp.5290b4dc.png";
},{}],"assets/bzzz.mp3":[function(require,module,exports) {
module.exports = "/bzzz.dbc72e92.mp3";
},{}],"assets/suck.mp3":[function(require,module,exports) {
module.exports = "/suck.12e85f33.mp3";
},{}],"assets/collect.mp3":[function(require,module,exports) {
module.exports = "/collect.e2965fb0.mp3";
},{}],"assets/shot.mp3":[function(require,module,exports) {
module.exports = "/shot.3bd1b90b.mp3";
},{}],"assets/bullet.png":[function(require,module,exports) {
module.exports = "/bullet.6a8026eb.png";
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
//Global variables:
var game; //
var numflowers = 0; // number of flowers still in the game
var numBlocks = 0; // number of wall blocks added to the game area
var level = 1; // current game level
var isMouseClicked = false; // was a mouse button clicked
var score = 0; // current score
var numMen; // curremt number of lives left
var scores = [{
  // score table
  name: "Bob",
  score: -1000
}];
var gameOptions = {
  maxlevel: 3,
  // max levelScore
  maxScores: 3,
  // how many players can get on the score board
  manGravity: 0,
  // the player is not falling, but the view is from above
  manSpeed: 150,
  // the speed of the player
  blocksize: 60,
  // the size of a wall block
  maxMen: 3,
  // max lives
  numBlueFlowers: 10,
  // number of blue flowers in the game
  numRedFlowers: 8,
  // number of red flowers in the game
  redFlowerScore: 20,
  // score for collecting one red flower
  blueFlowerScore: 10,
  // score for collecting one blue flower
  stingScore: -80,
  // score forgetting stinged by as wasp
  levelScore: 100,
  // score for completing a level
  shootWaspScore: 30,
  // score for shooting a wasp
  shootButterflyScore: 10,
  // score for shooting a butterfly
  xblocks: 14,
  // number of blocks in x direction
  yblocks: 14,
  // number of blocks in y direction
  butterflySpeed: [100, 115, 130],
  // the speed of a butterfly in each level
  waspSpeed: [100, 120, 140],
  // the speed of a wasp in each level
  bulletSpeed: 800,
  // the speed of a bullet
  enemyInterval: [7000, 5500, 3500],
  // the time interval of new enemies in each level
  moveBlockInterval: [5000, 3500, 2000],
  // the time interval of moving blocks in each level
  butterflyRateOfEnemies: [0.7, 0.6, 0.5],
  // the rate of butterflies out of enemies in each level
  overlapDistance: 30,
  // how close the game objects should be to each other to create a hit
  maps: [
  // block maps for each level: 0 = block, -1 = no block
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, -1, -1, 0, -1, -1, -1, -1, 0, -1, -1, -1, -1, 0, 0, -1, -1, 0, -1, -1, 0, -1, 0, 0, 0, -1, -1, 0, 0, -1, -1, 0, -1, -1, 0, -1, -1, -1, 0, -1, -1, 0, 0, -1, -1, 0, -1, 0, 0, -1, -1, -1, 0, -1, -1, 0, 0, -1, -1, 0, -1, 0, 0, 0, 0, -1, 0, -1, -1, 0, 0, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, 0, -1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, 0, 0, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, 0, -1, 0, 0, -1, -1, -1, -1, -1, 0, -1, 0, -1, 0, 0, -1, 0, 0, -1, -1, 0, -1, -1, 0, -1, 0, -1, -1, -1, -1, 0, 0, -1, -1, 0, -1, -1, 0, -1, 0, 0, 0, -1, -1, 0, 0, -1, -1, 0, -1, -1, 0, -1, -1, -1, 0, -1, -1, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, 0, -1, -1, 0, 0, -1, -1, 0, -1, 0, 0, 0, 0, -1, 0, -1, -1, 0, 0, -1, -1, 0, -1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, 0, -1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, -1, -1, -1, -1, 0, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, 0, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, 0, -1, -1, 0, 0, 0, 0, -1, -1, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -1, -1, 0, 0, -1, -1, -1, -1, -1, 0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1, -1, 0, -1, 0, -1, 0, -1, -1, 0, 0, -1, -1, 0, -1, -1, 0, -1, -1, -1, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, -1, -1, 0, 0, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};

/***************************************/
window.onload = function () {
  var gameConfig = {
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
};

/*******************************************/
/* scene for showing/modifying score board */
/*******************************************/
var ScoreBoard = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(ScoreBoard, _Phaser$Scene);
  var _super = _createSuper(ScoreBoard);
  /*******************************************/
  function ScoreBoard() {
    _classCallCheck(this, ScoreBoard);
    return _super.call(this, "ScoreBoard");
  }

  /*******************************************/
  _createClass(ScoreBoard, [{
    key: "create",
    value: function create() {
      var _this = this;
      // letters to choose for the score board name
      this.chars = [["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"], ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"], ["U", "V", "W", "X", "Y", "Z", ".", "-", "<", "#"]];
      this.charLimit = 8;
      this.padding = 100;
      this.letterSpacing = 20;
      this.charWidth = 40;
      this.charHeight = 40;
      this.lineHeight = 2;
      this.name = "";
      this.isOnScoreBoard = false; // was the score of the player good enough for the score board
      this.index = 0;
      this.isReadyToReceiveMouseClicks = false; // Should mouse clicks be taken into account or not

      this.scene.bringToTop();

      // set the texts on the score board
      this.add.text(100, 300, "Score   Name", {
        fontSize: "40px",
        fill: "#000000",
        fontStyle: "bold"
      });
      for (var i = 0; i < scores.length; i++) {
        // should the player go on the score board?
        if (score > scores[i].score && !this.isOnScoreBoard) {
          // the row for this player: score is known and we are waiting for the name to be input
          this.add.text(100, 300 + (i + 1) * 50, score, {
            fontSize: "40px",
            fill: "#000000",
            fontStyle: "bold"
          });
          this.playerText = this.add.text(300, 300 + (i + 1) * 50, "", {
            fontSize: "40px",
            fill: "#000000",
            fontStyle: "bold"
          });
          this.isOnScoreBoard = true;
          if (scores.length >= gameOptions.maxScores) {
            scores.pop(); // drop the last one, if the board is full
          }

          scores.splice(i, 0, {
            name: "",
            score: score
          }); // add the new player to the array
          this.index = i;
        } else {
          this.add.text(100, 300 + (i + 1) * 50, scores[i].score, {
            fontSize: "40px",
            fill: "#000000",
            fontStyle: "bold"
          });
          this.add.text(300, 300 + (i + 1) * 50, scores[i].name, {
            fontSize: "40px",
            fill: "#000000",
            fontStyle: "bold"
          });
        }
      }
      if (this.isOnScoreBoard) {
        // show the character table so that the player can select letters for their name
        var text;
        for (var _i = 0; _i < this.chars.length; _i++) {
          for (var j = 0; j < this.chars[_i].length; j++) {
            var xx = this.padding + j * (this.charWidth + this.letterSpacing);
            var yy = 50 + _i * (this.charHeight + this.lineHeight);
            text = this.add.text(xx, yy, this.chars[_i][j], {
              fontSize: "40px",
              fill: "#000000",
              fontStyle: "bold"
            });
          }
        }
        this.nameText = this.add.text(100, 200, "", {
          fontSize: "40px",
          fill: "#cccccc",
          fontStyle: "bold"
        });
        this.input.keyboard.enabled = false;
        this.isReadyToReceiveMouseClicks = true;
      } else {
        // we only show the score board and then a new game can start
        this.time.addEvent({
          delay: 3000,
          callback: function callback() {
            level = 1;
            score = 0;
            numMen = gameOptions.maxMen;
            _this.scene.stop();
            _this.scene.start("PlayGame");
          },
          loop: false
        });
      }
    }

    /*******************************************/
    /* The player has written their name and   */
    /* wants to submit it on the score board   */
    /*******************************************/
  }, {
    key: "submitName",
    value: function submitName() {
      var _this2 = this;
      this.isReadyToReceiveMouseClicks = false;
      this.scene.stop("InputPanel");
      this.playerText.setText(this.nameText.text);
      scores[this.index].name = this.nameText.text;
      this.nameText.setText("");
      this.time.addEvent({
        delay: 3000,
        callback: function callback() {
          _this2.scene.stop();
          level = 1;
          score = 0;
          numMen = gameOptions.maxMen;
          _this2.scene.start("PlayGame");
        },
        loop: false
      });
    }

    /*******************************************/
    /* The player has clicked a character and  */
    /* it should be updated on the screen      */
    /*******************************************/
  }, {
    key: "updateName",
    value: function updateName(name) {
      this.nameText.setText(name);
    }

    /*******************************************/
    /* Catching the mouse clicks on the screen */
    /* while the player is selecting letters   */
    /*******************************************/
  }, {
    key: "update",
    value: function update() {
      if (!this.isReadyToReceiveMouseClicks) {
        // the status of the scene is not ready for selecting letters
        return;
      }
      if (!this.input.activePointer.isDown && isMouseClicked == true) {
        // mouse clicked (down + up)
        var mouseX = this.input.activePointer.x;
        var mouseY = this.input.activePointer.y;

        // calculating which character was clicked
        var xx = (mouseX - this.padding - this.charWidth / 4) / (this.charWidth + this.letterSpacing);
        var yy = (mouseY - 50 - this.charHeight / 2) / (this.charHeight + this.lineHeight);
        xx = Math.abs(Math.round(xx));
        yy = Math.abs(Math.round(yy));
        isMouseClicked = false;
        if (xx < 0 || xx >= this.chars[0].length || yy < 0 || yy >= this.chars.length) {
          // this click was outside of the character set area
          return;
        }
        if (this.chars[yy][xx] == "<") {
          // "backspace" removes the last character
          this.name = this.name.substring(0, this.name.length - 1);
          this.updateName(this.name);
        } else if (this.chars[yy][xx] == "#") {
          // "enter" submits the name
          this.submitName();
        } else if (this.name.length < this.charLimit) {
          this.name = this.name.concat(this.chars[yy][xx]);
          this.updateName(this.name);
        }
      } else if (this.input.activePointer.isDown && isMouseClicked == false) {
        // mouse clicked (down, not yet up)
        isMouseClicked = true;
      }
    }
  }]);
  return ScoreBoard;
}(Phaser.Scene);
/*******************************************/
/* scene for playing the game              */
/*******************************************/
var PlayGame = /*#__PURE__*/function (_Phaser$Scene2) {
  _inherits(PlayGame, _Phaser$Scene2);
  var _super2 = _createSuper(PlayGame);
  /*******************************************/
  function PlayGame() {
    var _this3;
    _classCallCheck(this, PlayGame);
    _this3 = _super2.call(this, "PlayGame");
    numMen = gameOptions.maxMen;
    return _this3;
  }

  /*******************************************/
  _createClass(PlayGame, [{
    key: "preload",
    value: function preload() {
      //load the images and sounds
      this.load.image("block", require("../assets/block_grey.png"));
      this.load.image("flowerBlue", require("../assets/flower_blue.png"));
      this.load.image("flowerRed", require("../assets/flower_red.png"));
      this.load.spritesheet("man", require("../assets/man.png"), {
        frameWidth: 46,
        frameHeight: 46
      });
      this.load.spritesheet("butterfly", require("../assets/Butterfly.png"), {
        frameWidth: 75,
        frameHeight: 75
      });
      this.load.spritesheet("wasp", require("../assets/wasp.png"), {
        frameWidth: 75,
        frameHeight: 75
      });
      this.load.audio("sting", [require("../assets/bzzz.mp3")]);
      this.load.audio("suck", [require("../assets/suck.mp3")]);
      this.load.audio("collect", [require("../assets/collect.mp3")]);
      this.load.audio("shot", [require("../assets/shot.mp3")]);
      this.load.image("bullet", require("../assets/bullet.png"));
    }

    /*******************************************/
  }, {
    key: "create",
    value: function create() {
      var _this4 = this;
      var flowers = []; // positions of all redFlowerScore
      var blocks = []; // positions of all wall blocksize
      this.scene.stop("ScoreBoard"); // stop the possible other scene
      this.x;
      this.y;

      // add groups for wall blocks and flowers
      this.blockGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      });
      this.blueFlowerGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      });
      this.redFlowerGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      });

      // set the wall blocks according to the predefined map per level
      this.x = 0;
      this.y = 0;
      numBlocks = 0;
      gameOptions.maps[level - 1].forEach(function (square) {
        // go through the map for this level
        // wall blocks are marked with 0, empty spaces with -1 on the map
        if (square == 0) {
          _this4.blockGroup.create(_this4.x * gameOptions.blocksize + gameOptions.blocksize / 2, _this4.y * gameOptions.blocksize + gameOptions.blocksize / 2, "block");
          // write down the position to an array
          blocks[numBlocks] = {
            x: _this4.x * gameOptions.blocksize + gameOptions.blocksize / 2,
            y: _this4.y * gameOptions.blocksize + gameOptions.blocksize / 2
          };
          numBlocks++;
        }
        if (_this4.x >= gameOptions.xblocks - 1) {
          // next row
          _this4.x = -1;
          _this4.y += 1;
        }
        _this4.x++;
      });

      // set the blue flowers randomly to empty squares
      numflowers = 0;
      for (var i = 0; i < gameOptions.numBlueFlowers; i++) {
        this.x = Phaser.Math.Between(1, gameOptions.xblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        this.y = Phaser.Math.Between(1, gameOptions.yblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        var allowed = true;
        for (var j = 0; j < numBlocks; j++) {
          if (this.x == blocks[j].x && this.y == blocks[j].y) {
            // not allowed to positions of wall blocks
            allowed = false;
            i--;
            break;
          }
        }
        for (var _j = 0; _j < numflowers; _j++) {
          if (this.x == flowers[_j].x && this.y == flowers[_j].y) {
            // not allowed to positions of other blue flowers
            allowed = false;
            i--;
            break;
          }
        }
        if (allowed == true) {
          this.blueFlowerGroup.create(this.x, this.y, "flowerBlue");
          flowers[numflowers] = {
            x: this.x,
            y: this.y
          };
          numflowers++;
        }
      }

      // set the red flowers randomly to empty squares
      for (var _i2 = 0; _i2 < gameOptions.numRedFlowers; _i2++) {
        this.x = Phaser.Math.Between(1, gameOptions.xblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        this.y = Phaser.Math.Between(1, gameOptions.yblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        var _allowed = true;
        for (var _j2 = 0; _j2 < numflowers; _j2++) {
          if (this.x == flowers[_j2].x && this.y == flowers[_j2].y) {
            // not allowed to positions of other blue or red flowers
            _allowed = false;
            _i2--;
            break;
          }
        }
        for (var _j3 = 0; _j3 < numBlocks; _j3++) {
          if (this.x == blocks[_j3].x && this.y == blocks[_j3].y) {
            // not allowed to positions of wall blocks
            _allowed = false;
            _i2--;
            break;
          }
        }
        if (_allowed == true) {
          this.redFlowerGroup.create(this.x, this.y, "flowerRed");
          flowers[numflowers] = {
            x: this.x,
            y: this.y
          };
          numflowers++;
        }
      }

      // the player
      this.man = this.physics.add.sprite(gameOptions.blocksize * 1.5, gameOptions.blocksize * 1.5, "man");

      // enemies
      this.butterflyGroup = this.physics.add.group({});
      this.waspGroup = this.physics.add.group({});

      // sounds
      this.stingSound = this.sound.add("sting", {
        loop: false
      });
      this.suckingSound = this.sound.add("suck", {
        loop: false
      });
      this.shotSound = this.sound.add("shot", {
        loop: false
      });
      this.collectSound = this.sound.add("collect", {
        loop: false
      });

      // butterfly flying left or right
      this.anims.create({
        key: "bfleft",
        frames: this.anims.generateFrameNumbers("butterfly", {
          start: 2,
          end: 3
        }),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: "bfright",
        frames: this.anims.generateFrameNumbers("butterfly", {
          start: 0,
          end: 1
        }),
        frameRate: 5,
        repeat: -1
      });

      // wasp flying left or right
      this.anims.create({
        key: "waspleft",
        frames: this.anims.generateFrameNumbers("wasp", {
          start: 0,
          end: 1
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "waspright",
        frames: this.anims.generateFrameNumbers("wasp", {
          start: 2,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      });

      // timer for adding new enemies
      this.triggerTimer = this.time.addEvent({
        callback: this.addEnemies,
        callbackScope: this,
        delay: gameOptions.enemyInterval[level - 1],
        loop: true
      });

      // timer for moving wall blocks
      this.triggerTimer = this.time.addEvent({
        callback: this.moveOneBlock,
        callbackScope: this,
        delay: gameOptions.moveBlockInterval[level - 1],
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
      this.gameText = this.add.text(0, 0, "Level ".concat(level, "/").concat(gameOptions.maxlevel), {
        fontSize: "36px",
        fill: "#000000",
        fontStyle: "bold"
      });
      this.scoreText = this.add.text(game.config.width - 1.75 * gameOptions.blocksize, gameOptions.blocksize / 2, score, {
        fontSize: "36px",
        fill: "#000000",
        fontStyle: "bold"
      });
      for (var _i3 = 1; _i3 <= numMen; _i3++) {
        // number of lives left
        var img = this.add.image(game.config.width - _i3 * gameOptions.blocksize / 2, gameOptions.blocksize / 4, "man");
        img.setScale(0.5);
      }
      this.add.text(0, gameOptions.yblocks * gameOptions.blocksize, "Pick all flowers with arrow keys. Wasps will sting", {
        fontSize: "28px",
        fill: "#000000",
        fontStyle: "bold"
      });
      this.add.text(0, gameOptions.yblocks * gameOptions.blocksize + 28, "you and butterflies will suck the flowers...", {
        fontSize: "28px",
        fill: "#000000",
        fontStyle: "bold"
      });
      this.add.text(0, gameOptions.yblocks * gameOptions.blocksize + 28 * 2, "The walls are moving. You can shoot the insects", {
        fontSize: "28px",
        fill: "#000000",
        fontStyle: "bold"
      });
      this.add.text(0, gameOptions.yblocks * gameOptions.blocksize + 28 * 3, "with the mouse and gain more points. ", {
        fontSize: "28px",
        fill: "#000000",
        fontStyle: "bold"
      });

      // using arrow keys
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    /*******************************************/
    /* are the objects close enough to be      */
    /* considered as hitting each other        */
    /*******************************************/
  }, {
    key: "isCloseEnough",
    value: function isCloseEnough(body1, body2) {
      if (Math.abs(body1.body.center.x - body2.body.center.x) < gameOptions.overlapDistance && Math.abs(body1.body.center.y - body2.body.center.y) < gameOptions.overlapDistance) {
        return true;
      }
      return false;
    }

    /*******************************************/
    /* player collects a flower                */
    /*******************************************/
  }, {
    key: "collectFlower",
    value: function collectFlower(man, flower) {
      var _this5 = this;
      flower.disableBody(true, true);
      this.collectSound.play();
      if (flower.body.gameObject.texture.key == "flowerBlue") score += gameOptions.blueFlowerScore; //blue flower score
      else score += gameOptions.redFlowerScore; // red flower score
      this.scoreText.setText(score);
      numflowers--;
      if (numflowers == 0) {
        // all flowers collected (or sucked by butterflies)
        this.time.removeAllEvents(); // stop timers

        // remove all enemies
        this.butterflyGroup.getChildren().forEach(function (element) {
          element.disableBody(true, true);
        });
        this.waspGroup.getChildren().forEach(function (element) {
          element.disableBody(true, true);
        });
        score += gameOptions.levelScore; // score for completing a level
        this.scoreText.setText(score);
        if (level == gameOptions.maxlevel) {
          // all levels completed
          this.gameText.setText("Level ".concat(level, "/").concat(gameOptions.maxlevel, " completed, game finished"));
          // show texts before starting next scene
          this.time.addEvent({
            delay: 4000,
            callback: function callback() {
              numflowers = 0;
              numBlocks = 0;
              _this5.flowers = [];
              _this5.blocks = 0;
              _this5.scene.start("ScoreBoard"); // show the score board
            },

            loop: false
          });
        } else {
          // next level
          this.gameText.setText("Level ".concat(level, "/").concat(gameOptions.maxlevel, " completed"));
          // show texts before starting next scene
          this.time.addEvent({
            delay: 2000,
            callback: function callback() {
              numflowers = 0;
              numBlocks = 0;
              _this5.flowers = [];
              _this5.blocks = [];
              level++;
              _this5.scene.start("PlayGame");
            },
            loop: false
          });
        }
      }
    }

    /*******************************************/
    /* butterfly gets a flower                 */
    /*******************************************/
  }, {
    key: "butterflySucksFlower",
    value: function butterflySucksFlower(butterfly, flower) {
      var _this6 = this;
      this.suckingSound.play();
      flower.disableBody(true, true);
      // scores for losing the flower to the butterfly
      if (flower.body.gameObject.texture.key == "flowerBlue") score -= gameOptions.blueFlowerScore / 2;else score -= gameOptions.redFlowerScore / 2;
      this.scoreText.setText(score);
      numflowers--;
      if (numflowers == 0) {
        // all flowers collected or sucked
        this.time.removeAllEvents(); // stop timers
        score += gameOptions.levelScore; // score for completing a level
        this.scoreText.setText(score);
        // remove all enemies
        this.butterflyGroup.getChildren().forEach(function (element) {
          element.disableBody(true, true);
        });
        this.waspGroup.getChildren().forEach(function (element) {
          element.disableBody(true, true);
        });
        if (level == gameOptions.maxlevel) {
          // all levels completed
          this.gameText.setText("Level ".concat(level, "/").concat(gameOptions.maxlevel, " completed, game finished"));
          // show texts before starting next scene
          this.time.addEvent({
            delay: 4000,
            callback: function callback() {
              numflowers = 0;
              numBlocks = 0;
              _this6.flowers = [];
              _this6.blocks = [];
              _this6.scene.start("ScoreBoard"); // show the score board
            },

            loop: false
          });
        } else {
          // next level
          this.gameText.setText("Level ".concat(level, "/").concat(gameOptions.maxlevel, " completed"));
          // show texts before starting next scene
          this.time.addEvent({
            delay: 2000,
            callback: function callback() {
              numflowers = 0;
              numBlocks = 0;
              _this6.flowers = [];
              _this6.blocks = [];
              level++;
              _this6.scene.start("PlayGame");
            },
            loop: false
          });
        }
      }
    }

    /*******************************************/
    /* wasp stings the player                  */
    /*******************************************/
  }, {
    key: "waspStings",
    value: function waspStings(man, wasp) {
      var _this7 = this;
      this.stingSound.play();
      man.disableBody(true, true);
      this.time.removeAllEvents();
      numMen--;
      score += gameOptions.stingScore;
      this.scoreText.setText(score);
      this.butterflyGroup.getChildren().forEach(function (element) {
        element.disableBody(true, true);
      });
      this.waspGroup.getChildren().forEach(function (element) {
        element.disableBody(true, true);
      });
      if (numMen == 0) {
        // all lives used, game over
        this.gameText.setText("Game over");
      }
      // show texts before starting next scene
      this.time.addEvent({
        delay: 4000,
        callback: function callback() {
          numflowers = 0;
          numBlocks = 0;
          _this7.flowers = [];
          _this7.blocks = [];
          if (numMen == 0) {
            _this7.scene.start("ScoreBoard"); // show the score board
          } else {
            _this7.scene.start("PlayGame"); // start this level again
          }
        },

        loop: false
      });
    }

    /*******************************************/
    /* add butterflies or wasps to the game    */
    /*******************************************/
  }, {
    key: "addEnemies",
    value: function addEnemies() {
      // choose the enemy randomly but according to the predefined rate for this level
      if (Phaser.Math.FloatBetween(0, 1) <= gameOptions.butterflyRateOfEnemies[level - 1]) {
        // add a butterfly to a random position
        var bf = this.butterflyGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "butterfly");
        bf.setVelocityY(-gameOptions.butterflySpeed[level - 1]);
        // choose the direction according to the start position
        if (bf.body.x < gameOptions.blocksize * gameOptions.xblocks / 2) {
          bf.setVelocityX(gameOptions.butterflySpeed[level - 1] / 1.7);
          bf.anims.play("bfright", true);
        } else {
          bf.setVelocityX(-gameOptions.butterflySpeed[level - 1] / 1.7);
          bf.anims.play("bfleft", true);
        }
      } else {
        // add a wasp to a random position
        var w = this.waspGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "wasp");
        w.setVelocityY(-gameOptions.waspSpeed[level - 1]);
        // choose the direction according to the start position
        if (w.body.x < gameOptions.blocksize * gameOptions.xblocks / 2) {
          w.setVelocityX(gameOptions.waspSpeed[level - 1] / 1.7);
          w.anims.play("waspright", true);
        } else {
          w.setVelocityX(-gameOptions.waspSpeed[level - 1] / 1.7);
          w.anims.play("waspleft", true);
        }
      }
    }

    /*******************************************/
    /* move one wall block randomly            */
    /*******************************************/
  }, {
    key: "moveOneBlock",
    value: function moveOneBlock() {
      var elements = this.blockGroup.getChildren();
      var flBlue = this.blueFlowerGroup.getChildren();
      var flRed = this.redFlowerGroup.getChildren();
      var index = 0;

      // select the block to move randomly, but it must be a block inside the surrounding walls
      while (true) {
        index = Phaser.Math.Between(gameOptions.xblocks, numBlocks - gameOptions.xblocks);
        var x = elements[index].body.position.x;
        if (x == 0 || x / gameOptions.blocksize == gameOptions.xblocks - 1) {
          continue;
        } else break;
      }

      // select the new position randomly, but it must be a somewhere inside the surrounding walls
      var new_x = Phaser.Math.Between(1, gameOptions.xblocks - 2) * gameOptions.blocksize;
      var new_y = Phaser.Math.Between(1, gameOptions.yblocks - 2) * gameOptions.blocksize;
      var i = 0;
      var allowed = true;
      elements.forEach(function (element) {
        // the new position cannot be occupied by another block
        if (i != index && element.body.position.x == new_x && element.body.position.y == new_y) {
          allowed = false;
        }
        ;
        i++;
      });
      flBlue.forEach(function (fl) {
        // the new position cannot be occupied by blue flowers
        if (Math.abs(fl.body.position.x - new_x) < gameOptions.blocksize && Math.abs(fl.body.position.y - new_y) < gameOptions.blocksize) {
          allowed = false;
        }
        ;
      });
      flRed.forEach(function (fl) {
        // the new position cannot be occupied by red flowers
        if (Math.abs(fl.body.position.x - new_x) < gameOptions.blocksize && Math.abs(fl.body.position.y - new_y) < gameOptions.blocksize) {
          allowed = false;
        }
        ;
      });
      // the new position cannot be the position of the player
      if (Math.abs(this.man.body.position.x - new_x) < gameOptions.blocksize && Math.abs(this.man.body.position.y - new_y) < gameOptions.blocksize) {
        allowed = false;
      }
      ;
      if (allowed) {
        // move the block
        elements[index].body.reset(new_x + gameOptions.blocksize / 2, new_y + gameOptions.blocksize / 2);
      }
    }

    /*******************************************/
    /* the player has shot a bullet and it has */
    /* hit one of the enemies                  */
    /*******************************************/
  }, {
    key: "shoot",
    value: function shoot(bullet, target) {
      this.collectSound.play();
      target.disableBody(true, true);
      bullet.disableBody(true, true);
      if (target.texture.key == "wasp") score += gameOptions.shootWaspScore;else if (target.texture.key == "butterfly") score += gameOptions.shootButterflyScore;
      this.scoreText.setText(score);
    }

    /*******************************************/
    /* Catching the mouse clicks on the screen */
    /* and arrow key presses                   */
    /*******************************************/
  }, {
    key: "update",
    value: function update() {
      if (!this.input.activePointer.isDown && isMouseClicked == true) {
        // mouse clicked (down + up)
        // shoot a bullet
        this.shotSound.play();
        this.bullet = this.physics.add.sprite(this.man.body.center.x, this.man.body.center.y, 'bullet');
        this.physics.add.overlap(this.bullet, this.butterflyGroup, this.shoot, this.isCloseEnough, this);
        this.physics.add.overlap(this.bullet, this.waspGroup, this.shoot, this.isCloseEnough, this);
        var mouseX = this.input.activePointer.x;
        var mouseY = this.input.activePointer.y;
        var distX = mouseX - this.man.body.center.x;
        var distY = mouseY - this.man.body.center.y;
        this.bullet.setVelocityX(gameOptions.bulletSpeed * distX / (Math.abs(distX) + Math.abs(distY)));
        this.bullet.setVelocityY(gameOptions.bulletSpeed * distY / (Math.abs(distX) + Math.abs(distY)));
        isMouseClicked = false;
      } else if (this.input.activePointer.isDown && isMouseClicked == false) {
        // mouse clicked down but not yet up
        isMouseClicked = true;
      }

      // arrow key presses move the player
      if (this.cursors.left.isDown) {
        this.man.body.velocity.x = -gameOptions.manSpeed;
        this.man.body.velocity.y = 0;
      } else if (this.cursors.right.isDown) {
        this.man.body.velocity.x = gameOptions.manSpeed;
        this.man.body.velocity.y = 0;
      } else if (this.cursors.up.isDown) {
        this.man.body.velocity.y = -gameOptions.manSpeed;
        this.man.body.velocity.x = 0;
      } else if (this.cursors.down.isDown) {
        this.man.body.velocity.y = gameOptions.manSpeed;
        this.man.body.velocity.x = 0;
      } else {
        // stop the player
        this.man.body.velocity.x = 0;
        this.man.body.velocity.y = 0;
      }
    }
  }]);
  return PlayGame;
}(Phaser.Scene);
},{"./styles.css":"src/styles.css","../assets/block_grey.png":"assets/block_grey.png","../assets/flower_blue.png":"assets/flower_blue.png","../assets/flower_red.png":"assets/flower_red.png","../assets/man.png":"assets/man.png","../assets/Butterfly.png":"assets/Butterfly.png","../assets/wasp.png":"assets/wasp.png","../assets/bzzz.mp3":"assets/bzzz.mp3","../assets/suck.mp3":"assets/suck.mp3","../assets/collect.mp3":"assets/collect.mp3","../assets/shot.mp3":"assets/shot.mp3","../assets/bullet.png":"assets/bullet.png"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40479" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map