let pacientes = { 
    nome: "",
    peso: 0,
    altura: 0,
    imc: 0,
    resultado: "",
    erros: [],
    validador: document.querySelector("#validador"),
    //Da o start
    start(){
        this.getInformacoes();
        this.getNome();
        this.getPeso();
        this.getAltura();
        this.validarInfo();
        this.limparArray(); 
    },
    //Limpar array de erros
    limparArray(){
        this.erros.map((value, indice) => {
            this.erros.splice(indice);
        });
    },
    // Obtem as informações
    getInformacoes() {
        this.nome = document.querySelector("#nome").value;
        this.peso = document.querySelector("#peso").value;
        this.altura = document.querySelector("#altura").value;
    },
    setInformacoes(...valores){

    },
    // Obtem e Valida a Nome
    getNome(){
       if(this.nome) {
            return this.nome;
       }else{
            this.erros.push("O nome não pode ser em branco!");
       }
    },
    // Obtem e Valida a peso
    getPeso() {
        if(this.peso){
            if(this.peso > 0 && this.peso < 1000){
                return this.peso;
            }else{
                this.erros.push("Peso é Inválido!");
            }  
        }else{
            this.erros.push("O peso não pode ser em branco!");
        }
        
    },
    // Obtem e Valida a altura
    getAltura() {
        if(this.altura){
            if (this.altura > 0 && this.altura <= 3.00){
                return this.altura;
            }else{
                this.erros.push("Altura é inválida!");
            }
        }else{
            this.erros.push("A altura não pode ser em branco!");
        }
    },  
    //Calcula IMC e atribui o resultado
    calculaIMC(){
        this.imc = (this.peso / (this.altura * this.altura)).toFixed(2);
        if(this.imc < 18.5){
            this.resultado = "Magreza, Obesidade 0";
        }else if(this.imc >= 18.5 && this.imc <= 24.9){
            this.resultado = "Normal, Obsidade 0";
        }else if(this.imc >= 25 && this.imc <= 29.9){
            this.resultado = "Sobrepeso, Obesidade I";
        }else if(this.imc >= 30 && this.imc <= 39.9){
            this.resultado =    "Obesidade II";
        }else if(this.imc >= 40){
            this.resultado = "Obesidade Grave III";
        }
    },
    //Valida se tem erro e adiciona o elemento 
    validarInfo(){
        if(this.erros.length > 0){
            this.validador.style.display = "table-row";
            this.imprimirErros(this.erros);
        }else if((this.validarRepetido(this.nome, this.peso, this.altura)) == false){
            this.calculaIMC();
            this.adicionarElementos();
            const form = document.querySelector("form")
            this.validador.style.display = "none";
            form.reset();
        }   
    },
    //Imprime os erros, caso tenha
    imprimirErros(erros){
        let imprimir = "";
        this.validador.style.display = "block";
        erros.forEach((valor) => {
            imprimir += `${valor} <br>`;
            this.validadoreste.innerHTML = imprimir;
        })    
    },
    //Cria o elemento da tabela e adiciona
    adicionarElementos(){
        let tabelaPacientes = document.querySelector("#tabela-pacientes");
        const linhaTabela = document.createElement("tr")
        let montarTabela = `
            <td class="info-nome">${this.nome}</td>
            <td class="info-peso">${this.peso} Kg</td>
            <td class="info-altura">${this.altura} M</td>
            <td class="info-imc">${this.imc}</td>
            <td class="info-resultado">${this.resultado}</td>
        `;
        linhaTabela.innerHTML = montarTabela;
        tabelaPacientes.appendChild(linhaTabela);
    },
    validarRepetido(...valores){
        let nomes = document.querySelectorAll(".info-nome");
        const pesos = document.querySelectorAll(".info-peso");
        const alturas = document.querySelectorAll(".info-altura");
        for (let i = 0; i < nomes.length; i++) {
            if((nomes[i].textContent == valores[0]) && (pesos[i].textContent == valores[1]) && (alturas[i].textContent == valores[2])){
                this.erros.push("Paciente já foi adicionado!");
                this.imprimirErros(this.erros);
                return true;
            }
        }
        return false;
    }
}

const adicionar = document.querySelector("#add");

adicionar.addEventListener("click", (event) => {
    
    event.preventDefault();

    const tabela = document.querySelector("#tabela-pacientes");

    pacientes.start();

});
