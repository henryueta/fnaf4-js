import { Furniture } from "./Furniture.js";

class StateObject extends Furniture{

    constructor(config){
        super(config);
        this.current_animatronic_state = 0;
        this.animatronic_final_state = config.animatronic_final_state;
        this.animatronicIsSearching = false;
        this.waiting_process_timeout = null;
        this.waiting_process_value = config.waiting_process_value;
        this.state_change_timeout = null;
        this.state_timer_value = config.state_timer_value;
        this.player_waiting_timeout = null;
        this.player_waiting_value = config.player_waiting_value; 
    }

    clearTimeoutEvents(){
        // clearTimeout(this.state_change_timeout);
        // this.state_change_timeout = null;
        clearTimeout(this.player_waiting_timeout);
        this.player_waiting_timeout = null;
        clearTimeout(this.waiting_process_timeout);
        this.waiting_process_timeout = null;
    }

    onChangeAnimatronicState(state,onAction){   


        if(state > this.animatronic_final_state){
            return
        }

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