
class Hall{

    constructor(config){
        this.number = config.number;
        this.current_animatronic = null;
        this.animatronic_view_image = config.animatronic_view_image;
        this.isWaitingPlayer = false;
        this.waiting_player_timeout = null;
        this.waiting_player_value = config.waiting_player_value;
    }


}

export {
    Hall
}