const loadHtmlSucessCallbacks = []

export function onLoadHtmlSucess(callback) {
    if(!loadHtmlSucessCallbacks.includes(callback)){
        loadHtmlSucessCallbacks.push(callback)
    }
}

function loadIncludes(parent){
    let elemento = document.querySelectorAll('[include]')

    console.log(elemento)
    if(elemento.length != 0){
        elemento.forEach(e => {
            const url = e.getAttribute('include')
            fetch(url)
                .then(resp => resp.text())
                .then(html => {
                    e.innerHTML = html
                    e.removeAttribute('include')
                    // loadHtmlSucessCallbacks.forEach(
                    //     callback => callback()
                    // )
                    loadIncludes(e)
                })
        })
    }
}

loadIncludes()