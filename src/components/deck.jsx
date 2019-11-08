import React, {Component} from 'react';

class Deck extends Component{
    state = {
        deck_id: null,
        cardsLeft: null
    }
    
    async componentDidMount(){
        const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        console.log(response.json());

    }
    render(){
        return(<p> hi there </p>);
    }
}

export default Deck;