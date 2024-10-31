const formIntercambista = document.getElementById('form-intercambista');
const listaIntercambistas = document.getElementById('lista-intercambistas');
let editandoId = null; // Para controlar a edição

// Função para listar intercambistas
async function listarIntercambistas() {
    const resposta = await fetch('http://localhost:5000/intercambistas'); // URL da sua API
    const intercambistas = await resposta.json();
    listaIntercambistas.innerHTML = '';
    intercambistas.forEach(intercambista => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${intercambista.nome} (${intercambista.email})</p>
            <button onclick="editarIntercambista(${intercambista.id}, '${intercambista.nome}', '${intercambista.email}')">Editar</button>
            <button onclick="deletarIntercambista(${intercambista.id})">Deletar</button>
        `;
        listaIntercambistas.appendChild(div);
    });
}

// Função para adicionar ou atualizar intercambista
async function adicionarOuAtualizarIntercambista(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-adm').value;
    const email = document.getElementById('email-adm').value;
    const senha = document.getElementById('senha-adm').value;

    if (editandoId) {
        // Atualizando intercambista
        await fetch(`http://localhost:5000/intercambistas/${editandoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
        editandoId = null; // Reseta o ID
        document.getElementById('atualizar-btn').style.display = 'none';
    } else {
        // Adicionando novo intercambista
        await fetch('http://localhost:5000/intercambistas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
    }

    formIntercambista.reset();
    listarIntercambistas(); // Atualiza a lista
}

// Função para editar intercambista
function editarIntercambista(id, nome, email) {
    editandoId = id;
    document.getElementById('nome-adm').value = nome;
    document.getElementById('email-adm').value = email;
    document.getElementById('senha-adm').value = ''; // Limpa a senha
    document.getElementById('atualizar-btn').style.display = 'inline-block';
}

// Função para deletar intercambista
async function deletarIntercambista(id) {
    await fetch(`http://localhost:5000/intercambistas/${id}`, { method: 'DELETE' });
    listarIntercambistas(); // Atualiza a lista
}

// Adiciona o evento de submit no formulário
formIntercambista.addEventListener('submit', adicionarOuAtualizarIntercambista);

// Chama a função para listar intercambistas ao carregar a página
window.onload = listarIntercambistas;