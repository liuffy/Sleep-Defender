## Sleep Defender :sleeping: :space_invader:

### Background

Sleep Defender is a riff on the 1981 classic space shooter game [Defender](http://www.classicgamesarcade.com/game/21638/defender.html). Drawing inspiration from the classics Space Invaders and Asteroids, Defender is 2D sidescrolling game set in which the player's objective is twofold: 

1. Defeat waves of invading aliens
2. Protect astronauts on the landscape from being abducted by said aliens

Eventually, the player wins the game by surviving the waves of aliens.

'Sleep Defender' aims to capture the essence and spirit of this game while giving it a modern take. The player is a pajama - clad person who must defend their bed from waves of objects that might interrupt their sleep - alarm clocks, cans of energy drinks, cups of coffee. The player wins if they are able to clear the screen of these moving objects without being hit more than three times or having their bed "abducted". 


### Functionality & MVP  

With this game, users will be able to:

- [ ] Start, pause, and reset the game.
- [ ] Move their character up, down, left, and right.
- [ ] Fire projectiles at enemy objects to destroy them.
- [ ] Hear sound effects for:
1. The firing of projectiles
2. Being hit by an enemy object and hitting an enemy object

In addition, this project will include:

- [ ] An About modal describing the objective of and controls for the game
- [ ] The ability to play or mute background music. 

### Wireframes

This app will have a single screen with the game board, game statistics (lives remaining and percentage of enemy objects eliminated), game controls, and links to my pages (Github, Linkedin, Portfolio site). 

There will also be a '?' button that will allow the player to re-read the directions if they need to.

The original 'Defender':
![original_game](http://res.cloudinary.com/liuffy/image/upload/v1486409862/original_defender_fhy1pa.gif)

Wireframe for 'Sleep Defender'; 
![wireframe](http://res.cloudinary.com/liuffy/image/upload/v1486421433/sleep_defender_wireframe_yf94w6.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `Pixi.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.



### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid, ideally all 3 grid types.  Build in the ability to toggle the live/dead states on click for each cell.  Goals for the day:

- Complete the `cell.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`
- Make each cell in the grid clickable, toggling the state of the square on click
- Do the same for triangular and hexagonal grids

**Day 3**: Create the automata logic backend.  Build out modular functions for handling the different grid types along with their unique neighbor checks and rule sets.  Incorporate the automata logic into the `Board.js` rendering.  Goals for the day:

- Export an `Automata` object with correct type and handling logic
- Have a functional grid on the `Canvas` frontend that correctly handles iterations from one generation of the game to the next


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add options for different rule sets
- [ ] Add multiple choices for starting states that are interesting
- [ ] Explore multi-state versions of the game, such as the ones outlined [here](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html)