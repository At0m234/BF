import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Route } from 'react-router-dom';
import './Navigation.css';

import exitWhite from '../../images/exit_white.png';
import Applications from '../Applications/Applications.js';
import PersonalData from '../PersonalData/PersonalData.js';
import Verification from '../Verification/Verification.js';
import ChangePassword from '../ChangePassword/ChangePassword.js';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  signOut() {
    localStorage.clear();
    this.props.history.push('/');
    this.props.setAuthorized(false);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <section className='navigation' id='navigation'>
        <nav className='navigation__container'>
          <NavLink className='navigation__link' activeClassName='navigation__link_active' to='/kabinet/zayavki'>Заявки</NavLink>
          <NavLink className='navigation__link' activeClassName='navigation__link_active' to='/kabinet/lichnye-dannye'>Личные данные</NavLink>
          <NavLink className='navigation__link' activeClassName='navigation__link_active' to='/kabinet/verifikaciya'>Верификация</NavLink>
          <NavLink className='navigation__link' activeClassName='navigation__link_active' to='/kabinet/smena-parolya'>Смена пароля</NavLink>
          <div className='navigation__signout'>
            <img className='navigation__signout-image' src={exitWhite} alt='Картинка выхода из ЛК'/>
            <button className='navigation__exit' onClick={(e) => {this.signOut(e)}}>Выйти</button>
          </div>
        </nav>

        <Route path='/kabinet/zayavki'>
          <Applications />
        </Route>

        <Route path='/kabinet/lichnye-dannye'>
          <PersonalData
            history = {this.props.history}

            messageState={this.props.messageState}
            setMessageState={this.props.setMessageState}
            errorMessage = {this.props.errorMessage}
            setErrorMessage = {this.props.setErrorMessage}
            successMessage = {this.props.successMessage}
            setSuccessMessage = {this.props.setSuccessMessage}
          />
        </Route>

        <Route path='/kabinet/verifikaciya'>
          <Verification
            messageState={this.props.messageState}
            setMessageState={this.props.setMessageState}
            errorMessage = {this.props.errorMessage}
            setErrorMessage = {this.props.setErrorMessage}
            successMessage = {this.props.successMessage}
            setSuccessMessage = {this.props.setSuccessMessage}
          />
        </Route>

        <Route path='/kabinet/smena-parolya'>
          <ChangePassword
            messageState={this.props.messageState}
            setMessageState={this.props.setMessageState}
            errorMessage = {this.props.errorMessage}
            setErrorMessage = {this.props.setErrorMessage}
            successMessage = {this.props.successMessage}
            setSuccessMessage = {this.props.setSuccessMessage}
          />
        </Route>

      </section>
    )
  }
}

export default Navigation;