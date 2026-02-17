import { StateObject } from "./StateObject.js";

class Mirror extends StateObject{

    constructor(config){
        super(config);
    }

    onChangeAnimatronicState(state){
        super.onChangeAnimatronicState(state,()=>{
            this.vision_image = this.animatronic_view_list.find((animatronic_view)=>
                animatronic_view.state === state
            ).image;
        });
}

}

export {
    Mirror
}