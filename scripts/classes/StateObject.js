import { Furniture } from "./Furniture.js";

class StateObject extends Furniture{

    constructor(config){
        super(config);
        this.current_animatronic_state = 0;
        this.animatronic_final_state = config.animatronic_final_state;
        this.state_change_timeout = null;
        this.state_timer_value = config.state_timer_value;
    }

    onChangeAnimatronicState(state,onAction){   
        this.current_animatronic_state = state;
        if(!!onAction){
            return onAction();
        }
        return
    }

}

export {
    StateObject
}