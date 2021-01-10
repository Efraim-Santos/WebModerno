let buscar = document.querySelector("#buscar");

buscar.addEventListener("click", (event)=>{
    var validador = document.querySelector("#validador");
    event.preventDefault();

    let form = document.querySelector("form");
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function(){
        
        if(xhr.status == 200){
            // validador.style.display = "none"
            let resposta = xhr.responseText;
            let pacientes = JSON.parse(resposta);
            let nome, peso, altura, gordura;
           
            pacientes.forEach(element => {
                nome = element.nome;
                peso = element.peso;
                altura = element.altura;
                gordura = element.gordura;
        
                adicionarPaciente(nome, peso, altura, gordura);
            })
        }else{
            validador.textContent = `Erro ao buscar pacientes, ${xhr.responseText}`;
            validador.style.display = "block";
        }
       
    })

    xhr.send();
})