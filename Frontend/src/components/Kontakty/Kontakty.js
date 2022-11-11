import React from 'react';
import ReactDOM from 'react-dom';
import Intro from '../Intro/Intro.js';
import ContactUs from '../ContactUs/ContactUs.js';

class Kontakty extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  componentDidMount() {
    document.title = 'Контакты - Бери Быстро!';
    let calculator = document.querySelector('.intro__calculator');
    calculator.style.display = 'none';
    let introText = document.querySelector('.intro__info');
    introText.insertAdjacentHTML(`afterbegin`, `
    <div class="intro__text">
      <h1 class="intro__title">Связаться с нами</h1>
    </div>`)
    let introHeight = document.querySelector('.intro__info');
    introHeight.style.paddingTop = '180px';
    introHeight.style.paddingBottom = '70px';
    this.props.setHeaderColor('transparent');
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return(
      <section className='kontakty' id='kontakty'>
        <Intro />
        <ContactUs
          setHeaderColor={this.props.setHeaderColor}
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

export default Kontakty;