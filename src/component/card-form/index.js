import React from 'react';

class CardForm extends React.Component {
  constructor( props ) {
    super( props );
    //if there is a card property on this.props, return a new object with ...props.card, else it'll be the
    this.state = props.card
    ? { ...props.card }
    : { content: '', categoryID: props.categoryID }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceive( props ) {
    if( props.card )
      this.setState( { ...props.card } )

    if( props.categoryID )
      this.setState({ categoryID: props.categoryID })
  }

  handleChange( e ) {
    this.setState({ content: e.target.value })
  }

  handleSubmit( e ) {
    e.preventDefault()
    this.props.onComplete(this.state)
    if(!this.props.card)
      this.setState({ content: '' })
  }

  render(){
    return(
      <form className='' onSubmit={ this.handleSubmit }>
        <input
          type='text'
          name='content'
          placeholder='content'
          value={ this.state.content }
          onChange={ this.handleChange }
        />
        <button type='submit'> { this.props.buttonText } </button>
      </form>
    )
  }
}

export default CardForm;
