function handValue(cards){
    let totalValue=0;
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