import React from 'react';
import { connect } from 'react-redux';
import { updateCard, deleteCard } from '../../action/card-actions.js';
import CardForm from '../card-form';
import Draggable from '../dragable/index.js';

import { renderIf } from '../../lib/util.js';

class CardItem extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      editing: false,
    }

    this.handleCardUpdate = this.handleCardUpdate.bind(this);
  }

  handleCardUpdate(card){
    this.props.updateCard(card);
    this.setState({ editing: false })
  }

  render() {
    let { card, updateCard, deleteCard } = this.props
    console.log(deleteCard)
    return(
      <li className='card-item'>
        <Draggable dataTransferItem={ card } >

          { renderIf(!this.state.editing,
            <div onDoubleClick={ () => this.setState({ editing: true }) }>
            <p> { card.content } </p>
            <button onClick={() => deleteCard(card)}> delete </button>
            </div>
          ) }

          { renderIf(this.state.editing,
            <div>
              <CardForm
              card={ card }
              buttonText='update card'
              onComplete={ this.handleCardUpdate }
              />
              <button onClick={ () => this.setState({ editing: false }) }> cancel update </button>
            </div>
          ) }
        </Draggable>
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
