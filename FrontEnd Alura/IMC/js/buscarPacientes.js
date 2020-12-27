let buscar = document.querySelector("#buscar")

buscar.addEventListener("click", (event)=>{

    event.preventDefault()

    let form = document.querySelector("form")
    
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes")

    
    let resposta = xhr.responseText
    console.log(resposta)

    xhr.addEventListener("load", function(){
        
        let resposta = xhr.responseText
        console.log(resposta)
        let pacientes = JSON.parse(resposta)

        pacientes.forEach(element => {
            console.log(element)
            // validarInfo(nome, peso, altura, gordura)
        })
    })

    xhr.send()
})