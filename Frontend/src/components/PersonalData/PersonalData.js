import React from 'react';
import ReactDOM from 'react-dom';
import './PersonalData.css';
import api from '../Api/Api';
import Messages from '../Messages/Messages';
class PersonalData extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
    this.ref = React.createRef();
  }

  editUserInfo(e, data, token) {
    e.preventDefault();
    api.editUserInfo(data, token);
    this.props.setMessageState(0);
    this.props.setSuccessMessage('Профиль обновлен');
  }

  componentDidMount() {
    this.props.setMessageState(-1);
    if (localStorage.getItem('token')) {
      api.getUserInfo(localStorage.getItem('token'))
      .then((data) => {
        if (data) {
          let form = this.ref.current;
          form.name.value = data.data.name;
          form.surname.value = data.data.surname;
          form.tel.value = data.data.phone;
          form.email.value = data.data.email;
          form.city.value = data.data.city;
          form.postal.value = data.data.postal;
          form.adress.value = data.data.adress;
        } else {
          this.props.history.push('/');
        }
      })
    } else {
      this.props.history.push('/');
    }
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <section className='personal-data' id='personal-data'>
        <div className='personal-data__container'>
          <form ref={this.ref} className='personal-data__form' name='personal-data' id='personal-data__form' onSubmit={(e)=> {
            let form = this.ref.current;
            let data = {
              name: form.name.value,
              surname: form.surname.value,
              phone: form.tel.value,
              email: form.email.value,
              city: form.city.value,
              postal: form.postal.value,
              adress: form.adress.value,
            }
            this.editUserInfo(e, data, localStorage.getItem('token'))
            }}>
            <h2 className='personal-data__heading'>Личные данные</h2>

            <Messages
              messageState={this.props.messageState}
              setMessageState={this.props.setMessageState}
              errorMessage = {this.props.errorMessage}
              setErrorMessage = {this.props.setErrorMessage}
              successMessage = {this.props.successMessage}
              setSuccessMessage = {this.props.setSuccessMessage}
            />

            <label className='modal__label' htmlFor='name'>Имя</label>
            <input className='modal__input' name='name' type='text' id='name' style={{backgroundColor:'#c6c6c6'}} readOnly tabIndex={-1}></input>

            <label className='modal__label' htmlFor='surname'>Фамилия</label>
            <input className='modal__input' name='surname' type='text' id='surname' style={{backgroundColor:'#c6c6c6'}} readOnly tabIndex='-1'></input>

            <label className='modal__label' htmlFor='tel'>Телефон</label>
            <input className='modal__input' name='tel' type='tel' id='tel'></input>

            <label className='modal__label' htmlFor='email'>Э-почта</label>
            <input className='modal__input' name='email' type='email' id='email' style={{backgroundColor:'#c6c6c6'}} readOnly tabIndex='-1'></input>

            <label className='modal__label' htmlFor='city'>Город</label>
            <input className='modal__input' name='city' type='text' id='city'></input>

            <label className='modal__label' htmlFor='number'>Почтовый индекс</label>
            <input className='modal__input' name='postal' type='number' id='number'></input>

            <label className='modal__label' htmlFor='adress'>Адрес</label>
            <input className='modal__input' name='adress' type='text' id='adress'></input>

            <button className='modal__btn' id='personal-data-refresh'>Обновить</button>
          </form>
        </div>
      </section>
    )
  }
}

export default PersonalData;