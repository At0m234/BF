import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-scroll";
import './Advantages.css';

class Advantages extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <section className='advantages' id='advantages'>

        <div className='advantages__loans'>
          <h2 className='advantages__title'>Займы в "МКК Выгодные Финансовые Решения"</h2>
          <h3 className='loans__subtitle'>Мы предлагаем нашим клиентам линейку кредитных продуктов в зависимости от текущих потребностей.</h3>
          <p className='loans__paragraph loans__paragraph_purple'>«Срочно надо» подойдет для клиентов, которым срочно необходима определенная сумма на не большой срок. Данный заём не имеет определенного срока и пролонгируется ежедневно без посещения офиса, звонков и перезаключения договоров, Вы сами решите, когда его вернуть.</p>
          <p className='loans__paragraph loans__paragraph_orange'>«Феникс» идеальный вариант для тех, кто уверен в завтрашнем дне, знает какая сумма, и на какой срок необходима.</p>
          <p className='loans__paragraph loans__paragraph_green'>«Все в одном» для клиентов имеющих несколько кредитов в разных банках, специально для них мы предлагаем объединить их в один, что является наиболее эффективным с точки зрения своевременного погашения и отсутствия просрочек. Мы идем на встречуклиентам с небольшими просроченными платежами, тем самым помогая снизить долговую нагрузку не испортить кредитную историю и быть благонадежным клиентом для всех банков.</p>
          <Link className='guarantees__calculation' to='calculator' smooth={true} duration= {500}>Рассчитать займ</Link>
        </div>

        <div className='advantages__info'>
          <h2 className='advantages__title'>Преимущества в "МКК Выгодные Финансовые Решения"</h2>
          <div className='advantages__text'>
            <p className='advantages__paragraph'>В«МКК ВФР» индивидуальный подход к каждому клиенту, что не свойственно микро кредитным компаниям. Мы предлагаем займы которые подойдут всем без исключения, а какой именно подходит Вам мы решим вместе.</p>
            <h4 className='advantages__heading'>При обращении к нам Вы сможете:</h4>
            <ul className='advantages__list'>
              <li className='advantages__list-item'>подобрать именно то, что необходимо Вам здесь и сейчас;</li>
              <li className='advantages__list-item'>получить заём в день обращения с минимальным пакетом документов;</li>
              <li className='advantages__list-item'>объединить мелкие кредиты даже с просроченными платежами;</li>
              <li className='advantages__list-item'>получить отчет НБКИ узнать свой кредитный рейтинг и просмотреть всю историю займов.</li>
            </ul>
            <p className='advantages__paragraph'>Мы не скрываем информацию,у нас нет скрытых комиссий и подводных камней, все максимально прозрачно и честно. Наша цель долгосрочные, дружеские отношения с каждым клиентом.
            Постоянное развитие, знание и понимание рынка в целом, а так же финансовая и юридическая грамотность это залог нашего выгодного сотрудничества с каждым клиентом.</p>
          </div>
        </div>
      </section>
    )
  }
}

export default Advantages;