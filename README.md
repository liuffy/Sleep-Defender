## Sleep Defender

![game_banner](http://res.cloudinary.com/liuffy/image/upload/v1487533282/sleep_defender_banner_uoeqah.png) 

### Background

Sleep Defender, a bullet evasion/shooter game is a riff on the 1981 classic space shooter game [Defender](http://www.classicgamesarcade.com/game/21638/defender.html).

'Sleep Defender' aims to capture the essence and spirit of Defender while giving it a modern, humorous take. The player must defend their bed from waves of objects that might interrupt their sleep - alarm clocks, cans of energy drinks, cups of coffee. The player wins if they are able to clear the screen of these moving objects without being hit more than three times or having their bed "abducted". 


### Features and Implementation

Sleep Defender uses `Vanilla javascript` for structure and game logic, and `Pixi JS` and `HTML5 canvas` are used for DOM manipulation and rendering. All visible objects, from individual buttons to background images, are rendered as `PIXI.Sprite`objects. 

Different game scenes (such as the main menu, or the 'you've won!' page) are handled as distinct states of the program.

*Main screen*
![main_screen](http://res.cloudinary.com/liuffy/image/upload/c_scale,w_772/v1487534725/Screen_Shot_2017-02-19_at_12.04.55_PM_iwlkdw.png) 

*Instructions screen*
![instructions](http://res.cloudinary.com/liuffy/image/upload/c_scale,w_772/v1487534456/Screen_Shot_2017-02-19_at_12.00.04_PM_ahn72z.png) 


With this game, users will be able to:

- [ ] Start, pause, and reset the game.
- [ ] Move their character up, down, left, and right.
- [ ] Fire projectiles at enemy objects to destroy them.
- [ ] Hear sound effects for the firing of projectiles

In addition, this project will include:

- [ ] An Instructions modal describing the objective of and controls for the game
- [ ] The ability to play or mute background music. 


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

