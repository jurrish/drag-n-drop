import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   title: this.props.category ? this.props.category.title : '',
    // }
    //if props.category exists, make a copy of it as the default state, else use title as an empty string
    this.state = this.props.category ? {...this.props.category} : {title: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.category){
      this.setState(props.category)
    }
  }

  handleChange (e) {
    this.setState({ title: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault();
    //whoever uses this component can define the resolution of the form
    this.props.onComplete({ ...this.state });
    //clear the form if it's not being used for update
    if(!this.props.category) {
      this.setState({ title: '' })
    }
  }

  render () {
    return (
      <form className='category-form' onSubmit={ this.handleSubmit } >
        <input
          name='title'
          type='text'
          placeholder='title'
          value={ this.state.title }
          onChange={ this.handleChange }
        />
        <button type='submit'> { this.props.buttonText } </button>
      </form>
    )
  }
}

export default CategoryForm;
