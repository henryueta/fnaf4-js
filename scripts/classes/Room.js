
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

        this.hideout = config.hideout;
        this.hideout.furniture_room_context = this.room_context;
        this.hideout.onRectClick = (image,direction,type)=>this.onSwitchVision("hideout",image,"external",type,direction);
        
        this.mirror = config.mirror;
        this.mirror.furniture_room_context = this.room_context;
        this.mirror.onRectClick = (image,direction,type)=>this.onSwitchVision("mirror",image,"external",type,direction);

        this.right_hall = config.right_hall;

        this.front_door = config.front_door;
        this.front_door.furniture_room_context = this.room_context;
        this.front_door.onRectClick = (image,direction,type)=>this.onSwitchVision("door",image,"external",type,direction);

        this.window = config.window;
        this.window.furniture_room_context = this.room_context;
        this.window.onRectClick = (image,direction,type)=>this.onSwitchVision("door",image,"external",type,direction);

        this.onFlashlightCheckout = this.onFlashlightCheckout;

        this.room_canvas.addEventListener('click', (e) => this.handleClick(e));
        this.dark_screen.addEventListener('mousedown',()=> {
            this.onFlashlight();
        })
        this.dark_screen.addEventListener('mouseup',()=> {
           this.onChangeDarkAmbience('100%');
        })
        this.dark_screen.addEventListener('touchstart',()=> {
            this.onFlashlight();
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

    onFlashlight(){

        if(this.isLockedAction){
            return
        }
        console.log(this.right_hall.current_animatronic,this.right_hall.current_animatronic !== null)
        this.onChangeDarkAmbience('0%');
           if(this.vision === 'external'
            && 
            this.current_object_vision.type === 'door'
            && (
                this.current_object_vision.actions.current_animatronic !== null
                ||
                this.right_hall.current_animatronic !== null
            )
            ){
                this.onFlashlightCheckout();
                this.flashlight_number_clicks+=1;

                this.right_hall.onStopWalkAudio();

               if(this.flashlight_number_clicks === 10){
                    this.current_object_vision.actions.onRemoveAnimatronicView();
                    this.right_hall.current_animatronic = null;
                    this.front_door.atackIsCancelled = true;
                    this.room_image.src = this.current_object_vision.actions.vision_image;
                    this.onLoadImage();
                    this.flashlight_number_clicks = 0;
                    return
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
            object_type === 'door'
            ? this.front_door
            : null
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
