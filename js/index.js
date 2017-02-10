const PIXI = require('pixi.js');
const Game = require('./game.js');
import Howler from 'howler';
// const Pajamer = require ('./pajamer.js');
// const Enemy = require ('./enemies.js');

// Some aliases to save on typing 
  var Container = PIXI.Container,
      autoDetectRenderer = PIXI.autoDetectRenderer,
      Texture = PIXI.Texture,
      Loader = PIXI.loader,
      Resources = PIXI.loader.resources,
      Text = PIXI.Text,
      Sprite = PIXI.Sprite;

var renderer = autoDetectRenderer(800, 440, {antialias: true, transparent: false, resolution: 1});


//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new Container;

Loader
  .add([
    "assets/images/enemy-1.png",
    "assets/images/flipped_pajamer.png",
    "assets/images/pajamer_sprites.json",
    "assets/images/enemy-2.png",
    "assets/images/enemy-3.png",
    "assets/images/bedroom_image.png",
    "assets/images/bed.png",
    "assets/images/HP_bar.png",
    "assets/images/game_over.png",
    "assets/images/zzz.png",
    "assets/images/paused.png",
    "assets/images/win1.png",
    "assets/images/game_over2.png"
    ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
  console.log("loading:"  + resource.url);
  console.log("progress: " + loader.progress + "%"); 
}


function pauseGame() {
  if (state === play) {
    state = pause
  } else if (state === pause) {
    stage.removeChild(pausedMessage)
    state = play
  }
}

// Contain sprites within walls 

// var abductionInProgress = false;
function contain(sprite, container) {

  var collision = undefined;

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}

/////////////////////




function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Variables I want to access throughout the game 
 
let specificEnemy;
let abductorId;
var pajamer, bed, enemy, state, zZz, outerBar, deadId, deadEnemy, happyPajamerTexture, sadPajamerTexture,
flippedPajamerTexture, endMessage, endMessage2, winMessage1, pausedMessage, hpBar, enemies;

var fireSound;

function setup() {

var fireSound = new Howl({src:['assets/sounds/fire.wav']});
var id = PIXI.loader.resources["assets/images/pajamer_sprites.json"].textures;

 console.log("All files loaded!");
  //Create the `cat` sprite from the texture


    //Create the `gameOver` scene
  //Make the `end` scene invisible when the game first starts


// sprite.texture = new

  pajamer = new Sprite(
    id["pajamer_sprite.png"]
  );
  happyPajamerTexture = Texture.fromImage("assets/images/pajamer_sprite.png")
  sadPajamerTexture =  Texture.fromImage("assets/images/sad_pajamer.png")
  var bedroom = new Sprite(
    Resources["assets/images/bedroom_image.png"].texture
  );

  flippedPajamerTexture = Texture.fromImage("assets/images/flipped_pajamer.png")  

  bed = new Sprite(
    Resources["assets/images/bed.png"].texture
  ); 

  endMessage = new Sprite(
    Resources["assets/images/game_over.png"].texture
  );

  endMessage2 = new Sprite(
    Resources["assets/images/game_over2.png"].texture
  );  

  winMessage1 = new Sprite(
    Resources["assets/images/win1.png"].texture
  );

  pausedMessage = new Sprite(
    Resources["assets/images/paused.png"].texture
  );

   zZz = new Sprite(
  Resources["assets/images/zzz.png"].texture
  );


  pausedMessage.position.set(240, 150)

  endMessage.scale.x = 0.5;
  endMessage.scale.y = 0.5;
  endMessage.position.set(180,10);

  endMessage2.scale.x = 0.5;
  endMessage2.scale.y = 0.5;
  endMessage2.position.set(180,10);



  pajamer.position.set(150,350)
  bed.position.set(405,383)

  bed.scale.x = 1.2;
  bed.scale.y = 1.2;

  pajamer.vx = 0;
  pajamer.vy = 0; 


  bed.vx = 0;
  bed.vy = 0;

  stage.addChild(bedroom);
  stage.addChild(pajamer);
  stage.addChild(bed);


 // HEALTH


 hpBar = new Sprite(
  Resources["assets/images/HP_bar.png"].texture
  )
 hpBar.position.set(540, 15)

  stage.addChild(hpBar);

  //170 is the size of the full health bar 
  outerBar = new PIXI.Graphics();
  outerBar.beginFill(0xFF0000);
  outerBar.drawRect(0, 0, 1, 7);
  outerBar.endFill();
  outerBar.position.set(227,10)
  hpBar.addChild(outerBar);
  hpBar.outer = outerBar;



  // ENEMIES 


  //Make the Enemies
  var numOfEnemies = randomInt(7,9),
      spacing = 30,
      xOffset = 150,
      direction = 1.7;
  //An array to store all the enemies
  enemies = [];


    var ENEMY_OPTIONS = [
            Resources["assets/images/enemy-1.png"], 
           Resources["assets/images/enemy-2.png"],
           Resources["assets/images/enemy-3.png"]
           ]

  for (var i = 0; i < numOfEnemies; i++) {
    //Make an enemy
    enemy = new Sprite(ENEMY_OPTIONS[randomInt(0,2)].texture); 

    //Space each enemy horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first enemy should be added
    var x = spacing * i + xOffset;
    var y = randomInt(0, (stage.height - enemy.height)/6);

    enemy.x = x;
    enemy.y = y;

    // Unique id 
    enemy.id = i;
    
    enemy.vy = randomInt(1,2) * direction;
    enemy.vx = randomInt(1,2);
    //Reverse the direction for the next enemy
    direction *= -1;

    //Push the enemy into the `Enemies` array
    enemies.push(enemy);
    //Add the enemy to the `stage`
    stage.addChild(enemy);
  }


    var velocityX = 0,
    maximumVelocityX = 8,
    accelerationX = 2,
    frictionX = 0.9;

  //KEYBOARD COMMANDS
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40),
      pause = keyboard(80),
      fire = keyboard(32),
      restart = keyboard(82)

  //Left arrow key `press` method


  restart.release = function(){
    // setup()
  }

  fire.release = function(){
 zZz.position.set(pajamer.x, pajamer.y)
  stage.addChild(zZz);
  fireSound.play();
  }


  pause.release = function(){
    pauseGame();
  }

  left.press = function() {
    pajamer.vx = -5;
    pajamer.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function() {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the pajamer isn't moving vertically:
    //Stop the pajamer
    if (!right.isDown && pajamer.vy === 0) {
      pajamer.vx = 0;
    }
  };

  //Up
  up.press = function() {
    pajamer.vy = -5;
    pajamer.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && pajamer.vx === 0) {
      pajamer.vy = 0;
    }
  };

  //Right
  right.press = function() {
    pajamer.vx = 5;
    pajamer.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && pajamer.vy === 0) {
      pajamer.vx = 0;
    }
  };

  //Down
  down.press = function() {
    pajamer.vy = 5;
    pajamer.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && pajamer.vx === 0) {
      pajamer.vy = 0;
    }
  };




  state = play;
  gameLoop();
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}





function gameLoop() {
  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  // Update current game state 
  state();

  //Render the stage to see the animation
  renderer.render(stage);
}


 function play(){


   if (enemies.length === 0) {
    state = win1;
   }

   bed.x += bed.vx;
   bed.y += bed.vy;

  if(stage.children.indexOf(specificEnemy) === -1 && bed.y < 383){
    bed.vy = 1
  } else if (bed.y > 382){
    bed.vy = 0;
  }

  if (stage.children.indexOf(zZz) !== 0){
    zZz.scale.x = 0.5;
    zZz.scale.y = 0.5;
    zZz.vx = 0;
    zZz.vy = -8;

    zZz.x += zZz.vx;
    zZz.y += zZz.vy;
  }



    pajamer.x += pajamer.vx;
    pajamer.y += pajamer.vy;


// ENEMY CODE
    enemies.forEach(function(enemy) {
    enemy.y += enemy.vy;
    enemy.x += enemy.vx;

    var enemyHitsWall = contain(enemy, {x: 0, y: 0, width: 800, height: 440});
    //If the enemy hits the top or bottom of the stage, reverse
    //its direction
    if (enemyHitsWall === "top" || enemyHitsWall === "bottom") {
      enemy.vy *= -1;
      enemy.vx *= -1; // make em bound around
    }

    // lights up player if they're hit by an enemy
    if(hitTestRectangle(pajamer, enemy)) {
      pajamerHit = true;
    }

    if(stage.children.indexOf(enemy) === -1){
      enemies.splice(enemies.indexOf(enemy), 1)
    }

    // lights up bed if they're hit by an enemy
    if(hitTestRectangle(bed, enemy)) {
      abductorId = enemy.id;
      bedHit = true;
    }

      if(hitTestRectangle(zZz, enemy)) {
      deadId = enemy.id;
      enemyHit = true;
    }
})

  // contain player's sprite to walls

  contain(pajamer, {x: 0, y: 0, width: 800, height: 440});

// COLLISION LOGIC 


var pajamerHit, bedHit, enemyHit;


if (enemyHit){

  stage.removeChild(zZz);
  zZz.x = -20;
  zZz.y = -20;
    //  if(enemies.indexOf(specificEnemy) === -1){
    //     bed.vy = 1
    // }
  enemies.forEach(function(enemy){
    if (enemy.id === deadId){
      deadEnemy = enemy;
    stage.removeChild(deadEnemy)
    }
  })
}

if (pajamerHit){
    // pajamer.texture = Resources["assets/images/sad_pajamer.png"]
    // translucent when hit
    pajamer.texture = sadPajamerTexture;
    pajamer.alpha = 0.7;
    pajamer.tint = 0xFF9999;
    hpBar.tint = 0xFF9999;
    hpBar.outer.width -= 2;

    if (hpBar.outer.width < -170) {
      state = end1;
    } 


 }  else {
      pajamer.tint = 0xffffff;
      hpBar.tint = 0xffffff;
      pajamer.alpha = 1;

      if (pajamer.vx >= 0){
        pajamer.texture = happyPajamerTexture;
      } else {
        pajamer.texture = flippedPajamerTexture;
      }
}

if (bedHit){
  enemies.forEach(function(enemy) {
    if (enemy.id === abductorId && bed.y > 300){
      specificEnemy = enemy;
    }
  })

  if (stage.children.indexOf(specificEnemy) !== -1){
  bed.x = specificEnemy.x - 20;
  bed.y = specificEnemy.y + 25;

  specificEnemy.vx = 0;
  specificEnemy.vy = -2;
  bed.vy = specificEnemy.vy
  bed.tint = 0xFF9999;
  } else {
    bed.tint = 0xD0A9F5;
  }

    if (specificEnemy.y === 0){
      state = end2;
    }

  } else {
    bed.tint = 0xffffff;
 }
}
// COLLISION FUNCTION (find different one for alarm clock circles) 
function hitTestRectangle(sprite1, sprite2) {

  //Calculate `centerX` and `centerY` properties on the sprites
  sprite1.centerX = sprite1.x + sprite1.width / 2;
  sprite1.centerY = sprite1.y + sprite1.height / 2;
  sprite2.centerX = sprite2.x + sprite2.width / 2;
  sprite2.centerY = sprite2.y + sprite2.height / 2;

  //Calculate the `halfWidth` and `halfHeight` properties of the sprites
  sprite1.halfWidth = sprite1.width / 2;
  sprite1.halfHeight = sprite1.height / 2;
  sprite2.halfWidth = sprite2.width / 2;
  sprite2.halfHeight = sprite2.height / 2;

  //Create a `collision` variable that will tell us
  //if a collision is occurring

  let collision = false;

  //Check whether the shapes of the sprites are overlapping. If they
  //are, set `collision` to `true`
  if (Math.abs(sprite1.centerX - sprite2.centerX) < sprite1.halfWidth + sprite2.halfWidth
  && Math.abs(sprite1.centerY - sprite2.centerY) < sprite1.halfHeight + sprite2.halfHeight) {
    collision = true;
  }

  //Return the value of `collision` back to the main program
  return collision;
}

function pause(){
  stage.addChild(pausedMessage)
}

function end1() {
  // stage.visible = false;
  stage.addChild(endMessage)
  // endScene.visible = true;
}

function end2() {
  // stage.visible = false;
  stage.addChild(endMessage2)
  // endScene.visible = true;
}


function win1(){
  stage.addChild(winMessage1)
}
