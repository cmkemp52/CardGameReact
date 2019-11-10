import React, {Component} from 'react';
import cardback from '../images/cardback.png'

class Blackjack extends Component{
    state = {
        deck_id: null,
        cardsLeft: 52,
        playerCards: null,
        playerImages: null,
        dealerCards: null,
        dealerImages: null
    }
    componentDidMount(){
        this.setState({
            deck_id: this.props.deck_id,
        })
    }
    gameStart=async()=>{
        const cardData = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=4`);
        const cards = await cardData.json();
        console.log(cards);
        this.setState({
            playerCards:[cards.cards[0].value, cards.cards[1].value],
            playerImages:[cards.cards[0].image, cards.cards[1].image],
            dealerCards:[cards.cards[2].value, cards.cards[3].value],
            dealerImages:[cards.cards[2].image,cards.cards[3].image],
            cardsLeft:cards.remaining
        })
    }
    drawNewCard=async()=>{
        const cardData = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`);
        const card = await cardData.json();
        console.log(card.cards[0]);
        this.setState({
            cardsLeft: card.remaining,
            cardImage: card.cards[0].image,
            cardValue: card.cards[0].value,
            cardSuit: card.cards[0].suit
        }) 
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <p> cards remaining: {this.state.cardsLeft} </p>
                {this.state.playerCards ? <>
                    <p>your cards:</p> 
                    <img src={this.state.playerImages[0]} alt="card display failed"/><img src={this.state.playerImages[1]} alt="card display failed"/>
                    <p>dealer cards:</p>
                    <img src={cardback} alt="card display failed"/><img src={this.state.dealerImages[1]} alt="card display failed"/>
                    </>: <button onClick={this.gameStart}> start a new game </button>}
            </div>
        );
    }
}

export default Blackjack;