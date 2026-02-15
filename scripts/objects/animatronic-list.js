import { Animatronic } from "../classes/Animatronic.js";

const animatronic_list = [
    new Animatronic({
    current_place:7,
    identifier:0,
    isActive:true,
    isMoving:true,
    current_mode:'hunter',
    movement_delay:1500,
    action_list:[
    ],
    jumpscare_frame_list:[
        "../teste4.jpeg",
        "../teste3.jpeg",
        "../teste2.jpeg"
    ]    
    }),
    new Animatronic({
    current_place:null,
    identifier:1,
    isActive:true,
    isMoving:false,
    current_mode:'mirror',
    movement_delay:1500,
    action_list:[
    ],
    jumpscare_frame_list:[
        "../teste4.jpeg",
        "../teste3.jpeg",
        "../teste2.jpeg"
    ]    
    }),
    new Animatronic({
    current_place:null,
    identifier:2,
    isActive:true,
    isMoving:false,
    current_mode:'bed',
    movement_delay:1500,
    action_list:[
    ],
    jumpscare_frame_list:[
        "../teste4.jpeg",
        "../teste3.jpeg",
        "../teste2.jpeg"
    ]    
    })
]

export {
    animatronic_list
}