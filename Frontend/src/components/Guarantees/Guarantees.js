import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-scroll";
import './Guarantees.css';
import serviceImg from '../../images/service_img2.jpg';

class Guarantees extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <section className='guarantees' id='guarantees'>
        <div className='guarantees__info'>
          <img className='guarantees__image' src={serviceImg} alt='Сервис'></img>
          <div className='guarantees__text'>
            <h2 className='guarantees__title'>Наши гарантии</h2>
            <p className='guarantees__paragraph'>«МКК Выгодные Финансовые Решения" – это надежная микрокредитная компания, действующая на основании лицензии в соответствие с законодательством РФ.</p>
            <p className='guarantees__paragraph'>В нашей команде исключительно профессионалы готовые ответить на любой вопрос касающийся нашего сотрудничества.</p>
            <Link className='guarantees__calculation' to='calculator' smooth={true} duration= {500}>Рассчитать займ</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default Guarantees;