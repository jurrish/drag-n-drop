import React from 'react';
import { connect } from 'react-redux'

import {
  categoryUpdate,
  categoryDelete,
} from '../../action/category-actions.js';

import {
  cardCreate,
  cardInsert,
  deleteCard
} from '../../action/card-actions.js';

import Dropzone from '../dropzone/index.js';
import CategoryForm from '../category-form/index.js';
import CardForm from '../card-form/index.js';
import CardItem from '../card-item/index.js';

class CategoryItem extends React.Component {
constructor(props){
  super(props);

  this.handleDropZoneComplete = this.handleDropZoneComplete.bind(this);
}

  handleDropZoneComplete(err, card){
    if(err)
      return console.error(err)
    console.log('drop', card);
    //on drop complete, we store the card in a variable, delete the card, change it's container id to be the correct container, then insert the card
    this.props.deleteCard(card);
    console.log('this.props   ====', this.props)
    card.categoryID = this.props.category.id
    this.props.cardInsert(card);
  }

  render () {

    let { category, cards, categoryUpdate, categoryDelete } = this.props;
    console.log('cards', cards)
    return (
      <div className='category-item'>
        <Dropzone onComplete={ this.handleDropZoneComplete } >
          <header>
            <div className='content'>
              <h2> { category.title } </h2>
              <button onClick={ () => categoryDelete(category) }>
              delete
              </button>
            </div>
            <div className='editing'>
              <CategoryForm
                buttonText='update'
                category={ category }
                onComplete={ categoryUpdate }
              />
            </div>
          </header>
          <main>
            <CardForm
              categoryID={ category.id }
              buttonText='Create Card'
              onComplete={ this.props.cardCreate }
            />
              <ul>
                { cards.map(card =>
                  <CardItem key={card.id} card={card} />
                )}
              </ul>
          </main>
        </Dropzone>
      </div>
    )
  }
}

//takes the redux store's state/gives u access to it, so you can pass it to your components inherited props.
let mapStateToProps = (state, props) => ({
  cards: state.cards[props.category.id]
});

let mapDispatchToProps = dispatch => ({
  categoryUpdate: (category) => dispatch(categoryUpdate(category)),
  categoryDelete: (category) => dispatch(categoryDelete(category)),
  cardCreate: (card) => dispatch(cardCreate(card)),
  deleteCard: (card) => dispatch(deleteCard(card)),
  cardInsert: (card) => dispatch(cardInsert(card))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItem);
