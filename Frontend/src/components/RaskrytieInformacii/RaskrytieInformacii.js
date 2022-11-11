import React from 'react';
import ReactDOM from 'react-dom';

import Intro from '../Intro/Intro.js';
import MoreInfo from '../MoreInfo/MoreInfo.js';


class RaskrytieInformacii extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  componentDidMount() {
    document.title = 'В "МКК Выгодные Финансовые Решения';
    let calculator = document.querySelector('.intro__calculator');
    calculator.style.display = 'none';
    let introText = document.querySelector('.intro__info');
    introText.insertAdjacentHTML(`afterbegin`, `
    <div class="intro__text">
      <h2 class="intro__subtitle">Раскрытие информации</h2>
      <h1 class="intro__title">В "МКК Выгодные Финансовые Решения"</h1>
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
      <section className='raskrytieInformacii' id='raskrytieInformacii'>
        <Intro />
        <MoreInfo />
      </section>
    )
  }
}

export default RaskrytieInformacii;