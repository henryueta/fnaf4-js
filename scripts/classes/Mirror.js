import { Furniture } from "./Furniture.js";

class Mirror extends Furniture{

    constructor(config){
        super(config);
        this.current_animatronic_state = 0;
        this.animatronic_final_state = 2;
        this.state_change_timeout = null;
        this.state_timer_value = 4500;
        this.animatronicIsSearching = false;
    }

    onChangeAnimatronicStateView(state){
        this.current_animatronic_state = state;
        this.vision_image = this.animatronic_view_list.find((animatronic_view)=>
            animatronic_view.state === state
        ).image;
    }

}

export {
    Mirror
}