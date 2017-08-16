import React from 'react';
import { connect } from 'react-redux';
import { updateCard, deleteCard } from '../../action/card-actions.js';
import CardForm from '../card-form';

class CardItem extends React.Component {



  render() {
    let { card, updateCard, deleteCard } = this.props
    console.log(deleteCard)
    return(
      <li className='card-item'>
        <p> { card.content } </p>
        <button onClick={() => deleteCard(card)}> delete </button>
        <CardForm
          card={ card }
          buttonText='update card'
          onComplete={ updateCard }
        />
      </li>
    )
  }
}

let mapStateToProps = () => ({});
let mapDispatchToProps = (dispatch) => ({
  updateCard : (card) => dispatch(updateCard(card)),
  deleteCard : (card) => dispatch(deleteCard(card)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardItem);
