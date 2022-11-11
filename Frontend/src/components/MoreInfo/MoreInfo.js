import React from 'react';
import ReactDOM from 'react-dom';
import './MoreInfo.css';
import table from '../../images/MoreInfo.jpg';
import rules from '../../userfiles/Правила о порядке и условиях предоставления микрозаимов физическим лицам.pdf';
import conditions from '../../userfiles/Общие условия договора потребительского заима.pdf';
import certificate from '../../userfiles/свидетельство СРО.jpeg';
import microfinance from '../../userfiles/microfinance_org.pdf';
import postponement from '../../userfiles/ИН-06-59_22 от 20.03.2020 .pdf';
import postponement2 from '../../userfiles/ИН-06-59_42 от 31.03.2020 .pdf';
import postponement3 from '../../userfiles/ИН-015-44_66 от 15.04.2020г..PDF';
import postponement4 from '../../userfiles/Информация-о-структуре-и-составе-участников-в-том-числе-о-лицах.pdf';
import politics from '../../userfiles/Политика перс дан.pdf';

class MoreInfo extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <section className='more-info' id='more-info'>
        <div className='more-info__container'>
          <img className='more-info__image' src={table} alt='Стол с аналитикой'></img>

          <p className='more-info__paragraph more-info__paragraph-one'>Раскрытие информации
            <a className='more-info__link' href={rules} target='blank'>Правила о порядке и условиях предоставления потребительских займов</a>
            <a className='more-info__link' href={conditions} target='blank'>Общие условия договора займа</a>
            <a className='more-info__link' href={certificate} target='blank'>Свидетельство о членстве в Союзе «Микрофинансовый Альянс "Институты развития малого и среднего бизнеса"»</a>
          </p>

          <p className='more-info__paragraph more-info__paragraph-two'>Информация государственных органов власти
            <a className='more-info__link' href={microfinance} target='blank'>Микрофинансовая организация (МФО)</a>
          </p>

          <p className='more-info__paragraph more-info__paragraph-three'>Информация Банка России о мерах поддержки граждан в связи с распространением коронавирусной инфекции (COVID-19)
            <a className='more-info__link' href={postponement} target='blank'>ИН-06-59_22 от 20.03.2020 (Предоставление отсрочки)</a>
            <a className='more-info__link' href={postponement2} target='blank'>ИН-06-59_42 от 31.03.2020 (О льготном периоде)</a>
          </p>

          <p className='more-info__paragraph more-info__paragraph-four'>
            <a className='more-info__link' href={postponement3} target='blank'>ИН-015-44_66 от 15.04.2020г. (О дополнительных мерах)</a>
            <a className='more-info__link' href={postponement4} target='blank'>"Информация о структуре и составе участников, в том числе о лицах, под контролем либо значительным влиянием которых находится"</a>
            <a className='more-info__link' href={postponement4} target='blank'>«ООО МКК «Выгодные Финансовые Решения»</a>
            <a className='more-info__link' href={politics} target='blank'>Политика в отношении обработки и защиты персональных данных</a>
          </p>
        </div>
      </section>
    )
  }
}

export default MoreInfo;