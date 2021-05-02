import React, { Component } from "react";


class Dispensa extends Component {
    state = {
        dispensa: []
    };

    constructor(props) {
        super(props);
        const t = JSON.parse(localStorage.getItem('dispensa'));
        if (t) this.state.dispensa = t;
        console.log(this.state.dispensa);
    }

    render() {
        return (

            <table className="table mt3">
                {this.mostraVencedores()}
            </table>
        );
    }

    componentDidUpdate() {
        localStorage.setItem('dispensa', JSON.stringify(this.state.dispensa));
    }

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
    }
}

export default Dispensa;