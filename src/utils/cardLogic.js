
function handValue(cards){
    let totalValue=0;
    //takes ace and puts it at end of array - ensures ace is properly counted as 1 or 11
    if(cards.includes("ACE")){
        cards.push(cards.splice(cards.indexOf("ACE"), 1)[0])
    }
    //adds value of each card to total value
    for(let card in cards){
        switch(cards[card]){
            case "KING":
            case "QUEEN":
            case "JACK":
            case 10:
                totalValue+=10;
                break;
            case "ACE":
                if(totalValue+11>21){
                    totalValue+=1;
                } else {
                    totalValue+=11;
                }
                break;
            default:
                totalValue+=parseInt(cards[card]);
        }
    }
    return totalValue;
}

export default handValue;