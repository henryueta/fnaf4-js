
class StateWarning{

    constructor(){

        this.last_object_warning = null;
        this.object_warning_repeated_times = 0;
        this.last_false_warning = null;
        this.false_warning_repeated_times = 0;

    }

     onBetweenChoices(percent){
        const choice = Math.floor(Math.random() * (
            percent === 50
            ? (1*2)
            :
            percent === 30
            ? (1*3)
            : 
            percent === 25
            ? (1*4)
            : 
            percent === 20
            ? (1*5)
            : 
            percent === 15
            ? (1*6)
            : 
            percent === 10
            ? (1*10)
            : 
            percent === 5
            ? (1*20)
            :
            percent === 1
            ? (1*100)
            : 0
        ));
        return choice;
    }
    
    onChoiceWarning(){
        const isFalseWarning = this.onBetweenChoices(25) === 0;

        
        if(isFalseWarning || this.false_warning_repeated_times > 2){
            console.log("FALSO")
            this.false_warning_repeated_times+=1;
            return null;
        };

        if(this.false_warning_repeated_times === 2){
            this.false_warning_repeated_times = 0;
        }
    
        let current_choiced_number = this.onBetweenChoices(50);
        
        const chooseAgain = (
            this.last_object_warning === current_choiced_number
            ? 
            (this.onBetweenChoices(25) !== 0 || this.object_warning_repeated_times === 2)
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