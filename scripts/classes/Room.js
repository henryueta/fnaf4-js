import { Door } from "./Door.js";
import { Hideout } from "./Hideout.js";
import { Mirror } from "./Mirror.js";
import { Window } from "./Window.js";

class Room {
    constructor(config) {
        this.room_canvas = config.room_canvas;
        this.room_context = this.room_canvas.getContext('2d');
        this.room_image = new Image();
        this.room_image.src = config.room_image;
        this.vision = "internal";
        this.isLockedAction = null;
        this.isLockedAction = false;
        this.current_object_vision = {
            type:null,
            actions:null
        }
        this.dark_screen = config.dark_screen;
        this.room_darkness = config.room_darkness;
        this.flashlight_number_clicks = 0;
        this.direction = null;
        this.onLockVision = config.onLockVision;
        this.closet = config.closet;
        this.closet.furniture_room_context = this.room_context;
        this.closet.onRectClick = (image,direction,type)=>this.onSwitchVision("closet",image,"external",type,direction);
        this.hideout = new Hideout({
            furniture_room_context:this.room_context,
            x:config.hideout.x,
            y:config.hideout.y,
            type:config.hideout.type,
            width:config.hideout.width,
            height:config.hideout.height,
            animatronic_identifier:config.hideout.animatronic_identifier,
            animatronic_view_list:config.hideout.animatronic_view_list,
            vision_image:config.hideout.animatronic_view_list.find((animatronic_view)=>animatronic_view.state === 0).image,
            onRectClick: (image,direction,type)=>{
                this.onSwitchVision("hideout",image,"external",type,direction);
            }
        })
        this.mirror = new Mirror({
            furniture_room_context:this.room_context,
            x:config.mirror.x,
            y:config.mirror.y,
            type:config.mirror.type,
            width:config.mirror.width,
            height:config.mirror.height,
            animatronic_identifier:config.mirror.animatronic_identifier,
            animatronic_view_list:config.mirror.animatronic_view_list,
            vision_image:config.mirror.animatronic_view_list.find((animatronic_view)=>animatronic_view.state === 0).image,
            final_animatronic_state:config.mirror.final_animatronic_state,
            state_timer_value:config.mirror.state_timer_value,
            waiting_process_value:config.mirror.waiting_process_value,
            player_waiting_value: config.mirror.player_waiting_value,
            onRectClick: (image,direction,type)=>{
                this.onSwitchVision("mirror",image,"external",type,direction);
            }
        })
        this.front_door = new Door({
            furniture_room_context:this.room_context,
            x:config.front_door.x,
            y:config.front_door.y,
            type:config.front_door.type,
            width: config.front_door.width, 
            height: config.front_door.height,
            place_location_number:config.front_door.place_location_number,
            animatronic_view_list:config.front_door.animatronic_view_list,
            vision_image:config.front_door.animatronic_view_list.find((animatronic_view)=>animatronic_view.identifier === null).image,
            onRectClick: (image,direction,type)=>{
                this.onSwitchVision("door",image,"external",type,direction);
            }
        });
        // this.right_door = new Door({
        //     door_room_context:this.room_context,
        //     x:config.right_door.x,
        //     y:config.right_door.y,
        //     type:config.right_door.type,
        //     width: config.right_door.width, 
        //     height: config.right_door.height,
        //     place_location_number:config.right_door.place_location_number,
        //     animatronic_view_list:config.right_door.animatronic_view_list,
        //     vision_image:config.right_door.animatronic_view_list.find((animatronic_view)=>animatronic_view.identifier === null).image,
        //     onRectClick: (image,direction,type)=>{
        //         this.onSwitchVision("door",image,"external",type,direction);
        //     }
        // });
        this.window = new Window({
            door_room_context:this.room_context,
            x:config.window.x,
            y:config.window.y,
            type:config.window.type,
            width: config.window.width, 
            height: config.window.height,
            place_location_number:config.window.place_location_number,
            animatronic_view_list:config.window.animatronic_view_list,
            vision_image:config.window.animatronic_view_list.find((animatronic_view)=>animatronic_view.identifier === null).image,
            onRectClick: (image,direction,type)=>{
                this.onSwitchVision("door",image,"external",type,direction);
            }
        });


        // this.clickableRect = { x: 1022, y: 440, width: 450, height: 650 };
        // this.onRectClick = config.onRectClick || null;

        this.room_canvas.addEventListener('click', (e) => this.handleClick(e));
        this.dark_screen.addEventListener('mousedown',()=> {
            this.onFlashLight();
        })
        this.dark_screen.addEventListener('mouseup',()=> {
           this.onChangeDarkAmbience('100%');
        })
        this.dark_screen.addEventListener('touchstart',()=> {
            this.onFlashLight();
        })
        this.dark_screen.addEventListener('touchend',()=> {
           this.onChangeDarkAmbience('100%');
        })
    }

    onFindAnimatronic(identifier){

        

        return (
            (
                this.front_door.current_animatronic !== null
                 ||
                 this.window.current_animatronic !== null
                //  ||
                //  this.right_door.current_animatronic !== null
            )
            ?
            [
                this.front_door,
                this.window,
                // this.right_door
                ].find((door_item)=>
                door_item.current_animatronic !== null
                &&
                door_item.current_animatronic.identifier === identifier
            )
            : null
            )
    }

    onChangeDarkAmbience(opacity){

        if(this.vision === 'external' && !this.isLockedAction){
            this.dark_screen.style.opacity = opacity;
            return
        }
        this.dark_screen.style.opacity = '0%';
    }

    onFlashLight(){

        if(this.isLockedAction){
            return
        }

        this.onChangeDarkAmbience('0%');
           if(this.vision === 'external'
            && 
            this.current_object_vision.type === 'door'
            && this.current_object_vision.actions.current_animatronic !== null
        ){
                this.flashlight_number_clicks+=1;
               if(this.flashlight_number_clicks === 10){
                this.current_object_vision.actions.onRemoveAnimatronicView();
                this.room_image.src = this.current_object_vision.actions.vision_image;
                this.onLoadImage();
                this.flashlight_number_clicks = 0;
               }
           }
    }

    onLoadImage(){
        this.room_image.onload = () => {
            const cw = this.room_canvas.width;
            const ch = this.room_canvas.height;
            const iw = this.room_image.width;
            const ih = this.room_image.height;
            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);
            this.room_context.drawImage(this.room_image, x, y, iw * scale, ih * scale);
             if(this.vision === 'internal'){
                // this.closet.onDraw();
                return
             }
        };
    }

    onDraw() {
       this.onLoadImage();
    }

    onReset(){
        const cw = this.room_canvas.width;
        const ch = this.room_canvas.height;
        const iw = this.room_image.width;
        const ih = this.room_image.height;
        const scale = Math.max(cw / iw, ch / ih);
        this.room_context.clearRect(0,0,iw * scale, ih * scale);
    }

    onSwitchImage(room_image,vision){
        this.vision = vision;
        this.onReset();
        this.room_image.src = room_image;
        this.onLoadImage();
        this.onLockVision(vision);  
    }

    onEntraceContainerVision(type,direction){
        this.room_canvas.classList.add('room-'+type+'-'+direction+'-vision');
        
    }

    onExitContainerVision(type,direction){
        this.room_canvas.classList.remove('room-'+type+'-'+direction+'-vision');
        
    }

    onSwitchVision(object_type,room_image,vision,type,direction){
        this.direction = direction;
        if(!!type || type !== null){
            if(type === 'exit'){

                setTimeout(()=>{
                    this.onSwitchImage(room_image,vision);
                    this.dark_screen.style.display = 'none'
                    this.onEntraceContainerVision(type,direction);
                    setTimeout(()=>{
                        this.onExitContainerVision(type,direction);
                    },200)
                },200)
                

                if(object_type === 'hideout'){
                    this.hideout.inUse = false;
                    console.log("sem uso: ",this.hideout.inUse);
                    return
                }

                if(object_type === 'closet'){
                    this.closet.onListen(false);
                    console.log("não escutando: ",this.closet.playerIsListening);
                    return
                }

                return 
            }
            this.onEntraceContainerVision(type,direction)
            setTimeout(()=>{
             this.onExitContainerVision(type,direction);
             this.onSwitchImage(room_image,vision);
             this.dark_screen.style.display =object_type === 'door' ? 'block' : "none"
            },200)

            
        }

        if(object_type === 'door'){

            const current_door_actions = [
                this.front_door,
                this.window,
                // this.right_door
            ].find((door)=>door.type === this.direction);

            // this.current_door_vision = current_door_actions;
            this.current_object_vision.type = 'door';
            this.current_object_vision.actions = current_door_actions;
            return
        }

        this.current_object_vision.type = object_type;
        this.current_object_vision.actions = (
            object_type === 'mirror'
            ? this.mirror
            : 
            object_type === 'closet'
            ? this.closet
            : 
            object_type === 'hideout'
            ? this.hideout
            :
            null
        );

        if(this.current_object_vision.actions === null){
            throw new Error("Ações de objeto de visão inválidas");
        }

        return
    }


    handleClick(event) {

        if(!this.isLockedAction){

            const rect = this.room_canvas.getBoundingClientRect();

            const scaleX = this.room_canvas.width / rect.width;
            const scaleY = this.room_canvas.height / rect.height;
            
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            if(this.vision === 'internal'){
                this.front_door.onClick(x,y);
                this.closet.onClick(x,y);
                this.window.onClick(x,y);
                this.mirror.onClick(x,y);
                return
            }
            return
        }
    }
}

export { Room };
