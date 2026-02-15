import { Animatronic } from "./classes/Animatronic.js"
import { Movement } from "./classes/Movement.js"
import { Room } from "./classes/Room.js"
import { place_list } from "./objects/place-list.js"
import { animatronic_list } from "./objects/animatronic-list.js"
import { Game } from "./classes/Game.js"
import { night_list } from "./objects/night-list.js"
import { door_list } from "./objects/door-list.js"
import { mirror_list } from "./objects/mirror-list.js"
import { hideout_list } from "./objects/hideout-list.js"
import { bed_list } from "./objects/bed-list.js"

const game = new Game({
    player_room: new Room({
        room_canvas:document.querySelector("#room-canvas"),
        room_image:"../bedroom_1.jpeg",
        front_door:door_list[0],
        window:door_list[1],
        // right_door:door_list[2],
        mirror:mirror_list[0],
        hideout:hideout_list[0],
        bed:bed_list[0],
        dark_screen:document.querySelector(".dark-screen-container"),
        room_darkness:document.querySelector(".room-darkness-container")
    }),
    x_moviment: new Movement({
        right_container:document.querySelector(".move-right-container"),
        left_container:document.querySelector(".move-left-container")
    }),
    toggle_bed_buttonn:document.querySelector(".toggle-bed-button"),
    animatronic_list:animatronic_list,
    place_list:place_list,
    current_night:night_list.find((night_item)=>!night_item.isCompleted)
})

game.onStart();


const timeouts = [
    {
        timeout:2000,
        action:()=>{
            console.log(1)
        }
    },
    {
        timeout:5000,
        action:()=>{
            console.log(2)
        }
    }
];

