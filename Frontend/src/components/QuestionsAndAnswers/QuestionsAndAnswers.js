import React from 'react';
import ReactDOM from 'react-dom';
import './QuestionsAndAnswers.css';
class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
    this.currentActive = -1
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  answerVision (number) {
    let answers = document.querySelectorAll('.questions-and-answers__answer');

    if (number === this.currentActive) {
      answers[number].classList.remove('show');
      this.currentActive = -1
    } else {
      answers[number].classList.add('show');
      this.currentActive = number
      for (let i=0; i<answers.length; i++) {
          if (this.currentActive !== i) {
            answers[i].classList.remove('show');
          }
        }
    }
  }

  render() {
    return (
      <section className='questions-and-answers' id='questions-and-answers'>
        <div className='questions-and-answers__container'>
          <h2 className='questions-and-answers__title'>Если возникнут другие вопросы - смело обращайтесь к Нам!</h2>
          <div className='questions-and-answers__list'>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question1'>Наши гарантии</label>
              <input className='questions-and-answers__checkbox ' type='checkbox' id='question1' onClick={()=> {this.answerVision(0)}}/>
              <p className='questions-and-answers__answer' >«МКК Выгодные Финансовые Решения" – это надежная микрокредитная компания, действующая на основании лицензии в соответствие с законодательством РФ. В нашей команде исключительно профессионалы готовые ответить на любой вопрос касающийся нашего сотрудничества.</p>
            </div>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question2'>Как получить</label>
              <input className='questions-and-answers__checkbox' type='checkbox' id='question2' onClick={()=> {this.answerVision(1)}}/>
              <p className='questions-and-answers__answer'>Для получения кредита Вам необходима Банковская карта Visa, MasterCard или МИР. Ее нужно предварительно зарегистрировать на сайте. Имя и фамилия, указанные на ней, должны совпадать с паспортными данными. Как только заявка будет одобрена, деньги поступят на Ваш счет моментально.</p>
            </div>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question3'>Как подать заявку?</label>
              <input className='questions-and-answers__checkbox' type='checkbox' id='question3' onClick={()=> {this.answerVision(2)}}/>
              <p className='questions-and-answers__answer'>Для оформления онлайн заявки необходимо на сайте выбрать сумму и срок займа, нажать кнопку «Подать заявку». Система предложит заполнить анкету. Заём мы выдаем только на личную именную банковскую карту. После заполнения анкеты и проверки данных нашей системой вы получите email с решением по заявке на заём. Данные об открытом займе будут также доступны в личном кабинете.</p>
            </div>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question4'>Как погасить</label>
              <input className='questions-and-answers__checkbox' type='checkbox' id='question4' onClick={()=> {this.answerVision(3)}}/>
              <p className='questions-and-answers__answer'>В личном кабинете на сайте есть возможность вносить платежи банковской картой Visa, MasterCard, Maestro, МИР. Для входа в личный кабинет используйте электронную почту и пароль, на кого оформлен договор займа.</p>
            </div>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question5'>Мою заявку одобрили или нет?</label>
              <input className='questions-and-answers__checkbox' type='checkbox' id='question5' onClick={()=> {this.answerVision(4)}}/>
              <p className='questions-and-answers__answer'>Информация о статусе заявки отображается в личном кабинете. Если вы видите статус На подтверждении, значит, нам еще нужно время для проверки данных анкеты, указанных при заполнении заявки. Статус рассмотрения заявки также отправляется на электронную почту, указанную при оформлении заявки.</p>
            </div>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question6'>Как быстро будет рассмотрена моя заявка на заем?</label>
              <input className='questions-and-answers__checkbox' type='checkbox' id='question6' onClick={()=> {this.answerVision(5)}}/>
              <p className='questions-and-answers__answer'>Вы увидите результат примерно через минуту после окончания оформления заявки. В некоторых случаях нам требуется дополнительное время, чтобы принять решение. Наши специалисты свяжутся с вами.</p>
            </div>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question7'>Возраст клиентов</label>
              <input className='questions-and-answers__checkbox' type='checkbox' id='question7' onClick={()=> {this.answerVision(6)}}/>
              <p className='questions-and-answers__answer'>Заем выдается только гражданам РФ, в возрасте от 20 до 70 лет.</p>
            </div>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question8'>В каком городе можно оформить?</label>
              <input className='questions-and-answers__checkbox' type='checkbox' id='question8' onClick={()=> {this.answerVision(7)}}/>
              <p className='questions-and-answers__answer'>Заявку можно оформить онлайн в любом населенном пункте, где есть интернет.</p>
            </div>

            <div className='questions-and-answers__list-item'>
              <span className='questions-and-answers__plus'></span>
              <label className='questions-and-answers__question' htmlFor='question9'>Как улучшить кредитную историю</label>
              <input className='questions-and-answers__checkbox' type='checkbox' id='question9' onClick={()=> {this.answerVision(8)}}/>
              <p className='questions-and-answers__answer'>Утверждение, что кредитная история – плохая не всегда является корректным, так как банки и МФО устанавливают разные правила по выдаче кредита. Кредитная история является плохой, если:<br/>
              <br/>
              не получена ни одна оплата по договору;<br/>
              срок задержки следующего платежа составляет больше 90 дней.<br/>
              <br/>
              Сейчас многие компании выдают денежные займы даже с плохой кредитной историей, что дает возможность заемщикам улучшить её. Для этого можно взять в нашей компании один или два займа и погасить их без нарушения условий договора.
              </p>
            </div>

          </div>
        </div>
      </section>
    )
  }
}

export default QuestionsAndAnswers;