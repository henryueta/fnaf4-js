import { Door } from "../classes/Door.js"
import { Hall } from "../classes/Hall.js"
import { Window } from "../classes/Window.js"

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
            hall_conection:new Hall({
                number:7,
                animatronic_view_image:"../teste_limite_2.jpeg"
            })
    }),
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
    door_list
}