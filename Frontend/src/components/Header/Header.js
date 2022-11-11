import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import GamburgerMenu from '../GamburgerMenu/GamburgerMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
    this.props = props;
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <header className='header' style={{backgroundColor: this.props.headerColor}}>
        <Link className='header__logo' to='/'><img src={logo} alt='Логотип компании'/></Link>
        {this.props.vw > 0 && this.props.vw < 992
        ? <GamburgerMenu
            authorized= {this.props.authorized}
            history = {this.props.history}
            setModalState={this.props.setModalState}
          />
        : <div className='header__container'>
            <nav className='header__nav'>
              <NavLink className='header__link' activeClassName='header__link_active' to='/raskrytie-informacii'>Раскрытие информации</NavLink>
              <NavLink className='header__link' activeClassName='header__link_active' to='/voprosy-i-otvety'>Вопросы и ответы</NavLink>
              <NavLink className='header__link' activeClassName='header__link_active' to='/novosti'>Новости</NavLink>
              <NavLink className='header__link' activeClassName='header__link_active' to='/kontakty'>Контакты</NavLink>
            </nav>
            <button className='header__account-btn' onClick={() => {
                if (this.props.authorized) {
                  this.props.history.push('/kabinet/lichnye-dannye')
                } else {
                  this.props.setModalState(0);
                }
              }}>{this.props.authorized ? 'Личный кабинет' : 'Войти'}</button>
          </div>
        }
      </header>
    );
  }
}

export default Header;