export function onLoadHtmmlSucess(callback) {
    if(!loadHtmlSucessCallbacks.includes(callback)){
        loadHtmlSucessCallbacks.push(callback)
    }
}

function loadIncludes(parent){
    if(!parent) parent = 'body'
    let elemento = document.querySelectorAll('[include]')
   
    elemento.forEach(e => {
        const url = e.getAttribute('include')
        fetch(url)
            .then(resp => resp.text())
            .then(html => {
                e.innerHTML = html
            })
    })
}

loadIncludes()