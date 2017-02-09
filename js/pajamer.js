const PIXI = require('pixi.js');


class Pajamer {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
 
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
 
    animate(state) {
        this.x += 5;
 
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}


module.exports = Pajamer;