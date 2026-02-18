import { Mirror } from "../classes/Mirror.js"

const mirror_list = [
    new Mirror({
        x:380,
        y:250,
        width:130,
        height:160,
        type:"left",
        animatronic_identifier:1,
        animatronic_view_list:[
            {
                state:0,
                image:"../teste4.jpeg"
            },
            {
                state:1,
                image:"../teste5.jpeg"
            },
            {
                state:2,
                image:"../testeHall.jpeg"
            }
        ],
        vision_image:"../teste4.jpeg",
        final_animatronic_state:2,
        state_timer_value:5000,
        player_waiting_value:5000,
        waiting_process_value:5000
    })
]

export {
    mirror_list
}