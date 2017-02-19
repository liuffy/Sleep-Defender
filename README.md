## Sleep Defender

![game_banner](http://res.cloudinary.com/liuffy/image/upload/v1487533282/sleep_defender_banner_uoeqah.png) 

### Background

Sleep Defender, a bullet evasion/shooter game, is a riff on the 1981 classic space shooter game [Defender](http://www.classicgamesarcade.com/game/21638/defender.html).

'Sleep Defender' aims to capture the essence and spirit of Defender while giving it a modern, humorous take. The player must defend their bed from waves of objects that might interrupt their sleep - alarm clocks, cans of energy drinks, cups of coffee. The player wins if they are able to clear the screen of these moving objects without being hit more than three times or having their bed "abducted". 


### Features and Implementation

Sleep Defender uses `Vanilla javascript` for structure and game logic, and `Pixi JS` with (`HTML5 canvas` as fallback) for DOM manipulation and rendering. Sound effects are loaded and managed with `Howler.js`, an audio javascript library.  

The game is managed by a main game loop, and different game scenes (i.e. main menu, pausing, end scenes) are handled as distinct states of the program.

![main_screen](http://res.cloudinary.com/liuffy/image/upload/c_scale,w_772/v1487534725/Screen_Shot_2017-02-19_at_12.04.55_PM_iwlkdw.png) 
![game_play_in_actions](http://res.cloudinary.com/liuffy/image/upload/c_scale,w_772/v1487535480/sleep_defender_gif_tdx8lm.gif) 

There are many features that were added to enhance the user's experience. First, the player has the ability to start and pause the game at any point during a game. When they complete or fail a level, they have both the option of restarting the level, continuing on to the next level, or exiting to the main screen. Thus, there is no need for the player to manually reload the page, or to worry about losing their in-game progress. 

The addition of the main screen provides instructions and information about controls for first-time players. A modal version of the controls screen can be accessed during gameplay through a button. There is also a button that allows the user to mute and un-mute the volume at any point (pressing the mute button once mutes all sounds globally, even if the user exits the game).

Minimalistic sound effects (all sourced from [freesound.org](http://freesound.org/) were added to enhance the user's navigation. For example, there is a specific sound that plays whenenver the user presses the "play" (from the main screen), "retry" (after failing a level), or "continue" (after winning a level).

During gameplay, the user's HP is displayed in the upper right hand corner, and flashes whenever the user's HP decreases. Finally, the player can move the character using the arrow keys or the WASD keys. 

#### Important Algorithms

One of the key features of the gameplay is the ability of certain enemies to hover towards the player if they fall within a specific distance to the player. This is simply achieved by pushing close-by enemies (calculated using the Pythagorean Theorem) into a `chasers` array. Enemies in the `chasers` array will move towards the player through calculating of unit vectors. 

```javascript

    var run = enemy.x - pajamer.x;
    var rise = enemy.y - pajamer.y;
    var distance = Math.sqrt( (Math.pow( run, 2)) + (Math.pow( rise, 2)) )
    var unitX = run / distance;
    var unitY = rise / distance; 

    var chasers = [];
    enemies.forEach(function(enemy) {

      if ((distance < 200 && enemy !== specificEnemy && (stage.children.indexOf(enemy))% 2 === 0  ))  {
        chasers.push(enemy)

      } else {
        enemy.y += enemy.vy;
        enemy.x += enemy.vx;
      }

    chasers.forEach(function(chaser){
    if (distance > 200 || chaser.y > 400){
      chasers.splice(chasers.indexOf(chaser), 1)
    } else {
      chaser.x -= unitX * 1.1;
      chaser.y -= unitY * 1.1;
    }
})

```

### Future Features

There are many ways I could enhance the game in the future. 
* Most notably, the game is currently halfway mobile compatible - the buttons on the main menu can be tapped, but the user cannot move the character with swipes yet (another solution could be to add a keypad on the screen for the user to press). 
* Another possible addition is a loading screen. Currently, the loading percentage is printed to the console;  this information could be easily visualized with a loader bar. 
* While the game currently tracks the level number, it does not yet track the player's score, which could easily added as a global variable that is reset when the player exits the game. 
* Finally, the inspiration for the game is a sidescrolling game, so adding sidescrolling would help Sleep Defender truly imitate its predecessor. 

