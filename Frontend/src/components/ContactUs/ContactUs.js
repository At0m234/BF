import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './ContactUs.css';
import api from '../Api/Api';
import Messages from '../Messages/Messages';

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
    this.name = React.createRef();
    this.email = React.createRef();
    this.message = React.createRef();
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  componentDidMount () {
    this.props.setHeaderColor('transparent')
    this.props.setMessageState(-1);
  }

  contactUsFormSubmitHandler(e) {
    if ((this.name.current.value && this.email.current.value && this.message.current.value) !== '') {
      e.preventDefault();
      this.props.setMessageState(0);
      this.props.setSuccessMessage('Ваше сообщение отправлено. Мы ответим Вам в ближайшее время.');
      api.contactUs({'name': this.name.current.value, 'email': this.email.current.value, 'message': this.message.current.value});
      document.forms.contactUsForm.reset();
    } else {
      e.preventDefault();
      this.props.setMessageState(1);
      this.props.setErrorMessage('Пожалуйста, заполните все обязательные поля');
    }
  }

  render() {
    return (
      <section className='contact-us'>
        <div className='contact-us__container'>
          <h1 className='contact-us__title'>Напишите нам</h1>
          <h1 className='contact-us__subtitle'>Возможно мы уже ответили на ваш вопрос на странице <Link className='contact-us__subtitle-link' to='/voprosy-i-otvety'>Вопросы и ответы!</Link></h1>

          <Messages
            messageState={this.props.messageState}
            setMessageState={this.props.setMessageState}
            errorMessage = {this.props.errorMessage}
            setErrorMessage = {this.props.setErrorMessage}
            successMessage = {this.props.successMessage}
            setSuccessMessage = {this.props.setSuccessMessage}
          />

          <form className='contact-us__form' name='contactUsForm' onSubmit={(e) => {this.contactUsFormSubmitHandler(e)}}>
            <input className='contact-us__form-input' ref={this.name} placeholder='Полное имя' type='text' name='name' id='name' pattern='[A-Za-zА-Яа-яЁё]{2,20}' title='Введите Ваше имя'></input>
            <input className='contact-us__form-input' ref={this.email} placeholder='Электронная почта' type='email' name='email' id='email' pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' title='Укажите корректный адрес эл. почты'></input>
            <textarea className='contact-us__form-message' ref={this.message} placeholder='Сообщение' type='text' name='message' ></textarea>
            <button className='contact-us__form-submit' type='submit'>Отправить</button>
          </form>
        </div>
      </section>
    );
  }
}

export default ContactUs;