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

            if(this.player_room.current_object_vision.type === 'closet'){
                this.player_room.current_object_vision.actions.onListenAudio();
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

    onChangeState(animatronic){

            if(
                animatronic.current_mode === 'mirror'
                ||
                animatronic.current_mode === 'closet'
            ){
                
                const current_state_object = (
                    animatronic.current_mode === 'mirror'
                    ? this.player_room.mirror
                    : 
                    animatronic.current_mode === 'closet'
                    ? this.player_room.closet
                    : null
                );

                if(current_state_object === null){
                    throw new Error("Objeto de mudança de estado inválido");
                }

                const state_object_field = (
                    animatronic.current_mode === 'mirror'
                    ? ['animatronicIsSearching']
                    : 
                    animatronic.current_mode === 'closet'
                    ? ['playerIsListening']
                    : null
                )

                if(
                    this.killer_animatronic === animatronic.identifier
                ){

                    const state_object_timeout_checkout = (
                        animatronic.current_mode === 'mirror'
                        ? !!(this.player_room.hideout.inUse 
                            && 
                            !current_state_object[state_object_field])
                        :
                        animatronic.current_mode === 'closet'
                        ? !!(!!current_state_object[state_object_field])
                        :
                        null     
                    );

                    if(state_object_timeout_checkout){

                        this.player_room.isLockedAction = true;
                        current_state_object[state_object_field] = (
                            animatronic.current_mode === 'mirror'
                            ? true
                            : current_state_object[state_object_field]
                        );
                        console.log("animatronic procurando");

                        current_state_object.player_waiting_timeout =setTimeout(()=>{    
                            console.log("fim da destruição do estado");

                            current_state_object[state_object_field] = (
                            animatronic.current_mode === 'mirror'
                            ? false
                            : current_state_object[state_object_field]
                            );

                            current_state_object.onChangeAnimatronicState(0);
                            this.killer_animatronic = null;
                            this.player_room.isLockedAction = false;
                        },current_state_object.player_waiting_value);
                        return
                        
                    }
                    
                    if(!current_state_object[state_object_field]){
                        this.player_room.isLockedAction = true;
                        console.log("morto por tipo:",animatronic.current_mode)
                        this.onKillPlayer(animatronic);
                        return
                    }

                    return
                }



                if(
                    current_state_object.state_change_timeout === null 
                ){
                    console.log("lançando nova mudança de estado")
                    current_state_object.state_change_timeout = setTimeout(()=>{
                        console.log("event",current_state_object.current_animatronic_state < current_state_object.animatronic_final_state)
                         if(current_state_object.current_animatronic_state < current_state_object.animatronic_final_state){

                            current_state_object.onChangeAnimatronicState(current_state_object.current_animatronic_state+=1);
                            this.onUpdatePlayerVision(animatronic);
                            current_state_object.state_change_timeout = null;
                            console.log("fim da mudança de estado",current_state_object.current_animatronic_state)
                            if(current_state_object.current_animatronic_state === current_state_object.animatronic_final_state){
                                this.killer_animatronic = animatronic.identifier;
                                return
                            }
                            return
                        }

                    },current_state_object.state_timer_value)
                    
                    return
                }
                return
            }
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
            console.log("animatronic ativo");
            this.onChangeState(animatronic);

            if(!!animatronic.isMoving){

            // if(animatronic.current_place === 11){
            // }

            const prev_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === animatronic.current_place)

              if(!!prev_current_animatronic_place.hasSecurityRoomConnection)
               {

                    console.log("entrou aqui");

                    const current_animatronic_door = this.player_room.onFindAnimatronic(animatronic.identifier);
                    
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

                    const current_player_room_entrace = [
                        this.player_room.front_door,
                        this.player_room.window,
                    ].find((entrace)=>
                        entrace.place_location_number === next_current_animatronic_place.number
                    );

                    console.log("Porta encontrada: ",current_player_room_entrace);
                    current_player_room_entrace.onSetAnimatronicView(animatronic.identifier);

                }

            if(animatronic.current_mode === 'hunter'){
                if(!!next_current_animatronic_place.hasMultipleConnections && !!prev_current_animatronic_place.hasMultipleConnections){
                    animatronic.visited_place_list.push(prev_current_animatronic_place.number);
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
            // this.onActiveAnimatronic(this.animatronic_list[1]);
            this.onActiveAnimatronic(this.animatronic_list[2]);
        },this.current_night.event_running_interval);
    }

    onStart(){

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
                //mudar aqui
                if(this.player_room.mirror.player_waiting_timeout !== null){
                    clearTimeout(this.player_room.mirror.player_waiting_timeout);
                    this.player_room.mirror.player_waiting_timeout = null;
                }

                this.onKillPlayer(this.animatronic_list[this.player_room.mirror.animatronic_identifier]);
                return
            }

            this.player_room.onSwitchVision((
                this.player_room.current_object_vision.type
            ),"../bedroom_1.jpeg","internal",'exit',this.player_room.direction);
            return
        })
    }

}

export {
    Game
}