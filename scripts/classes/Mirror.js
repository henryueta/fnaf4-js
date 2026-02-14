
class Mirror{

    constructor(config){

        this.mirror_room_context = config.mirror_room_context;
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.vision_image = config.vision_image;
        this.current_animatronic_state = 0;
        this.animatronic_final_state = 2;
        this.state_change_timeout = null;
        this.type = config.type;
        this.animatronic_identifier = config.animatronic_identifier;
        this.animatronic_view_list = config.animatronic_view_list;
        this.onRectClick = config.onRectClick;

    }

    onDraw(){
        this.mirror_room_context.fillStyle = 'red';
        this.mirror_room_context.fillRect(
        this.x,
        this.y,
        this.width,
        this.height
        );
    }
    
    onClick(client_x,client_y){
        if(!!this.onRectClick){
            if (
            client_x >= this.x &&
            client_x <= this.x + this.width &&
            client_y >= this.y &&
            client_y <= this.y + this.height
        ) {
                this.onRectClick(this.vision_image,this.type,'entrace');
          
          }
        }

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