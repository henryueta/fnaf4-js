import { Furniture } from "./Furniture.js";

class Hideout extends Furniture{

    constructor(config){
        super(config);
        this.inUse = false;
    }

    onClick(x,y){
        if(super.onClick(x,y)){
             this.inUse = true;
            console.log("em uso: ",this.inUse)
        }
    }

}

export {
    Hideout
}