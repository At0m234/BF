import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-scroll";
import './Directions.css';

class Directions extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
    this.props = props;
    this.changeCalcValues = this.changeCalcValues.bind(this);
  }

  changeCalcValues (e) {
    if(e.target.classList.contains('option__btn_purple')) {
      this.props.setMoneyRangeValue(1000);
      this.props.setTimeRangeValue(10);
    } else if (e.target.classList.contains('option__btn_orange')) {
      this.props.setMoneyRangeValue(50000);
      this.props.setTimeRangeValue(41);
    } else if (e.target.classList.contains('option__btn_green')) {
      this.props.setMoneyRangeValue(100000);
      this.props.setTimeRangeValue(65);
    }
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }
  
  render() {
    return (
      <section className='directions' id='directions'>
        <div className='directions__text'>
          <h2 className='directions__title'>Какие у нас займы</h2>
          <h3 className='directions__subtitle'>Выберите предложение максимально подходящее вашим нуждам</h3>
        </div>
        <div className='directions__container'>
          <div className='directions__slider'>

            <div className='directions__option directions__option_purple'>
              <h3 className='option__name'>Срочно надо</h3>
              <h4 className='option__conditions'>Срок</h4>
              <p className='option__limits'>от 5 до 30 дней</p>
              <h4 className='option__conditions'>Сумма</h4>
              <p className='option__limits'>от 1000 до 50 000 рублей</p>
              <h4 className='option__conditions'>Условия</h4>
              <p className='option__limits'>от 1,5&#37; в день </p>
              <br/>
              <br/>
              <Link className='option__btn option__btn_purple' onClick={this.changeCalcValues} to='calculator' smooth={true} duration= {500}>Мне подходит</Link>
            </div>

            <div className='directions__option directions__option_orange'>
              <h3 className='option__name'>Все в одном</h3>
              <h4 className='option__conditions'>Срок</h4>
              <p className='option__limits'>от 6 до 60 месяцев</p>
              <h4 className='option__conditions'>Сумма</h4>
              <p className='option__limits'>от 10 000 до 500 000 рублей</p>
              <h4 className='option__conditions'>Условия</h4>
              <p className='option__limits'>50&#37; годовых</p>
              <br/>
              <br/>
              <Link className='option__btn option__btn_orange' onClick={this.changeCalcValues} to='calculator' smooth={true} duration= {500}>Мне подходит</Link>
            </div>

            <div className='directions__option directions__option_green'>
              <h3 className='option__name'>Феникс</h3>
              <h4 className='option__conditions'>Срок</h4>
              <p className='option__limits'>от 12 месяцев</p>
              <h4 className='option__conditions'>Сумма</h4>
              <p className='option__limits'>от 10 000 до 500 000 рублей</p>
              <h4 className='option__conditions'>Условия</h4>
              <p className='option__limits'>от 20&#37; годовых</p>
              <br/>
              <br/>
              <Link className='option__btn option__btn_green' onClick={this.changeCalcValues} to='calculator' smooth={true} duration= {500}>Мне подходит</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Directions;