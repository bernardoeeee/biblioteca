async function entrarUsuario(event){
    event.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    let autenticado = false

    const data = {
        email,
        senha,
    }
    // trocar rota para a de login
    const response = await fetch('http://localhost:3002/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }) 

    const result = await response.json()
    if (result.success){
        alert(`${result.message}`+ '.' + 'Usuário autenticado!')
        autenticado = true
        // const userData = {
        //     Nome: result.data[0].nome,
        //     autenticação: autenticado,
        //     Permissão: result.data[0].status_permissão
        // }
        // console.log(userData.Nome)
        // localStorage.setItem('login',JSON.stringify(userData))
        window.location.href = 'index.html'
        localStorage.setItem("login", JSON.stringify(result.data))
        localStorage.setItem('autenticacao', JSON.stringify(autenticado))
    } else {
        alert(result.message)
    }

}
