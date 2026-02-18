import { Hideout } from "../classes/Hideout.js"

const hideout_list = [
    new Hideout({
        x:1000,
        y:170,
        type:'',
        width:220,
        height:450,
        animatronic_identifier:1,
        animatronic_view_list:[
            {
                state:0,
                image:"../vinheta.jpeg"
            },
            {
                state:1,
                image:"../teste5.jpeg"
            },
            {
                state:2,
                image:"../teste2.jpeg"
            }
        ],
        vision_image:"../vinheta.jpeg",
    })
]

export {
    hideout_list
}