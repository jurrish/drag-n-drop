let validateCard = (card) => {
  if(!card.id || !card.content || !card.categoryID)
    throw new Error('VALIDATION ERROR: card must have an id, content, and categoryID');
}
let validateCategory = (category) => {
  if(!category.id || !category.title || !category.timestamp)
    throw new Error('VALIDATION ERROR: category must have id, title and timestamp');
}

let initialState = {}
export default (state=initialState, action) => {
  let { type, payload } = action;
  let categoryID, categoryCards
  switch(type) {

//NOTE: every category has multiple cards
//when we create a category, return a property on state that is the category's id, and initialize it with an empty array as its value (we can store cards for that category here)
    case 'CATEGORY_CREATE':
      validateCategory(payload)
      return { ...state, [payload.id]: [] }

//if the category is deleted, we set the value to undefined to overwrite the array and its innards (all the created cards that were saved to that state property)
    case 'CATEGORY_DELETE':
      validateCategory(payload)
      return { ...state, [payload.id]: undefined }

    case 'CARD_CREATE':
      validateCard(payload)
    //create a unique categoryID from the payload so we can figure out which category we want to add the card to
     categoryID = payload.categoryID;
    //we'll make a copy of that card array
     categoryCards = state[categoryID];

    //we'll overwrite the state of that card's id with the cards array with a new card in it appended to the end of the existing ...categoryCards array.
      return { ...state, [categoryID]: [...categoryCards, payload] }

    case 'CARD_UPDATE':
      validateCard(payload);
      categoryID = payload.categoryID;
      categoryCards = state[categoryID]
      //update the cards with map
      //operations:
      //make a copy of state ( ...state ), replace the id of the category id of the category array with the category cards (.map) that'll give us a card. if that card.id equals payload.id, otherwise return the original card
      return {
        ...state,
        [categoryID]: categoryCards.map(card =>
        card.id === payload.id ? payload : card),
      }

    case 'CARD_DELETE':
      validateCard(payload);
      categoryID = payload.categoryID;
      categoryCards = state[categoryID]
      //update the cards with map
      //operations:
      //make a copy of state ( ...state ), replace the id of the category id of the category array with the category cards (.map) that'll give us a card. if that card.id equals payload.id, otherwise return the original card
      return {
        ...state,
        [categoryID]: categoryCards.filter(card =>
        card.id !== payload.id),
      }




    default:
      return state;
  }
}
