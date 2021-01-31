class BuscarPacienteFetch{

    constructor(){
        this._buscar = document.querySelector("#buscar");
        this._buscar = document.querySelector('#salvar');
        this._requisicaoGetPacientes = "http://localhost:3000/pacientes";
        this._requisicaoPostPacientes ="http://localhost:3000/adicionarPaciente";
        this._requisicaoDeletePacientes ="http://localhost:3000/deletar";
        this._validador = pacientes.validador; 
        Object.freeze(this);
    }
    validadorStyle(text, visualizar){
        this._validador.textContent = text;
        if(visualizar) this._validador.style.display = "block";
            else this._validador.style.display = "none";
    }
    get _getPacientes() {
        return fetch(this._requisicaoGetPacientes);
    }

    //requisição post
    _postPacientes(paciente){
        fetch(this._requisicaoPostPacientes, {
            method: "POST",
            body: JSON.stringify(paciente),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if(res.status == 200){
                this.validadorStyle(`Paciente salvo com sucesso!`, true);
            }else{
                this.validadorStyle(`Erro ao salvar pacientes, pagina quebrada ${res.status} (${res.statusText})`, true);
            }
        })
    }
    
    //Buscando paciente
    buscarPaciente() {
        this._getPacientes
            .then(res => res.json())
            .then(res => {
                res.forEach(val => { 
                    pacientes.nome = val.nome;
                    pacientes.peso = val.peso;
                    pacientes.altura = val.altura;
                    pacientes.deletarPaciente = val.deletar;
                    pacientes.validarInfo();
                    pacientes.limparArray(); 
                })
            })
            .catch( e => {
                this.validadorStyle(`Erro ao buscar pacientes: ${e}`, true);
            })
    }

    // Salvando paciente
    salvandoPaciente (){
        let ultimoElemento = document.querySelector(".paciente:last-child")
        ultimoElemento.style.backgroundColor = "#f4f1de";
        ultimoElemento = ultimoElemento.children;
       
        let paciente = {
            nome: ultimoElemento[0].textContent,
            peso: pacientes.limparDados(ultimoElemento[1]),
            altura: pacientes.limparDados(false, ultimoElemento[2]),
            deletar: false
        };

        if (paciente.nome == "Paulo" && paciente.peso == 100 && paciente.altura == 2) {
            this.validadorStyle(`Adicione um paciente para poder salvar!`, true);
        }else{
            let igual = false;

            this._getPacientes
                .then(res => res.json())
                .then(res => { 
                        res.forEach(val => { 
                            if(val.nome == paciente.nome && val.peso == paciente.peso  && val.altura == paciente.altura){
                                igual = true;
                            };
                        });
                        if(igual) {
                            this.validadorStyle(`Erro ao salvar, o último paciente adicionado já existe, realize uma busca.`, true);
                        }else{
                            paciente.deletar = true;
                            this._postPacientes(paciente);
                        }
                })
                .catch( e => {
                    this.validadorStyle(`Erro ao buscar pacientes: ${e}`, true);
                })
        }
    }

    //deletar
    deletarPacientes(event){

        event.preventDefault();
        
        //composedPath, retorna uma array com o caminho do event 
        let linhaEvento = event.composedPath()[2];
        
        //Pegando o filho da tr, os td
        let linhaEventoPaciente = linhaEvento.children;
        let paciente = {
            nome: linhaEventoPaciente[0].textContent,
            peso: pacientes.limparDados(linhaEventoPaciente[1]),
            altura: pacientes.limparDados(false, linhaEventoPaciente[2]),
        };
       
        fetch(this._requisicaoDeletePacientes, {
            method: "DELETE",
            body: JSON.stringify(paciente),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if(res.status == 200){
                    this.validadorStyle(`Paciente removido com sucesso!`, true);
                }else{
                    this.validadorStyle(`Erro ao remover pacientes ${res.status} (${res.statusText})`, true);
                }
            })
        linhaEvento.outerHTML = "";
        
    }
}