document.getElementById('btn-cria-conta').addEventListener('click', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    console.log("acessando metodo de chamada da API de intercambistas");

    const nome = document.getElementById('nome-cria-conta').value;
    const email = document.getElementById('email-cria-conta').value;
    const senha = document.getElementById('senha-cria-conta').value;

    const dados = {
        nome,
        email,
        senha
    };

    try {
        const resposta = await fetch('http://localhost:5000/intercambistas', { // Substitua pela URL da sua API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
    
        if (!resposta.ok) {
            throw new Error('Erro ao cadastrar: ' + resposta.statusText);
        } else {
            console.log("corpo da resposta: ", resposta.body)
            console.log("resposta completa: ", resposta)
            window.location.href = '../index.html';
        }
        //const resultado = await resposta.json();
        //document.getElementById('mensagem').textContent = 'Cadastro realizado com sucesso!';
        // Aqui você pode redirecionar o usuário ou fazer outra ação
    } catch (error) {
        console.log("Falha ao requisitar API: ", error);
    }
});

document.getElementById('login-intercambista').addEventListener('submit', async function(event) {
    console.log("acessando metodo de chamada da API de login intercambista");

    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    // Monta a URL com query parameters
    const url = new URL(`http://localhost:5000/intercambistas/${email}`);
    url.searchParams.append('senha', senha);

    console.log("URL da requisição: ", url);
    console.log("URL da requisição: ", url.hostname);
    console.log("URL da requisição: ", url.searchParams);

    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resposta => {
            console.log("resposta API: ", resposta);
            if (!resposta.ok) {
                console.log('Erro ao chamar a API: ', resposta);
                throw new Error('Erro ao consultar a API: ' + resposta.statusText);
            }
            window.location.href = '../index.html';
            return resposta.json(); // Retorna a resposta como JSON
        })
        .then(data => {
            console.log('Dados recebidos:', data);
        })
        .catch(error => {
            console.log("Falha ao requisitar API: ", error);
        });
    } catch (error) {
        console.log("Falha ao requisitar API: ", error);
    }
});
