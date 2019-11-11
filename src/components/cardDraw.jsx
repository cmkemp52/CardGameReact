import React, {Component} from 'react';
import cardback from '../images/cardback.png';
import handValue from '../utils/cardLogic';

class Blackjack extends Component{
    state = {
        deck_id: null,
        cardsLeft: 52,
        playerCards: null,
        playerImages: null,
        dealerHand: null,
        dealerHandImages: null,
        win: null
    }
    componentDidMount(){
        this.setState({
            deck_id: this.props.deck_id,
        })
    }
    gameStart=async()=>{
        const cardData = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=4`);
        const cards = await cardData.json();
        this.setState({
            playerCards:[cards.cards[0].value, cards.cards[1].value],
            playerImages:[cards.cards[0].image, cards.cards[1].image],
            dealerHand:[cards.cards[2].value, cards.cards[3].value],
            dealerHandImages:[cards.cards[2].image, cards.cards[3].image],
            cardsLeft:cards.remaining,
            win: null
        })
    }
    hit=async()=>{
        const cardData = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`);
        const card = await cardData.json();
        this.setState(state=>{
            const playerCards = state.playerCards.concat(card.cards[0].value);
            const playerImages = state.playerImages.concat(card.cards[0].image)
            return{
                playerCards,
                playerImages,
                cardsLeft:card.remaining
            }
        })
    }
    dealerHit=async()=>{
        const cardData = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`);
        const card = await cardData.json();
        this.setState((state)=>{
            const dealerHand = state.dealerHand.concat(card.cards[0].value);
            const dealerHandImages = state.dealerHandImages.concat(card.cards[0].image);
            return{
                dealerHand,
                dealerHandImages,
                cardsLeft:card.remaining
            }
        })
        console.log(this.state)
        return(card.cards[0].value);
    }
    stay=async()=>{
        let tempDealerHand = this.state.dealerHand;
        console.log(tempDealerHand);
        while(handValue(tempDealerHand)<16){
            tempDealerHand.push(await this.dealerHit());
            console.log(tempDealerHand);
        }
        if(handValue(tempDealerHand)>21){
            this.setState({
                    win: "yes"
                });
            return;
        }
        if(handValue(this.state.playerCards)>21 || handValue(this.state.playerCards)<= handValue(tempDealerHand)){
            this.setState({
                win: "no"
            })
            return;
        }
        this.setState({
            win: "yes"
        })

    }
    render(){
        return(
            <div>
                <p> cards remaining: {this.state.cardsLeft} </p>
                {this.state.playerCards ? <>
                    <p>your cards:</p> 
                    {this.state.playerImages.map(image=>{return <img src={image} alt="card display failed"/>})}
                    <p>total value: {handValue(this.state.playerCards)}</p>
                    <p>dealer cards:</p>
                    {this.state.win==="yes" || this.state.win==="no" ? <img src={this.state.dealerHandImages[0]} alt="card display failed"/> : <img src={cardback} alt="card display failed"/>}
                    {this.state.dealerHandImages.slice(1,this.state.dealerHandImages.length).map(image=>{return <img src={image} alt="card display failed"/>})}
                    <p></p>
                    {this.state.win==="yes" ? <><p>you win! play again?</p><button onClick={this.gameStart}> start a new game </button></> : this.state.win==="no" ? <><p>you lost, play again?</p><button onClick={this.gameStart}> start a new game </button></> : <>
                    <button onClick={this.hit}> hit me </button>
                    <button onClick={this.stay}> stay </button> </>}
                    </>: <button onClick={this.gameStart}> start a new game </button>}
            </div>
        );
    }
}

export default Blackjack;