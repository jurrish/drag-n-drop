import React from 'react';

//props:
//* onComplete -- will invoke onDrop with the dataTransferItem
class Dropzone extends React.Component {
  constructor(props){
    super(props);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragOver(e){
    e.preventDefault()
  }

  handleDrop(e){
    e.preventDefault();
    // let dataTransferItem = e.dataTransfer.getData('application/json')
    try {
      let item = JSON.parse(e.dataTransfer.getData('application/json'));
      this.props.onComplete(null, item);
    } catch (error) {
      this.props.onComplete(error)
    }
  }

  render(){
    return(
      <div
        className='dropzone'
        onDragOver={ this.handleDragOver }
        onDrop={ this.handleDrop } >
        { this.props.children }
      </div>
    )
  }
}

export default Dropzone
