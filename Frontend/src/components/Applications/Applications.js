import React from 'react';
import ReactDOM from 'react-dom';
import './Applications.css';
import api from '../Api/Api.js';


class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      api.getApplicationInfo(localStorage.getItem('token'))
        .then((data) => {
          let applicationsTable = document.querySelector('.applications__table');

          let applicationTemplate = document.querySelector('#application__template');
          let applicationElement = applicationTemplate.querySelector('.table__application').cloneNode(true);

          data = data.reverse();
          let onee = document.querySelector('.column-one');
          data.forEach(application => {

            onee = application.number;
            applicationElement[1] = application.date;
            applicationElement[2] = application.amount;
            applicationElement[3] = application.term;
            applicationElement[4] = application.refund;
            applicationElement[5] = application.status;

            applicationsTable.append(applicationElement);
            // applicationsTable.insertAdjacentHTML(`afterbegin`,
            // `
            //   <div class='table__application'>
            //     <p class='table__application-info'>${application.number}</p>
            //     <p class='table__application-info'>${application.date}</p>
            //     <p class='table__application-info'>${application.amount}</p>
            //     <p class='table__application-info'>${application.term}</p>
            //     <p class='table__application-info'>${application.refund}</p>
            //     <a class='table__application-info' href='/kabinet/verifikaciya'>${application.status}</a>
            //   </div>
            // `)
          });
        })
    }
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  render() {
    return (
      <section className='applications' id='applications'>
        <div className='applications__container'>
          <h2 className='applications__title'>Список ваших заявок</h2>
          <div className='applications__heading-container'>
            <h3 className='applications__table-heading'>Номер заявки</h3>
            <h3 className='applications__table-heading'>Дата заявки</h3>
            <h3 className='applications__table-heading'>Сумма займа</h3>
            <h3 className='applications__table-heading'>Срок кредита</h3>
            <h3 className='applications__table-heading'>Сумма возврата</h3>
            <h3 className='applications__table-heading'>Статус</h3>
          </div>
          <div className='applications__table'>
          </div>
        </div>
        <template id='application__template'>
          <div className ='table__application'>
            <p className ='table__application-info column-one'></p>
            <p className ='table__application-info column-two'></p>
            <p className ='table__application-info column-three'></p>
            <p className ='table__application-info column-four'></p>
            <p className ='table__application-info column-five'></p>
            <a className ='table__application-info column-six' href='/kabinet/verifikaciya'></a>
          </div>
        </template>
      </section>
    )
  }
}

export default Applications;