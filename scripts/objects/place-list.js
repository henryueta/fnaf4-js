import { Place } from "../classes/Place.js"
import { animatronic_list } from "./animatronic-list.js"

const place_list = [
        new Place({
        number:5,
        hasMultipleConnections:true,
        isForFlashlight:false,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../bedroom_1.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            }
        ],
        name:"test2_room",
        next_place_index_list:[6],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 0)
        }),
       new Place({
        number:6,
        hasMultipleConnections:true,
        isForFlashlight:false,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../bedroom_1.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
            {//alterar depois
                animatronic_list:[1],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/two.jpg"
            },
            {//alterar depois
                animatronic_list:[0,1],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/three.png"
            }
        ],
        name:"test2_room",
        next_place_index_list:[7],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 0)
    }),
    new Place({
        number:7,
        hasMultipleConnections:true,
        isForFlashlight:true,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../bedroom_1.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            }
        ],
        name:"test2_room",
        next_place_index_list:[10],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 0)
    }),
    new Place({
        number:10,
        hasMultipleConnections:true,
        isForFlashlight:false,
        hasSecurityRoomConnection:true,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../bedroom_1.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            }
        ],
        name:"test2_room",
        next_place_index_list:[11],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 0)
    }),
        new Place({
        number:9,
        hasMultipleConnections:true,
        isForFlashlight:false,
        hasSecurityRoomConnection:true,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../bedroom_1.jpeg"
            },
            {//alterar depois
                animatronic_list:[3],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            }
        ],
        name:"test2_room",
        next_place_index_list:[11],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 0)
    })

]

export {
    place_list
}