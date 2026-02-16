import { Jumpscare } from "./Jumpscare.js";

class Game {

    constructor(config){
        this.player_room = config.player_room;
        this.x_moviment = config.x_moviment;
        this.toggle_bed_buttonn = config.toggle_bed_buttonn;
        this.animatronic_list = config.animatronic_list;
        this.killer_animatronic = null;
        this.jumpscare = null;
        this.place_list = config.place_list;
        this.current_night = config.current_night;
        this.night_event_interval = null;
    }

    onUpdatePlayerVision(animatronic){

            if(animatronic === undefined || animatronic === null){
                return
            }

            if(this.player_room.vision !== 'external'){
                return
            }

            if(this.player_room.current_object_vision.actions === null){
                return
            }

            if(
                !!(this.player_room.current_object_vision.type === 'door'
                    ||
                    this.player_room.current_object_vision.type === 'window'
                )
            ){

                if(this.player_room.current_object_vision.actions.place_location_number === animatronic.current_place
                ){
                    this.player_room.current_object_vision.actions.onSetAnimatronicView(animatronic.identifier);
                    this.player_room.room_image.src = this.player_room.current_object_vision.actions.vision_image;
                    this.player_room.onLoadImage();
                    this.player_room.flashlight_number_clicks = 0;
                }
                return
            }
            console.log(this.player_room.current_object_vision.actions.vision_image)
            this.player_room.room_image.src = this.player_room.current_object_vision.actions.vision_image;
            this.player_room.onLoadImage();
            console.log("loaded")
            return

    }

    onKillPlayer(animatronic){

        animatronic.isMoving = false;
        animatronic.inJumpscareProcess = true;
        if(this.night_event_interval !== null){
            clearInterval(this.night_event_interval);
        }
        this.jumpscare = new Jumpscare({
            jumpscare_room_context:this.player_room.room_context,
            canvas_height:this.player_room.room_canvas.height,
            canvas_width:this.player_room.room_canvas.width,
            animatronic_identifier:animatronic.identifier,
            unloaded_frame_list:animatronic.jumpscare_frame_list,
            scream_audio:animatronic.jumpscare_scream_audio
        })
        this.x_moviment.setIsLocked(true,true);
        this.jumpscare.onStart();
        this.player_room.onChangeDarkAmbience('0%');
        this.toggle_bed_buttonn.style.display = 'none';
        console.log("killed by",animatronic.identifier);

    }

    onActiveAnimatronic(animatronic){
        if(
            this.killer_animatronic !== null
            &&
            this.killer_animatronic !== animatronic.identifier
        ){
            
            console.log(animatronic.current_mode,"not action");
            if(this.player_room.mirror.state_change_timeout !== null){
                clearTimeout(this.player_room.mirror.state_change_timeout);
                this.player_room.mirror.state_change_timeout = null;
            }
            return
        }

        if(animatronic.isActive){
            console.log("animatronic ativo")
            if(animatronic.current_mode === 'mirror'){
                
                if(
                    this.killer_animatronic === animatronic.identifier
                ){
                    if(this.player_room.hideout.inUse && !this.player_room.mirror.animatronicIsSearching){
                        this.player_room.isLockedAction = true;
                        this.player_room.mirror.animatronicIsSearching = true;
                        console.log("animatronic procurando");
                        setTimeout(()=>{    
                            console.log("fim da procura");
                            this.player_room.mirror.animatronicIsSearching = false;
                            this.player_room.mirror.onChangeAnimatronicStateView(0);
                            this.killer_animatronic = null;
                            this.player_room.isLockedAction = false;
                        },5000);
                        return
                    }
                    
                    if(!this.player_room.mirror.animatronicIsSearching){
                        this.onKillPlayer(animatronic);
                        return
                    }

                    return
                }

                if(
                    this.player_room.mirror.state_change_timeout === null 
                ){
                    console.log("lançando nova mudança de estado")
                    this.player_room.mirror.state_change_timeout = setTimeout(()=>{

                         if(this.player_room.mirror.current_animatronic_state < this.player_room.mirror.animatronic_final_state){

                            this.player_room.mirror.onChangeAnimatronicStateView(this.player_room.mirror.current_animatronic_state+=1);
                            this.onUpdatePlayerVision(animatronic);
                            this.player_room.mirror.state_change_timeout = null;
                            console.log("fim da mudança de estado",this.player_room.mirror.current_animatronic_state)
                            if(this.player_room.mirror.current_animatronic_state === this.player_room.mirror.animatronic_final_state){
                                this.killer_animatronic = animatronic.identifier;
                                console.log("se esconda")
                            }

                        }

                    },this.player_room.mirror.state_timer_value)
                    
                    return
                }

                return

            }

            if(!!animatronic.isMoving){

            // if(animatronic.current_place === 11){
            // }

            const prev_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === animatronic.current_place)

              if(!!prev_current_animatronic_place.hasSecurityRoomConnection)
               {

                    console.log("entrou aqui")

                    const current_animatronic_door = this.player_room.onFindAnimatronic(animatronic.identifier)
                    
                    console.log("current",current_animatronic_door)
                
                    if(current_animatronic_door === undefined || current_animatronic_door === null){
                         animatronic.current_place = 7;
                         animatronic.onResetVisitedPlaceList();
                         
                        return
                    }
               }

            
            //apenas o número do local
            
            const current_animatronic_place =  animatronic.onChoicePlace(this.place_list.find((place_item)=>place_item.number === animatronic.current_place).next_place_index_list);
            
            if(current_animatronic_place === 11){
                this.player_room.isLockedAction = true;
                  this.killer_animatronic = animatronic.identifier;
                    this.toggle_bed_buttonn.onclick = ()=>{}
                this.onKillPlayer(animatronic);
                
                // if(this.player_room.vision === 'external'){


                //     return
                // }
                return

            }

            const next_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === current_animatronic_place)

                if(next_current_animatronic_place.hasSecurityRoomConnection){

                    const current_player_room_door = [
                        this.player_room.front_door,
                        this.player_room.window,
                        // this.player_room.right_door
                    ].find((door)=>
                        door.place_location_number === next_current_animatronic_place.number
                    )

                    console.log("Porta encontrada: ",current_player_room_door)
                    current_player_room_door.onSetAnimatronicView(animatronic.identifier)

                }

            if(animatronic.current_mode === 'hunter'){
                if(!!next_current_animatronic_place.hasMultipleConnections && !!prev_current_animatronic_place.hasMultipleConnections){
                    
                    animatronic.visited_place_list.push(prev_current_animatronic_place.number)
                }
            }
            
            if(prev_current_animatronic_place.number !== next_current_animatronic_place.number){
                prev_current_animatronic_place.onRemoveAnimatronic(animatronic);
                next_current_animatronic_place.onSetAnimatronic(animatronic);

            }
            this.onUpdatePlayerVision(animatronic);

            return
            }

            return
        }
    }
    
    onStartNightEvent(){
        this.night_event_interval = setInterval(()=>{
            // this.onActiveAnimatronic(this.animatronic_list[0]);
            this.onActiveAnimatronic(this.animatronic_list[1]);
        },this.current_night.event_running_interval);
    }

    onStart(){
        // 4 - 10 - 11
        //
        this.player_room.onDraw();
        this.player_room.onLockVision = (vision)=>{
            this.x_moviment.setIsLocked(!!(
                vision === 'external'
            ),true)
        }

        this.onStartNightEvent();   
        this.x_moviment.onMove();

        // this.toggle_bed_buttonn.addEventListener('mousemove',()=>{
           
        // })
        this.toggle_bed_buttonn.addEventListener('click',()=>{

            if(this.player_room.vision === 'internal'){
                this.x_moviment.onEndMove();
                this.player_room.direction = this.player_room.hideout.type;
                this.player_room.onSwitchVision((
                    "hideout"
                ),this.player_room.hideout.vision_image,"external",'entrace',this.player_room.direction)
                this.player_room.hideout.onClick();
                return
            }

            if(!!this.player_room.mirror.animatronicIsSearching){
                this.onKillPlayer(this.animatronic_list[this.player_room.mirror.animatronic_identifier])
                return
            }

            this.player_room.onSwitchVision((
                this.player_room.current_object_vision.type
            ),"../bedroom_1.jpeg","internal",'exit',this.player_room.direction)
            return
        })
    }

}

export {
    Game
}