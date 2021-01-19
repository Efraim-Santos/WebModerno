class DateHelper{
    
    constructor(){
        throw new Error("Está classe não pode ser instaciada");
    }

    static textoParaData(texto){
        return new Date(
            ...texto.split('-')
            .map((valor, index) => index == 2 ? valor++ : valor)
        );
    }

    static dataParaTexto(data){
        return `${data.getDate()}/0${data.getMonth()}/${data.getFullYear()}`;
    }

}