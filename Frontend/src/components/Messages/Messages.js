import React from 'react';
import ReactDOM from 'react-dom';
import './Messages.css';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <div className='messages' id='messages' style={this.props.messageState !== -1 ? {display: 'flex'} : {display: 'none'}}>

      {(this.props.messageState === 0)
      ? <div className='messages__modal messages__modal_success'>
          <h3 className='messages__text'>{this.props.successMessage}</h3>
        </div>
      : ""
      }

      {(this.props.messageState === 1)
      ? <div className='messages__modal messages__modal_error'>
          <h3 className='messages__text'>{this.props.errorMessage}</h3>
        </div>
      : ""
      }

      </div>
    )
  }
}

export default Messages;