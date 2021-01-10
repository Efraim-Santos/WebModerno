const buscar = document.querySelector("#buscar");

buscar.addEventListener("click", event => {
    
    const validador = pacientes.validador;

    event.preventDefault();

    const url = "https://api-pacientes.herokuapp.com/pacientes";

    fetch(url) 
        .then(res => res.json())
        .then(res => {
            res.map(val => {
                console.log(val.nome);
                pacientes.nome = val.nome;
                pacientes.peso = val.peso;
                pacientes.altura = val.altura;
                pacientes.validarInfo();
                pacientes.limparArray(); 
            })
        })
        .catch( e => {
            validador.textContent = `Erro ao buscar pacientes: ${e}`;
            validador.style.display = "block";
        })
});