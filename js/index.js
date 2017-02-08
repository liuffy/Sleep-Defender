const PIXI = require('pixi.js');

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
    "assets/images/bedroom_image.png",
    "assets/images/bed.png",
    ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
  console.log("loading:"  + resource.url);
  console.log("progress: " + loader.progress + "%"); 
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

var pajamer, state;
//This `setup` function will run when the image has loaded
function setup() {

 console.log("All files loaded!");
  //Create the `cat` sprite from the texture

  pajamer = new Sprite(
    Resources["assets/images/pajamer_sprite.png"].texture
  );
  bedroom = new Sprite(
    Resources["assets/images/bedroom_image.png"].texture
  );  

  bed = new Sprite(
    Resources["assets/images/bed.png"].texture
  );

  // Position the pajamer
  pajamer.position.set(150,350)
 bed.position.set(400,390)

  //Initialize pajamer's velocity variables
   pajamer.vx = 0;
   pajamer.vy = 0;
  //Add the pajamer to the stage
  stage.addChild(bedroom);
  stage.addChild(pajamer);
  stage.addChild(bed);


  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function() {

    //Change the cat's velocity when the key is pressed
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
  // pajamer.vx = 0.8;
  // pajamer.vy = 0;

  //Apply the velocity values to the pajamer's 
  //position to make it move
  pajamer.x += pajamer.vx;
  pajamer.y += pajamer.vy;


var message = new Text(
  "",
  {fontFamily: "Arial", fontSize: 20, fill: "red"}
);

message.position.set(54, 96);

// COLLISSION LOGIC 

var pajamerHit;

if(hitTestRectangle(pajamer, bed)) {
  pajamerHit = true;
}

// var sadTexture = Texture.fromFrame('sad_pajamer.png'); 
// var happyTexture = Texture.fromFrame('pajamer_sprite.png')

if (pajamerHit){

   // bed tints red when hit
  stage.addChild(message);
   // message.text = "You've been hit!"
    bed.tint = 0xCC3300;
    // pajamer.texture = Resources["assets/images/sad_pajamer.png"]
    pajamer.alpha = 0.85;
    pajamer.tint = 0xFF9999;

  } else {
    //if there's no collision, reset the message
    //text and the bed's color
    stage.removeChild(message);
    message.text = "";
    pajamer.tint = 0xffffff;
    pajamer.alpha = 1;
    bed.tint = 0xffffff;
  }
 }



// COLLISSION TEXT 
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


