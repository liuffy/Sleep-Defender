
const Keyboard = {
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


  //KEYBOARD COMMANDS
  var left = keyboard(37),
      leftA = keyboard(65),
      up = keyboard(38),
      upW = keyboard(87),
      right = keyboard(39),
      rightD = keyboard(68),
      down = keyboard(40),
      downS = keyboard(83),
      pause = keyboard(80),
      fire = keyboard(32),
      restart = keyboard(82)

  //Left arrow key `press` method


    function helpModalShow(){
      if (stage.children.indexOf(controlsModal) === -1){
        state = controlsPaused
        // stage.addChild(controlsModal)
      } else 
        // stage.removeChild(controlsModal)
                pauseGame()
    }

  fire.release = function(){
 zZz.position.set(pajamer.x + 25, pajamer.y)
  stage.addChild(zZz);

    if (muteButton.texture === onTexture && state !== end1 && state !== end2 && state !== win1){
      fireSound.play();
    }
  }


  pause.release = function(){
    pauseGame();
  }

  left.press = function() {
    pajamer.vx = -5;
    pajamer.vy = 0;
  };  

  leftA.press = function() {
    pajamer.vx = -5;
    pajamer.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function() {
    if (!right.isDown && pajamer.vy === 0) {
      pajamer.vx = 0;
    }
  }

  // For ASDF controls 
  leftA.release = function() {
    if (!right.isDown && pajamer.vy === 0) {
      pajamer.vx = 0;
    }
  }

  //Up
  up.press = function() {
    pajamer.vy = -5;
    pajamer.vx = 0;
  };

  upW.press = function() {
    pajamer.vy = -5;
    pajamer.vx = 0;
  };

  up.release = function() {
    if (!down.isDown && pajamer.vx === 0) {
      pajamer.vy = 0;
    }
  };

  upW.release = function() {
    if (!down.isDown && pajamer.vx === 0) {
      pajamer.vy = 0;
    }
  };

//Right
  right.press = function() {
    pajamer.vx = 5;
    pajamer.vy = 0;
  };

rightD.press = function() {
  pajamer.vx = 5;
  pajamer.vy = 0;
};

right.release = function() {
    if (!left.isDown && pajamer.vy === 0) {
      pajamer.vx = 0;
    }
  };

rightD.release = function() {
    if (!left.isDown && pajamer.vy === 0) {
      pajamer.vx = 0;
    }
  };

  //Down
  down.press = function() {
    pajamer.vy = 5;
    pajamer.vx = 0;
  };

  downS.press = function() {
    pajamer.vy = 5;
    pajamer.vx = 0;
  };

 down.release = function() {
    if (!up.isDown && pajamer.vx === 0) {
      pajamer.vy = 0;
    }
  } 

  downS.release = function() {
    if (!up.isDown && pajamer.vx === 0) {
      pajamer.vy = 0;
    }
  }
}

module.exports = Keyboard;
