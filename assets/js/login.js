document.getElementById('loginButton').addEventListener('click', function() {
    window.location.href = '../index.html';
});

document.getElementById('form-cadastro').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const dados = {
        nome,
        email,
        senha
    };


        try {
            const resposta = await fetch('https://localhost:5000/escolas', { // Substitua pela URL da sua API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
    
            if (!resposta.ok) {
                throw new Error('Erro ao cadastrar: ' + resposta.statusText);
            }
    
            const resultado = await resposta.json();
            document.getElementById('mensagem').textContent = 'Cadastro realizado com sucesso!';
            // Aqui você pode redirecionar o usuário ou fazer outra ação
        } catch (error) {
            document.getElementById('mensagem').textContent = error.message;
        }
   
});
