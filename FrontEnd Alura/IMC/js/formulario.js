var adicionar = document.querySelector("#add")

function criarTd() {
    return document.createElement("td")
}

function getInformacoes(){
    let nome = document.querySelector("#nome").value
    let peso = document.querySelector("#peso").value
    let altura = document.querySelector("#altura").value
    let gordura = document.querySelector("#gordura").value

    return criarElemento(nome, peso, altura, gordura)
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
    linhaImc.textContent = peso / (altura * altura)

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
    
    pacientes.appendChild(getInformacoes())


})
