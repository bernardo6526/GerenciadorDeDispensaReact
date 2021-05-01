import React from 'react';
import plus1 from './imagens/plus1.png';
import './App.css';

import listasDeCompras from './Script.js';
import produtosCompras from './Script.js';
import idLista from './Script.js';
import dispensa from './Script.js';
import podeEditar from './Script.js';
//import ativa from './Script.js';
import mostraListasCompras from './Script.js';
import alterarListaCompras from './Script.js';
import mostraProdutosCompra from './Script.js';
import mostraDispensa from './Script.js';
import desabilitaCampos from './Script.js';
import habilitaCampo from './Script.js';
import convertDate from './Script.js';


function App() {
  return (
    <div className="App">


      <div id="tela1" className="component hidden">
        <div className="componentContent">
          <div className="componentHeader">
            <h1>Listas de Compras</h1>
            <button id="addCompra" className="button primary mvLeft3" onClick={addCompra}>
              <img src={plus1} />
            </button>
          </div>
          <ul className="list mt4" id="listaCompras">
          </ul>
        </div>
      </div>

      <div id="tela2" className="component">
        <div className="componentContent">
          <div className="componentHeader">
            <h1>Itens da Dispensa</h1>
            <button id="addDispensa" className="button primary mvLeft3">
              <img src={plus1} />
            </button>
          </div>
          <div className="tableHeader">
            <table className="table">
              <tr>
                <th>Item</th>
                <th>Qtd</th>
                <th>Unidade</th>
                <th>Validade</th>
              </tr>
            </table>
          </div>
          <table id="dispensa" className="table mt6">
            <tr>
              <td>Torta de mousse de limão</td>
              <td>12</td>
              <td>unidade</td>
              <td>11/04/2021</td>
            </tr>
          </table>
        </div>
      </div>

      <div id="tela3" class="component hidden">
        <div class="componentContent">
          <div class="componentHeader">
            <h1 id="tituloCompra"></h1>
            <button id="addProduto" class="button primary mvLeft3">
              <img src={plus1} />
            </button>
          </div>
          <div class="tableHeader">
            <table class="table">
              <tr>
                <th>Item</th>
                <th>Qtd</th>
                <th>Unidade</th>
                <th></th>
              </tr>
            </table>
          </div>
          <table id="produtosCompra" class="table mt6">
          </table>
          <div class="buttonGroup">
            <button id="enviarCompra" class="button primary">
              Enviar para dispensa
            </button>
          </div>
        </div>
      </div>

      <div id="formulario" class="component hidden">
    <div class="componentHeader">
      <h1 class="componentTitle mvLeft2" id="lblNome"></h1>
    </div>
    <div class="componentContent">
      <div class="field" id="divItem">
        <label class="fixed" id="lblItem" for="inputNovaTarefa"></label>
        <input id="nome" type="text" autocomplete="off" value="" />
      </div>
      <div class="field" id="divQtd">
        <label class="fixed" for="inputNovaTarefa">Qtd:</label>
        <input type="number" id="qtd" min="0" max="1000" value="" />
      </div>
      <div class="field" id="divUnidade">
        <label class="fixed" for="inputNovaTarefa">Unidade:</label>
        <input id="unidade" type="text" autocomplete="off" value="" />
      </div>
      <div class="field" id="divValidade">
        <label class="fixed" for="inputNovaTarefa">Validade:</label>
        <input type="date" id="validade" value="" />
      </div>
      <div class="buttonGroup mt1 center">
        <button id="btnCanc" class="button quarter light">Cancelar</button>
        <button id="btnInc" class="button quarter primary">Incluir</button>
      </div>
    </div>
  </div>

  <div id="telaExclusao" class="component hidden">
    <div class="componentHeader">
      <h1 class="componentTitle mvLeft2" id="telaExclusao">Realmente deseja excluir?</h1>
    </div>
    <div class="componentContent">
      <div class="buttonGroup mt1 center">
        <button id="btnNao" class="button quarter light">Não</button>
        <button id="btnSim" class="button quarter primary">Sim</button>
      </div>
    </div>
  </div>

    </div>


  );
}

export default App;



function ativa (comp) {
  let listaDeTelas = document.querySelectorAll('.component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
}

function addCompra(comp){
  ativa('formulario');
}