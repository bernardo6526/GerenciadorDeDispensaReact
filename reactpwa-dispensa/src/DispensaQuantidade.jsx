import React, { Component } from "react";

import refresh from './imagens/refresh.png';

class DispensaQuantidade extends Component {
    state = {
        dispensa: []
    };


    constructor(props) {
        super(props);
        let t = JSON.parse(localStorage.getItem('dispensa'));
        t = this.ordenarQuantidade(t);
        if (t) this.state.dispensa = t;
    }

    render() {
        return (
            <React.Fragment>
                <div className="componentHeader">
                    <h1>Controle de Qtd</h1>
                    <button className="button primary mvLeft3" onClick={this.dispensaUpdate}>
                        <img src={refresh} />
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
                <table className="table mt6">
                    {this.mostraVencedores()}
                </table>
            </React.Fragment>
        );
    }

    dispensaUpdate = () => {
        let t = JSON.parse(localStorage.getItem('dispensa'));
        t = this.ordenarQuantidade(t);
        this.setState({
            dispensa: t,
        });
    };

    ordenarQuantidade = (t) => {
        let new_t = [];
        if(t != null) new_t = t;
        new_t.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return a.qtd - b.qtd;
        });

        return new_t;
    };

    mostraVencedores() {
        return (
            <React.Fragment>
                {this.state.dispensa.map((item, index) => (
                    <tr>
                        <td>{item.nome}</td>
                        <td>{item.qtd}</td>
                        <td>{item.unidade}</td>
                        <td>{this.convertDate(item.validade)}</td>
                    </tr>
                ))}
            </React.Fragment>
        );
    }

    convertDate = (date) => {
        //date = 'yyyy-mm-dd';
        let dateSplit = date.split('-');
        let newdate = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0].slice(2, 4);
        return newdate;
    };
}

export default DispensaQuantidade;

