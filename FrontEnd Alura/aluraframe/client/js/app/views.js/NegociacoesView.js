class NegociacoesView {
    constructor(elemento){
        this._elemento = elemento;
    }
    _template (modelo){
        return `<table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${modelo.negociacao.map(valor => {
                            return `<tr>
                                        <td>${DateHelper.dataParaTexto(valor.data)}</td>
                                        <td>${valor.quantidade}</td>
                                        <td>${valor.valor}</td>
                                        <td>${valor.volume}</td>
                                    </tr>`}).join('')}
                       
                    </tbody>
                    <tfoot>
                    <td colspan="3"></td>
                    <td> 
                        ${modelo.negociacao.reduce((valor, valorAtual) => valor + valorAtual.volume, 0.0)}
                    </td>
                    </tfoot>
                </table>`;
    }
    adicionarElemento(modelo){
        return this._elemento.innerHTML = this._template(modelo);
    }
}