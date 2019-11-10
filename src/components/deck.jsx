import React, {Component} from 'react';
import Blackjack from './cardDraw';

class Deck extends Component{
    state = {
        deck_id: null,
    }
    
    async componentDidMount(){
        const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        const deckStart = await response.json();
        this.setState({
            deck_id: deckStart.deck_id
        })
    }
    render(){
        return(
            <div>
                {this.state.deck_id ? <Blackjack deck_id={this.state.deck_id}/> : ""}
            </div>
        );
    }
}

export default Deck;