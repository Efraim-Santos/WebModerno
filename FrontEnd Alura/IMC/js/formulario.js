var adicionar = document.querySelector("#add")

function criarTd() {
    return document.createElement("td")
}

function validarInfo(nome, peso, altura, gordura){

    let validador = document.querySelector("#validador")
    
    if(nome && peso && altura && gordura){

        if(peso <= 0 || peso > 300){
            validador.style.display = "block"
            validador.textContent = "Peso Inválido!"
        }else if(altura < 0.5 || altura >= 3){
            validador.style.display = "block"
            validador.textContent = "Altura Inválida!"
        } else if (gordura <= 0){
            validador.style.display = "block"
            validador.textContent = "Peso Invalido"
        }else{
            return true
        }
    }else{
        validador.style.display = "block"
        validador.textContent = "Campos não preenchidos"
    }
}

function getInformacoes(){
    let nome = document.querySelector("#nome").value
    let peso = document.querySelector("#peso").value
    let altura = document.querySelector("#altura").value
    let gordura = document.querySelector("#gordura").value
  
   let validou = validarInfo(nome, peso, altura, gordura)

   if(validarInfo(nome, peso, altura, gordura)){
      return criarElemento(nome, peso, altura, gordura)
   }else {
       return false
   }
}


function criarElemento(nome, peso, altura, gordura){
    let linha = document.createElement("tr")
    let linhaNome = document.createElement("td")
    let linhaPeso = document.createElement("td")
    let linhaAltura = document.createElement("td")
    let linhaGordura = document.createElement("td")
    let linhaImc = document.createElement("td")

    linhaNome.textContent = nome
    linhaPeso.textContent = peso
    linhaAltura.textContent = altura
    linhaGordura.textContent = gordura
    linhaImc.textContent =  (peso / (altura * altura)).toFixed(2)

    linha.appendChild(linhaNome)
    linha.appendChild(linhaPeso)
    linha.appendChild(linhaAltura)
    linha.appendChild(linhaGordura)
    linha.appendChild(linhaImc)

    return linha
}
adicionar.addEventListener("click", (event)=>{
    
    event.preventDefault()
    
    let pacientes = document.querySelector("#tabela-pacientes")

    getInformacoes ? pacientes.appendChild(getInformacoes()) : getInformacoes

})
