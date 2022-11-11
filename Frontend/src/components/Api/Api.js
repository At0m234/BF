import React from "react";
class Api extends React.Component {
  constructor(props) {
    super(props);
    this._url = 'http://localhost:3001';
    this._headers =  {
      authorization: this._token,
      'Content-Type': 'application/json',
    }
  }

  // регистрация пользователя
  register = (name, surname, phone, email, password, city, postal, adress) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, surname, phone, email, password, city, postal, adress})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err)=>{
      return Promise.reject(err)
    })
  }

  // активация аккаунта пользователя
  tryActivation  = (activationCode) => {
    return fetch (`${this._url}/activate?CODE=${activationCode}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err)=>{
      return Promise.reject(err)
    })
  }

  // авторизация пользователя
  authorize = (email, password) => {
    return fetch (`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err)=>{
      return Promise.reject(err)
    })
  }

  // получение данных о пользователе
  getUserInfo = (token) => {
    if (token) {
      return fetch (`${this._url}/kabinet/lichnye-dannye`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "authorization": `Bearer ${ token }`
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err)=>{
        return Promise.reject(err)
      })
    } else {
      console.log("Token не найден")
    }
  }

  //изменение данных о пользователе
  editUserInfo = (data, token) => {
    return fetch (`${this._url}/kabinet/lichnye-dannye`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err)=>{
      return Promise.reject(err)
    })
  }

  //изменение пароля пользователя
  patchPassword = (password, newPassword, token) => {
    return fetch (`${this._url}/kabinet/smena-parolya`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({'password': password, 'newPassword': newPassword}),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return res.json().then((data) => new Error(data.message));
      }
    })
    .catch((err)=>{
      return err;
    })
  }

  //оформление заявки на кредит
  sendApplication = (data, token) => {
    return fetch (`${this._url}/kabinet/zayavki`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err)=>{
      return Promise.reject(err)
    })
  }

  //получение информации о заявках на кредит
  getApplicationInfo = (token) => {
    return fetch (`${this._url}/kabinet/zayavki`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err)=>{
      return Promise.reject(err)
    })
  }

  //запросы на почту сайта
  contactUs = (data) => {
    return fetch (`${this._url}/kontakty`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err)=>{
        return Promise.reject(err)
      })
  }

  //отправка сканов на сервер
  sendFile = async (data, token) => {
    return fetch (`${this._url}/kabinet/verifikaciya`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: data,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return Promise.reject(`Не удалось отправить документы: ${err.status}`);
    })
  }

  //сброс пароля по почте
  resetPassword = (email) => {
    return fetch (`${this._url}/reset-password`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err)=>{
        return Promise.reject(err)
      })
  }
}

let api = new Api();
export default api;