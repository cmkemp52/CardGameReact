import React, {Component} from 'react';

class CardDraw extends Component{
    state = {
        deck_id: null,
        cardsLeft: 52,
        cardImage: null,
        cardValue: null,
        cardSuit: null
    }
    componentDidMount(){
        this.setState({
            deck_id: this.props.deck_id,
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
                <button onClick={this.drawNewCard}> draw a card </button>
                {this.state.cardValue ? <>
                    <p>your card is {this.state.cardValue} of {this.state.cardSuit}</p> 
                    <img src={this.state.cardImage} alt="card display failed"/>
                    </>: ""}
            </div>
        );
    }
}

export default CardDraw;