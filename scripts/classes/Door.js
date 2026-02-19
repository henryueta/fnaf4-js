import { Furniture } from "./Furniture.js";

class Door extends Furniture{  

    constructor(config){
        super(config);
        this.number = config.number;
        this.place_location_number = config.place_location_number;
        this.current_animatronic = null;
        this.atackIsCancelled = null;
    }
    
    onFindAnimatronicView(identifier){
        return this.animatronic_view_list.find((animatronic_view)=>
            animatronic_view.identifier === identifier
        )
    }

    onRemoveAnimatronicView(){
        this.current_animatronic = null;
        this.vision_image = this.animatronic_view_list.find((animatronic_view)=>
            animatronic_view.identifier === null
        ).image
    }

    onSetAnimatronicView(identifier){

        this.current_animatronic = this.onFindAnimatronicView(identifier);
        this.vision_image = this.current_animatronic.image

    }   

}

export {
    Door
}