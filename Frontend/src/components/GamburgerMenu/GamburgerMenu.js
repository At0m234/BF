import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './GamburgerMenu.css';

function GamburgerMenu (props) {
  const [isGamMenuOpen, setIsGamMenuOpen] = useState(false);
  const [visibleDisplay, setVisibleDisplay] = useState(false);

  function openGamMenu() {
    setIsGamMenuOpen(true);
    setVisibleDisplay(true);
  }

  function closeGamMenu() {
    setIsGamMenuOpen(false);
    setVisibleDisplay(false);
  }



  if (isGamMenuOpen === false) {
    return (
      <div className='gamburger-menu'>
        <button className='gamburger-menu__btn' onClick={openGamMenu}>
          <span></span>
        </button>
      </div>
    )
  } else {
    return (
      <div className='gamburger-menu'>
        <div className={`gamburger-menu__container ${visibleDisplay ? 'gamburger-menu__container_overlay' : ""}}`} style={{opacity: visibleDisplay ? '1' : '0'}}>
          <nav className={`gamburger-menu__links ${visibleDisplay ? 'gamburger-menu__links_active' : " "}`} style={{opacity: visibleDisplay ? '1' : '0'}}>
              <NavLink className='gamburger-menu__link' activeClassName='gamburger-menu__link_active' to='/raskrytie-informacii' onClick={()=>closeGamMenu()}>Раскрытие информации</NavLink>
              <NavLink className='gamburger-menu__link' activeClassName='gamburger-menu__link_active' to='/voprosy-i-otvety' onClick={()=>closeGamMenu()}>Вопросы и ответы</NavLink>
              <NavLink className='gamburger-menu__link' activeClassName='gamburger-menu__link_active' to='/novosti' onClick={()=>closeGamMenu()}>Новости</NavLink>
              <NavLink className='gamburger-menu__link' activeClassName='gamburger-menu__link_active' to='/kontakty' onClick={()=>closeGamMenu()}>Контакты</NavLink>

              <button className='gamburger-menu__account-btn' onClick={() => {
                if (props.authorized) {
                  props.history.push('/kabinet/lichnye-dannye')
                } else {
                  props.setModalState(0);
                }
                closeGamMenu()
              }}>{props.authorized ? 'Личный кабинет' : 'Войти'}</button>

            </nav>
        </div>
        <button className='gamburger-menu__btn gamburger-menu__btn_active' onClick={closeGamMenu}>
          <span></span>
        </button>
      </div>
    )
  }
}

export default GamburgerMenu;