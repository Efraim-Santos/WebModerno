class Negociacao {
    
    constructor (data, quantidade, valor){
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        // this._volume = this._volume;
        Object.freeze(this);
    };
    
    get data(){
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade
    }

    get valor(){
        return this._valor
    }

    get calcularVolume(){
        return this._quantidade * this._valor
    }
};