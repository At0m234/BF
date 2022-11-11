import React from 'react';
import ReactDOM from 'react-dom';
import './Verification.css';
import ImageLoad from '../ImageLoad/ImageLoad.js';
import api from '../Api/Api.js';
import Messages from "../Messages/Messages";
class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.unmount = this.unmount.bind(this);
    this.documentData = [];
    this.state = {selectedFile: null}
    this.isSended = false;
  }

  addData(data) {
    this.documentData.push(data);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  showSelectedOption() {
    let select = document.querySelector('.verification__documets-list');
    let firstOption = document.querySelector('.verification__first-option');
    let secondOption = document.querySelector('.verification__second-option');
    let thirdtOption = document.querySelector('.verification__third-option');
    if (select.value === 'one') {
      firstOption.style.display = 'flex';
      secondOption.style.display = 'none';
      thirdtOption.style.display = 'none';
    } else if (select.value === 'two') {
      firstOption.style.display = 'none';
      secondOption.style.display = 'flex';
      thirdtOption.style.display = 'none';
    } else if (select.value === 'three') {
      firstOption.style.display = 'none';
      secondOption.style.display = 'none';
      thirdtOption.style.display = 'flex';
    }
  }

  sendUserDocuments (data, token) {
    api.sendUserDocuments(data, token)
      .then((res) => {
      })
  }

  onChangeHandler= (event) =>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler(e) {
    const data = new FormData();

    for (let val of this.documentData) {
      if (val === null) {
          data.append('files', null)
      } else {
        data.append('files',val.file)
      }
    }
    api.sendFile(data, localStorage.getItem('token'))
      .then((data) => {
        if(data){
          this.isSended = true;
        }
        this.documentData = this.documentData.map(()=> {
          return null
        })
        this.props.setSuccessMessage("В ближайшее время мы сообщим Вам о результате")
        this.props.setMessageState(0);
        this.forceUpdate()
      })
      .catch((err)=>{
        this.props.setErrorMessage("Отправка данных неудачна")
        this.props.setMessageState(1);
        this.forceUpdate()
      })
  }

  checkFileSize=(event)=>{
    let files = event.target.files
    let size = 15000
    let err = "";
    for(let x = 0; x<files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type+'is too large, please pick a smaller file\n';
      }
    };
    if (err !== '') {
      event.target.value = null
      return false
    }
    return true;
  }

  render() {
    return (
      <section className='verification' id='verification'>
        <div className='verification__container'>
          <div className='verification__info'>
            {this.isSended &&
            <div>
              <h2 className='verification__title'>Документы загружены</h2>
              <Messages
                messageState = {this.props.messageState}
                setMessageState = {this.props.setMessageState}
                errorMessage = {this.props.errorMessage}
                setErrorMessage = {this.props.setErrorMessage}
                successMessage = {this.props.successMessage}
                setSuccessMessage = {this.props.setSuccessMessage}
              />
            </div>
            }
            {!this.isSended &&
            <div>
              <h2 className='verification__title'>Загрузите документ, удостоверяющий личность</h2>
              <label htmlFor='documents'>Документ</label>
              <select className='verification__documets-list' id='documents' onClick={() => {this.showSelectedOption()}}>
                <option value='one' autoFocus>Национальное удостоверение личности</option>
                <option value='two'>Паспорт</option>
                <option value='three'>Водительское удостоверение</option>
              </select>

              <div className='verification__first-option'>
                <h3 className='verification__heading'>Загрузите фотографию или скан вашего национального удостоверения личности.</h3>
                <div className='cells__container'>
                  <div className='verification__cell verification__cell_small'>
                    <h4 className='cell__heading'>Лицевая сторона</h4>
                    <span className='cell__text'>Загрузите лицевую сторону ID-Карты</span>
                    <ImageLoad fileName={"NationalIdentityCardOne"} documentData={this.documentData} num={1} parent={this} />
                  </div>
                  <div className='verification__cell verification__cell_small'>
                    <h4 className='cell__heading'>Обратная сторона</h4>
                    <span className='cell__text'>Загрузите обратную сторону ID-Карты</span>
                    <ImageLoad fileName={"NationalIdentityCardTwo"}  documentData={this.documentData} num={2} parent={this} />
                  </div>
                </div>
              </div>

              <div className='verification__second-option'>
                <h3 className='verification__heading'>Загрузите фотографию или скан страницы вашего паспорта с фотографией.</h3>
                <div className='cells__container'>
                  <div className='verification__cell verification__cell_big'>
                    <h4 className='cell__heading'>Детализированная страница с данными</h4>
                    <span className='cell__text'>Загрузите страницу вашего паспорта с фотографией</span>
                    <ImageLoad fileName={"Passport"}  documentData={this.documentData} num={3} parent={this} />
                  </div>
                </div>
              </div>

              <div className='verification__third-option'>
                <h3 className='verification__heading'>Загрузите фото или скан вашего водительского удостоверения.</h3>
                <div className='cells__container'>
                  <div className='verification__cell verification__cell_small'>
                    <h4 className='cell__heading'>на лицевой стороне водительских прав</h4>
                    <span className='cell__text'>Загрузите лицевую сторону ваших водительских прав</span>
                    <ImageLoad fileName={"DriverLicenseOne"}  documentData={this.documentData} num={4}  parent={this} />
                  </div>
                  <div className='verification__cell verification__cell_small'>
                    <h4 className='cell__heading'>Обратная сторона</h4>
                    <span className='cell__text'>Загрузите обратную сторону водительских прав</span>
                    <ImageLoad fileName={"DriverLicenseTwo"}  documentData={this.documentData} num={5} parent={this} />
                  </div>
                </div>
              </div>

              <button className='modal__btn' id='verification-btn' type='button' multiple onClick={
                (e) => {
                e.preventDefault();
                this.onClickHandler(e);
              }}>Продолжить</button>
            </div>
          }
          </div>
        </div>
      </section>
    )
  }
}

export default Verification;