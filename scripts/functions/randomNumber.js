
const onRandomNumber = (min,max)=>{

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

const onBetweenChoices = (percent)=>{
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


export{
    onRandomNumber,
    onBetweenChoices
}