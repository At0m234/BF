import React from "react";
import api from "../Api/Api";
import './Modal.css';
import Messages from "../Messages/Messages";

const Modal = (props) => {
  const refConfirmModal = React.useRef();
  const resetModal = React.useRef();

  function changeState(stateNum) {
    props.setModalState(stateNum)
    props.setMessageState(-1);
  }

  function close() {
    props.setMessageState(-1);
    props.setModalState(-1);
  }

  function onLogin(e) {
    e.preventDefault();
    if ((document.forms.login.loginEmail.value && document.forms.login.loginPassword.value) === '') {
      props.setMessageState(1);
      props.setErrorMessage('Неверные данные для входа');
    } else {
      api.authorize(document.forms.login.loginEmail.value, document.forms.login.loginPassword.value)
      .then((data)=> {
        if(data) {
          if(data.token) {
            localStorage.setItem('token', data.token);
            const exT = new Date()
            exT.setMinutes(exT.getMinutes() + 60)
            localStorage.setItem('tokenExpires', exT);
            props.setModalState(-1);
            props.setMessageState(0);
            props.setSuccessMessage('Успешная авторизация');
            props.history.push('/kabinet/lichnye-dannye');
            props.setMessageState(-1);
          }
        }
      })
      .catch((err) => {
        props.setMessageState(1);
        props.setErrorMessage('Неверные данные для входа');
        return Promise.reject('Неверные данные для входа');
      })
    }
  };

  function onRegister(e) {
    e.preventDefault();
    const registerForm = document.forms.register
    if (
      (registerForm.name.value
      && registerForm.surname.value
      && registerForm.tel.value
      && registerForm.email.value
      && registerForm.password.value
      && registerForm.city.value
      && registerForm.postal.value
      && registerForm.adress.value) === '') {
        props.setMessageState(1);
        props.setErrorMessage('Пожалуйста, заполните все поля');
      } else {
        api.register(
          registerForm.name.value,
          registerForm.surname.value,
          registerForm.tel.value,
          registerForm.email.value,
          registerForm.password.value,
          registerForm.city.value,
          registerForm.postal.value,
          registerForm.adress.value
        )
        .then((data) => {
          document.forms.register.reset();
          props.setMessageState(0);
          props.setSuccessMessage('Спасибо за регистрацию. Вам на почту выслана ссылка для активации аккаунта');
        })
        .catch((res) => {
          props.setMessageState(1);
          props.setErrorMessage('Пожалуйста, заполните все поля');
          return Promise.reject('Пожалуйста, заполните все поля');
        })
      }
  };

  function applicationFormSubmitHandler(e) {
    e.preventDefault();

    if (!localStorage.getItem('token')) {
      props.setMessageState(1);
      props.setErrorMessage('Необходимо авторизоваться');
    } else if ((refConfirmModal.current.cardNumber.value && refConfirmModal.current.expirationDateTwo.value && refConfirmModal.current.expirationDateOne.value) === "") {
      props.setMessageState(1);
      props.setErrorMessage('Пожалуйста, заполните все необходимые поля');
    } else {
      props.setMessageState(0);
      props.setSuccessMessage('Заявка на кредит отправлена');
      api.sendApplication(
        {
          'confirmSummValue': props.moneyRangeValue,
          'confirmTimeValue': props.timeRangeValue,
          userCard: {
            'userCardNumber': refConfirmModal.current.cardNumber.value,
            'validYear': refConfirmModal.current.expirationDateTwo.value,
            'validMonth': refConfirmModal.current.expirationDateOne.value,
          },
        },
        localStorage.getItem('token'));
      refConfirmModal.current.reset();
    }
  }

  function resetPassword (e) {
    e.preventDefault();
    api.resetPassword(resetModal.current.resetEmail.value)
      .then((res) => {
        if (res) {
          props.setMessageState(0);
          props.setSuccessMessage('Новый пароль отправлен на указанную Вами почту')
        } else {
          props.setMessageState(1);
          props.setErrorMessage('Пожалуйста, введите свою почту');
        }
        return "OK"
      })
      .catch((err) => {
        props.setMessageState(1);
        props.setErrorMessage('Пожалуйста, введите свою почту');
        return Promise.reject('Пожалуйста, введите свою почту');
      })
  }

  return (
    <div className={props.modalState !== -1 ? 'modal active' : 'modal'} onClick={() => {
      close()
    }}>
      <div className={props.modalState !== -1 ? 'modal__container active' : 'modal__container'} onClick={(e) => e.stopPropagation()} >

    {(props.modalState === 0)
    ? <form className='signInModal' name="login" onSubmit={(e) => {onLogin(e, document.forms.loginEmail, document.forms.loginPassword)}}>
        <h2 className='modal__heading'>Войти в кабинет</h2>

        <Messages
          messageState={props.messageState}
          setMessageState={props.setMessageState}
          errorMessage = {props.errorMessage}
          setErrorMessage = {props.setErrorMessage}
          successMessage = {props.successMessage}
          setSuccessMessage = {props.setSuccessMessage}
        />

        <button className='modal__close' onClick={() => {
          close()
        }}></button>

        <label className='modal__label' htmlFor='email'>Э-почта</label>
        <input className='modal__input' name='loginEmail' type='email' id='email'></input>

        <label className='modal__label' htmlFor='password'>Пароль</label>
        <input className='modal__input' name='loginPassword' type='password' id='password'></input>

        <button className='modal__btn' id='signInModal-signIn' type='submit'>Войти</button>
        <span className='modal__text'>Вы новый пользователь? <button className='modal__btn' id='signInModal-signUp' onClick={() => changeState(1)}>Регистрация</button></span>
        <span className='modal__text'>Забыли свой пароль? <button className='modal__btn' id='signInModal-resetPass' onClick={()=> changeState(2)}>Сбросить пароль</button></span>
      </form>
    : ""
    }

    {(props.modalState === 1)
    ? <form className='signUpModal' name="register" onSubmit={(e)=> {onRegister(e)}}>
        <h2 className='modal__heading'>Регистрация</h2>

        <Messages
          messageState={props.messageState}
          setMessageState={props.setMessageState}
          errorMessage = {props.errorMessage}
          setErrorMessage = {props.setErrorMessage}
          successMessage = {props.successMessage}
          setSuccessMessage = {props.setSuccessMessage}
        />

        <button className='modal__close' onClick={() => {
          close()
        }}></button>

        <label className='modal__label' htmlFor='name'>Имя</label>
        <input className='modal__input' name="name" type='text' id='name'></input>

        <label className='modal__label' htmlFor='surname'>Фамилия</label>
        <input className='modal__input' name="surname" type='text' id='surname'></input>

        <label className='modal__label' htmlFor='tel'>Телефон</label>
        <input className='modal__input' name="tel" type='tel' id='tel'></input>

        <label className='modal__label' htmlFor='email'>Э-почта</label>
        <input className='modal__input' name="email" type='email' id='email'></input>

        <label className='modal__label' htmlFor='password'>Пароль</label>
        <input className='modal__input' name="password" type='password' id='password' pattern="[A-Za-z0-9]{8,16}"></input>

        <label className='modal__label' htmlFor='city'>Город</label>
        <input className='modal__input' name="city" type='text' id='city'></input>

        <label className='modal__label' htmlFor='postal'>Почтовый индекс</label>
        <input className='modal__input' name="postal" type='number' id='postal'></input>

        <label className='modal__label' htmlFor='adress'>Адрес</label>
        <input className='modal__input' name="adress" type='text' id='adress'></input>

        <button className='modal__btn' id='signUpModal-signUp'>Зарегистрироваться</button>
        <span className='modal__text'>Уже зарегистрированны?
          <button className='modal__btn' type='submit' id='signUpModal-signIn' onClick={(e)=>{
              changeState(0)
            }}>Войти</button>
          </span>
      </form>
    : ""
    }

    {(props.modalState === 2)
    ? <form className='resetModal' name="reset" ref={resetModal} onSubmit={(e)=> {
        resetPassword(e)
      }}>
        <h2 className='modal__heading'>Сбросить пароль</h2>

        <Messages
          messageState={props.messageState}
          setMessageState={props.setMessageState}
          errorMessage = {props.errorMessage}
          setErrorMessage = {props.setErrorMessage}
          successMessage = {props.successMessage}
          setSuccessMessage = {props.setSuccessMessage}
        />

        <button className='modal__close' onClick={() => {
          close()
        }}></button>

        <label className='modal__label' htmlFor='email'>Э-почта</label>
        <input className='modal__input' name='resetEmail' type='email' id='email'></input>

        <button className='modal__btn' id='resetModal-resetPass' type='submit'>Сбросить пароль</button>
        <span className='modal__text'>Уже зарегистрированны? <button className='modal__btn' id='resetModal-signIn' onClick={()=>changeState(0)}>Войти</button></span>
      </form>
    : ""
    }

    {(props.modalState === 3)
    ? <form  ref={refConfirmModal} className='confirmModal' name='confirmModal' onSubmit={(e) => {applicationFormSubmitHandler(e)}}>
        <h2 className='modal__heading'>Подтвердите заявку</h2>

        <Messages
          messageState={props.messageState}
          setMessageState={props.setMessageState}
          errorMessage = {props.errorMessage}
          setErrorMessage = {props.setErrorMessage}
          successMessage = {props.successMessage}
          setSuccessMessage = {props.setSuccessMessage}
        />

        <button className='modal__close' onClick={() => {
          close()
        }}></button>

        <label className='modal__conditions' name='confirmSumm'>Сумма займа: <span name='confirmSummValue'>{props.moneyRangeValue} ₽</span></label>
        <label className='modal__conditions' name='confirmTime'>Срок кредита: <span name='confirmTimeValue'>{props.timeRangeValue < 29 ? props.timeRangeValue : ((props.timeRangeValue - 29) * 30)} дней </span></label>
        <label className='modal__conditions' name='confirmRefund'>Сумма возврата: <span name='confirmRefundValue'>{Math.floor(props.moneyRangeValue * 1.1)} ₽</span></label>

        <label className='modal__label' htmlFor='cardNumber'>Номер карты</label>
        <input className='modal__input' name='cardNumber' type='number' id='cardNumber' placeholder='Card number' pattern='[0-9]{16}'></input>


          <label className='modal__label' htmlFor='expirationDate'>Действительна</label>
        <div className='modal__inputs'>
          <input className='modal__input' name='expirationDateOne' type='number' id='expirationDate' placeholder='MM' pattern='[0-9]{2}'></input>
          <input className='modal__input' name='expirationDateTwo' type='number' id='expirationDate' placeholder='YY' pattern='[0-9]{2}'></input>
        </div>

        <button className='modal__btn' id='confirmModal-send'>Отправить</button>
      </form>
    : ""
    }

      </div>
    </div>
  )
}

export default Modal;