import { Jumpscare } from "./Jumpscare.js";

class Game {

    constructor(config){
        this.player_room = config.player_room;
        this.x_moviment = config.x_moviment;
        this.toggle_bed_buttonn = config.toggle_bed_buttonn;
        this.animatronic_list = config.animatronic_list;
        this.jumpscare = null;
        this.place_list = config.place_list;
        this.current_night = config.current_night;
        this.night_event_interval = null;
    }

    onUpdatePlayerVision(){

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
            this.player_room.room_image.src = this.player_room.current_object_vision.actions.vision_image;
            this.player_room.onLoadImage();

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
        this.jumpscare.onStart();
        this.player_room.onChangeDarkAmbience('0%');
        this.toggle_bed_buttonn.style.display = 'none';

    }

    onActiveAnimatronic(animatronic){

        if(animatronic.isActive){
            console.log("animatronic ativo")
            if(animatronic.current_mode === 'mirror'){

                if(this.player_room.mirror.current_animatronic_state === this.player_room.mirror.animatronic_final_state){
                    this.onKillPlayer(animatronic);
                    return
                }

                if(
                    this.player_room.mirror.state_change_timeout === null 
                ){
                    console.log("lançando nova mudança de estado")
                    this.player_room.mirror.state_change_timeout = setTimeout(()=>{

                         if(this.player_room.mirror.current_animatronic_state < this.player_room.mirror.animatronic_final_state){
                            this.player_room.mirror.onChangeAnimatronicStateView(this.player_room.mirror.current_animatronic_state+=1);
                            this.onUpdatePlayerVision();
                            this.player_room.mirror.state_change_timeout = null;
                            console.log("fim da mudança de estado",this.player_room.mirror.current_animatronic_state)
                        }

                    },12000)
                    
                    return
                }

                return

            }


            if(!!animatronic.isMoving){

            if(animatronic.current_place === 11){
                this.onKillPlayer(animatronic);
                return
            }

            const prev_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === animatronic.current_place)

              if(!!prev_current_animatronic_place.hasSecurityRoomConnection)
               {

                    console.log("entrou aqui")

                    const current_animatronic_door = this.player_room.onFindAnimatronic(animatronic.identifier)
                    
                    console.log("current",current_animatronic_door)
                
                    if(current_animatronic_door === undefined || current_animatronic_door === null){
                         animatronic.current_place = 0;
                         animatronic.onResetVisitedPlaceList();
                         
                        return
                    }
               }

            
            //apenas o número do local
            
            const current_animatronic_place =  animatronic.onChoicePlace(this.place_list.find((place_item)=>place_item.number === animatronic.current_place).next_place_index_list);
            
            if(current_animatronic_place === 11){
                this.player_room.playerIsDeath = true;
                
                if(this.player_room.vision === 'external'){

                    this.toggle_bed_buttonn.onclick = ()=>console.log("VOCE ESTÁ MORTO")

                    return
                }

                return
            }

            const next_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === current_animatronic_place)

                if(next_current_animatronic_place.hasSecurityRoomConnection){

                    const current_player_room_door = [
                        this.player_room.front_door,
                        this.player_room.left_door,
                        this.player_room.right_door
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

            const place_for_noisy = next_current_animatronic_place.place_view_list.find((place_item)=>
                typeof place_item.noisy_animatronic === 'number' 
                &&
                place_item.noisy_animatronic === animatronic.identifier
            )
            
            // if(animatronic.current_mode === 'noisy'){

            //     if(!!place_for_noisy){
            //         animatronic.isMoving = !place_for_noisy;
            //         // next_current_animatronic_place.current_view = place_for_noisy.image;
            //         next_current_animatronic_place.current_audio = place_for_noisy.audio;
            //         next_current_animatronic_place.repeat_audio = place_for_noisy.repeat_audio;
                    
            //     }
            //     console.log("moving",place_for_noisy)
            // }

            // animatronic.onAction(next_current_animatronic_place);
            if(prev_current_animatronic_place.number !== next_current_animatronic_place.number){
                prev_current_animatronic_place.onRemoveAnimatronic(animatronic);
                prev_current_animatronic_place.onSetView(false);
                next_current_animatronic_place.onSetAnimatronic(animatronic);
                next_current_animatronic_place.onSetView(((place_for_noisy) && animatronic.current_mode === 'noisy'));

            }
            this.onUpdatePlayerVision();

            return
            }

            return
        }
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

        this.night_event_interval = setInterval(()=>{
            // for(const animatronic of this.animatronic_list){
            //     setTimeout(()=>{
            //         this.onActiveAnimatronic(animatronic);
            //     },animatronic.movement_delay)
            // }

            this.onActiveAnimatronic(this.animatronic_list[0]);
        },this.current_night.event_running_interval);

        this.x_moviment.onMove();

        // this.toggle_bed_buttonn.addEventListener('mousemove',()=>{
           
        // })
        this.toggle_bed_buttonn.addEventListener('click',()=>{

            if(this.player_room.vision === 'internal'){
                this.x_moviment.onEndMove();
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