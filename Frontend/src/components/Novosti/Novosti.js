import React from 'react';
import ReactDOM from 'react-dom';

import Intro from '../Intro/Intro.js';
import News from '../News/News.js';

class Novosti extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  componentDidMount() {
    document.title = 'Взгляд Генерального директора "МКК Выгодные Финансовые Решения" Елены Устиновой на то, какие инвестиции будут максимально прибыльными в 2021 году';
    let calculator = document.querySelector('.intro__calculator');
    calculator.style.display = 'none';
    let introText = document.querySelector('.intro__info');
    introText.insertAdjacentHTML(`afterbegin`, `
    <div class="intro__text">
      <span class="intro__date">31/03/2021</span>
      <h2 class="intro__subtitle">Новости</h2>
      <h1 class="intro__title">Взгляд Генерального директора «МКК Выгодные Финансовые Решения» Елены Устиновой на то, какие инвестиции будут максимально прибыльными в 2021 году</h1>
    </div>`)
    let introHeight = document.querySelector('.intro__info');
    introHeight.style.paddingTop = '180px';
    introHeight.style.paddingBottom = '70px';
    let introSectionHeight = document.querySelector('.intro');
    introSectionHeight.style.maxHeight = '627px';
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return(
      <section className='novosti' id='novosti'>
        <Intro />
        <News />
      </section>
    )
  }
}

export default Novosti;