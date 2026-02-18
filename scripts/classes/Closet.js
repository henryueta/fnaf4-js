import { StateObject } from "./StateObject.js";

class Closet extends StateObject{

    constructor(config){
        super(config);
        this.animatronic_audio_list = config.animatronic_audio_list;
        this.audio_heard = new Audio();
        this.audio_heard.loop = true;
        this.audio_heard.src = config.animatronic_audio_list[1].audio;
        this.playerIsListening = false;
    }

    onClick(x,y){
        if(super.onClick(x,y)){
            console.log("Em processo de espera: ",this.waiting_process_timeout !== null)
            this.onListen(this.waiting_process_timeout !== null);
             this.onListenAudio();
            console.log("escutando: ",this.playerIsListening)
            return
        }
    }

    onListenAudio(){
        // if(this.current_animatronic_state !== this.final_animatronic_state){
        //     console.log(null)
        //     return
        // }
        if(!!this.playerIsListening && this.current_animatronic_state === 0){
            this.audio_heard.currentTime = 0;
            this.audio_heard.pause();
            return
        }

        if(!this.playerIsListening){
            this.audio_heard.currentTime = 0;
            this.audio_heard.pause();
            return
        }
        console.log(this.audio_heard)   
        this.audio_heard.play();
        return
    }

    onListen(isListen){
        this.playerIsListening = isListen;
        this.onListenAudio();
    }

    onChangeAnimatronicState(state){

        super.onChangeAnimatronicState(state,()=>{
            // this.audio_heard.src = this.animatronic_audio_list.find((animatronic_view)=>
            //     animatronic_view.state === state
            // ).audio;
        })

        if(state === 0){
            this.onListenAudio();
        }


    }   

    
}

export {
    Closet
}