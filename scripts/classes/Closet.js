import { StateObject } from "./StateObject.js";

class Closet extends StateObject{

    constructor(config){
        super(config);
        this.animatronic_audio_list = config.animatronic_audio_list;
        this.audio_heard = config.audio_heard;
    }

    onChangeAnimatronicStateAudio(state){
        super.onChangeAnimatronicState(state,()=>{
            this.audio_heard = this.animatronic_audio_list.find((animatronic_view)=>
                animatronic_view.state === state
            ).audio;
        })
    }
    
}

export {
    Closet
}