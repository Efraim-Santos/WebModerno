var adicionar = document.querySelector("#add")
var filtro = document.querySelector("#filtre")

adicionar.addEventListener("click", (event)=>{
    
    event.preventDefault()
    
    let pacientes = document.querySelector("#tabela-pacientes")
    var validador = document.querySelector("#validador")
    let form = document.querySelector("form")

    getInformacoes ? pacientes.appendChild(getInformacoes()) : false

    form.reset();
})

// Filtrar paciente
filtro.addEventListener("input", function(){
    let nomes = document.querySelectorAll(".info-nome")
    let linhas = document.querySelectorAll(".paciente") 
   
    //******* Com expressão regular *********

    // let expressao = new RegExp(this.value, "i")
  
    // if(this.value.length > 0){
    //     for (let i = 0; i < nomes.length; i++) {           
    //        linhas[i].style.display = "none"
    //         if(expressao.test(nomes[i].textContent)){
    //             linhas[i].style.display = "table-row" 
    //         }
    //     }
    // }else {
    //     for (let i = 0; i < linhas.length; i++) {
    //         linhas[i].style.display = "table-row"  
    //     }
    // }
    
    // Usando subString
    if(this.value.length > 0){
        for (let i = 0; i < nomes.length; i++) { 
            linhas[i].style.display = "none"
            let texto = nomes[i].textContent
            texto = texto.substring(0, this.value.length)
            texto = texto.toLocaleLowerCase()
            if(this.value == texto){
                linhas[i].style.display = "table-row" 
            }
        }
    }else{
        for (let i = 0; i < linhas.length; i++) {
            linhas[i].style.display = "table-row"  
        }
    } 
})
//Valida se existe paciente com os mesmos dados
function validarRepedtido(nome, peso, altura, gordura){
    let nomes = document.querySelectorAll(".info-nome")
    let pesos = document.querySelectorAll(".info-peso")
    let alturas = document.querySelectorAll(".info-altura")
    let gorduras = document.querySelectorAll(".info-gordura")

    for (let i = 0; i < nomes.length; i++) {
        if((nomes[i].textContent == nome) && (pesos[i].textContent == peso) && (alturas[i].textContent == altura) && (gorduras[i].textContent == gordura)){
            var aux = []
            aux.push("Paciente já foi adicionado!")
            imprimirErros(aux, validador)
            return true
        }
    }
    return false
}

function getInformacoes(){
    let nome = document.querySelector("#nome").value
    let peso = document.querySelector("#peso").value
    let altura = document.querySelector("#altura").value
    let gordura = document.querySelector("#gordura").value

   if(validarInfo(nome, peso, altura, gordura)){
        if (!(validarRepedtido(nome, peso, altura, gordura))){
            validador.style.display = "none"
            return criarElemento(nome, peso, altura, gordura)
        }
   }else {
       return false
   }
}
//Validar informações passadas no formulario
function validarInfo(nome, peso, altura, gordura){

    var erros = []
    
    if(nome && peso && altura && gordura){
        
        let pesoEhValido, alturaEhValida, gorduraEhValida = false

        validaPeso(peso) ? pesoEhValido = true : erros.push("Peso é Inválido!")
        validaAltura(altura) ? alturaEhValida = true : erros.push("Altura é inválida!")
        validaPeso(peso) ? gorduraEhValida = true : erros.push("Gordura é Inválida!")

        if (pesoEhValido && alturaEhValida && gorduraEhValida) {
            return true
        }else {
            imprimirErros(erros, validador)

            return false
        }
    }else{
        nome ? nome : erros.push("O nome não pode ser em branco!")
        peso ? peso : erros.push("O peso não pode ser em branco!")
        altura ? altura : erros.push("A altura não pode ser em branco!")
        gordura ? gordura : erros.push("A gordura não pode ser em branco!")
        
        imprimirErros(erros, validador)
        
        return false
    }
}

function imprimirErros(erros, tagHtml){
    let imprimir = ""
    validador.style.display = "block"
    erros.forEach((valor) => {
        imprimir += `${valor} <br>`
        tagHtml.innerHTML = imprimir
    })    
}

function criarTd() {
    return document.createElement("td")
}

function validaPeso(peso) {
    if (peso > 0 && peso < 1000) {
        return true
    } else {
        return false
    }
}

function validaAltura(altura) {
    if (altura > 0 && altura <= 3.00) {
        return true
    } else {
        return false
    }
}

function validarGordura(gordura){
    if (gordura >= 0) {
        return true
    }else {
        return false
    }
}

//Crio os elementos html e já insiro o valor do IMC
function criarElemento(nome, peso, altura, gordura){
    let linha = document.createElement("tr")
    linha.classList.add("paciente")
    let linhaNome = document.createElement("td")
    linhaNome.classList.add("info-nome")
    let linhaPeso = document.createElement("td")
    linhaPeso.classList.add('info-peso')
    let linhaAltura = document.createElement("td")
    linhaAltura.classList.add('info-altura')
    let linhaGordura = document.createElement("td")
    linhaGordura.classList.add('info-gordura')
    let linhaImc = document.createElement("td")

    linhaNome.textContent = nome
    linhaPeso.textContent = peso
    linhaAltura.textContent = altura
    linhaGordura.textContent = gordura
    linhaImc.textContent =  (peso / (altura * altura)).toFixed(2) // Calcula IMC e já insere no html

    linha.appendChild(linhaNome)
    linha.appendChild(linhaPeso)
    linha.appendChild(linhaAltura)
    linha.appendChild(linhaGordura)
    linha.appendChild(linhaImc)

    return linha
}

function adicionarPaciente(nome, peso, altura, gordura){
    if(validarInfo(nome, peso, altura, gordura)){
        if (!(validarRepedtido(nome, peso, altura, gordura))){
            validador.style.display = "none"

            let pacientes = document.querySelector("#tabela-pacientes")
            
            pacientes.appendChild(criarElemento(nome, peso, altura, gordura)) 
        }
   }else {
       return false
   }
}