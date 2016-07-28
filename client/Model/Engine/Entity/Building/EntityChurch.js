const Entity = require('../Entity.js');

class EntityChurch extends Entity {

    constructor(x, z, a) {
        super(x, z, a);
        this.space = 4;
    }

}

EntityChurch.tile_x = 2;
EntityChurch.tile_z = 1;
EntityChurch.walkable = false;
module.exports = EntityChurch;