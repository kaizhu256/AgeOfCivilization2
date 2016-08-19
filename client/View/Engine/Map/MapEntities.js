const ENTITIES = require('../Entity/list');

module.exports = Map=> {

    Map.prototype.updateStateEntities = function updateStateEntities(model, id) {

        const entityId = model.lastEntityGroupUpdated||id;
        const entityIndex = model.lastEntityUpdated;

        const groupView = this.entityGroups[entityId];
        const groupModel = model.entityGroups[entityId];

        let lengthModel = groupModel.length;
        for(let i = 0; i < lengthModel; i++) {

            let entityView = groupView[i];
            let entityModel = groupModel[i];

            if(!entityView) {
                let newEntityView = new ENTITIES[entityId](entityModel);
                groupView[i] = newEntityView;
                if(newEntityView.update){
                    this.entityDynamicList.push(newEntityView);
                }
                if(entityModel.x !== undefined && entityModel.z !== undefined){
                    let chunkX = Math.floor(entityModel.x / this.tileByChunk);
                    let chunkZ = Math.floor(entityModel.z / this.tileByChunk);
                    this.chunks[chunkX][chunkZ].add(newEntityView.element);
                }else{
                    this.element.add(newEntityView.element);
                }
            } else if(entityView.model !== entityModel) {
                groupView.splice(i, 1);
                entityView.element.parent.remove(entityView.element);
                if(entityView.update){
                    let k = this.entityDynamicList.indexOf(entityView);
                    this.entityDynamicList.splice(k, 1);
                }
                i--;
            }
        }

        let lengthView = groupView.length;
        if(lengthView > lengthModel) {
            for(let i = lengthModel; i < lengthView; i++) {
                let entityView = groupView[i];
                entityView.element.parent.remove(entityView.element);
                if(entityView.update){
                    let k = this.entityDynamicList.indexOf(entityView);
                    this.entityDynamicList.splice(k, 1);
                }
            }
            groupView.splice(lengthModel, lengthView);
        }

        if(model.lastEntityUpdated !== null){
            groupView[entityIndex].updateState();
            model.lastEntityUpdated = null;
        }

    };

    Map.prototype.updateDynamicEntities = function updateDynamicEntities(dt){
        const l = this.entityDynamicList.length;
        for(let i = 0; i < l ; i++) {
            this.entityDynamicList[l].update(dt);
        }
    }

};
