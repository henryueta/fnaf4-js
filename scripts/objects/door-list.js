import { Door } from "../classes/Door.js"

const door_list = [
    new Door({
            number:10,
            x:721,
            y:210,
            type:'center',
            width:175, 
            height: 340,
            place_location_number:10,
            animatronic_view_list:[{
                identifier:0,
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
    door_list
}