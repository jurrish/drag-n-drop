import uuid from 'uuid/v1'


//take in a card, return the appropriate action
export const cardCreate = (card) => ({
  type: 'CARD_CREATE',
  payload: {...card, id: uuid() }
})

export const updateCard = (card) => ({
  type: 'CARD_UPDATE',
  payload: {...card},
})

export const deleteCard = (card) => ({
  type: 'CARD_DELETE',
  payload: {...card},
})
