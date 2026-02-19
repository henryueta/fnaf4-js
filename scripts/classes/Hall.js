
class Hall{

    constructor(config){
        this.number = config.number;
        this.current_animatronic = null;
        this.animatronic_view_image = config.animatronic_view_image;
        this.isWaitingPlayer = false;
        this.waiting_player_timeout = null;
        this.waiting_player_value = config.waiting_player_value;
        this.walking_audio = new Audio();
        this.walking_audio.src = "../assets/audio/walking_in_hall.mp3";
        this.walkingAudioIsPlaying = false;
        this.walking_audio.addEventListener("ended",()=>{
            this.walkingAudioIsPlaying = true;
        })
    }

    onPlayWalkAudio(intensity){
        this.walking_audio.volume = intensity;
        this.walking_audio.play();
        this.walkingAudioIsPlaying = true;
    }

    onStopWalkAudio(){
        if(!this.walkingAudioIsPlaying){
            return
        }
        this.walking_audio.pause();
        this.walking_audio.currentTime = 0;

    }


}

export {
    Hall
}