import { Bed } from "../classes/Bed.js";

const bed_list = [
    new Bed({
        type:'bottom',
        vision_image:"../teste4.jpeg",
        audio_heard:"",
        animatronic_identifier:2,
        animatronic_audio_list:[
            {
                state:0,
                audio:""
            },
            {
                state:1,
                audio:""
            }
        ],
        animatronic_final_state:1,
        state_timer_value:3000
    })
] 

export {
    bed_list
}