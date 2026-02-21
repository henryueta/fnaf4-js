import { Window } from "../classes/Window.js"

const window_list = [
    new Window({
            x:0,
            y:100,
            type:'left',
            width:180, 
            height: 340,
            place_location_number:9,
            animatronic_view_list:[{
                identifier:3,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste4.jpeg",
                },
                {
                identifier:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../vinheta.jpeg",
            }],
            vision_image:"../vinheta.jpeg",
    })
]

export {
    window_list
}