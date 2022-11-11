import React from 'react';
import ReactDOM from 'react-dom';

import Intro from '../Intro/Intro.js';
import QuestionsAndAnswers from '../QuestionsAndAnswers/QuestionsAndAnswers.js';

class VoprosiIOtvety extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  componentDidMount() {
    document.title = 'Вопросы и ответы - Бери Быстро!';
    let calculator = document.querySelector('.intro__calculator');
    calculator.style.display = 'none';
    let introText = document.querySelector('.intro__info');
    introText.insertAdjacentHTML(`afterbegin`, `
    <div class="intro__text">
      <h1 class="intro__title">Вопросы и ответы</h1>
    </div>`)
    let introHeight = document.querySelector('.intro__info');
    introHeight.style.paddingTop = '180px';
    introHeight.style.paddingBottom = '70px';
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return(
      <section className='voprosi-i-otvety' id='voprosi-i-otvety'>
        <Intro />
        <QuestionsAndAnswers />
      </section>
    )
  }
}

export default VoprosiIOtvety;