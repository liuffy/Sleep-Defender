## Sleep Defender

![game_banner](http://res.cloudinary.com/liuffy/image/upload/v1487533282/sleep_defender_banner_uoeqah.png) 

### Background

Sleep Defender is a riff on the 1981 classic space shooter game [Defender](http://www.classicgamesarcade.com/game/21638/defender.html).

'Sleep Defender' aims to capture the essence and spirit of Defender while giving it a modern, humorous take. The player must defend their bed from waves of objects that might interrupt their sleep - alarm clocks, cans of energy drinks, cups of coffee. The player wins if they are able to clear the screen of these moving objects without being hit more than three times or having their bed "abducted". 


### Features and Implementation

![gameplay](http://res.cloudinary.com/liuffy/image/upload/v1487305060/preview_shot_j5s2od.png) 


With this game, users will be able to:

- [ ] Start, pause, and reset the game.
- [ ] Move their character up, down, left, and right.
- [ ] Fire projectiles at enemy objects to destroy them.
- [ ] Hear sound effects for the firing of projectiles

In addition, this project will include:

- [ ] An Instructions modal describing the objective of and controls for the game
- [ ] The ability to play or mute background music. 

### Wireframes

This app will have a single screen with the game board, game statistics (lives remaining and percentage of enemy objects eliminated), game controls, and links to my pages (Github, Linkedin, Portfolio site). 

There will also be a '?' button that will allow the player to re-read the directions if they need to.

The player's object will start at the bottom of the screen. They'll be able to move left, right up, up, and down (it's not really explained why they float, but hey, this is a game where you fight cans of energy drinks!). Enemy objects will move towards the player (calculated based on which quadrant the player's sprite is located in)

A quick comparison:  

![original_game](http://res.cloudinary.com/liuffy/image/upload/v1486409862/original_defender_fhy1pa.gif)  
*The original 'Defender'*

![wireframe](http://res.cloudinary.com/liuffy/image/upload/v1486422363/s_d_wireframe_yyc2ye.png)
*Wireframe for 'Sleep Defender'*


### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `Pixi.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.



### Future Features

There are many expansion opportunities for the game, such as:

- [ ] SIDE SCROLLING! Truly imitating its predecessor. 
- [ ] Keeping track of points. 
- [ ] Different enemies have different characteristics (type of movement, speed, sound effects)
- [X] Different levels 

