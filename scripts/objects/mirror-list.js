
const mirror_list = [
    {
        x:380,
        y:250,
        width: 130, 
        height: 160,
        type:'left',
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
        animatronic_final_state:2,
        state_timer_value:5000,
        player_waiting_value:5000
    }
]

export {
    mirror_list
}