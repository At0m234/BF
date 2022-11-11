import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from '../Navigation/Navigation.js';

class PersonalAccount extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  componentDidMount() {
    document.title = 'Кабинет - Бери Быстро!'
    this.props.setHeaderColor('transparent')
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <section className='personal-account' id='personal-account'>
        <Navigation
          history = {this.props.history}
          setAuthorized={this.props.setAuthorized}

          messageState={this.props.messageState}
          setMessageState={this.props.setMessageState}
          errorMessage = {this.props.errorMessage}
          setErrorMessage = {this.props.setErrorMessage}
          successMessage = {this.props.successMessage}
          setSuccessMessage = {this.props.setSuccessMessage}
        />
      </section>
    )
  }
}

export default PersonalAccount;