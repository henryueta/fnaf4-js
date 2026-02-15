
class Furniture {

    constructor(config){
        this.furniture_room_context = config.furniture_room_context;
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.vision_image = config.vision_image;
        this.type = config.type;
        this.animatronic_view_list = config.animatronic_view_list;
        this.animatronic_identifier = config.animatronic_identifier;
        this.onRectClick = config.onRectClick;

    }

    onDraw(){
        this.furniture_room_context.fillStyle = 'red';
        this.furniture_room_context.fillRect(
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
                if(this.onRectClick){
                    this.onRectClick(this.vision_image,this.type,'entrace');
                }
                return true;
          }
          return false;
        }
        return false;
    }

}

export {
    Furniture
}