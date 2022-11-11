import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useClientDimensions } from "react-client-dimensions";
import { useWindowWidth, useWindowHeight, useWindowDimensions } from "window-dimensions-hooks";
import './App.css';

import Header from '../Header/Header';
import MainPage from '../Main/MainPage';
import RaskrytieInformacii from '../RaskrytieInformacii/RaskrytieInformacii';
import VoprosiIOtvety from '../VoprosiIOtvety/VoprosiIOtvety';
import Novosti from '../Novosti/Novosti';
import Kontakty from '../Kontakty/Kontakty';
import PersonalAccount from '../PersonalAccount/PersonalAccount';
import Modal from '../Modal/Modal';
import Footer from '../Footer/Footer';
import Activation from '../Activation/Activation';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';


function App () {
  const history = useHistory();
  const [headerColor, setHeaderColor] = useState('transparent');
  // 0 = SignIn; 1 - SignUp; 2 - Reset; 3 - Confirm;
  const [modalState, setModalState] = useState(-1);
  const [authorized, setAuthorized] = useState((new Date(localStorage.getItem('tokenExpires')) >= new Date()
  ) && localStorage.getItem('token') ? true : false);

  const [moneyRangeValue, setMoneyRangeValue] = useState(50000);
  const [timeRangeValue, setTimeRangeValue] = useState(6);


  const [messageState, setMessageState] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { vw, vh } = useClientDimensions();

  useEffect(()=> {
    if (new Date(localStorage.getItem('tokenExpires')) >= new Date())
      setAuthorized(localStorage.getItem('token') ? true : false);
    else{
      setAuthorized(false);
    }
  },[modalState, moneyRangeValue, timeRangeValue, messageState])

  return (
      <div className="app">
        <Header
          setModalState={setModalState}
          authorized= {authorized}
          history = {history}
          headerColor={headerColor}
          useWindowWidth={useWindowWidth()}
          useWindowHeight={useWindowHeight()}
          useWindowDimensions={useWindowDimensions()}
          vw = {vw}
          vh = {vh}
        />
        <main className='main' id='main'>

          <Switch>
            <Route exact path='/'>
              <MainPage
                setModalState ={setModalState}
                authorized = {authorized}
                moneyRangeValue = {moneyRangeValue}
                timeRangeValue = {timeRangeValue}
                setMoneyRangeValue={setMoneyRangeValue}
                setTimeRangeValue={setTimeRangeValue}
                setHeaderColor={setHeaderColor}
              />
            </Route>

            <Route exact path='/raskrytie-informacii'>
              <RaskrytieInformacii
              setHeaderColor={setHeaderColor}/>
            </Route>

            <Route exact path='/voprosy-i-otvety'>
              <VoprosiIOtvety
              setHeaderColor={setHeaderColor}/>
            </Route>

            <Route exact path='/novosti'>
              <Novosti
              setHeaderColor={setHeaderColor}/>
            </Route>

            <Route exact path='/kontakty'>
              <Kontakty
                setHeaderColor={setHeaderColor}
                messageState={messageState}
                setMessageState={setMessageState}
                errorMessage = {errorMessage}
                setErrorMessage = {setErrorMessage}
                successMessage = {successMessage}
                setSuccessMessage = {setSuccessMessage}
              />
            </Route>

            <Route exact path='/activate'>
              <Activation
                history = {history}
                setHeaderColor={setHeaderColor}/>
            </Route>

            <ProtectedRoute path='/kabinet/*' component={PersonalAccount}
              history = {history}
              authorized = {authorized}
              setAuthorized={setAuthorized}
              setHeaderColor={setHeaderColor}


              messageState={messageState}
              setMessageState={setMessageState}
              errorMessage = {errorMessage}
              setErrorMessage = {setErrorMessage}
              successMessage = {successMessage}
              setSuccessMessage = {setSuccessMessage}
            />

            <Route path='/*'>
              <NotFound
                history = {history}
                authorized = {authorized}
                setHeaderColor={setHeaderColor}
              />
            </Route>
          </Switch>

        </main>
        <Footer />
        <Modal
          modalState = {modalState}
          setModalState = {setModalState}
          setAuthorized = {setAuthorized}
          history = {history}
          moneyRangeValue = {moneyRangeValue}
          timeRangeValue = {timeRangeValue}

          messageState={messageState}
          setMessageState={setMessageState}
          errorMessage = {errorMessage}
          setErrorMessage = {setErrorMessage}
          successMessage = {successMessage}
          setSuccessMessage = {setSuccessMessage}
        />
      </div>
  )
}

export default App;