import React from 'react';
import ReactDOM from 'react-dom';
import './ChangePassword.css';

import api from "../Api/Api";
import Messages from "../Messages/Messages";
class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  componentDidMount() {
    this.props.setMessageState(-1);
  }

  componentWillUnmount() {
    this.props.setMessageState(-1);
  }

  patchPassword(e, password, newPassword, token) {
    e.preventDefault();
    if (document.forms.patchPassword.newPassword.value === document.forms.patchPassword.repeatPassword.value) {
      api.patchPassword(password, newPassword, token)
        .then((data) => {
          if (data && !data.message) {

            this.props.setSuccessMessage('Пароль успешно обновлен');
            this.props.setMessageState(0);
            document.forms.patchPassword.reset();
          } else {
            if (!data.message === "celebrate request validation failed"){
              this.props.setErrorMessage(data.message);
              this.props.setMessageState(1);
            }else{
              this.props.setErrorMessage('Неверный старый пароль');
              this.props.setMessageState(1);
            }

          }
        })
        .catch((err) => {
          this.props.setErrorMessage('Не удалось обновить информацию о пользователе!');
          this.props.setMessageState(1);
          return Promise.reject(`Не удалось обновить информацию о пользователе!`);
        })
    } else {
      this.props.setErrorMessage('Новый пароль не совпадает с повторенным');
      this.props.setMessageState(1);
    }
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  submitForm(e) {
    this.patchPassword(
      e,
      document.forms.patchPassword.password.value,
      document.forms.patchPassword.newPassword.value,
      localStorage.getItem('token')
    )
  }

  render() {
    return (
      <section className='change-password' id='change-password'>
        <div className='change-password__container'>
          <h2 className='change-password__heading'>Смена пароля</h2>

          <Messages
            messageState={this.props.messageState}
            setMessageState={this.props.setMessageState}
            errorMessage = {this.props.errorMessage}
            setErrorMessage = {this.props.setErrorMessage}
            successMessage = {this.props.successMessage}
            setSuccessMessage = {this.props.setSuccessMessage}
          />

          <form className='change-password__form' name='patchPassword' onSubmit={(e)=> {this.submitForm(e)}}>

            <label className='modal__label' htmlFor='old-password'>Пароль</label>
            <input className='modal__input' name='password' type='password' id='old-password'></input>

            <label className='modal__label' htmlFor='new-password'>Новый пароль</label>
            <input className='modal__input' name='newPassword' type='password' id='new-password'></input>

            <label className='modal__label' htmlFor='repeat-password'>Повторите пароль</label>
            <input className='modal__input' name='repeatPassword' type='password' id='repeat-password'></input>

            <button className='modal__btn' id='change-password-btn' type='submit'>Обновить</button>

          </form>
        </div>
      </section>
    )
  }
}

export default ChangePassword;