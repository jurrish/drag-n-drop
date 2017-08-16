import React from 'react';
import { connect } from 'react-redux'

import {
  categoryUpdate,
  categoryDelete,
} from '../../action/category-actions.js';

import { cardCreate } from '../../action/card-actions.js';

import CategoryForm from '../category-form/index.js';
import CardForm from '../card-form/index.js';
import CardItem from '../card-item/index.js';

class CategoryItem extends React.Component {

  render () {

    let { category, cards, categoryUpdate, categoryDelete } = this.props;
    console.log('cards', cards)
    return (
      <div className='category-item'>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItem);
