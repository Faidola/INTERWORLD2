// Função para listar intercambistas
async function listarIntercambistas() {
    const tbody = document.getElementById('intercambistas-tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    try {
        const resposta = await fetch('http://localhost:5000/intercambistas');
        const intercambistas = await resposta.json();

        intercambistas.forEach(intercambista => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${intercambista.id}</td>
                <td>${intercambista.nome}</td>
                <td>${intercambista.email}</td>
                <td>
                    <button onclick="editarIntercambista(${intercambista.id})">Editar</button>
                    <button onclick="deletarIntercambista(${intercambista.id})">Deletar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao listar intercambistas:', error);
    }
}

// Chama a função quando a página é carregada
window.onload = listarIntercambistas;

async function deletarIntercambista(id) {
    if (confirm('Tem certeza que deseja deletar este intercambista?')) {
        try {
            const resposta = await fetch(`http://localhost:5000/intercambistas/${id}`, {
                method: 'DELETE'
            });

            if (!resposta.ok) {
                throw new Error('Erro ao deletar intercambista');
            }

            await listarIntercambistas();
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}