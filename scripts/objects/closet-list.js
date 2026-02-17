import { Closet } from "../classes/Closet.js";

const closet_list = [
    new Closet({
        x:1000,
        y:170,
        width: 220, 
        height: 450,
        type:'right',
        vision_image:"../vinheta.jpeg",
        audio_heard:"",
        animatronic_identifier:2,
        animatronic_audio_list:[
            {
                state:0,
                audio:null
            },
            {
                state:1,
                audio:"../assets/audio/breathing.mp3"
            }
        ],
        animatronic_final_state:1,
        state_timer_value:10000,
        player_waiting_value:3000,
        waiting_process_value:5000
    })
] 

export {
    closet_list
}