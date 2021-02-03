let pacientes = { 
    nome: "",
    peso: 0,
    altura: 0,
    imc: 0,
    resultado: "",
    erros: [],
    validador: document.querySelector("#validador"),
    form: document.querySelector("form"),
    deletarPaciente: true,
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
        this.erros.forEach((value, indice) => {
            this.erros.splice(indice);
        });
    },
    // Obtem as informações
    getInformacoes() {
        this.nome = document.querySelector("#nome").value;
        this.peso = document.querySelector("#peso").value;
        this.altura = document.querySelector("#altura").value;
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
            
            this.erros.push("Paciente foi adicionado, clique em salvar!");
            this.imprimirErros(this.erros);
            
            setTimeout(() => {
                this.validador.style.display = "none";
                this.form.reset();
            }, 3000);
        }   
        
    },
    //Imprime os erros, caso tenha
    imprimirErros(erros){
        let imprimir = "";
        this.validador.style.display = "block";
        erros.forEach((valor) => {
            imprimir += `${valor} <br>`;
            this.validador.innerHTML = imprimir;
        })    
    },
    //Cria o elemento da tabela e adiciona
    adicionarElementos(){
        let tabelaPacientes = document.querySelector("#tabela-pacientes");
        const linhaTabela = document.createElement("tr");
        linhaTabela.classList.add("paciente");
        
        let montarTabela = `
            <td class="info-nome">${this.nome}</td>
            <td class="info-peso">${this.peso} Kg</td>
            <td class="info-altura">${this.altura} M</td>
            <td class="info-imc">${this.imc}</td>
        `;
        if(!this.deletarPaciente){
            montarTabela += `<td class="info-resultado">${this.resultado}</td>`;
        }else{
            montarTabela += `
                <td class="info-resultado">
                    <span style="display: block;">${this.resultado}</span>
                    <img src="./src/img/delete.png" onclick="`+"`${Bpacientes.deletarPacientes(event)}`"+`" alt="" style="display: block;">
                </td>
            `;
        }   
        
        linhaTabela.innerHTML = montarTabela;
        tabelaPacientes.appendChild(linhaTabela);
    },
    validarRepetido(...valores){
        let nomes = document.querySelectorAll(".info-nome");
        let pesos = document.querySelectorAll(".info-peso");
        let alturas = document.querySelectorAll(".info-altura");
        let resultado = document.querySelectorAll(".info-resultado");
      
        for (let i = 0; i < nomes.length; i++) {
            let [peso, altura] = this.limparDados(pesos[i], alturas[i]);
            if((nomes[i].textContent == valores[0]) && (peso == valores[1]) && (altura == valores[2])){
                this.erros.push("Paciente já foi adicionado!");
                this.imprimirErros(this.erros);
                return true;
            }
            
        }
        return false;
    },
    limparDados(peso, altura){
        if (peso) {
            peso = peso.textContent.replace(' Kg', '');
        }else if(altura){
            altura = altura.textContent.replace(' M', '');
            return Number(altura)
        }
        if(altura){
            altura = altura.textContent.replace(' M', '')
        }else{
            return Number(peso);
        }
        return [Number(peso),  Number(altura)];
    }
}

const adicionar = document.querySelector("#add");

adicionar.addEventListener("click", (event) => {
    
    event.preventDefault();

    const tabela = document.querySelector("#tabela-pacientes");

    pacientes.start();

});

const filtro = document.querySelector("#filtre");

filtro.addEventListener("input", function (){
    const nomes = document.querySelectorAll(".info-nome");
    const linhas = document.querySelectorAll(".paciente");
    const expressao = new RegExp(this.value, "i");
    if(this.value.length > 0){
        for (let i = 0; i < nomes.length; i++) {           
            linhas[i].style.display = "none";
            if(expressao.test(nomes[i].textContent)){
                linhas[i].style.display = "table-row" ;
            }
        }
    }else {
        for (let i = 0; i < linhas.length; i++) {
            linhas[i].style.display = "table-row";  
        }
    }
});

