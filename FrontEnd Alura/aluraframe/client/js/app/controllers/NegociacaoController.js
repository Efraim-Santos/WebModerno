class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");    
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($("#template"));
        this._negociacoesView.adicionarElemento(this._listaNegociacoes);
    }
    adiciona(event){
        
        event.preventDefault();
        
        let data = DateHelper.textoParaData(this._data.value);
        let texto = DateHelper.dataParaTexto(data);
        
        
        this._listaNegociacoes.adiciona(this.criarNegociacao());

        // console.log(this._listaNegociacoes.negociacao.push("eu"));
        // console.log(this._listaNegociacoes.negociacao);
        
        this._negociacoesView.adicionarElemento(this._listaNegociacoes);
    }
    _limparFormulario(){
        this._data.value = '';
        this._quantidade = '';
        this._valor = '';
    }
    criarNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._data.value),
            this._quantidade.value, 
            this._valor.value);
    }

    valorData(){
        return this._data;
    }
}