const buscar = document.querySelector("#buscar");
const salvar = document.querySelector('#salvar');

//  ****** API
function requisicaoGetPacientes() {
    return fetch("https://imc-rest-api.herokuapp.com/pacientes");
}
function requisicaoPostPacientes(){
    return fetch("https://imc-rest-api.herokuapp.com/");
}

buscar.addEventListener("click", event => {
    
    const validador = pacientes.validador;

    event.preventDefault();

    requisicaoGetPacientes() 
        .then(res => res.json())
        .then(res => {
            res.map(val => {
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

// Salvando paciente
salvar.addEventListener("click", (event)=>{
    
    event.preventDefault();

    const tabela = document.querySelector(".paciente:last-child").children; 

    let paciente = {
        nome: "",
        peso: 0,
        altura: 0
    };
    let igual = false;

    for (let i = 0; i < tabela.length; i++) {
        if(i == 0){
            paciente.nome = tabela[i].textContent;
        }else if(i == 1){
            paciente.peso = Number(tabela[i].textContent.replace(' Kg', ''));
        }else if(i == 2){
            paciente.altura = Number(tabela[i].textContent.replace(' M', ''));
        }   
    };

    
    requisicaoGetPacientes() 
        .then(res => res.json())
        .then(res => {
            res.map(val => {
                if(val.nome == paciente.nome && val.peso == paciente.peso  && val.altura == paciente.altura){
                    igual = true;
                }
            })
            if(igual) {
                validador.textContent = `Erro ao salvar, o último paciente adicionado já existe, realize uma busca.`;
                validador.style.display = "block";
            }else{
                console.log(JSON.stringify(paciente))
                fetch("https://imc-rest-api.herokuapp.com/adicionarPaciente", {
                    method: "POST",
                    body: JSON.stringify(paciente),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => {
                    console.log(res)
                    if(res.status == 200){
                        validador.textContent = `Paciente adiconado com sucesso, realize uma busca`;
                        validador.style.display = "block";
                    }else{
                        validador.textContent = `Erro ao salvar pacientes, pagina quebrada ${res.status} (${res.statusText})`;
                        validador.style.display = "block";
                    }
                })
            }
        })
        .catch( e => {
            validador.textContent = `Erro ao buscar pacientes: ${e} `;
            validador.style.display = "block";
        })

});

