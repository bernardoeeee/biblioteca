const dadosJson = localStorage.getItem('autenticacao')
const loginDados = JSON.parse(dadosJson)

if(loginDados === false){
    alert('Você não está cadastrado, por favor, se cadastre.')
    window.location = 'cadastro.html'
} else {
    
}
async function SalvarInformacoes(event) {
    const dadosJson = localStorage.getItem('login')
    const userDados = JSON.parse(dadosJson)
    event.preventDefault()

    const titulo = document.getElementById("titulo").value
    const autor = document.getElementById('autor').value
    const descricao = document.getElementById('descricao').value
    const anoPublicacao = document.getElementById('anoPublicacao').value
    const id_usuario = userDados[0].Id_user



    const data = {
        titulo,
        autor,
        descricao,
        anoPublicacao,
        id_usuario
    }


    const response = await fetch('http://localhost:3002/livro/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    if (result.success) {
        alert(result.message)
        exibirBanco()
    } else {
        alert(result.message)
    }

}

async function exibirBanco() {
    const response = await fetch('http://localhost:3002/livro/exibir')
    const result = await response.json()

    if (result.success) {
        ExibirLivros(result.data) // pegam os valores do json que serão exibidos 
        // para nós no result.data ou seja vao pegar os objetos dos valores cadastrados

    } else {
        console.error("Erro ao carregar produtos:", error)
    }

}

function ExibirLivros(livros) {
    const dadosJson = localStorage.getItem('login')
    const userDados = JSON.parse(dadosJson)

    const container = document.getElementById('listaLivros'); // Referência ao corpo da tabela (<tbody>)
    container.innerHTML = ''

    // Adiciona cada cliente como uma linha na tabela
    livros.forEach(livro => {
        console.log(livro)
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${livro.id_usuario}</td>
            <td>${livro.id_livros}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.descricao}</td>
            <td>${livro.anoPublicacao}</td>
            <td>${livro.data_insercao}</td>
            <td class="botoes">
                <button class="edit-btn" onclick="EditarLivro(${livro.id_livros})">Editar</button>
                <button class="delete-btn" onclick="excluirLivro(${livro.id_livros})">Excluir</button>
            </td>
        `
        container.appendChild(tr);

    })
}

async function EditarLivro(id_livros){
    const titulo = prompt('Digite um novo titulo: ')
    const autor = prompt('Digite um novo autor: ')
    const descricao = prompt('Digite uma nova descricao: ')
    const anoPublicacao = prompt('DIgite um novo ano de publicação: ')

    const data = {
        titulo,
        autor,
        descricao,
        anoPublicacao
    }

    const response = await fetch(`http://localhost:3002/livro/editar/${id_livros}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })

    const result = await response.json()

    if(result.success){
        alert(result.message)
        exibirBanco()
    } else {
        alert(result.message)

    }

}

async function excluirLivro(id_livros){
    const response = await fetch(`http://localhost:3002/livro/deletar/${id_livros}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},

    })

    const result = await response.json()

    if(result.success){
        alert(result.message)
        exibirBanco()
    } else {
        alert(result.message)

    }


}

exibirBanco()