import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Script from './Script';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import cookiejar72 from './imagens/icones/cookiejar72.png';



ReactDOM.render(
  <React.StrictMode>
    <Script />
    <header className="headerBar dark">
      <div className="cookieImg"><img src={cookiejar72} alt="logo" /></div>
      <div className="appName left">Gerenciador de Dispensa</div>
    </header>
    <nav id="nav" className="navBar bottom">
      <div className="buttonGroup">
        <button id="tab2" className="button tab active" htmlFor="tela2">Dispensa</button>
        <button id="tab1" className="button tab" htmlFor="tela1">
          Listas de Compras
            </button>
      </div>
    </nav>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
