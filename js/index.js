const PIXI = require('pixi.js');
const Game = require('./game.js');
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
    "assets/images/pajamer_sprite.png",
    "assets/images/sad_pajamer.png",
    "assets/images/enemy-1.png",
    "assets/images/enemy-2.png",
    "assets/images/enemy-3.png",
    "assets/images/bedroom_image.png",
    "assets/images/bed.png",
    "assets/images/HP_bar.png",
    "assets/images/end_message.png"
    ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
  console.log("loading:"  + resource.url);
  console.log("progress: " + loader.progress + "%"); 
}


function pauseGame() {
  if (!gamePaused) {
    game = clearTimeout(game);
    gamePaused = true;
  } else if (gamePaused) {
    game = setTimeout(gameLoop, 1000 / 30);
    gamePaused = false;
  }
}

// Contain sprites within walls 
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


var pajamer, bed, enemy, state;
//This `setup` function will run when the image has loaded
function setup() {

 console.log("All files loaded!");
  //Create the `cat` sprite from the texture


    //Create the `gameOver` scene
  endScene = new Container(0xFF9999);
  stage.addChild(endScene);
  //Make the `end` scene invisible when the game first starts
  endScene.visible = false;




  pajamer = new Sprite(
    Resources["assets/images/pajamer_sprite.png"].texture
  );
  bedroom = new Sprite(
    Resources["assets/images/bedroom_image.png"].texture
  );  

  bed = new Sprite(
    Resources["assets/images/bed.png"].texture
  ); 

  endMessage = new Sprite(
    Resources["assets/images/end_message.png"].texture
  );

  endMessage.scale.x = 0.5;
  endMessage.scale.y = 0.5;
  endMessage.position.set(180,10);


  endScene.addChild(endMessage)
  // Position the pajamer
  pajamer.position.set(150,350)
  bed.position.set(405,383)

  bed.scale.x = 1.2;
  bed.scale.y = 1.2;

  //Initialize pajamer's velocity variables
   pajamer.vx = 0;
   pajamer.vy = 0;
  //Add the pajamer to the stage
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
  var outerBar = new PIXI.Graphics();
  outerBar.beginFill(0xFF0000);
  outerBar.drawRect(0, 0, 2, 7);
  outerBar.endFill();
  outerBar.position.set(227,10)
  hpBar.addChild(outerBar);
  hpBar.outer = outerBar;



  // ENEMIES 


  //Make the Enemies
  var numOfEnemies = randomInt(6,8),
      spacing = 30,
      xOffset = 150,
      direction = 1.2;
  //An array to store all the enemies
  enemies = [];


    ENEMY_OPTIONS = [
            Resources["assets/images/enemy-1.png"], 
           Resources["assets/images/enemy-2.png"],
           Resources["assets/images/enemy-3.png"]
           ]

  //Make as many Enemies as there are `numberOfEnemies`
  for (var i = 0; i < numOfEnemies; i++) {
    //Make an enemy
    enemy = new Sprite(ENEMY_OPTIONS[randomInt(0,2)].texture); 

    //Space each enemy horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first enemy should be added
    var x = spacing * i + xOffset;
    //Give the enemy a random y position
    var y = randomInt(0, (stage.height - enemy.height)/6);
    //Set the enemy's position
      enemy.x = x;
      enemy.y = y;
    
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
      pause = keyboard(80);

  //Left arrow key `press` method

  pause.press = function(){
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

    // lights up bed if they're hit by an enemy
    if(hitTestRectangle(bed, enemy)) {
      bedHit = true;
    }
})

  // contain player's sprite to walls

  contain(pajamer, {x: 0, y: 0, width: 800, height: 440});

// COLLISION LOGIC 

// message = new Text(
//     "Alas! You've woken up.", 
//     {fontFamily: "Futura", fontSize:'32', fill: "white"}
//   );

//   message.position.set(300,300);
//   endScene.addChild(message);

var pajamerHit, bedHit;

// var sadTexture = Texture.fromFrame('sad_pajamer.png'); 
// var happyTexture = Texture.fromFrame('pajamer_sprite.png')

if (pajamerHit){
   // bed tints red when hit
  // stage.addChild(message);
   // message.text = "You've been hit!"
    // pajamer.texture = Resources["assets/images/sad_pajamer.png"]
    pajamer.alpha = 0.7;
    pajamer.tint = 0xFF9999;
    hpBar.outer.width -= 1;
    console.log(hpBar.outer.width);
    if (hpBar.outer.width < -170) {
    state = end;
  } 


 }  else {
      pajamer.tint = 0xffffff;
      pajamer.alpha = 1;
}


if (bedHit){
    bed.tint = 0xFF9999;
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


function end() {
  // stage.visible = false;
  stage.addChild(endMessage)
  endScene.visible = true;
}

