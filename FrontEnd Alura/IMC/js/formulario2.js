let pacientes = { 
    nome: "",
    peso: 0,
    altura: 0,
    imc: 0,
    erros: [],
    start(){
        this.getInformacoes();
        this.getNome();
        this.getPeso();
        this.getAltura();
        this.validarInfo();
        this.adicionarElementos();
    },
    getInformacoes() {
        this.nome = document.querySelector("#nome").value;
        this.peso = document.querySelector("#peso").value;
        this.altura = document.querySelector("#altura").value;
    },
    setInformacoes(...valores){

    },
    getNome(){
       if(this.nome) {
            return this.nome;
       }else{
            this.erros.push("O nome não pode ser em branco!");
       }
    },
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
    validarInfo(){
        if(this.erros.length > 0){
            this.imprimirErros(this.erros);
        }else{
            this.imc = (this.peso / (this.altura * this.altura)).toFixed(2);
        }
    },
    imprimirErros(erros){
        let imprimir = "";
        let validador = document.querySelector("#validador");
        validador.style.display = "block";
        erros.forEach((valor) => {
            imprimir += `${valor} <br>`;
            validador.innerHTML = imprimir;
        })    
    },
    adicionarElementos(){
        const tabelaPacientes = document.querySelector("#tabela-pacientes");
        let montarTabela = `
        <tr>
            <td>${this.nome}</td>
            <td>${this.peso}</td>
            <td>${this.altura}</td>
            <td>não vou usar</td>
            <td>${this.imc}</td>
        </tr>
        `;
        tabelaPacientes.appendChild(montarTabela);
    }
}


const adicionar = document.querySelector("#add");

adicionar.addEventListener("click", (event) => {
    
    event.preventDefault();

    const tabela = document.querySelector("#tabela-pacientes");
    // console.log("aqui")
    pacientes.start();

});
