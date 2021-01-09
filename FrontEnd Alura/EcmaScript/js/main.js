const cursos = {
    node: 90,
    angular: 70,
    react: 50,
    backbone: 80
}

let tagHtml = document.querySelector("#cursos")

const cursosChave = Object.keys(cursos)
console.log(cursosChave)
console.log(typeof(cursosChave))
tagHtml.innerHTML = `
<ul>
${cursosChave.map((cursos) => `<li>${cursos}</li>`)}
<ul/>
`

const cursosEntries = Object.entries(cursos)
console.log(cursosEntries)
console.log(typeof(cursosEntries))

tagHtml.innerHTML = `
<ul>
${cursosEntries.map((cursosEntries) => `<li>${cursosEntries[0]} - ${cursosEntries[1]} Alunos</li>`)}
<ul/>
`
const usandoMAP = new Map(cursosEntries)
console.log(usandoMAP.get("node"))
console.log(usandoMAP.has("node"))  
console.log(usandoMAP.has("java"))  
