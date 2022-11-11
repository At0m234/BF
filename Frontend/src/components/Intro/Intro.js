import React from 'react';
import ReactDOM from 'react-dom';
import './Intro.css';
import moment from 'moment';
class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
    this.refInputMoney = React.createRef();
    this.refInputTime = React.createRef();
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  componentDidMount() {
    this.refInputMoney.current.value = this.props.moneyRangeValue;
    this.refInputTime.current.value = this.props.timeRangeValue;
  }

  componentDidUpdate() {
    this.refInputMoney.current.value = this.props.moneyRangeValue
    this.refInputTime.current.value = this.props.timeRangeValue
  }

  moneyScroll(e) {
    this.props.setMoneyRangeValue(e.target.value);
    this.forceUpdate();
  }

  onChangeMoney(e) {
    this.moneyScroll(e)
    e.target.value = this.props.moneyRangeValue;
  }

  timeScroll(e) {
    this.props.setTimeRangeValue(e.target.value);
    this.forceUpdate();
  }

  onChangeTime(e) {
    this.timeScroll(e)
    e.target.value = this.props.timeRangeValue;
  }

  day = (term) => {
    const days = new Date();
    days.setDate(days.getDate() + term);
    return (days);
  };

  month = (term) => {
    const months = new Date();
    months.setMonth(months.getMonth() + term);
    return (months);
  };

  loanTerm() {
    const loanTerm = this.props.timeRangeValue < 29
    ? this.day(this.props.timeRangeValue)
    : this.month((this.props.timeRangeValue - 29));
    return moment(loanTerm).format('DD.MM.YYYY');
  }

  render() {
    return (
      <section className='intro' id='intro'>
        <div className='intro__info'>
          <div className='intro__calculator' id='calculator'>
            <div className='calculator__slider'>
              <div className='range__text'>Необходимая сумма
                <output className='range__count' id='range__count_money' htmlFor='money'>{this.props.moneyRangeValue} ₽</output>
              </div>
              <input ref={this.refInputMoney} className='calculator__range' id='money' type="range" min="1000" max="500000" step="1000" onChange={(e)=>{this.onChangeMoney(e)}}></input>
              <div className='range__limits'><span>1000 ₽</span> 500000 ₽</div>
            </div>
            <div className='calculator__slider'>
              <div className='range__text'>Срок кредита:
                <output className='range__count' id='range__count_time' htmlFor='time'>{`${this.props.timeRangeValue < 30 ? this.props.timeRangeValue  : (this.props.timeRangeValue - 29)} ${this.props.timeRangeValue < 30 ? 'Дней'  : 'Месяцев'}`}</output>
              </div>
              <input ref={this.refInputTime} className='calculator__range' id='time' type="range" min="1" max="89" step="1" onChange={(e)=>{this.onChangeTime(e)}}></input>
              <div className='range__limits'><span>1 дней</span> 5 лет</div>
            </div>
            <div className='calculator__info'>
              <h3 className='calculator__text'>Вернуть: {Math.floor(this.props.moneyRangeValue * 1.1)} ₽ до {this.loanTerm()}</h3>
              <button className='calculator__btn' type='button' onClick={() => {
                if(this.props.authorized) {
                  this.props.setModalState(3);
                } else {
                  this.props.setModalState(0)
                }
                }}>Подать заявку</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Intro;