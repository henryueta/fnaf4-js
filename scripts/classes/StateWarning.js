import { onBetweenChoices } from "../functions/randomNumber.js";

class StateWarning{

    constructor(){

        this.last_object_warning = null;
        this.object_warning_repeated_times = 0;
        this.last_false_warning = null;
        this.false_warning_repeated_times = 0;
        this.warning_audio = new Audio();
        this.warning_audio.src = "../assets/audio/wood_hit.mp3";
        this.warning_audio.addEventListener('ended',()=>{
            this.warning_audio.currentTime = 0;
        })
    }
    
    onChoiceWarning(){
        const isFalseWarning = onBetweenChoices(25) === 0;

        if (isFalseWarning) {
            this.false_warning_repeated_times++;

            if (this.false_warning_repeated_times > 2) {
                this.false_warning_repeated_times = 0;
                return
            } 
                console.log("FALSO");
                return 'none';
        } 
            
        this.false_warning_repeated_times = 0;

        if(this.false_warning_repeated_times === 2){
            this.false_warning_repeated_times = 0;
        }
    
        let current_choiced_number = onBetweenChoices(50);
        
        const chooseAgain = (
            this.last_object_warning === current_choiced_number
            ? 
            (onBetweenChoices(30) !== 0)
            : false
        );
        
        if(this.object_warning_repeated_times === 2){
            this.object_warning_repeated_times = 0;
        }

        current_choiced_number = (
            chooseAgain
            ? current_choiced_number === 1
                ? 0
                : 1
            : current_choiced_number
        );
        this.last_object_warning = current_choiced_number;

        if(!chooseAgain){
            this.object_warning_repeated_times +=1;
            console.log("Repetir novamente: ",chooseAgain);
        }
        // console.log("repeated",this.object_warning_repeated_times)

        const current_choice = (
            current_choiced_number === 0
            ? 'mirror'
            : 'closet'
        );
        return current_choice;
    }

}

export {
    StateWarning
}