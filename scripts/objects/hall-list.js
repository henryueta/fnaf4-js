import { Hall } from "../classes/Hall.js";

const hall_list = [
    new Hall({
        number:7,
        animatronic_view_image:"../teste_limite_2.jpeg",
        audio:"../assets/audio/walking_in_right_hall.mp3",
        pan_value:1,
        waiting_player_value:3000,
    }),
    new Hall({
        number:4,
        animatronic_view_image:"../teste_limite_2.jpeg",
        audio:"../assets/audio/walking_in_left_hall.mp3",
        pan_value:-1,
        waiting_player_value:3000,
    })
]


export {
    hall_list
}