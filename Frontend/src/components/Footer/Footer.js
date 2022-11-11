import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './Footer.css';
import payment from '../../images/footerPayment.svg';
import conditions from '../../userfiles/Общие условия договора потребительского заима.pdf';
import rules from '../../userfiles/Правила о порядке и условиях предоставления микрозаимов физическим лицам.pdf';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <footer className='footer' id='footer'>
        <div className='footer__info'>
          <div className='footer__company'>
            <h2 className='footer__heading'>Услуги оказывает</h2>
            <p className='footer__company-info'>Общество с ограниченной ответственностью <br/>"Микрокредитная Компания Выгодные Финансовые Решения"<br/>ИНН 7702460393 <br/>Московская обл., г. Талдом, рабочий пос. Запрудня, пер. Пролетарский, д. 15 этаж / пом. 2/19</p>
          </div>
          <div className='footer__company-contacts'>
            <h2 className='footer__heading'>Наши контакты</h2>
            <a href="tel:+74993224717" className="footer__contact">+7 (499) 322-47-17</a>
            <a href="mailto:info@berifast.ru" className="footer__contact">info@berifast.ru</a>
          </div>
          <div className='footer__text'>
            <h2 className='footer__heading'>Информация</h2>
            <a className='footer__conditions' href={conditions} target='blank'>Общие условия договора займа</a>
            <a className='footer__conditions' href={rules} target='blank'>Правила о порядке и условиях предоставления потребительских займов</a>
            <Link className='footer__link' to='/raskrytie-informacii'>Больше информации</Link>
          </div>
        </div>
        <div className='footer__line-wrapper'>
          <span className='footer__copyright'>&#169; 2021 Бери Быстро!</span>
          <img className='footer__payment' src={payment} alt='Способы оплаты'></img>
          <div className='footer__links'>
            <Link className='footer__link' to='/voprosy-i-otvety'>Вопросы и ответы</Link>
            <Link className='footer__link' to='/kontakty'>Контакты</Link>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;