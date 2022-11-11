import React from "react";
import ReactDOM from 'react-dom';
import './Activation.css'
import api from "../Api/Api";

class Activation extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
    this.activation = false;
    this.props = props;
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.props.setHeaderColor('#140B35')

    api.tryActivation(urlParams.get('CODE'))
    .then((data)=>{
      if (data.success === true) {
        this.activation = true;
      } else {
        this.activation = false;
      }
      this.forceUpdate();
    })
  }

  render() {
    return <section className='activation' id='activation'>
      {this.activation
      ? <div className='activation__container'>
          <h2 className='activation__title activation__title_success'>Ваш аккаунт активирован!</h2>
          <button className='activation__btn' onClick={() => this.props.history.push('/')}>На главную</button>
        </div>
      : <div className='activation__container'>
          <h2 className='activation__title activation__title_error'>Не удалось активировать аккаунт!</h2>
          <button className='activation__btn' onClick={() => this.props.history.push('/')}>На главную</button>
        </div>
      }
      </section>
    }
}

export default Activation;