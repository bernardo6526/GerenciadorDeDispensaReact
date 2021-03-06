import React from 'react';
import './App.css';

import plus1 from './imagens/plus1.png';
import cookiejar72 from './imagens/icones/cookiejar72.png';
import lupa from './imagens/magnifying_glass.png';

import DispensaValidade from './DispensaValidade.jsx';
import DispensaQuantidade from './DispensaQuantidade.jsx';

let listasDeCompras = [];

let produtosCompras = [];

export let idLista = -1;

export let dispensa = [];

// flag para controlar as edicoes
export let podeEditar = true;
console.log("podeEditar:" + podeEditar);


function App() {
  return (
    <div className="App">

      <header className="headerBar dark">
        <div className="cookieImg"><img src={cookiejar72} alt="cookiejar" /></div>
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
            <button id="addDispensa" className="button primary mvLeft3" onClick={addDispensa}>
              <img src={plus1} />
            </button>
          </div>
          <div className="tableHeader">
            <table className="table">
              <tr>
                <th>Item</th>
                <th>
                  <button className="button primary tiny" onClick={mostraQuantidade}>
                    Qtd <img src={lupa} />
                  </button>
                </th>
                <th>Unidade</th>
                <th>
                  <button className="button primary tiny" onClick={mostraValidade}>
                    Val <img src={lupa} />
                  </button>
                </th>
              </tr>
            </table>
          </div>
          <table id="dispensa" className="table mt8">
          </table>
        </div>
      </div>

      <div id="telaValidade" className="component hidden">
        <div className="componentContent">
          <DispensaValidade />
        </div>
      </div>

      <div id="telaQuantidade" className="component hidden">
        <div className="componentContent">
          <DispensaQuantidade />
        </div>
      </div>

      <div id="tela3" className="component hidden">
        <div className="componentContent">
          <div className="componentHeader">
            <h1 id="tituloCompra"></h1>
            <button id="addProduto" className="button primary mvLeft3" onClick={addProduto}>
              <img src={plus1} />
            </button>
          </div>
          <div className="tableHeader">
            <table className="table">
              <tr>
                <th>Item</th>
                <th>Qtd</th>
                <th>Unidade</th>
                <th></th>
              </tr>
            </table>
          </div>
          <table id="produtosCompra" className="table mt6">
          </table>
          <div className="buttonGroup">
            <button id="enviarCompra" className="button primary">
              Enviar para dispensa
            </button>
          </div>

        </div>
      </div>

      <div id="formulario" className="component hidden">
        <div className="componentHeader">
          <h1 className="componentTitle mvLeft2" id="lblNome"></h1>
        </div>
        <div className="componentContent">
          <div className="field" id="divItem">
            <label className="fixed" id="lblItem" htmlFor="inputNovaTarefa"></label>
            <input id="nome" type="text" autoComplete="off" />
          </div>
          <div className="field" id="divQtd">
            <label className="fixed" htmlFor="inputNovaTarefa">Qtd:</label>
            <input type="number" id="qtd" min="0" max="1000" />
          </div>
          <div className="field" id="divUnidade">
            <label className="fixed" htmlFor="inputNovaTarefa">Unidade:</label>
            <input id="unidade" type="text" autoComplete="off" />
          </div>
          <div className="field" id="divValidade">
            <label className="fixed" htmlFor="inputNovaTarefa">Validade:</label>
            <input type="date" id="validade" />
          </div>
          <div className="buttonGroup mt1 center">
            <button id="btnCanc" className="button quarter light">Cancelar</button>
            <button id="btnInc" className="button quarter primary">Incluir</button>
          </div>
        </div>
      </div>

      <div id="telaExclusao" className="component hidden">
        <div className="componentHeader">
          <h1 className="componentTitle mvLeft2" id="telaExclusao">Realmente deseja excluir?</h1>
        </div>
        <div className="componentContent">
          <div className="buttonGroup mt1 center">
            <button id="btnNao" className="button quarter light">N??o</button>
            <button id="btnSim" className="button quarter primary">Sim</button>
          </div>
        </div>
      </div>

    </div>


  );
}

export default App;

window.onload = () => {
  // carrega os recursos salvos
  const lc = JSON.parse(localStorage.getItem('listasDeCompras'));
  if (lc) listasDeCompras = lc;
  const pc = JSON.parse(localStorage.getItem('produtosCompras'));
  if (pc) produtosCompras = pc;
  const di = JSON.parse(localStorage.getItem('dispensa'));
  if (di) dispensa = di;

  // cria um objeto com as abas
  let tabs = document.querySelectorAll('.navBar .tab');

  const mostra = (elem) => {
    if (elem) {
      for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
      elem.classList.add('active');
    }

    for (let i = 0; i < tabs.length; i++) {
      let comp = tabs[i].getAttribute('for');
      if (tabs[i].classList.contains('active'))
        document.querySelector('#' + comp).classList.remove('hidden');
      else document.querySelector('#' + comp).classList.add('hidden');
    }
  };

  for (let i = 0; i < tabs.length; i++)
    tabs[i].onclick = (e) => {
      mostra(e.target);
    };

  mostra();

  // carrega os vetores
  mostraListasCompras();
  mostraProdutosCompra();
  mostraDispensa();

  // NavBar ---------------------------------------------
  document.querySelector('#tab1').onclick = () => {
    ativa('tela1');
  };
  document.querySelector('#tab2').onclick = () => {
    ativa('tela2');
  };
  // NavBar ---------------------------------------------
}

export function ativa(comp) {
  let listaDeTelas = document.querySelectorAll('.component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
}


const mostraListasCompras = () => {
  const lc = document.querySelector('#listaCompras');
  if(lc != null)
  lc.innerHTML = '';
  listasDeCompras.forEach((i) => {
    // cria o elemento da lista
    let lista = document.createElement('li');
    let label = document.createElement('label');
    label.innerHTML = i.nome;
    label.setAttribute('data-id', i.id);
    label.setAttribute('class', 'blockLabel'); // aumenta a area para clicar no label
    lista.appendChild(label);

    // cria o botao de alterar do elemento
    let btnAlterar = document.createElement('BUTTON');
    btnAlterar.innerHTML = '<img src="https://i.imgur.com/IFthcuv.png" />';
    btnAlterar.setAttribute('id', "btnListaCompra" + i.id);
    btnAlterar.setAttribute('class', 'button primary');
    lista.appendChild(btnAlterar);

    label.onclick = () => {
      // muda o nome da tela dos produtos
      let tituloCompra = document.querySelector('#tituloCompra');
      tituloCompra.innerHTML = i.nome;
      // mostra a tela produtosCompra
      ativa('tela3');
      // atualiza o idLista
      idLista = i.id;
      // carrega os produtos
      mostraProdutosCompra();
    };

    btnAlterar.onclick = () => {
      alterarListaCompras(i);
    };
    lc.appendChild(lista);

  }); // fim do for
}; // fim mostraListasCompras

const alterarListaCompras = (lista) => {
  // ativa a tela de formulario
  ativa('formulario');

  // preenche o campo
  document.querySelector('#nome').value = lista.nome;

  // foca no campo
  document.querySelector('#nome').focus();

  // esconde a barra de navegacao
  let nav = document.getElementById('nav').style;
  nav.visibility = 'hidden';

  // muda o titulo do formulario
  let lblNome = document.querySelector('#lblNome');
  lblNome.innerHTML = 'Alterar lista de compras';

  // muda o nome do item do formulario
  let lblItem = document.querySelector('#lblItem');
  lblItem.innerHTML = 'Nome da Lista:';

  // esconde campos desnecessarios
  desabilitaCampos();

  // muda o id dos botoes so pela semantica
  document.getElementById('btnInc').id = 'alteraCompra';
  document.getElementById('btnCanc').id = 'excluiCompra';

  // muda o texto dos botoes
  document.getElementById('alteraCompra').innerHTML = 'Salvar';
  document.getElementById('excluiCompra').innerHTML = 'Excluir';

  // evento de inclusao
  document.querySelector('#alteraCompra').onclick = () => {
    let inputNome = document.getElementById('nome');

    // se o campo nao estiver vazio
    if (inputNome.value != '') {
      // altera o elemento
      lista.nome = inputNome.value;
      // atualiza a lista
      mostraListasCompras();
      // salva localmente
      localStorage.setItem('listasDeCompras', JSON.stringify(listasDeCompras));

      // limpa o valor do campo
      inputNome.value = '';
      // volta a cor do field para o normal
      inputNome.style.borderColor = '#8f9799';
      // volta os botoes para o id generico
      document.getElementById('alteraCompra').id = 'btnInc';
      document.getElementById('excluiCompra').id = 'btnCanc';

      // volta o texto original dos botoes
      document.getElementById('btnInc').innerHTML = 'Incluir';
      document.getElementById('btnCanc').innerHTML = 'Cancelar';

      // volta para tela anterior         
      ativa('tela1');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    } else { // caso de valor faltando no formulario
      // torna vermelho o campo com o valor faltando
      inputNome.style.borderColor = '#f00';
    }
  };

  // evento de excluir
  document.querySelector('#excluiCompra').onclick = () => {
    let telaExclusao = document.getElementById('telaExclusao');
    // mostra a tela de exclusao
    telaExclusao.classList.remove("hidden");

    document.querySelector('#btnSim').onclick = () => {
      // exclui o elemento
      listasDeCompras = listasDeCompras.filter((obj) => obj.id != lista.id);
      // atualiza a lista
      mostraListasCompras();
      // salva localmente
      localStorage.setItem('listasDeCompras', JSON.stringify(listasDeCompras));

      let inputNome = document.getElementById('nome');
      // limpa o valor do campo
      inputNome.value = '';
      // volta a cor do field para o normal
      inputNome.style.borderColor = '#8f9799';
      inputNome.style.borderColor = '#8f9799';
      // volta os botoes para para o id generico
      document.getElementById('alteraCompra').id = 'btnInc';
      document.getElementById('excluiCompra').id = 'btnCanc';

      // volta o texto original do botao
      document.getElementById('btnInc').innerHTML = 'Incluir';
      document.getElementById('btnCanc').innerHTML = 'Cancelar';

      // volta para tela anterior         
      ativa('tela1');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    }

    document.querySelector('#btnNao').onclick = () => {
      // esconde a tela de exclusao
      telaExclusao.classList.add("hidden");
    }

  };
} // fim alterarListaCompras

const mostraProdutosCompra = () => {
  // cria um vetor de produtos da compra especifica
  let produtos = produtosCompras.filter((obj) => obj.idLista == idLista);

  let enviarCompra = document.getElementById('enviarCompra');
  // se nao houver produtos
  if (produtos.length == 0) {
    // esconde o botao de enviar para dispensa
    enviarCompra.classList.add("hidden");
  } else {
    // caso contrario mostra o botao de enviar para dispensa
    enviarCompra.classList.remove("hidden");
  }

  enviarCompra.onclick = () => {
    // filtra os produtos marcados
    let addDispensa = produtos.filter((obj) => obj.check == true);
    // preenche o addDispensa com as datas
    addDispensa.forEach((i) => {
      i.validade = "yyyy-mm-dd";
    });
    // adiciona ao vetor de dispensa
    dispensa = [...dispensa, ...addDispensa];
    // salva a alteracao
    localStorage.setItem('dispensa', JSON.stringify(dispensa));

    // carrega os dados
    mostraDispensa();

    // redireciona para a tela da dispensa se houver produtos
    if (dispensa.length > 0)
      ativa('tela2');

    // limpa os checkbox
    produtos.forEach((i) => {
      i.check = false;
      document.getElementById("check" + i.id).checked = i.check;
    });

    console.log("Redirect");
  };

  // cria o objeto dom que ira carregar os produtos
  const pc = document.querySelector('#produtosCompra');
  pc.innerHTML = '';

  // itera o vetor de produtos
  produtos.forEach((i) => {
    // cria a linha da tabela
    let tr = document.createElement('tr');

    // cria e edita os dados da linha
    let nome = document.createElement('td');
    nome.innerHTML = i.nome;
    let qtd = document.createElement('td');
    qtd.innerHTML = i.qtd;
    let unidade = document.createElement('td');
    unidade.innerHTML = i.unidade;

    // cria o checkbox
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = 'check' + i.id;
    checkbox.value = i.check;

    // salva a alteracao
    localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

    // insere o check box no td
    let checkArea = document.createElement('td');
    checkArea.appendChild(checkbox);


    // adiciona os dados a linha
    tr.appendChild(nome);
    tr.appendChild(qtd);
    tr.appendChild(unidade);
    tr.appendChild(checkArea);

    checkbox.addEventListener('change', function () {
      if (this.checked) {
        i.check = true;
        console.log(i.check);
      } else {
        i.check = false;
      }
      // salva a alteracao
      localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));
    });

    //alterar nome ou excluir linha
    nome.onclick = () => {
      nome.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          console.log("podeEditar:" + podeEditar);
          // cria o elemento para edicao
          var inputNome = document.createElement("INPUT");
          // define os atributos do elemento
          inputNome.setAttribute("type", "text");
          inputNome.setAttribute("class", "field alterarInput");
          inputNome.id = 'inputNome' + i.id;
          inputNome.value = i.nome;

          // adiciona o elemento no conteudo
          nome.innerHTML = '';
          nome.appendChild(inputNome);

          // cria o dom do elemento
          let domNome = document.querySelector('#inputNome' + i.id)

          // foca no elemento
          domNome.focus();

          // cria o botao de excluir do elemento
          let btnExcluir = document.createElement('BUTTON');
          btnExcluir.innerHTML = '<img src="https://i.imgur.com/7aqb9PH.png" />';
          btnExcluir.setAttribute('id', "btnExcluir" + i.id);
          btnExcluir.setAttribute('class', 'button primary');
          // limpa o checkArea e adiciona o botao de exclusao
          checkArea.innerHTML = '';
          checkArea.appendChild(btnExcluir);

          // se tiver blur salva a alteracao
          domNome.addEventListener('blur', () => {
            // remove o botao de excluir depois de 10 milisegundos       
            var delayInMilliseconds = 2;
            setTimeout(function () {
              checkArea.innerHTML = '';
              checkArea.appendChild(checkbox);
            }, delayInMilliseconds);

            podeEditar = true;
            console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = produtosCompras.findIndex((obj) => obj.id == i.id);
            produtosCompras[pos].nome = inputNome.value;
            nome.innerHTML = i.nome; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

            // chama a exclusao
            btnExcluir.onclick = () => {
              // cria uma nova copia do vetor sem o objeto excluido
              produtosCompras = produtosCompras.filter((obj) => obj.id != i.id);
              // salva a alteracao
              localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));
              tr.setAttribute('class', 'hidden');

              // tira o foco do objeto removido
              domNome.blur();

              podeEditar = true;
              console.log("podeEditar:" + podeEditar); // permite uma nova alteracao

            } // fim do btnExcluir
          });
        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do nome.onclick()

    // alterar qtd ou excluir linha
    qtd.onclick = () => {
      qtd.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          console.log("podeEditar:" + podeEditar);
          // cria o elemento para edicao
          var inputQtd = document.createElement("INPUT");
          // define os atributos do elemento
          inputQtd.setAttribute("type", "number");
          inputQtd.setAttribute("class", "field alterarInput");
          inputQtd.id = 'inputQtd' + i.id;
          inputQtd.value = i.qtd;

          // adiciona o elemento no conteudo
          qtd.innerHTML = '';
          qtd.appendChild(inputQtd);

          // cria o dom do elemento
          let domQtd = document.querySelector('#inputQtd' + i.id)

          // foca no elemento
          domQtd.focus();

          // cria o botao de excluir do elemento
          let btnExcluir = document.createElement('BUTTON');
          btnExcluir.innerHTML = '<img src="https://i.imgur.com/7aqb9PH.png" />';
          btnExcluir.setAttribute('id', "btnExcluir" + i.id);
          btnExcluir.setAttribute('class', 'button primary');
          // limpa o checkArea e adiciona o botao de exclusao
          checkArea.innerHTML = '';
          checkArea.appendChild(btnExcluir);

          // se tiver blur salva a alteracao
          domQtd.addEventListener('blur', () => {
            // remove o botao de excluir depois de 10 milisegundos       
            var delayInMilliseconds = 2;
            setTimeout(function () {
              checkArea.innerHTML = '';
              checkArea.appendChild(checkbox);
            }, delayInMilliseconds);

            podeEditar = true;
            console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = produtosCompras.findIndex((obj) => obj.id == i.id);
            produtosCompras[pos].qtd = inputQtd.value;
            qtd.innerHTML = i.qtd; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

            // chama a exclusao
            btnExcluir.onclick = () => {
              // cria uma nova copia do vetor sem o objeto excluido
              produtosCompras = produtosCompras.filter((obj) => obj.id != i.id);
              // salva a alteracao
              localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));
              tr.setAttribute('class', 'hidden');

              // tira o foco do objeto removido
              domQtd.blur();

              podeEditar = true;
              console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            } // fim do btnExcluir

          });

        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do qtd.onclick()

    // alterar unidade ou excluir linha
    unidade.onclick = () => {
      unidade.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          console.log("podeEditar:" + podeEditar);
          // cria o elemento para edicao
          var inputUnidade = document.createElement("INPUT");
          // define os atributos do elemento
          inputUnidade.setAttribute("type", "text");
          inputUnidade.setAttribute("class", "field alterarInput");
          inputUnidade.id = 'inputUnidade' + i.id;
          inputUnidade.value = i.unidade;

          // adiciona o elemento no conteudo
          unidade.innerHTML = '';
          unidade.appendChild(inputUnidade);

          // cria o dom do elemento
          let domUnidade = document.querySelector('#inputUnidade' + i.id)

          // foca no elemento
          domUnidade.focus();

          // cria o botao de excluir do elemento
          let btnExcluir = document.createElement('BUTTON');
          btnExcluir.innerHTML = '<img src="https://i.imgur.com/7aqb9PH.png" />';
          btnExcluir.setAttribute('id', "btnExcluir" + i.id);
          btnExcluir.setAttribute('class', 'button primary');
          // limpa o checkArea e adiciona o botao de exclusao
          checkArea.innerHTML = '';
          checkArea.appendChild(btnExcluir);

          // se tiver blur salva a alteracao
          domUnidade.addEventListener('blur', () => {
            // remove o botao de excluir depois de 10 milisegundos       
            var delayInMilliseconds = 2;
            setTimeout(function () {
              checkArea.innerHTML = '';
              checkArea.appendChild(checkbox);
            }, delayInMilliseconds);

            podeEditar = true;
            console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = produtosCompras.findIndex((obj) => obj.id == i.id);
            produtosCompras[pos].unidade = inputUnidade.value;
            unidade.innerHTML = i.unidade; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

            // chama a exclusao
            btnExcluir.onclick = () => {
              // cria uma nova copia do vetor sem o objeto excluido
              produtosCompras = produtosCompras.filter((obj) => obj.id != i.id);
              // salva a alteracao
              localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));
              tr.setAttribute('class', 'hidden');

              // tira o foco do objeto removido
              domUnidade.blur();

              podeEditar = true;
              console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            } // fim do btnExcluir

          });

        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do unidade.onclick()

    // adiciona a linha da tabela ao conteudo
    pc.appendChild(tr);

  }); // fim do for
}; // fim do mostraProdutosCompra

export const mostraDispensa = () => {
  // pega o conteudo que sera preenchido
  const di = document.querySelector('#dispensa');
  di.innerHTML = '';
  // itera o vetor de dispensa
  dispensa.forEach((i) => {
    // cria a linha da tabela
    let tr = document.createElement('tr');

    // cria e edita os dados da linha
    let nome = document.createElement('td');
    nome.innerHTML = i.nome;
    let qtd = document.createElement('td');
    qtd.innerHTML = i.qtd;
    let unidade = document.createElement('td');
    unidade.innerHTML = i.unidade;
    let validade = document.createElement('td');
    if (i.validade == null) validade.innerHTML = "dd/mm/aa";
    else validade.innerHTML = convertDate(i.validade);


    // adiciona os dados a linha
    tr.appendChild(nome);
    tr.appendChild(qtd);
    tr.appendChild(unidade);
    tr.appendChild(validade);

    //alterar nome ou excluir linha
    nome.onclick = () => {
      nome.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          console.log("podeEditar:" + podeEditar);
          // cria o elemento para edicao
          var inputNome = document.createElement("INPUT");
          // define os atributos do elemento
          inputNome.setAttribute("type", "text");
          inputNome.setAttribute("class", "field alterarInput");
          inputNome.id = 'inputNomedi' + i.id;
          inputNome.value = i.nome;

          // adiciona o elemento no conteudo
          nome.innerHTML = '';
          nome.appendChild(inputNome);

          // cria o dom do elemento
          let domNome = document.querySelector('#inputNomedi' + i.id)

          // foca no elemento
          domNome.focus();

          // cria o botao de excluir do elemento
          let btnExcluir = document.createElement('BUTTON');
          btnExcluir.innerHTML = '<img src="https://i.imgur.com/7aqb9PH.png" />';
          btnExcluir.setAttribute('id', "btnExcluir" + i.id);
          btnExcluir.setAttribute('class', 'button primary');
          // limpa o checkArea e adiciona o botao de exclusao
          validade.innerHTML = '';
          validade.appendChild(btnExcluir);

          // se tiver blur salva a alteracao
          domNome.addEventListener('blur', () => {
            // remove o botao de excluir depois de 10 milisegundos       
            var delayInMilliseconds = 2;
            setTimeout(function () {
              validade.innerHTML = '';
              if (i.validade != null)
                validade.innerHTML = convertDate(i.validade); // altera na visualizacao
              else validade.innerHTML = convertDate('yyyy-mm-dd');
            }, delayInMilliseconds);

            podeEditar = true;
            console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = dispensa.findIndex((obj) => obj.id == i.id);
            dispensa[pos].nome = inputNome.value;
            nome.innerHTML = i.nome; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('dispensa', JSON.stringify(dispensa));

            // chama a exclusao
            btnExcluir.onclick = () => {
              // cria uma nova copia do vetor sem o objeto excluido
              dispensa = dispensa.filter((obj) => obj.id != i.id);
              // salva a alteracao
              localStorage.setItem('dispensa', JSON.stringify(dispensa));
              tr.setAttribute('class', 'hidden');

              // tira o foco do objeto removido
              domNome.blur();

              podeEditar = true;
              console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            } // fim do btnExcluir
          });
        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do nome.onclick()

    // alterar qtd ou excluir linha
    qtd.onclick = () => {
      qtd.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          console.log("podeEditar:" + podeEditar);
          // cria o elemento para edicao
          var inputQtd = document.createElement("INPUT");
          // define os atributos do elemento
          inputQtd.setAttribute("type", "number");
          inputQtd.setAttribute("class", "field alterarInput");
          inputQtd.id = 'inputQtddi' + i.id;
          inputQtd.value = i.qtd;

          // adiciona o elemento no conteudo
          qtd.innerHTML = '';
          qtd.appendChild(inputQtd);

          // cria o dom do elemento
          let domQtd = document.querySelector('#inputQtddi' + i.id)

          // foca no elemento
          domQtd.focus();

          // cria o botao de excluir do elemento
          let btnExcluir = document.createElement('BUTTON');
          btnExcluir.innerHTML = '<img src="https://i.imgur.com/7aqb9PH.png" />';
          btnExcluir.setAttribute('id', "btnExcluir" + i.id);
          btnExcluir.setAttribute('class', 'button primary');
          // limpa o checkArea e adiciona o botao de exclusao
          validade.innerHTML = '';
          validade.appendChild(btnExcluir);

          // se tiver blur salva a alteracao
          domQtd.addEventListener('blur', () => {
            // remove o botao de excluir depois de 10 milisegundos       
            var delayInMilliseconds = 2;
            setTimeout(function () {
              validade.innerHTML = '';
              if (i.validade != null)
                validade.innerHTML = convertDate(i.validade); // altera na visualizacao
              else validade.innerHTML = convertDate('yyyy-mm-dd');
            }, delayInMilliseconds);

            podeEditar = true;
            console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = dispensa.findIndex((obj) => obj.id == i.id);
            dispensa[pos].qtd = inputQtd.value;
            qtd.innerHTML = i.qtd; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('dispensa', JSON.stringify(dispensa));

            // chama a exclusao
            btnExcluir.onclick = () => {
              // cria uma nova copia do vetor sem o objeto excluido
              dispensa = dispensa.filter((obj) => obj.id != i.id);
              // salva a alteracao
              localStorage.setItem('dispensa', JSON.stringify(dispensa));
              tr.setAttribute('class', 'hidden');

              // tira o foco do objeto removido
              domQtd.blur();

              podeEditar = true;
              console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            } // fim do btnExcluir

          });

        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do qtd.onclick()

    // alterar unidade ou excluir linha
    unidade.onclick = () => {
      unidade.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          console.log("podeEditar:" + podeEditar);
          // cria o elemento para edicao
          var inputUnidade = document.createElement("INPUT");
          // define os atributos do elemento
          inputUnidade.setAttribute("type", "text");
          inputUnidade.setAttribute("class", "field alterarInput");
          inputUnidade.id = 'inputUnidadedi' + i.id;
          inputUnidade.value = i.unidade;

          // adiciona o elemento no conteudo
          unidade.innerHTML = '';
          unidade.appendChild(inputUnidade);

          // cria o dom do elemento
          let domUnidade = document.querySelector('#inputUnidadedi' + i.id)

          // foca no elemento
          domUnidade.focus();

          // cria o botao de excluir do elemento
          let btnExcluir = document.createElement('BUTTON');
          btnExcluir.innerHTML = '<img src="https://i.imgur.com/7aqb9PH.png" />';
          btnExcluir.setAttribute('id', "btnExcluir" + i.id);
          btnExcluir.setAttribute('class', 'button primary');
          // limpa o checkArea e adiciona o botao de exclusao
          validade.innerHTML = '';
          validade.appendChild(btnExcluir);

          // se tiver blur salva a alteracao
          domUnidade.addEventListener('blur', () => {
            // remove o botao de excluir depois de 10 milisegundos       
            var delayInMilliseconds = 2;
            setTimeout(function () {
              validade.innerHTML = '';
              if (i.validade != null)
                validade.innerHTML = convertDate(i.validade); // altera na visualizacao
              else validade.innerHTML = convertDate('yyyy-mm-dd');
            }, delayInMilliseconds);

            podeEditar = true;
            console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
            // altera o elemento no vetor
            let pos = dispensa.findIndex((obj) => obj.id == i.id);
            dispensa[pos].unidade = inputUnidade.value;
            unidade.innerHTML = i.unidade; // altera na visualizacao

            // salva a alteracao
            localStorage.setItem('dispensa', JSON.stringify(dispensa));

            // chama a exclusao
            btnExcluir.onclick = () => {
              // cria uma nova copia do vetor sem o objeto excluido
              dispensa = dispensa.filter((obj) => obj.id != i.id);
              // salva a alteracao
              localStorage.setItem('dispensa', JSON.stringify(dispensa));
              tr.setAttribute('class', 'hidden');

              // tira o foco do objeto removido
              domUnidade.blur();

              podeEditar = true;
              console.log("podeEditar:" + podeEditar); // permite uma nova alteracao

            } // fim do btnExcluir

          });

        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do unidade.onclick()

    // alterar validade ou excluir linha
    validade.onclick = () => {
      validade.onclick = () => {
        if (podeEditar) {
          // determina a flag como false para evitar outras alteracoes
          podeEditar = false;
          console.log("podeEditar:" + podeEditar);
          // cria o elemento para edicao
          var inputValidade = document.createElement("INPUT");
          // define os atributos do elemento
          inputValidade.setAttribute("type", "date");
          inputValidade.setAttribute("class", "field alterarInput");
          inputValidade.id = 'inputValidadedi' + i.id;
          inputValidade.value = i.validade;

          console.log("VALIDADE 1075" + i.validade);

          // adiciona o elemento no conteudo
          validade.innerHTML = '';
          validade.appendChild(inputValidade);

          // cria o dom do elemento
          let domValidade = document.querySelector('#inputValidadedi' + i.id)

          // foca no elemento
          domValidade.focus();

          // cria o botao de excluir do elemento
          let btnExcluir = document.createElement('BUTTON');
          btnExcluir.innerHTML = '<img src="https://i.imgur.com/7aqb9PH.png" />';
          btnExcluir.setAttribute('id', "btnExcluir" + i.id);
          btnExcluir.setAttribute('class', 'button primary');
          // limpa um campo e adiciona o botao de exclusao
          unidade.innerHTML = '';
          unidade.appendChild(btnExcluir);

          inputValidade.addEventListener('change', function () {
            if (inputValidade.value != null)
              i.validade = inputValidade.value;
            console.log("VALIDADE 1099" + i.validade);
            podeEditar = true;
            console.log("podeEditar:" + podeEditar); // permite uma nova alteracao
          });

          // se tiver blur salva a alteracao
          domValidade.addEventListener('blur', () => {
            // remove o botao de excluir e restaura o campo depois de 10 milisegundos       
            var delayInMilliseconds = 2;
            setTimeout(function () {
              unidade.innerHTML = '';
              unidade.innerHTML = i.unidade;
            }, delayInMilliseconds);

            podeEditar = true;
            console.log("podeEditar:" + podeEditar); // permite uma nova alteracao

            // pega a pos do elemento no vetor
            let pos = dispensa.findIndex((obj) => obj.id == i.id);
            // se o elemento nao for nulo, valida a alteracao
            if (inputValidade.value != null) {
              // altera o elemento no vetor
              //dispensa[pos].validade = inputValidade.value;

              // altera na visualizacao
              validade.innerHTML = convertDate(i.validade);

              // salva a alteracao
              localStorage.setItem('dispensa', JSON.stringify(dispensa));
            } else {
              dispensa[pos].validade = 'yyyy-mm-dd';
              validade.innerHTML = convertDate('yyyy-mm-dd');
            }
            // chama a exclusao
            btnExcluir.onclick = () => {
              // cria uma nova copia do vetor sem o objeto excluido
              dispensa = dispensa.filter((obj) => obj.id != i.id);
              // salva a alteracao
              localStorage.setItem('dispensa', JSON.stringify(dispensa));
              tr.setAttribute('class', 'hidden');

              // garante a edicao apos a exclusao
              podeEditar = true;
              console.log("podeEditar:" + podeEditar);
            } // fim do btnExcluir

          });

        } // fim do if pode editar
      }; // fim do segundo click
    }; // fim do validade.onclick()

    // adiciona a linha da tabela ao conteudo
    di.appendChild(tr);

  }); // fim do for
}; // fim do mostraProdutosCompra

const desabilitaCampos = () => {
  // esconde campos opcionais
  let divQtd = document.getElementById('divQtd').style;
  divQtd.visibility = 'hidden'; divQtd.position = 'fixed'

  let divUnidade = document.getElementById('divUnidade').style;
  divUnidade.visibility = 'hidden'; divUnidade.position = 'fixed'

  let divValidade = document.getElementById('divValidade').style;
  divValidade.visibility = 'hidden'; divValidade.position = 'fixed'

}

const habilitaCampo = (idCampo) => {
  let elemento = document.getElementById(idCampo).style;
  elemento.visibility = 'visible'; elemento.position = 'relative';
}

export const convertDate = (date) => {
  //date = 'yyyy-mm-dd';
  let dateSplit = date.split('-');
  let newdate = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0].slice(2, 4);
  return newdate;
}

function addCompra() {
  ativa('formulario');
  // foca no campo
  document.querySelector('#nome').focus();

  // esconde a barra de navegacao
  let nav = document.getElementById('nav').style;
  nav.visibility = 'hidden';

  // muda o titulo do formulario
  let lblNome = document.querySelector('#lblNome');
  lblNome.innerHTML = 'Adicionar lista de compras';

  // muda o nome do item do formulario
  let lblItem = document.querySelector('#lblItem');
  lblItem.innerHTML = 'Nome da Lista:';

  // esconde campos desnecessarios
  desabilitaCampos();

  // evento de inclusao
  document.querySelector('#btnInc').onclick = () => {
    let inputNome = document.getElementById('nome');

    // se o campo nao estiver vazio
    if (inputNome.value != '') {
      // insere o elemento
      listasDeCompras.push({
        id: Math.random().toString().replace('0.', ''),
        nome: inputNome.value,
      });
      // atualiza a lista
      mostraListasCompras();
      // salva localmente
      localStorage.setItem('listasDeCompras', JSON.stringify(listasDeCompras));

      // limpa o valor do campo
      inputNome.value = '';
      // volta a cor do field para o normal
      inputNome.style.borderColor = '#8f9799';

      // volta para tela anterior         
      ativa('tela1');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    } else { // caso de valor faltando no formulario
      // torna vermelho o campo com o valor faltando
      inputNome.style.borderColor = '#f00';
    }
  };

  // evento de cancelar
  document.querySelector('#btnCanc').onclick = () => {
    let inputNome = document.getElementById('nome');
    // limpa o valor do campo
    inputNome.value = '';
    // volta a cor do field para o normal
    inputNome.style.borderColor = '#8f9799';
    // volta para tela anterior         
    ativa('tela1');

    // mostra a barra de navegacao
    nav.visibility = 'visible';
  };
} // fim addCompra

function addProduto() {
  // ativa a tela de formulario
  ativa('formulario');

  // foca no campo
  document.querySelector('#nome').focus();

  // esconde a barra de navegacao
  let nav = document.getElementById('nav').style;
  nav.visibility = 'hidden';

  // muda o titulo do formulario
  let lblNome = document.querySelector('#lblNome');
  lblNome.innerHTML = 'Adicionar Produto';

  // muda o nome do item do formulario
  let lblItem = document.querySelector('#lblItem');
  lblItem.innerHTML = 'Nome do Item:';

  // esconde campos desnecessarios
  desabilitaCampos();

  // habilita campos necessarios
  habilitaCampo('divQtd');
  habilitaCampo('divUnidade');

  // evento de inclusao
  document.querySelector('#btnInc').onclick = () => {
    // cria os objetos correspondentes aos campos do formulario
    let inputNome = document.getElementById('nome');
    let inputQtd = document.getElementById('qtd');
    let inputUnidade = document.getElementById('unidade');

    // torna vermelho o campo com o valor faltando 
    //ou remove o vermelho do campo com valor preenchido
    if (inputNome.value == '') inputNome.style.borderColor = '#f00';
    else inputNome.style.borderColor = '#8f9799';

    if (inputQtd.value == '') inputQtd.style.borderColor = '#f00';
    else inputQtd.style.borderColor = '#8f9799';

    if (inputUnidade.value == '') inputUnidade.style.borderColor = '#f00';
    else inputUnidade.style.borderColor = '#8f9799';

    // se os campos nao estiverem vazios
    if (inputNome.value != '' && inputQtd.value != '' && inputUnidade.value != '') {
      // insere o elemento
      produtosCompras.push({
        idLista: idLista,
        id: Math.random().toString().replace('0.', ''),
        nome: inputNome.value,
        qtd: inputQtd.value,
        unidade: inputUnidade.value
      });
      // atualiza a lista
      mostraProdutosCompra();
      // salva localmente
      localStorage.setItem('produtosCompras', JSON.stringify(produtosCompras));

      // limpa o valor dos campos
      inputNome.value = '';
      inputQtd.value = '';
      inputUnidade.value = '';

      // volta a cor dos fields para o normal
      inputNome.style.borderColor = '#8f9799';
      inputQtd.style.borderColor = '#8f9799';
      inputUnidade.style.borderColor = '#8f9799';

      // volta para tela anterior         
      ativa('tela3');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    }
  };

  // evento de cancelar
  document.querySelector('#btnCanc').onclick = () => {
    let inputNome = document.getElementById('nome');
    let inputQtd = document.getElementById('qtd');
    let inputUnidade = document.getElementById('unidade');

    // limpa o valor dos campos
    inputNome.value = '';
    inputQtd.value = '';
    inputUnidade.value = '';

    // volta a cor dos fields para o normal
    inputNome.style.borderColor = '#8f9799';
    inputQtd.style.borderColor = '#8f9799';
    inputUnidade.style.borderColor = '#8f9799';

    // volta para tela anterior         
    ativa('tela3');

    // mostra a barra de navegacao
    nav.visibility = 'visible';
  };
} // fim addProduto

function addDispensa() {
  // ativa a tela de formulario
  ativa('formulario');

  // foca no campo
  document.querySelector('#nome').focus();

  // esconde a barra de navegacao
  let nav = document.getElementById('nav').style;
  nav.visibility = 'hidden';

  // muda o titulo do formulario
  let lblNome = document.querySelector('#lblNome');
  lblNome.innerHTML = 'Adicionar na Dispensa';

  // muda o nome do item do formulario
  let lblItem = document.querySelector('#lblItem');
  lblItem.innerHTML = 'Nome do Item:';

  // esconde campos desnecessarios
  desabilitaCampos();

  // habilita campos necessarios
  habilitaCampo('divQtd');
  habilitaCampo('divUnidade');
  habilitaCampo('divValidade');


  // evento de inclusao
  document.querySelector('#btnInc').onclick = () => {
    // cria os objetos correspondentes aos campos do formulario
    let inputNome = document.getElementById('nome');
    let inputQtd = document.getElementById('qtd');
    let inputUnidade = document.getElementById('unidade');
    let inputValidade = document.getElementById('validade');

    // torna vermelho o campo com o valor faltando 
    //ou remove o vermelho do campo com valor preenchido
    if (inputNome.value == '') inputNome.style.borderColor = '#f00';
    else inputNome.style.borderColor = '#8f9799';

    if (inputQtd.value == '') inputQtd.style.borderColor = '#f00';
    else inputQtd.style.borderColor = '#8f9799';

    if (inputUnidade.value == '') inputUnidade.style.borderColor = '#f00';
    else inputUnidade.style.borderColor = '#8f9799';

    if (inputValidade.value == '') inputValidade.style.borderColor = '#f00';
    else inputValidade.style.borderColor = '#8f9799';

    // se os campos nao estiverem vazios
    if (inputNome.value != '' && inputQtd.value != ''
      && inputUnidade.value != '' && inputValidade.value != '') {
      // insere o elemento
      dispensa.push({
        idLista: idLista,
        id: Math.random().toString().replace('0.', ''),
        nome: inputNome.value,
        qtd: inputQtd.value,
        unidade: inputUnidade.value,
        validade: inputValidade.value
      });
      // atualiza a lista
      mostraDispensa();
      // salva localmente
      localStorage.setItem('dispensa', JSON.stringify(dispensa));

      // limpa o valor dos campos
      inputNome.value = '';
      inputQtd.value = '';
      inputUnidade.value = '';
      inputValidade.value = '';

      // volta a cor dos fields para o normal
      inputNome.style.borderColor = '#8f9799';
      inputQtd.style.borderColor = '#8f9799';
      inputUnidade.style.borderColor = '#8f9799';
      inputValidade.style.borderColor = '#8f9799';

      // volta para tela anterior         
      ativa('tela2');

      // mostra a barra de navegacao
      nav.visibility = 'visible';
    }
  };

  // evento de cancelar
  document.querySelector('#btnCanc').onclick = () => {
    let inputNome = document.getElementById('nome');
    let inputQtd = document.getElementById('qtd');
    let inputUnidade = document.getElementById('unidade');
    let inputValidade = document.getElementById('validade');

    // limpa o valor dos campos
    inputNome.value = '';
    inputQtd.value = '';
    inputUnidade.value = '';
    inputValidade.value = '';

    // volta a cor dos fields para o normal
    inputNome.style.borderColor = '#8f9799';
    inputQtd.style.borderColor = '#8f9799';
    inputUnidade.style.borderColor = '#8f9799';
    inputValidade.style.borderColor = '#8f9799';

    // volta para tela anterior         
    ativa('tela2');

    // mostra a barra de navegacao
    nav.visibility = 'visible';
  };
} // fim addDispensa

function mostraValidade() {
  ativa('telaValidade');
}

function mostraQuantidade() {
  ativa('telaQuantidade');
}
