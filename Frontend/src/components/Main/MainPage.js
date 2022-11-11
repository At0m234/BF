import React from 'react';
import ReactDOM from 'react-dom';
import Intro from '../Intro/Intro.js';
import Directions from '../Directions/Directions.js';
import Guarantees from '../Guarantees/Guarantees.js';
import Advantages from '../Advantages/Advantages.js';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  componentDidMount() {
    document.title = 'Главная - Бери Быстро!';
    let introText = document.querySelector('.intro__info');
    introText.insertAdjacentHTML(`afterbegin`, `
    <div class="intro__text">
      <h1 class='intro__title_main'>Займы онлайн</h1>
      <h2 class='intro__subtitle_main'><span>Никаких справок и комиссий – <br/>просто</span> заполните форму <br/>и получите до 500 000 рублей</h2>
    </div>`)
    this.props.setHeaderColor('transparent')
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return(
      <section className='mainPage' id='mainPage'>
        <Intro
          setModalState={this.props.setModalState}
          authorized= {this.props.authorized}

          moneyRangeValue = {this.props.moneyRangeValue}
          timeRangeValue = {this.props.timeRangeValue}
          setMoneyRangeValue={this.props.setMoneyRangeValue}
          setTimeRangeValue={this.props.setTimeRangeValue}
        />
        <Directions
          setMoneyRangeValue={this.props.setMoneyRangeValue}
          setTimeRangeValue={this.props.setTimeRangeValue}
        />
        <Guarantees />
        <Advantages />
      </section>
    )
  }
}

export default MainPage;