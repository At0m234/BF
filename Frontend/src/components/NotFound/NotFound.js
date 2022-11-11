import React from 'react';
import ReactDOM from 'react-dom';
import './NotFound.css';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.unmount = this.unmount.bind(this);
    this.props = props;
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("app"));
  }

  componentDidMount() {
    document.title = 'Ошибка, страница не найдена!'
    this.props.setHeaderColor('#140B35');
  }

  render() {
    return (
      <section className='not-found'>
        <h1 className='not-found__error-title'>404</h1>
        <h2 className='not-found__error-subtitle'>Ой!</h2>
        <h2 className='not-found__text'>Что-то пошло не так. Пожалуйста, попробуйте еще раз!</h2>
        <button className='not-found__submit' type='submit' onClick={() => this.props.history.goBack()}>Вернуться</button>
      </section>
    )
  }
}

export default NotFound;