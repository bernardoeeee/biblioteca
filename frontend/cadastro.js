async function cadastrarUsuario(event){
    event.preventDefault()
    
    const nome = document.getElementById('nome').value 
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value



    const data = {
        nome,
        email,
        senha
    }

    const response = await fetch('http://localhost:3002/usuario/cadastrar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)

    })

    const result = await response.json()

    if (result.success){
        alert("Cadastrado realizado com sucesso!")
        window.location.href = 'login.html'
    } else {
        alert("Erro ao cadastrar")
    }
}