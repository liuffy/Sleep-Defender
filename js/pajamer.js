import * as PIXI from 'pixi.js';

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Stage = PIXI.Stage;


var renderer = autoDetectRenderer(256, 256);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new Stage();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);
