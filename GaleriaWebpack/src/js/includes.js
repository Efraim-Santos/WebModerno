const loadHtmlSucessCallbacks = []

export function onLoadHtmlSucess(callback) {
    if(!loadHtmlSucessCallbacks.includes(callback)){
        loadHtmlSucessCallbacks.push(callback)
    }
}

function loadIncludes(){
    let elemento = document.querySelectorAll('[include]')
    if(elemento.length){
        elemento.forEach(e => {
            const url = e.getAttribute('include')
            fetch(url)
                .then(resp => resp.text())
                .then(html => {
                    e.innerHTML = html
                    e.removeAttribute('include')
                    loadIncludes(e) 
                })
        })
    }
}

loadIncludes()