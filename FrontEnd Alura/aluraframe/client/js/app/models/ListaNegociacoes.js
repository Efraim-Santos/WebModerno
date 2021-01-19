class ListaNegociacoes {
    constructor(){
        this._negociacao = [];
    }
    adiciona(negociacao){
        this._negociacao.push(negociacao);
    }
    get negociacao(){
        // return [].concat(this._negociacao);
        return [...this._negociacao];
    }

}